#!/usr/bin/env node
// Datos del MES del CMO de Diluu en UNA conexión a la base de producción (solo lectura). Revisión mensual (día 1).
//   node scripts/mes-datos.cjs 2026-10     → el mes indicado, el anterior y el mismo mes del año pasado
// Escribe data/mes-AAAA-MM.json e imprime un resumen. Definiciones: docs/medicion/fuentes.md.
// Sin credenciales en la conversación: la conexión la abre lib/mongo.cjs del plugin diluu-ops.
const fs = require('fs'), path = require('path'), os = require('os')
const REPO = path.resolve(__dirname, '..')
const INTERNOS = ['8edb003f-28cb-4731-ae9f-327e8419dad0', '448d23fe-3305-44a6-88c1-8c72d1f6c5e5']
const CODIGOS_INTERNOS = ['referral:DILUU-P7WE8Q', 'referral:DILUU-UUYRUZ']
const pluginLib = () => {
	const base = path.join(os.homedir(), '.claude/plugins/cache/diluu/diluu-ops')
	const dirs = fs.readdirSync(base).map((d) => path.join(base, d, 'scripts/lib/mongo.cjs')).filter(fs.existsSync)
	if (!dirs.length) throw new Error('No encuentro lib/mongo.cjs del plugin diluu-ops')
	dirs.sort((a, b) => fs.statSync(b).mtimeMs - fs.statSync(a).mtimeMs)
	return require(dirs[0])
}
const iso = (d) => d.toISOString().slice(0, 10)
const addDays = (s, n) => { const d = new Date(s + 'T00:00:00Z'); d.setUTCDate(d.getUTCDate() + n); return iso(d) }
const mesRango = (ym) => { const [y, m] = ym.split('-').map(Number); const ini = `${ym}-01`; const fin = iso(new Date(Date.UTC(y, m, 0))); return [ini, fin] }
const mesAnt = (ym, n = 1) => { const [y, m] = ym.split('-').map(Number); const d = new Date(Date.UTC(y, m - 1 - n, 1)); return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}` }
const MES = process.argv[2] || mesAnt(new Date().toISOString().slice(0, 7))
const HOY = iso(new Date())
const rango = (ini, fin) => ({ $gte: ini, $lt: `${fin}T23:59:59` })
const ACTIVA = { $or: [{ end: null }, { 'end.lastLesson': { $gte: HOY } }] }
const CANCEL_NETA = (ini, fin) => ({ 'end.lastLesson': rango(ini, fin), 'end.reason': 'CANCEL', 'end.cancellationReason': { $nin: ['NO_ES_CANCELACION', 'REACTIVADA'] } })
const first = (rows, key = 'n') => (rows[0] ? rows[0][key] : 0)
const dias = (a, b) => (new Date(b.slice(0, 10)) - new Date(a.slice(0, 10))) / 86400000

async function periodo(db, ini, fin, detalle) {
	const E = db.collection('v3-enrolments'), B = db.collection('v3-bookings'), R = db.collection('v3-trial-results')
	const out = {
		rango: `${ini} – ${fin}`,
		plazas_activas_fin: await E.countDocuments({ createdAt: { $lte: `${fin}T23:59:59` }, $or: [{ end: null }, { 'end.lastLesson': { $gte: fin } }] }),
		plazas_activas_ini: await E.countDocuments({ createdAt: { $lt: ini }, $or: [{ end: null }, { 'end.lastLesson': { $gte: ini } }] }),
		plazas_nuevas: await E.countDocuments({ createdAt: rango(ini, fin), previousEnrolmentId: null }),
		plazas_canceladas_netas: await E.countDocuments(CANCEL_NETA(ini, fin)),
		plazas_canceladas_brutas: await E.countDocuments({ 'end.lastLesson': rango(ini, fin), 'end.reason': 'CANCEL' }),
		cambios_grupo: await E.countDocuments({ 'end.lastLesson': rango(ini, fin), 'end.reason': 'CHANGE' }),
		altas_familias: first(await E.aggregate([{ $match: { createdAt: rango(ini, fin), previousEnrolmentId: null } }, { $group: { _id: '$client.id' } }, { $count: 'n' }]).toArray()),
		familias_nuevas: first(await E.aggregate([{ $group: { _id: '$client.id', first: { $min: '$createdAt' } } }, { $match: { first: rango(ini, fin) } }, { $count: 'n' }]).toArray()),
		bajas_familias_aprox: first(await E.aggregate([{ $match: CANCEL_NETA(ini, fin) }, { $group: { _id: '$client.id' } }, { $count: 'n' }]).toArray()),
		pruebas: await B.countDocuments({ type: 'TRIAL', lessonStart: rango(ini, fin) }),
		pruebas_reservadas: await B.countDocuments({ type: 'TRIAL', createdAt: rango(ini, fin) }),
		familias_activas_fin: first(await E.aggregate([{ $match: { createdAt: { $lte: `${fin}T23:59:59` }, $or: [{ end: null }, { 'end.lastLesson': { $gte: fin } }] } }, { $group: { _id: '$client.id' } }, { $count: 'n' }]).toArray()),
	}
	// Bajas de familias afinadas: familias con CANCEL neta en el periodo que no conservan ninguna plaza activa a fin de periodo
	const canceladoras = (await E.aggregate([{ $match: CANCEL_NETA(ini, fin) }, { $group: { _id: '$client.id' } }]).toArray()).map((r) => r._id)
	out.bajas_familias_sin_plaza = canceladoras.length - first(await E.aggregate([{ $match: { 'client.id': { $in: canceladoras }, createdAt: { $lte: `${fin}T23:59:59` }, $or: [{ end: null }, { 'end.lastLesson': { $gt: fin } }] } }, { $group: { _id: '$client.id' } }, { $count: 'n' }]).toArray())
	const asistencia = await R.aggregate([{ $lookup: { from: 'v3-bookings', localField: 'bookingId', foreignField: 'id', as: 'b' } }, { $unwind: '$b' }, { $match: { 'b.type': 'TRIAL', 'b.lessonStart': rango(ini, fin) } }, { $group: { _id: '$attended', n: { $sum: 1 } } }]).toArray()
	const noShow = asistencia.find((r) => r._id === false)?.n || 0, conResultado = asistencia.reduce((s, r) => s + r.n, 0)
	out.no_presentados = { n: noShow, con_resultado: conResultado, pct: conResultado ? +(100 * noShow / conResultado).toFixed(1) : null }
	out.perdida_plazas_pct = out.plazas_activas_ini ? +(100 * out.plazas_canceladas_netas / out.plazas_activas_ini).toFixed(1) : null
	out.plazas_por_alta = out.altas_familias ? +(out.plazas_nuevas / out.altas_familias).toFixed(2) : null
	if (detalle) {
		out.motivos_cancelacion = Object.fromEntries((await E.aggregate([{ $match: { 'end.lastLesson': rango(ini, fin), 'end.reason': 'CANCEL' } }, { $group: { _id: '$end.cancellationReason', n: { $sum: 1 } } }, { $sort: { n: -1 } }]).toArray()).map((r) => [r._id || 'SIN_MOTIVO', r.n]))
		const porSemana = async (col, campo, extra) => Object.fromEntries((await col.aggregate([{ $match: { [campo]: rango(ini, fin), ...extra } }, { $group: { _id: { $isoWeek: { $dateFromString: { dateString: { $substr: [`$${campo}`, 0, 10] } } } }, n: { $sum: 1 } } }, { $sort: { _id: 1 } }]).toArray()).map((r) => [`S${r._id}`, r.n]))
		out.plazas_nuevas_por_semana = await porSemana(E, 'createdAt', { previousEnrolmentId: null })
		out.canceladas_netas_por_semana = await porSemana(E, 'end.lastLesson', { 'end.reason': 'CANCEL', 'end.cancellationReason': { $nin: ['NO_ES_CANCELACION', 'REACTIVADA'] } })
		out.pruebas_por_semana = await porSemana(B, 'lessonStart', { type: 'TRIAL' })
		// Por idioma / programa de las plazas nuevas y canceladas
		const porCampo = async (match, campo) => Object.fromEntries((await E.aggregate([{ $match: match }, { $group: { _id: `$${campo}`, n: { $sum: 1 } } }, { $sort: { n: -1 } }, { $limit: 12 }]).toArray()).map((r) => [String(r._id), r.n]))
		out.nuevas_por_idioma = await porCampo({ createdAt: rango(ini, fin), previousEnrolmentId: null }, 'course.language')
		out.canceladas_por_idioma = await porCampo(CANCEL_NETA(ini, fin), 'course.language')
		out.nuevas_por_pais = await porCampo({ createdAt: rango(ini, fin), previousEnrolmentId: null }, 'client.country')
		// Desglose de las altas: nueva / añade plaza / vuelve < 90 d / vuelve > 90 d
		const nuevas = await E.find({ createdAt: rango(ini, fin), previousEnrolmentId: null }, { projection: { 'client.id': 1, createdAt: 1 } }).toArray()
		const porCliente = {}
		for (const e of nuevas) { const c = e.client?.id; if (!porCliente[c] || e.createdAt < porCliente[c]) porCliente[c] = e.createdAt }
		const ids = Object.keys(porCliente)
		const hist = await E.find({ 'client.id': { $in: ids } }, { projection: { 'client.id': 1, createdAt: 1, end: 1, previousEnrolmentId: 1 } }).toArray()
		const porC = {}; for (const h of hist) (porC[h.client.id] ||= []).push(h)
		const des = { nueva: 0, anade_plaza: 0, vuelve_menos_90d: 0, vuelve_mas_90d: 0 }
		for (const c of ids) {
			const t = porCliente[c], prev = porC[c].filter((h) => h.createdAt < t)
			if (!prev.length) { des.nueva++; continue }
			if (prev.some((h) => !h.end || !h.end.lastLesson || h.end.lastLesson >= t.slice(0, 10))) { des.anade_plaza++; continue }
			const ult = prev.map((h) => h.end.lastLesson).sort().pop()
			if (dias(ult, t) < 90) des.vuelve_menos_90d++; else des.vuelve_mas_90d++
		}
		out.altas_desglose = des
	}
	return out
}

// Conversión prueba → curso a 30 días: pruebas con lessonStart en el periodo, emparejadas con una matrícula cuyo trialBookingId es esa prueba
// y creada en los 30 días siguientes. Por prueba y por familia (client.id de la reserva).
async function conversion(db, ini, fin) {
	const B = db.collection('v3-bookings'), E = db.collection('v3-enrolments'), R = db.collection('v3-trial-results')
	const pruebas = await B.find({ type: 'TRIAL', lessonStart: rango(ini, fin) }, { projection: { id: 1, lessonStart: 1, cancelled: 1, 'client.id': 1, clientId: 1 } }).toArray()
	const ids = pruebas.map((p) => p.id)
	const res = await R.find({ bookingId: { $in: ids } }, { projection: { bookingId: 1, attended: 1 } }).toArray()
	const asistio = new Set(res.filter((r) => r.attended === true).map((r) => r.bookingId))
	const mats = await E.find({ trialBookingId: { $in: ids } }, { projection: { trialBookingId: 1, createdAt: 1, 'client.id': 1 } }).toArray()
	const porPrueba = {}; for (const m of mats) if (!porPrueba[m.trialBookingId] || m.createdAt < porPrueba[m.trialBookingId]) porPrueba[m.trialBookingId] = m.createdAt
	let conv30 = 0, convTotal = 0, noCanceladas = 0, asistidas = 0, conv30Asistidas = 0
	const famP = new Set(), famC = new Set()
	for (const p of pruebas) {
		const fam = p.client?.id || p.clientId || p.id
		if (p.cancelled) continue
		noCanceladas++; famP.add(fam)
		const c = porPrueba[p.id]
		if (c) { convTotal++; if (dias(p.lessonStart, c) <= 30) { conv30++; famC.add(fam) } }
		if (asistio.has(p.id)) { asistidas++; if (c && dias(p.lessonStart, c) <= 30) conv30Asistidas++ }
	}
	return { rango: `${ini} – ${fin}`, pruebas: pruebas.length, no_canceladas: noCanceladas, asistidas_con_resultado: asistidas, convertidas_30d: conv30, convertidas_total: convTotal,
		pct_30d_sobre_no_canceladas: noCanceladas ? +(100 * conv30 / noCanceladas).toFixed(1) : null, pct_30d_sobre_asistidas: asistidas ? +(100 * conv30Asistidas / asistidas).toFixed(1) : null,
		familias_con_prueba: famP.size, familias_convertidas_30d: famC.size, pct_familias_30d: famP.size ? +(100 * famC.size / famP.size).toFixed(1) : null }
}

// Bajas en los primeros 30 días: plazas nuevas (sin predecesora) creadas en el periodo canceladas con última clase ≤ 30 días tras la creación.
async function bajas30(db, ini, fin) {
	const E = db.collection('v3-enrolments')
	const nuevas = await E.find({ createdAt: rango(ini, fin), previousEnrolmentId: null }, { projection: { 'client.id': 1, createdAt: 1, end: 1 } }).toArray()
	let plazas = 0; const fam = new Set(), famBaja = new Set()
	for (const e of nuevas) {
		fam.add(e.client?.id)
		if (e.end && e.end.reason === 'CANCEL' && e.end.lastLesson && !['NO_ES_CANCELACION', 'REACTIVADA'].includes(e.end.cancellationReason) && dias(e.createdAt, e.end.lastLesson) <= 30) { plazas++; famBaja.add(e.client?.id) }
	}
	return { rango: `${ini} – ${fin}`, plazas_nuevas: nuevas.length, plazas_baja_30d: plazas, pct_plazas: nuevas.length ? +(100 * plazas / nuevas.length).toFixed(1) : null, familias: fam.size, familias_baja_30d: famBaja.size, pct_familias: fam.size ? +(100 * famBaja.size / fam.size).toFixed(1) : null }
}

async function referidos(db, ini, fin) {
	const C = db.collection('v3-referral-codes'), Rf = db.collection('v3-referrals'), B = db.collection('v3-bookings'), E = db.collection('v3-enrolments')
	const r = rango(ini, fin), sinInternos = { referrerClientId: { $nin: INTERNOS } }
	const estados = await Rf.aggregate([{ $match: { createdAt: r, ...sinInternos } }, { $group: { _id: '$status', n: { $sum: 1 }, acreditados: { $sum: { $cond: [{ $ne: ['$earned', null] }, 1, 0] } } } }]).toArray()
	const pruebas = await B.aggregate([{ $match: { $and: [{ type: 'TRIAL' }, { sourceId: { $regex: '^referral:' } }, { sourceId: { $nin: CODIGOS_INTERNOS } }, { createdAt: r }] } },
		{ $group: { _id: null, total: { $sum: 1 }, canceladas: { $sum: { $cond: [{ $ne: ['$cancelled', null] }, 1, 0] } }, convertidas: { $sum: { $cond: [{ $gt: [{ $size: { $ifNull: ['$convertedEnrolmentIds', []] } }, 0] }, 1, 0] } } } }]).toArray()
	const altas = await E.aggregate([{ $match: { createdAt: r, previousEnrolmentId: null, trialBookingId: { $ne: null } } },
		{ $lookup: { from: 'v3-bookings', localField: 'trialBookingId', foreignField: 'id', as: 'b' } },
		{ $match: { $and: [{ 'b.sourceId': { $regex: '^referral:' } }, { 'b.sourceId': { $nin: CODIGOS_INTERNOS } }] } },
		{ $group: { _id: null, plazas: { $sum: 1 }, familias: { $addToSet: '$client.id' } } }]).toArray()
	return { rango: `${ini} – ${fin}`, codigos_nuevos: await C.countDocuments({ createdAt: r }), codigos_total: await C.countDocuments({}),
		amigos_invitados: estados.reduce((s, e) => s + e.n, 0), por_estado: Object.fromEntries(estados.map((e) => [e._id, e.n])), recompensas_acreditadas: estados.reduce((s, e) => s + e.acreditados, 0),
		familias_que_refirieron: first(await Rf.aggregate([{ $match: { createdAt: r, ...sinInternos } }, { $group: { _id: '$referrerClientId' } }, { $count: 'n' }]).toArray()),
		pruebas_referidas: pruebas[0] ? { total: pruebas[0].total, canceladas: pruebas[0].canceladas, convertidas: pruebas[0].convertidas } : { total: 0, canceladas: 0, convertidas: 0 },
		altas_referidas: altas[0] ? { plazas: altas[0].plazas, familias: altas[0].familias.length } : { plazas: 0, familias: 0 } }
}

async function main() {
	const { withDb } = pluginLib(); const t0 = Date.now()
	const [INI, FIN] = mesRango(MES), ANT = mesAnt(MES), ANT2 = mesAnt(MES, 2), YOY = mesAnt(MES, 12)
	const out = { lectura: new Date().toISOString(), hoy: HOY, mes: MES }
	await withDb(async (db) => {
		const E = db.collection('v3-enrolments')
		out.plazas_activas_hoy = await E.countDocuments(ACTIVA)
		out.cancelaciones_programadas = await E.countDocuments({ 'end.lastLesson': { $gte: HOY }, 'end.reason': 'CANCEL' })
		out.familias_activas_hoy = first(await E.aggregate([{ $match: ACTIVA }, { $group: { _id: '$client.id' } }, { $count: 'n' }]).toArray())
		out.mes_datos = await periodo(db, INI, FIN, true)
		out.mes_anterior = await periodo(db, ...mesRango(ANT), false)
		out.mismo_mes_2025 = await periodo(db, ...mesRango(YOY), false)
		out.trimestre = await periodo(db, `${FIN.slice(0, 4)}-${String(Math.floor((Number(FIN.slice(5, 7)) - 1) / 3) * 3 + 1).padStart(2, '0')}-01`, FIN, false)
		out.conversion_30d = { [ANT]: await conversion(db, ...mesRango(ANT)), [ANT2]: await conversion(db, ...mesRango(ANT2)), [MES + ' (parcial, <30 d)']: await conversion(db, INI, FIN) }
		out.bajas_30d = { [ANT]: await bajas30(db, ...mesRango(ANT)), [ANT2]: await bajas30(db, ...mesRango(ANT2)) }
		out.referidos_mes = await referidos(db, INI, FIN)
		out.referidos_desde_23sep = await referidos(db, '2026-09-23', FIN)
	})
	out.segundos = Math.round((Date.now() - t0) / 1000)
	fs.mkdirSync(path.join(REPO, 'data'), { recursive: true })
	const file = path.join(REPO, 'data', `mes-${MES}.json`); fs.writeFileSync(file, JSON.stringify(out, null, 2))
	const m = out.mes_datos, a = out.mes_anterior, y = out.mismo_mes_2025
	const linea = (n, p) => `${n}: activas ini ${p.plazas_activas_ini} → fin ${p.plazas_activas_fin} · nuevas ${p.plazas_nuevas} · canceladas netas ${p.plazas_canceladas_netas} (brutas ${p.plazas_canceladas_brutas}; pérdida ${p.perdida_plazas_pct} %) · altas ${p.altas_familias} · fam. nuevas ${p.familias_nuevas} · bajas fam. ${p.bajas_familias_aprox} (sin plaza ${p.bajas_familias_sin_plaza}) · pruebas ${p.pruebas} · no presentados ${p.no_presentados.pct} % · plazas/alta ${p.plazas_por_alta}`
	console.log(`# Mes ${MES} · lectura ${HOY} · ${out.segundos} s · ${path.relative(REPO, file)}`)
	console.log(`plazas_activas_hoy ${out.plazas_activas_hoy} · familias activas ${out.familias_activas_hoy} · cancelaciones programadas ${out.cancelaciones_programadas}`)
	console.log(linea(MES, m)); console.log(linea(ANT, a)); console.log(linea(YOY, y)); console.log(linea('trimestre', out.trimestre))
	console.log(`desglose altas: ${JSON.stringify(m.altas_desglose)} · idiomas nuevas ${JSON.stringify(m.nuevas_por_idioma)} · canceladas ${JSON.stringify(m.canceladas_por_idioma)}`)
	console.log(`por semana nuevas ${JSON.stringify(m.plazas_nuevas_por_semana)} · canceladas ${JSON.stringify(m.canceladas_netas_por_semana)} · pruebas ${JSON.stringify(m.pruebas_por_semana)}`)
	console.log(`motivos: ${JSON.stringify(m.motivos_cancelacion)}`)
	console.log(`países nuevas: ${JSON.stringify(m.nuevas_por_pais)}`)
	console.log(`conversión 30d: ${JSON.stringify(out.conversion_30d)}`)
	console.log(`bajas 30d: ${JSON.stringify(out.bajas_30d)}`)
	console.log(`referidos mes: ${JSON.stringify(out.referidos_mes)}`)
	console.log(`referidos desde 23 sep: ${JSON.stringify(out.referidos_desde_23sep)}`)
}
main().catch((e) => { console.error('ERROR:', String(e.stack || e.message).replace(/mongodb(\+srv)?:\/\/\S+/g, '[oculto]')); process.exit(1) })
