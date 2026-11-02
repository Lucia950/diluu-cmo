// Datos del dashboard "Semana CMO Diluu". Los actualiza la rutina registro-semanal cada lunes; se publica junto al HTML como fichero adjunto del artefacto (files).
const D = {
  periodo: "Semana 43 · 19–25 de octubre de 2026 · lectura del lunes 26 oct",
  lede: "Meta mejora por prueba (92 pruebas pagadas en Stripe, £39,1 frente a £42,2) pero gasta un 24 % más y octubre va a ≈ £13.900 frente a £12.500. La fuga más barata es la cesta: 56 checkouts de matrícula caducados frente a 103 pagados en octubre. Octubre cierra en ≈ 275 altas (−45). Plazas 2.913 (+5): ni cumpliendo noviembre y diciembre se llega a 3.000 sin bajar la pérdida.",
  objetivo: { suelo: 3000, deseable: 3100, plazasDB: 2913, plazasDBFecha: "26 oct, contratadas y no finalizadas, con pausadas", plazasPanel: 2881, plazasPanelFecha: "12 oct, sin lectura nueva", diasRestantes: 67, altasQ4: 700, altasMes: 320, mes: "octubre" },
  tiles: [
    { k: "Plazas nuevas 19–25 oct", v: "90", d: "12,9 al día · semana anterior 92 · sep 17,3 al día", cls: "warn" },
    { k: "Plazas canceladas 19–25 oct", v: "49", d: "7,0 al día (netas) · semana anterior 80 (recalculada; se leyó 58) · 33 ya programadas", cls: "good" },
    { k: "Plazas activas", v: "2.913", d: "+5 frente al 19 oct (flujos +41: siguen sin cuadrar) · faltan 87 para el suelo · proyección ≈ 2.980 el 31 dic", cls: "warn" },
    { k: "Pruebas 19–25 oct", v: "128", d: "Semana anterior 94 (+36 %; pico jueves–sábado 79) · pagadas en Stripe 92 (69 la anterior) · no presentados 16,8 % (10,2 %)", cls: "warn" },
    { k: "Altas 19–25 oct (familias con matrícula nueva)", v: "60", d: "1–25 oct: 222 (8,9/día); octubre cierra en ≈ 275 (−45) · 30 familias nuevas · 35 bajas", cls: "critical" },
    { k: "CAC de medios 1–25 oct", v: "£53–88", d: "£53,2 por alta (222) · £88,2 por familia nueva (134) · Meta + Google, base de producción · denominador y umbral sin decidir", cls: "warn" }
  ],
  canales: [
    { n: "Meta Ads", color: "--s1", cls: "warn", clsTxt: "Mantener", inv: 3600, ritmo: 13383, presupuesto: 12500, res: "92 pruebas pagadas (Stripe) · 58 compras píxel (incluye matrículas)", coste: "£39,1 / prueba pagada (−7 %) · £62,1 / compra píxel", ref: "sem. ant.: £2.909 · 69 pruebas · £42,2", nota: "Mejor por prueba, pero gasto +24 % (£460–640/día desde el 19): octubre va a ≈ £13.400–13.900 frente a £12.500. Tres tests con CPA píxel > £80 siguen activos: FR ABO £717 / 7, USA Conversión £493 / 6, USA UGC £183 / 2; pausas aprobadas el 14 oct, se revisan en la rutina diaria. Video1 FR baja al 19,6 % (£47/compra). Nueva FR Compra de prueba £383 / 6. CTR 1,21 %; frecuencia ≤ 1,9." },
    { n: "Google Ads", color: "--s2", cls: "neutral", clsTxt: "Mantener", inv: 264, ritmo: 1272, presupuesto: 1500, res: "6 conversiones (marca 3, keywords EN 2, francés 1)", coste: "£44 / conv.", ref: "sem. ant.: 2 · £135", nota: "14 días (12–25 oct): keywords EN £206 / 4 (£52); francés £124 / 1 (> £90, no sube); genérica £52 / 0 (congelada); EEUU exacta parada desde el 20. Nuevas desde el 23 sin 14 días: PMax ES-EN £33 / 0 (104 clics) y Francés keywords FR £18 / 0." },
    { n: "SEO", color: "--s3", cls: "serious", clsTxt: "Arreglar", inv: 0, ritmo: 0, presupuesto: 0, res: "1.175 clics 19–25 oct · padres 0 clics / 140 impr.", coste: "—", ref: "1–25 oct padres: 1 clic / 723 impr. (sep 1 / 555)", nota: "Orgánico en GA4: 1.555 sesiones (−19 %) y 77 conversiones (−41 %). 24 y 25 oct aún incompletos en Search Console. seo-lunes no corrió el domingo: sin bloque de Bárbara." },
    { n: "Email (Brevo)", color: "--s4", cls: "warn", clsTxt: "Cambiar de función", inv: 0, ritmo: 0, presupuesto: 0, res: "GA4: 27 sesiones · 15 conv.", coste: "—", ref: "sem. ant.: 53 / 27", nota: "Ninguna campaña clásica nueva en la API (la última, 30 sep). El email de referidos del 15 oct (A/B) no aparece en la API: lectura en la web el 29 oct. Ciclo de vida antes del 15 nov (Lucia con Claude; Marta escribe)." },
    { n: "Referidos", color: "--s5", cls: "serious", clsTxt: "Arreglar", inv: 0, ritmo: 0, presupuesto: 0, res: "Semana: 70 códigos nuevos · 0 amigos invitados · 0 pruebas · 0 altas", coste: "30 $ de crédito por alta", ref: "23 sep–25 oct: 2 altas de 25 · 480 códigos · 4 amigos · 6 pruebas", nota: "El email del 15 oct no ha movido las invitaciones (0 en la semana). WhatsApp personal a 150 embajadoras hoy 26 oct; lectura del A/B el 29." },
    { n: "Social orgánico e IA", color: "--s6", cls: "neutral", clsTxt: "Mantener", inv: 0, ritmo: 0, presupuesto: 0, res: "GA4: 39 sesiones · 24 conv. · IA 49 / 22", coste: "—", ref: "IA 1–25 oct: 114 / 36 (sep 135 / 44)", nota: "IA sigue creciendo: 49 sesiones y 22 conversiones en la semana (26 / 11 la anterior). Línea base de 10 preguntas el 30–31 oct (Bárbara)." }
  ],
  semanas: ["14 sep", "21 sep", "28 sep", "5 oct", "12 oct", "19 oct"],
  metaCost: [3356, 3113, 2812, 2701, 2909, 3600],
  metaPur: [67, 54, 65, 55, 50, 58],
  googCost: [332, 395, 246, 386, 269, 264],
  googConv: [7, 7, 10, 6, 2, 6],
  ga4: { cap: "19–25 de octubre. Las conversiones de GA4 son reservas y compras según la web; no son altas. Referral 115 sesiones el lunes 19 (pico puntual).", rows: [["Paid Social", 431], ["Direct", 109], ["Organic Search", 77], ["Paid Search", 50], ["Organic Social", 24], ["AI Assistant", 22], ["Email", 15], ["Referral", 12], ["Unassigned", 4]] },
  foco: [
    "<b>Cesta de matrícula:</b> en octubre, 56 checkouts caducados frente a 103 completados en la landing (Stripe): una de cada tres familias que empieza a pagar no termina. El WhatsApp a la familia a las 2 h está activo desde el fin de semana del 24–25 oct; la tarea de Kommo a las 24 h, sin confirmar. Se lee con las cestas abiertas desde el 26 oct (hoy 65 % pagadas, objetivo 80 %). Recuperar una de cada cuatro son ≈ 14 matrículas al mes.",
    "<b>Meta:</b> mejor por prueba (£39,1 con 92 pruebas pagadas, frente a £42,2) pero por encima del presupuesto: £3.600 en la semana (+24 %) y octubre a ≈ £13.900 frente a £12.500. Decidir si vuelve a ≈ £400/día hasta el 31. Las pausas de los tres tests con CPA píxel > £80 (£1.393) ya están aprobadas desde el 14 oct: la rutina diaria debe decir por qué siguen activos.",
    "<b>Octubre no llega:</b> 222 altas el día 25, ≈ 275 al cierre (−45; noviembre tendría que ir a ≥ 285). No presentados 16,8 % (10,2 %). Foco en prueba → curso: cadencia 0/3/10 sobre las 79 pruebas de jueves a sábado y la confirmación 48 h (vencida el 24 oct).",
    "<b>Decisiones vencidas:</b> denominador y umbral del CAC (por alta £53,2 o por familia nueva £88,2 en el mes), confirmación 48 h (24 oct), encargo al developer (24 oct), política de pausa larga (20 oct) y oferta de Black Friday (análisis del 22 oct: oferta 1). Esta semana: embajadoras hoy, landing con garantía (28 oct; sale el 3 nov), 6–8 creativos de Meta (31 oct).",
    "<b>Referidos y plazas:</b> 0 invitaciones en la semana (2 altas de 25; WhatsApp a embajadoras hoy). Plazas 2.913 (+5): con 240 y 140 altas en noviembre y diciembre la proyección da ≈ 2.980; el suelo depende de bajar la pérdida."
  ],
  martaSub: "Fechas de la página Q4 2026 de Notion (sección 8, Black Friday) y de docs/equipo/marta-plan-entregas.md; su tablero no se consulta. Marta ve solo su fecha; el límite real es el margen de Lucia. Estado: lo confirma Lucia. Del plan de BF consta una versión con tres ofertas leída el 22 oct.",
  marta: [
    ["Plan de Black Friday en una página", "Black Friday", "24 oct", "31 oct", "5 días", "Consta (22 oct), sin confirmar"],
    ["Informe \"qué vende y qué no\"", "Creatividades", "28 oct", "31 oct", "3 días", "Esta semana"],
    ["Brief de vídeos BF y textos de la landing", "Black Friday", "31 oct", "5 nov", "3 días", "Esta semana"],
    ["5 emails de BF en Brevo", "Black Friday", "5 nov", "10 nov", "3 días", "Próxima"],
    ["Todo montado y probado", "Black Friday", "10 nov", "14 nov", "4 días", "Más adelante"]
  ],
  barbara: [
    "<b>Sin dato:</b> seo-lunes no corrió el domingo 25 (no existe docs/registros/seo-semanal.md), así que no hay bloque \"Para el registro del lunes\".",
    "<b>Search Console 19–25 oct:</b> búsquedas de padres 0 clics / 140 impresiones; 1–25 oct 1 / 723. Orgánico en GA4 −19 % en sesiones y −41 % en conversiones.",
    "<b>Próximo:</b> línea base de IA el 30–31 oct; artículo 2 (apps) el 6 nov."
  ],
  avisos: [
    "Stripe: el script no tiene STRIPE_API_KEY; las 92 pruebas pagadas, las 189 suscripciones del mes y los checkouts (103 / 56) son cifras de Lucia del proyecto de Meta (26 oct). El CAC semanal no es una vara: compara el gasto de hoy con matrículas de pruebas de 1–3 semanas antes.",
    "\"Plazas activas empezadas\" del script (1.664 frente a 2.725) no es creíble y no se usa: probable fallo de comparación de fechas en scripts/semana-datos.cjs.",
    "Stock y flujos de plazas no cuadran (+5 frente a +41) y la semana 42 se ha recalculado al alza: canceladas 58 → 80, bajas 39 → 54. El objetivo se sigue con el stock de cada lunes.",
    "Search Console: 24 y 25 oct incompletos. Búsquedas de padres con la regla del panel SEO. Meta: el píxel cuenta matrículas como compras desde agosto; esta semana no hubo cribados, así que el CTR del núcleo es el de la cuenta.",
    "CAC de medios con familias nuevas de la base de producción; el umbral £60/£79 con la base está propuesto desde el 12 oct y sin decidir.",
    "Brevo: la API lista campañas clásicas; A/B y automatizaciones no aparecen. Notion: copia de la página Q4 2026 con última edición el 19 oct."
  ],
  // Bloque mensual: lo escribe la revisión mensual (día 1); la rutina de los lunes lo conserva tal cual.
  mes: {
    titulo: "Cierre de octubre de 2026",
    lede: "261 altas (objetivo 320) y 171 familias nuevas con 355 pruebas pagadas: el embudo se rompe entre la prueba y la matrícula. Paid £14.821 (+5,9 %), CAC de medios £86,7 por familia nueva (sep £72,9), LTV:CAC 2,3:1 a 12 meses. Plazas 2.973 el 2 nov (+91 en el mes). Quedan 439 altas en 59 días.",
    tiles: [
      ["Altas", "261", "objetivo 320 · sep 310 · 171 familias nuevas (sep 223)"],
      ["Plazas activas", "2.973", "2 nov · +91 en el mes · 449 nuevas · 236 canceladas netas (se recontarán)"],
      ["Paid", "£14.821", "Meta £13.567 (+8,5 %) · Google £1.254 · presupuesto £14.000"],
      ["CAC de medios", "£86,7", "por familia nueva · £56,8 por alta · plan ≤ £60"],
      ["Pruebas pagadas", "355", "£38,2 de Meta por prueba · conversión 30 d cohorte sep 45,5 %"],
      ["LTV:CAC 12 m", "2,3:1", "proyectado 4,7–5,3:1 · payback 3,1 meses · 11 oct: 2,9:1"]
    ],
    canales: [
      ["Meta Ads", "Mantener (a la baja)", "£13.567 · 253 compras píxel · 355 pruebas pagadas · £38,2 / prueba", "Nov £7.500: fuera UGC ES, FR ABO a la mitad, Video1 ≤ 30 %"],
      ["Google Ads", "Mantener", "£1.254 · 22 conv. · £57", "£1.500; EEUU exacta cortada; PMax y FR keywords se leen el 6 nov"],
      ["SEO", "Arreglar", "104 clics de padres (obj. 110 dic) · 0 enlaces de medios", "Comparativa FR 3 nov, A2 6 nov, A3 20 nov"],
      ["IA", "Mantener", "164 sesiones / 69 eventos · Diluu en 10 de 36 respuestas", "Página de 10 datos 27 nov"],
      ["Email", "Cambiar de función", "GA4 216 / 95 · Brevo sin dato", "Email 1 prueba sin pago 15 nov"],
      ["Referidos", "Arreglar", "2 altas de 25 · 549 códigos · 6 invitaciones", "Lectura 16 nov"]
    ],
    decisiones: [
      "<b>5 nov · CAC:</b> denominador y umbrales del guardrail de Meta (propuesta: familia nueva de la base; subir si < £80, bajar si > £100). Octubre £86,7 → Meta se queda en £7.500.",
      "<b>5 nov · Black Friday y pausa larga:</b> oferta de BF para familias nuevas (vencida desde el 22 oct) y política de pausa larga (vencida desde el 20 oct).",
      "<b>7 nov · FLAM y precios:</b> respuesta a FLAM Monde sobre /fr/cours-flam-en-ligne y si el schema Course sigue a la API (10,25 $ desde el 1 nov) o se fija en 10 $."
    ],
    enlace: "docs/registros/revision-mensual-2026-10.md"
  },
  fuentes: "Fuentes: base de producción de Diluu (26 oct 2026, 09:38 Bali, scripts/semana-datos.cjs); Supermetrics: Meta Ads (act_2456974117647730 y act_911299640142242), Google Ads (4584208097), GA4 (425989233), Search Console (diluu.com), 1–25 oct 2026; Brevo (API); Notion, página Q4 2026; docs/equipo/marta-plan-entregas.md; Stripe (cifras de Lucia, proyecto de Meta, 26 oct). Lo escribe la rutina registro-semanal cada lunes."
};
