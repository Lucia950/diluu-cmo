#!/usr/bin/env node
// Datos de la semana del CMO de Diluu en UNA sola conexión a la base de producción (solo lectura),
// más las pruebas pagadas de Stripe si hay clave de solo lectura en .env (STRIPE_API_KEY).
//
//   node scripts/semana-datos.cjs                 → semana ISO completa anterior (lunes–domingo)
//   node scripts/semana-datos.cjs 2026-10-12      → la semana que empieza ese lunes
//   node scripts/semana-datos.cjs 2026-10-12 --sin-stripe
//
// Escribe data/semana-AAAA-SS.json (data/ no se sube a git) e imprime un resumen corto.
// Definiciones: docs/medicion/fuentes.md. Referidos: mismas consultas que scripts/referidos.sh.
// Ninguna credencial pasa por la conversación: la conexión la abre lib/mongo.cjs del plugin diluu-ops
// y la clave de Stripe solo se lee dentro de este proceso.

const fs = require('fs')
const path = require('path')
const os = require('os')

const REPO = path.resolve(__dirname, '..')
const REFERIDOS_DESDE = '2026-09-23'
// Cuentas internas del equipo (ids de cliente y códigos, no datos personales): sus referidos son pruebas del panel.
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
const isoWeek = (s) => {
	const d = new Date(s + 'T00:00:00Z'); const day = d.getUTCDay() || 7
	d.setUTCDate(d.getUTCDate() + 4 - day)
	const y0 = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
	return `${d.getUTCFullYear()}-${String(Math.ceil(((d - y0) / 86400000 + 1) / 7)).padStart(2, '0')}`
}
const lunesAnterior = () => {
	const hoy = new Date(); const d = new Date(Date.UTC(hoy.getFullYear(), hoy.getMonth(), hoy.getDate()))
	const day = d.getUTCDay() || 7
	d.setUTCDate(d.getUTCDate() - day + 1 - 7)
	return iso(d)
}

const args = process.argv.slice(2)
const INI = args.find((a) => /^\d{4}-\d{2}-\d{2}$/.test(a)) || lunesAnterior()
const FIN = addDays(INI, 6)
const HOY = iso(new Date())
const Q_INI = `${FIN.slice(0, 4)}-${String(Math.floor((Number(FIN.slice(5, 7)) - 1) / 3) * 3 + 1).padStart(2, '0')}-01`
const SIN_STRIPE = args.includes('--sin-stripe')

const rango = (ini, fin) => ({ $gte: ini, $lt: `${fin}T23:59:59` })
const ACTIVA = { $or: [{ end: null }, { 'end.lastLesson': { $gte: HOY } }] }
const CANCEL_NETA = (ini, fin) => ({ 'end.lastLesson': rango(ini, fin), 'end.reason': 'CANCEL', 'end.cancellationReason': { $nin: ['NO_ES_CANCELACION', 'REACTIVADA'] } })

const first = (rows, key = 'n') => (rows[0] ? rows[0][key] : 0)

