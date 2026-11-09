// Datos del dashboard "Semana CMO Diluu". Los actualiza la rutina registro-semanal cada lunes; se publica junto al HTML como fichero adjunto del artefacto (files).
const D = {
  periodo: "Semana 45 · 2–8 nov de 2026 · lectura del lunes 9 nov (18:05 Bali)",
  lede: "Plazas 3.017: el suelo de 3.000 se cruza por primera vez (+37). Meta compra pruebas al mejor coste del trimestre (108 pagadas en Stripe, £32,6) con CAC Stripe £57,5 (en banda, mantener), pero gasta £504/día frente a los £450 decididos (ritmo £15.410 / £13.500): decisión de presupuesto, no de rendimiento. Altas 56 (45 familias nuevas, conversión 53 %); noviembre va a ≈ 221 (−19). Canceladas 50 (+56 %) y bajas 37 (+48 %).",
  objetivo: { suelo: 3000, deseable: 3100, plazasDB: 3017, plazasDBFecha: "9 nov, contratadas y no finalizadas, con pausadas", plazasPanel: 2881, plazasPanelFecha: "12 oct, sin lectura nueva", diasRestantes: 53, altasQ4: 700, altasMes: 240, mes: "noviembre" },
  tiles: [
    { k: "Plazas nuevas 2–8 nov", v: "94", d: "13,4 al día · semana anterior 82 (recalculada) · oct 14,5 al día", cls: "good" },
    { k: "Plazas canceladas 2–8 nov", v: "50", d: "7,1 al día (netas) · semana anterior 32 (recalculada; se escribió 28) · +56 %, releído · 59 ya programadas", cls: "critical" },
    { k: "Plazas activas", v: "3.017", d: "+37 frente al 2 nov (flujos +44) · suelo 3.000 superado · faltan 83 para 3.100 · proyección 31 dic ≈ 3.050–3.120", cls: "good" },
    { k: "Pruebas 2–8 nov", v: "154", d: "Semana anterior 122 (+26 %, releído) · pagadas en Stripe 108 (85) · no presentados 14,4 % (15,5 %) · domingo 8: 35, récord", cls: "good" },
    { k: "Altas 2–8 nov (familias con matrícula nueva)", v: "56", d: "45 familias nuevas (43) y 11 añadidos/vueltas (7; oct ≈ 20) · conversión prueba→familia 53 % · nov 1–8: 59 → ≈ 221 al cierre (−19) · 37 bajas (25)", cls: "warn" },
    { k: "CAC de medios 1–8 nov (guardrail Stripe)", v: "£57,5", d: "£4.310 / 75 suscripciones nuevas vivas → mantener (banda £50–65; lectura que decide: 15 nov) · contraste base: £86,2 por familia nueva y £59,8 por alta en el trimestre", cls: "neutral" }
  ],
  canales: [
    { n: "Meta Ads", color: "--s1", cls: "warn", clsTxt: "Mantener (£15.400 aceptado el 9 nov)", inv: 3526, ritmo: 15410, presupuesto: 15400, res: "108 pruebas pagadas (Stripe) · 75 compras píxel (incluye matrículas)", coste: "£32,6 / prueba pagada (−17 %) · £47,0 / compra píxel", ref: "sem. ant.: £3.355 · 85 pruebas · £39,5", nota: "Ritmo = 1–8 nov (£4.109) a 30 días. El 9 nov Lucia acepta ≈ £15.400 (el 4 nov eran £13.500); £2.000 de BF aparte; la semana fue a £504/día. CAC Stripe 1–8 nov £57,5: en banda, mantener; freno semanal £46 por prueba, lejos. Ningún test > £80: FR ABO £394 / 12 (£33, era £90), FR Compra de prueba £709 / 13 (£54, era £87), USA Prospecting £1.140 / 15 (£76), USA TEST Conversión £481 / 12 (£40), FR AU+CA £353 / 5 (£71, encendida), ES Europa+AU £264 / 9 (£29), Video1 3,0 %, Retargeting landing £80 / 0 (nueva). CTR 1,20 %; frecuencia ≤ 2,0; CPM £13,8–15,8." },
    { n: "Google Ads", color: "--s2", cls: "neutral", clsTxt: "Mantener · PMax: propuesta de corte", inv: 175, ritmo: 752, presupuesto: 1500, res: "4 conversiones (marca 2; PMax 1; keywords FR 1)", coste: "£44 / conv.", ref: "sem. ant.: £252 · 3 · £84", nota: "Lectura del 6 nov con 17 días (23 oct–8 nov): PMax £186 / 1,3 conv. (£143) → propuesta: cortar y pasar sus £10/día a Francés keywords FR (£53 / 1). Francés idioma inglés 14 d (26 oct–8 nov): £127 / 0 → no sube. Google gasta la mitad del presupuesto (ritmo £752). EEUU exacta cortada; genérica congelada (£7)." },
    { n: "SEO", color: "--s3", cls: "serious", clsTxt: "Arreglar", inv: 0, ritmo: 0, presupuesto: 0, res: "Clics de padres: 38 en la semana (21 la anterior, releída) · 1.246 clics totales", coste: "—", ref: "1–8 nov: 40 clics de padres · octubre 104 (objetivo 110 en diciembre)", nota: "Métrica por página, menos marca (80 − 42). Orgánico en GA4: 1.456 sesiones y 81 conversiones (1.429 / 74). Search Console reconectado en Supermetrics el 9 nov. seo-lunes del 9 nov interrumpido; pasa a la nube desde el 15 nov." },
    { n: "Email (Brevo)", color: "--s4", cls: "warn", clsTxt: "Cambiar de función", inv: 0, ritmo: 0, presupuesto: 0, res: "GA4: 22 sesiones · 3 conv.", coste: "—", ref: "sem. ant.: 55 / 15", nota: "Brevo (conector): última campaña clásica el 30 sep (RTG26); nada nuevo en la API (A/B y automatizaciones no salen). Emails de BF de Marta: fecha 5 nov, límite real 10 nov, sin confirmar. Email de pausa de Navidad el 15 nov; «hizo la prueba y no pagó» 12 nov (límite 15)." },
    { n: "Referidos", color: "--s5", cls: "serious", clsTxt: "Arreglar", inv: 0, ritmo: 0, presupuesto: 0, res: "Semana: 66 códigos nuevos · 0 amigos invitados · 0 pruebas · 1 alta (1 plaza)", coste: "30 $ de crédito por alta", ref: "23 sep–8 nov: 3 altas de 25 · 616 códigos · 7 amigos · 11 pruebas (4 convertidas)", nota: "Las 3 invitaciones de la semana 44 no han traído más; el alta de la semana viene de una prueba anterior. Lectura 16 nov." },
    { n: "Social orgánico e IA", color: "--s6", cls: "neutral", clsTxt: "Mantener", inv: 0, ritmo: 0, presupuesto: 0, res: "Social GA4: 52 sesiones · 28 conv. · IA 58 / 17", coste: "—", ref: "IA sem. ant.: 57 / 33 · octubre 164 / 69", nota: "IA baja de 33 a 17 conversiones con las mismas sesiones; objetivo 220 sesiones al mes en diciembre y Diluu en 14 de 36 respuestas. Página «Diluu en 10 datos» el 27 nov." }
  ],
  semanas: ["28 sep", "5 oct", "12 oct", "19 oct", "26 oct", "2 nov"],
  metaCost: [2812, 2701, 2909, 3600, 3355, 3526],
  metaPur: [65, 55, 50, 58, 68, 75],
  googCost: [246, 386, 269, 264, 252, 175],
  googConv: [10, 6, 2, 6, 3, 4],
  ga4: { cap: "2 a 8 de noviembre. Las conversiones de GA4 son reservas y compras según la web; no son altas. Unassigned 66 sesiones el domingo 8 (pico puntual).", rows: [["Paid Social", 647], ["Direct", 95], ["Organic Search", 81], ["Paid Search", 52], ["Organic Social", 28], ["Unassigned", 26], ["Referral", 23], ["AI Assistant", 17], ["Email", 3]] },
  foco: [
    "<b>Meta: Lucia acepta ≈ £15.400 en noviembre (9 nov, 18:30 Bali)</b> en vez de volver a £450/día: coste por prueba £32,6 (108 pruebas, el mejor del trimestre) y CAC Stripe 1–8 nov £57,5 (en banda). Los £2.000 de BF siguen aparte (noviembre ≈ £18.900 con Google). Frenos: > £46 por prueba dos semanas o CAC 1–15 nov > £65 → −15 %; lectura el 15 nov.",
    "<b>Noviembre va a ≈ 221 altas (−19):</b> 59 del 1 al 8 (7,4/día) frente a 8,2/día necesarias. La captación cumple (45 familias nuevas, 53 % de las 85 pruebas de la semana anterior; 154 pruebas esta semana, que son las altas de la próxima); el hueco sigue en añadidos y vueltas (11 frente a ≈ 20/semana en octubre). Y suben las bajas: 37 familias (25) y 50 plazas (32).",
    "<b>Black Friday a 15 días:</b> 5 emails de BF (Marta 5 nov; límite real mañana 10 nov), todo montado y probado + emails de pausa y trimestral (10 nov; límite 14), email «hizo la prueba y no pagó» (12; límite 15), T1 montado 13 nov, todo probado 14 nov (fecha fija). Estado sin confirmar: si el 10 no están los emails, Lucia los hace con Claude en el margen.",
    "<b>Google, lectura del 6 nov:</b> PMax £186 / 1,3 conv. en 17 días (£143) → propuesta de cortar y mover a Francés keywords FR; francés idioma inglés £127 / 0 en 14 días no sube. Google gasta la mitad del presupuesto (£752).",
    "<b>Lo que más cambió:</b> plazas 3.017 (+37), por encima del suelo; pruebas 154 y 108 pagadas (+26/27 %); canceladas 50 (+56 %) y bajas 37 (+48 %); clics de padres 38 (+81 %); referidos 1 alta (3 de 25); conversiones de IA 17 (33)."
  ],
  martaSub: "Fechas de docs/equipo/marta-plan-entregas.md y de la copia del plan Q4 (Notion devolvió 404); su tablero no se consulta. Marta ve solo su fecha; el límite real es el margen de Lucia. Estado: lo confirma Lucia.",
  marta: [
    ["5 emails de BF en Brevo", "Black Friday", "5 nov", "10 nov", "3 días", "Sin confirmar · límite mañana"],
    ["Todo montado y probado", "Black Friday", "10 nov", "14 nov", "4 días", "Esta semana"],
    ["Emails de pausa navideña y trimestral", "Emails", "10 nov", "14 nov", "4 días", "Esta semana"],
    ["Email 1: hizo la prueba y no pagó", "Emails", "12 nov", "15 nov", "3 días", "Esta semana"],
    ["Emails de tarjeta regalo y referidos de Navidad", "Emails", "27 nov", "30 nov", "3 días", "En 3 semanas"],
    ["Brief de la campaña de enero", "Campaña de enero", "28 nov", "1 dic", "3 días", "En 3 semanas"]
  ],
  barbara: [
    "<b>seo-lunes del 9 nov interrumpido</b> (pasa a la nube desde el 15 nov); último bloque de seo-semanal.md (semana 44): 17 pasos marcados (8 la anterior); A1 indexado; A2 publicado el 29 oct sin el «listo» (84/100, 5 cambios menores); comparativa de francés el 3 nov; IA 10 de 36 respuestas (Gemini 0).",
    "<b>Enlaces:</b> 3 fichas de 10 y 0 enlaces de medios de 3; El Ibérico pidió propuesta (Bárbara la envía hoy 9 nov). Preguntas a Bárbara desde hoy por la herramienta («Preguntas para ti», 12 el 9 nov).",
    "<b>Search Console 2–8 nov:</b> 38 clics de padres (21 la anterior); 40 del 1 al 8 nov (objetivo 110 en diciembre). IA en GA4: 58 sesiones / 17 conv. A3 el 20 nov; comparativa de español el 7 dic."
  ],
  avisos: [
    "Stripe por el conector (vía oficial): 108 pruebas pagadas de 671 cargos del 2 al 8 nov (7 páginas, jq sobre los ficheros; origen: Meta 75, Google 4, sin utm 33) y 75 suscripciones nuevas vivas del 1 al 8 nov (2 páginas). El CAC semanal de la base no es vara: compara el gasto de hoy con matrículas de pruebas de 1–3 semanas antes.",
    "Cifras con cambio > 25 % releídas: canceladas 50 y pruebas 154 (segunda ejecución del script, idénticas), Google £175 (nueva consulta), clics de padres 38 (semana 44 reconstruida: 21). La semana anterior se recalcula al releer la base (nuevas 84 → 82, canceladas 28 → 32, altas 50 → 49).",
    "Notion: la página Q4 2026 devuelve 404 a la integración por tercera semana; fechas de la copia del 14 oct y de decisiones.md. Brevo: el conector responde (el primer intento caducó); solo lista campañas clásicas.",
    "Cesta abandonada: n8n devuelve 0 ejecuciones de «Cestas › 2 h sin pagar» en el rango; la parte del WhatsApp queda sin dato. Base: 40 familias, 87,5 % pagan, 3 de 8 recuperadas tarde (base 64,1 %); con 8 familias no se concluye nada (lectura ≈ 1 dic).",
    "Rutina ejecutada a las 18:05 Bali en vez de las 08:30: las dos primeras ejecuciones se pararon en el permiso del script de la base. Supermetrics devuelve cost sin moneda (GBP). El píxel cuenta matrículas como compras desde agosto."
  ],
  // Bloque mensual: lo escribe la revisión mensual (día 1); la rutina de los lunes lo conserva tal cual.
  mes: {
    titulo: "Cierre de octubre de 2026",
    lede: "261 altas (objetivo 320) y 171 familias nuevas con 348 pruebas pagadas: el embudo se rompe entre la prueba y la matrícula. Paid £14.821 (+5,9 %), CAC de medios £86,7 por familia nueva de la base (£62 por suscripción nueva de Stripe), LTV:CAC 2,6:1 a 12 meses. Stripe: MRR £120,5k, 239 suscripciones nuevas, cestas pagadas 78 %. Plazas 2.973 el 2 nov (+91). Quedan 439 altas en 59 días.",
    tiles: [
      ["Altas", "261", "objetivo 320 · sep 310 · 171 familias nuevas (sep 223)"],
      ["Plazas activas", "2.973", "2 nov · +91 en el mes · 449 nuevas · 236 canceladas netas (se recontarán)"],
      ["Paid", "£14.821", "Meta £13.567 (+8,5 %) · Google £1.254 · presupuesto £14.000"],
      ["CAC de medios (guardrail: Stripe)", "£62,0", "por suscripción nueva viva de Stripe (239) → mantener · £86,7 por familia nueva de la base (contraste) · £56,8 por alta"],
      ["Pruebas pagadas", "348", "Stripe, cargos · £39,0 de Meta por prueba · Meta 52 %, orgánico 29 % · conversión 30 d cohorte sep 45,5 %"],
      ["LTV:CAC 12 m", "2,6:1", "ARPU £68,4 (MRR £120,5k / 1.763) · proyectado 5,1–5,8:1 · payback 2,8 meses · con base Stripe 3,4:1"]
    ],
    canales: [
      ["Meta Ads", "Mantener", "£13.567 · 253 compras píxel · 348 pruebas pagadas · £39,0 / prueba · CAC Stripe £62", "Nov £13.500 (decidido el 4 nov) + BF £2.000: fuera UGC ES, FR ABO a la mitad, Video1 ≤ 30 %"],
      ["Google Ads", "Mantener", "£1.254 · 22 conv. · £57", "£1.500; EEUU exacta cortada; PMax y FR keywords se leen el 6 nov"],
      ["SEO", "Arreglar", "104 clics de padres (obj. 110 dic) · 0 enlaces de medios", "Comparativa FR 3 nov, A2 6 nov, A3 20 nov"],
      ["IA", "Mantener", "164 sesiones / 69 eventos · Diluu en 10 de 36 respuestas", "Página de 10 datos 27 nov"],
      ["Email", "Cambiar de función", "GA4 216 / 95 · Brevo sin dato", "Email 1 prueba sin pago 15 nov"],
      ["Referidos", "Arreglar", "2 altas de 25 · 549 códigos · 6 invitaciones", "Lectura 16 nov"]
    ],
    decisiones: [
      "<b>CAC, decidido el 2 nov:</b> la base del guardrail es Stripe (suscripciones nuevas vivas del mes) con los umbrales del plan (< £50 subir, > £65 bajar). Octubre £62,0 → mantener; la base de producción (£86,7) queda como contraste. Noviembre decidido el 4 nov: Meta £13.500 + BF £2.000 + Google £1.500 = £17.000 (el plan decía £9.000).",
      "<b>5 nov · Black Friday y pausa larga:</b> oferta de BF para familias nuevas (vencida desde el 22 oct) y política de pausa larga (vencida desde el 20 oct).",
      "<b>7 nov · FLAM y precios:</b> respuesta a FLAM Monde sobre /fr/cours-flam-en-ligne y si el schema Course sigue a la API (10,25 $ desde el 1 nov) o se fija en 10 $."
    ],
    enlace: "docs/registros/revision-mensual-2026-10.md"
  },
  fuentes: "Fuentes: base de producción de Diluu (9 nov 2026, 18:05 Bali, scripts/semana-datos.cjs y scripts/cestas.cjs); Supermetrics: Meta Ads (act_2456974117647730 y act_911299640142242), Google Ads (4584208097), GA4 (425989233), Search Console (diluu.com), 1–8 nov 2026; Stripe por el conector (cargos 2–8 nov y suscripciones 1–8 nov, hora de Londres); Brevo (conector); docs/planes/q4-seguimiento-objetivos-fechas-2026-10-14.md (Notion en 404); docs/equipo/marta-plan-entregas.md. Lo escribe la rutina registro-semanal cada lunes."
};