async function periodo(db, ini, fin, conDetalle) {
	const E = db.collection('v3-enrolments'), B = db.collection('v3-bookings'), R = db.collection('v3-trial-results')
	const out = {
		rango: `${ini} – ${fin}`,
		plazas_nuevas: await E.countDocuments({ createdAt: rango(ini, fin), previousEnrolmentId: null }),
		plazas_canceladas_netas: await E.countDocuments(CANCEL_NETA(ini, fin)),
		plazas_canceladas_brutas: await E.countDocuments({ 'end.lastLesson': rango(ini, fin), 'end.reason': 'CANCEL' }),
		altas_familias: first(await E.aggregate([{ $match: { createdAt: rango(ini, fin), previousEnrolmentId: null } }, { $group: { _id: '$client.id' } }, { $count: 'n' }]).toArray()),
		familias_nuevas: first(await E.aggregate([{ $group: { _id: '$client.id', first: { $min: '$createdAt' } } }, { $match: { first: rango(ini, fin) } }, { $count: 'n' }]).toArray()),
		bajas_familias_aprox: first(await E.aggregate([{ $match: CANCEL_NETA(ini, fin) }, { $group: { _id: '$client.id' } }, { $count: 'n' }]).toArray()),
		pruebas: await B.countDocuments({ type: 'TRIAL', lessonStart: rango(ini, fin) }),
	}
	const asistencia = await R.aggregate([
		{ $lookup: { from: 'v3-bookings', localField: 'bookingId', foreignField: 'id', as: 'b' } }, { $unwind: '$b' },
		{ $match: { 'b.type': 'TRIAL', 'b.lessonStart': rango(ini, fin) } }, { $group: { _id: '$attended', n: { $sum: 1 } } },
	]).toArray()
	const noShow = asistencia.find((r) => r._id === false)?.n || 0, conResultado = asistencia.reduce((s, r) => s + r.n, 0)
	out.no_presentados = { n: noShow, con_resultado: conResultado, pct: conResultado ? +(100 * noShow / conResultado).toFixed(1) : null }
	if (conDetalle) {
		out.motivos_cancelacion = Object.fromEntries((await E.aggregate([{ $match: { 'end.lastLesson': rango(ini, fin), 'end.reason': 'CANCEL' } }, { $group: { _id: '$end.cancellationReason', n: { $sum: 1 } } }, { $sort: { n: -1 } }]).toArray()).map((r) => [r._id || 'SIN_MOTIVO', r.n]))
		const porDia = async (col, campo, extra) => Object.fromEntries((await col.aggregate([{ $match: { [campo]: rango(ini, fin), ...extra } }, { $group: { _id: { $substr: [`$${campo}`, 0, 10] }, n: { $sum: 1 } } }, { $sort: { _id: 1 } }]).toArray()).map((r) => [r._id, r.n]))
		out.plazas_nuevas_por_dia = await porDia(E, 'createdAt', { previousEnrolmentId: null })
		out.pruebas_por_dia = await porDia(B, 'lessonStart', { type: 'TRIAL' })
	}
	return out
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
	return {
		rango: `${ini} – ${fin}`,
		codigos_nuevos: await C.countDocuments({ createdAt: r }),
		amigos_invitados: estados.reduce((s, e) => s + e.n, 0),
		por_estado: Object.fromEntries(estados.map((e) => [e._id, e.n])),
		recompensas_acreditadas: estados.reduce((s, e) => s + e.acreditados, 0),
		familias_que_refirieron: first(await Rf.aggregate([{ $match: { createdAt: r, ...sinInternos } }, { $group: { _id: '$referrerClientId' } }, { $count: 'n' }]).toArray()),
		pruebas_referidas: pruebas[0] ? { total: pruebas[0].total, canceladas: pruebas[0].canceladas, convertidas: pruebas[0].convertidas } : { total: 0, canceladas: 0, convertidas: 0 },
		altas_referidas: altas[0] ? { plazas: altas[0].plazas, familias: altas[0].familias.length } : { plazas: 0, familias: 0 },
	}
}

async function stripePruebas(ini, fin) {
	const envPath = path.join(REPO, '.env')
	if (!fs.existsSync(envPath)) return { sin_dato: 'falta .env con STRIPE_API_KEY (clave restringida de solo lectura)' }
	const key = (fs.readFileSync(envPath, 'utf8').match(/^STRIPE_API_KEY=(.+)$/m) || [])[1]?.trim().replace(/^["']|["']$/g, '')
	if (!key) return { sin_dato: 'STRIPE_API_KEY no está en .env' }
	// Medianoche en hora de Londres (así agrupa Lucia los pagos en el proyecto de Meta), en segundos Unix.
	const londres = (s) => {
		const utc = new Date(s + 'T00:00:00Z')
		const parts = Object.fromEntries(new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/London', hour: 'numeric', hourCycle: 'h23', timeZoneName: 'shortOffset' }).formatToParts(utc).map((p) => [p.type, p.value]))
		const off = /([+-])(\d{1,2})/.exec(parts.timeZoneName || 'GMT') // "GMT+1" en verano, "GMT" en invierno
		const horas = off ? Number(off[1] + off[2]) : 0
		return Math.floor(utc.getTime() / 1000) - horas * 3600
	}
	// Prueba = cargo con éxito y metadata.direct_trial = 'true', por fecha de cargo (no por importe: con ≤ 400 se perdían las
	// pruebas de 2–3 niños y las de AUD, NZD, JPY, SEK o DKK; semana 43: 67 frente a 90). Sin las de prueba de Lucia
	// (lucia/lily/lilita en la descripción o el nombre, teléfono +34 o país ID), igual que el proyecto de Meta. Listado /v1/charges (en tiempo real), no la
	// búsqueda: la búsqueda deja fuera las últimas horas y el 19 oct dio 51 en vez de 69. No incluye pruebas referidas (gratis).
	const porMoneda = {}, porDia = {}, porOrigen = {}; let total = 0, starting_after
	// Origen según el metadata que guarda la web: Meta (utm_id, fbclid o utm_source facebook/ig), Google Ads (gclid o
	// utm_source google), y si no, el `src` de la web (organic, direct, email…). ChatGPT y los asistentes no se distinguen
	// aquí: el referrer guardado es la página anterior de diluu.com; se miran en GA4 (canal AI Assistant).
	const origen = (m) => m.utm_id || m.fbclid || ['facebook', 'ig'].includes(m.utm_source) ? 'meta' : m.gclid || m.utm_source === 'google' ? 'google_ads' : m.src || (m.utm_source ? `utm_${m.utm_source}` : 'sin_origen')
	const diaLondres = (unix) => new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/London', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(unix * 1000))
	do {
		const url = new URL('https://api.stripe.com/v1/charges')
		url.searchParams.set('created[gte]', String(londres(ini))); url.searchParams.set('created[lt]', String(londres(addDays(fin, 1))))
		url.searchParams.set('limit', '100'); if (starting_after) url.searchParams.set('starting_after', starting_after)
		const res = await fetch(url, { headers: { Authorization: `Bearer ${key}` } })
		if (!res.ok) return { sin_dato: `Stripe respondió ${res.status}` }
		const json = await res.json()
		for (const c of json.data) {
			const m = c.metadata || {}, interna = /lucia|lily|lilita/i.test(`${c.description || ''} ${m.customer_name || ''}`) || (m.customer_phone || '').startsWith('+34') || m.customer_country === 'ID'
			if (c.status === 'succeeded' && m.direct_trial === 'true' && !c.refunded && !interna) {
				total++; porMoneda[c.currency] = (porMoneda[c.currency] || 0) + 1
				const d = diaLondres(c.created); porDia[d] = (porDia[d] || 0) + 1
				const o = origen(m); porOrigen[o] = (porOrigen[o] || 0) + 1
			}
		}
		starting_after = json.has_more && json.data.length ? json.data[json.data.length - 1].id : null
	} while (starting_after)
	// Comprobación: los siete días tienen que estar; si el último trae menos de la mitad de la media, avisa (datos incompletos).
	const dias = Array.from({ length: 7 }, (_, i) => addDays(ini, i)), ultimo = porDia[dias[6]] || 0
	const aviso = dias.some((d) => !(d in porDia)) ? 'faltan días: comprueba Stripe antes de usar la cifra' : ultimo < (total / 7) / 2 ? `el último día (${dias[6]}) trae ${ultimo}: posible lectura incompleta` : null
	return { rango: `${ini} – ${fin} (hora de Londres)`, pruebas_pagadas: total, por_origen: porOrigen, por_moneda: porMoneda, por_dia: dias.map((d) => porDia[d] || 0), ...(aviso ? { aviso } : {}) }
}

async function main() {
	const { withDb } = pluginLib()
	const t0 = Date.now()
	const out = { lectura: new Date().toISOString(), hoy: HOY, semana: isoWeek(INI), semana_rango: `${INI} – ${FIN}`, trimestre_rango: `${Q_INI} – ${FIN}` }
	await withDb(async (db) => {
		const E = db.collection('v3-enrolments')
		out.plazas_activas = await E.countDocuments(ACTIVA)
		out.plazas_activas_empezadas = await E.countDocuments({ ...ACTIVA, startDate: { $lte: `${HOY}T23:59:59` } })
		out.cancelaciones_programadas = await E.countDocuments({ 'end.lastLesson': { $gte: HOY }, 'end.reason': 'CANCEL' })
		out.familias_con_plaza_activa = first(await E.aggregate([{ $match: ACTIVA }, { $group: { _id: '$client.id' } }, { $count: 'n' }]).toArray())
		out.semana_datos = await periodo(db, INI, FIN, true)
		out.semana_anterior = await periodo(db, addDays(INI, -7), addDays(FIN, -7), false)
		out.trimestre = await periodo(db, Q_INI, FIN, false)
		out.referidos_semana = await referidos(db, INI, FIN)
		out.referidos_acumulado = await referidos(db, REFERIDOS_DESDE, FIN)
		out.referidos_acumulado.familias_con_codigo_total = await db.collection('v3-referral-codes').countDocuments({})
	})
	if (!SIN_STRIPE) {
		out.stripe_semana = await stripePruebas(INI, FIN)
		out.stripe_semana_anterior = await stripePruebas(addDays(INI, -7), addDays(FIN, -7))
	}
	out.segundos = Math.round((Date.now() - t0) / 1000)
	fs.mkdirSync(path.join(REPO, 'data'), { recursive: true })
	const file = path.join(REPO, 'data', `semana-${out.semana}.json`)
	fs.writeFileSync(file, JSON.stringify(out, null, 2))

	const s = out.semana_datos, a = out.semana_anterior, q = out.trimestre, rs = out.referidos_semana, ra = out.referidos_acumulado
	const d = (n, dias) => (n / dias).toFixed(1)
	const diasQ = Math.round((new Date(FIN) - new Date(Q_INI)) / 86400000) + 1
	console.log(`# Semana ${out.semana} · ${out.semana_rango} · lectura ${HOY} · ${out.segundos} s · ${path.relative(REPO, file)}`)
	console.log(`plazas_activas ${out.plazas_activas} (empezadas ${out.plazas_activas_empezadas}; cancelaciones programadas ${out.cancelaciones_programadas}; familias activas ${out.familias_con_plaza_activa})`)
	console.log(`semana: nuevas ${s.plazas_nuevas} (${d(s.plazas_nuevas, 7)}/día; ant. ${a.plazas_nuevas}) · canceladas netas ${s.plazas_canceladas_netas} (brutas ${s.plazas_canceladas_brutas}; ant. ${a.plazas_canceladas_netas}) · pruebas ${s.pruebas} (ant. ${a.pruebas}) · no presentados ${s.no_presentados.n}/${s.no_presentados.con_resultado} (${s.no_presentados.pct} %)`)
	console.log(`semana: altas ${s.altas_familias} (ant. ${a.altas_familias}) · familias nuevas ${s.familias_nuevas} (ant. ${a.familias_nuevas}) · bajas familias ${s.bajas_familias_aprox} (ant. ${a.bajas_familias_aprox})`)
	console.log(`trimestre ${out.trimestre_rango} (${diasQ} días): nuevas ${q.plazas_nuevas} · canceladas netas ${q.plazas_canceladas_netas} · pruebas ${q.pruebas} · altas ${q.altas_familias} (${d(q.altas_familias, diasQ)}/día) · familias nuevas ${q.familias_nuevas} · bajas ${q.bajas_familias_aprox} · no presentados ${q.no_presentados.pct} %`)
	console.log(`motivos cancelación semana: ${Object.entries(s.motivos_cancelacion).map(([k, v]) => `${k} ${v}`).join(', ')}`)
	console.log(`pruebas por día: ${Object.values(s.pruebas_por_dia).join(' ')} · nuevas por día: ${Object.values(s.plazas_nuevas_por_dia).join(' ')}`)
	console.log(`referidos semana: códigos ${rs.codigos_nuevos} · amigos ${rs.amigos_invitados} ${JSON.stringify(rs.por_estado)} · pruebas ${rs.pruebas_referidas.total} (conv. ${rs.pruebas_referidas.convertidas}) · altas ${rs.altas_referidas.familias} fam./${rs.altas_referidas.plazas} plazas · recompensas ${rs.recompensas_acreditadas}`)
	console.log(`referidos desde ${REFERIDOS_DESDE}: códigos ${ra.familias_con_codigo_total} · amigos ${ra.amigos_invitados} · pruebas ${ra.pruebas_referidas.total} (conv. ${ra.pruebas_referidas.convertidas}) · altas ${ra.altas_referidas.familias} fam./${ra.altas_referidas.plazas} plazas · recompensas ${ra.recompensas_acreditadas}`)
	if (out.stripe_semana) console.log(`stripe pruebas pagadas (hora de Londres): ${out.stripe_semana.sin_dato ? 'sin dato: ' + out.stripe_semana.sin_dato : `${out.stripe_semana.pruebas_pagadas} · origen ${JSON.stringify(out.stripe_semana.por_origen)} · por día ${out.stripe_semana.por_dia.join(' ')} (ant. ${out.stripe_semana_anterior.pruebas_pagadas ?? 'sin dato'})${out.stripe_semana.aviso ? ' · AVISO: ' + out.stripe_semana.aviso : ''}`}`)
}

main().catch((e) => { console.error('ERROR:', String(e.message).replace(/sk_[A-Za-z0-9_]+|rk_[A-Za-z0-9_]+|mongodb(\+srv)?:\/\/\S+/g, '[oculto]')); process.exit(1) })
