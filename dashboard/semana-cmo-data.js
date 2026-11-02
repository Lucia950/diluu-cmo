// Datos del dashboard "Semana CMO Diluu". Los actualiza la rutina registro-semanal cada lunes; se publica junto al HTML como fichero adjunto del artefacto (files).
const D = {
  periodo: "Semana 44 · 26 oct–1 nov de 2026 · lectura del lunes 2 nov",
  lede: "Meta tiene que bajar hoy a ≈ £250/día: la semana gastó £479/día y el 1 nov £582, con un plan de £7.500 para noviembre. Por prueba sigue bien (85 pruebas pagadas en Stripe, £39,5). Noviembre arranca a 7,1 altas/día frente a 8,0 necesarias (≈ 214 al cierre). Plazas 2.980 (+67): a 20 del suelo, con las cancelaciones en su semana más baja del trimestre.",
  objetivo: { suelo: 3000, deseable: 3100, plazasDB: 2980, plazasDBFecha: "2 nov, contratadas y no finalizadas, con pausadas", plazasPanel: 2881, plazasPanelFecha: "12 oct, sin lectura nueva", diasRestantes: 60, altasQ4: 700, altasMes: 240, mes: "noviembre" },
  tiles: [
    { k: "Plazas nuevas 26 oct–1 nov", v: "84", d: "12,0 al día · semana anterior 90 · oct 14,5 al día", cls: "warn" },
    { k: "Plazas canceladas 26 oct–1 nov", v: "28", d: "4,0 al día (netas) · semana anterior 44 (recalculada; se leyó 49) · 39 ya programadas", cls: "good" },
    { k: "Plazas activas", v: "2.980", d: "+67 frente al 26 oct (flujos +56: casi cuadra) · faltan 20 para el suelo · proyección 31 dic ≈ 2.970–3.030", cls: "warn" },
    { k: "Pruebas 26 oct–1 nov", v: "122", d: "Semana anterior 128 · pagadas en Stripe 85 (92 la anterior) · no presentados 15,5 % (16,8 %)", cls: "neutral" },
    { k: "Altas 26 oct–1 nov (familias con matrícula nueva)", v: "50", d: "7,1/día frente a 8,0 necesarias en noviembre (≈ 214 al cierre, −26) · 43 familias nuevas (30) · 22 bajas", cls: "critical" },
    { k: "CAC de medios 1 oct–1 nov", v: "£58–87", d: "£57,8 por alta (267) · £87,2 por familia nueva (177) · Meta + Google, base de producción · umbral se decide el 5 nov", cls: "warn" }
  ],
  canales: [
    { n: "Meta Ads", color: "--s1", cls: "serious", clsTxt: "Mantener (a la baja)", inv: 3355, ritmo: 13567, presupuesto: 12500, res: "85 pruebas pagadas (Stripe) · 68 compras píxel (incluye matrículas)", coste: "£39,5 / prueba pagada (+1 %) · £49,3 / compra píxel", ref: "sem. ant.: £3.601 · 92 pruebas · £39,1", nota: "Ritmo = octubre cerrado (£13.567). Noviembre: £7.500 = £250/día y el 1 nov gastó £582 (media de la semana £479): bajar hoy. Tests > £80: FR ABO £542 / 6 (£90; −24 %, no a la mitad) y FR Compra de prueba £698 / 8 (£87, lectura 16 nov); pausas aprobadas el 14 oct. UGC ES casi parada (£5). Video1 FR 10,6 % (£16/compra). USA Prospecting £1.034 / 18 (£57). CTR 1,19 %; frecuencia ≤ 2,2." },
    { n: "Google Ads", color: "--s2", cls: "neutral", clsTxt: "Mantener", inv: 252, ritmo: 1254, presupuesto: 1500, res: "3,0 conversiones (marca 2,7; PMax 0,3)", coste: "£84 / conv.", ref: "sem. ant.: £264 · 6 · £44", nota: "Ritmo = octubre cerrado. 14 días (19 oct–1 nov): francés idioma inglés £162 / 1 (> £90, no sube); keywords EN £138 / 2 (£69). Desde el 23 oct: PMax £102 / 0,26 (fuera si > £120 sin conversión, hacia el 3–4 nov) y Francés keywords FR £40 / 0; lectura el 6 nov. EEUU exacta cortada; genérica congelada." },
    { n: "SEO", color: "--s3", cls: "serious", clsTxt: "Arreglar", inv: 0, ritmo: 0, presupuesto: 0, res: "Clics de padres: 21 en la semana (20 la anterior) · 1.071 clics totales", coste: "—", ref: "Octubre: 104 clics de padres (objetivo 110 en diciembre)", nota: "Métrica nueva (por página, menos marca). Orgánico en GA4: 1.429 sesiones y 74 conversiones (1.555 / 77). 31 oct y 1 nov incompletos. seo-lunes no corrió el domingo 1 nov." },
    { n: "Email (Brevo)", color: "--s4", cls: "warn", clsTxt: "Cambiar de función", inv: 0, ritmo: 0, presupuesto: 0, res: "GA4: 55 sesiones · 15 conv.", coste: "—", ref: "sem. ant.: 27 / 15", nota: "Brevo sin dato: no hay conector en la sesión programada. Email 1 (hizo la prueba y no pagó) el 15 nov; emails de BF de Marta el 5 nov (límite 10)." },
    { n: "Referidos", color: "--s5", cls: "serious", clsTxt: "Arreglar", inv: 0, ritmo: 0, presupuesto: 0, res: "Semana: 68 códigos nuevos · 3 amigos invitados · 5 pruebas · 0 altas", coste: "30 $ de crédito por alta", ref: "23 sep–1 nov: 2 altas de 25 · 549 códigos · 7 amigos · 11 pruebas", nota: "Primeras invitaciones desde el email del 15 oct (0 la semana anterior), tras el WhatsApp a embajadoras del 26 oct. Lectura 16 nov." },
    { n: "Social orgánico e IA", color: "--s6", cls: "neutral", clsTxt: "Mantener", inv: 0, ritmo: 0, presupuesto: 0, res: "Social GA4: 36 sesiones · 23 conv. · IA 57 / 33", coste: "—", ref: "IA sem. ant.: 49 / 22 · octubre 164 / 69", nota: "IA: la semana con más conversiones del trimestre (33). Pasa a MANTENER en la revisión de hoy; página «Diluu en 10 datos» el 27 nov." }
  ],
  semanas: ["21 sep", "28 sep", "5 oct", "12 oct", "19 oct", "26 oct"],
  metaCost: [3113, 2812, 2701, 2909, 3600, 3355],
  metaPur: [54, 65, 55, 50, 58, 68],
  googCost: [395, 246, 386, 269, 264, 252],
  googConv: [7, 10, 6, 2, 6, 3],
  ga4: { cap: "26 de octubre a 1 de noviembre. Las conversiones de GA4 son reservas y compras según la web; no son altas. Unassigned 49 sesiones el domingo 1 (pico puntual).", rows: [["Paid Social", 497], ["Direct", 105], ["Organic Search", 74], ["Paid Search", 34], ["AI Assistant", 33], ["Organic Social", 23], ["Email", 15], ["Unassigned", 12], ["Referral", 11]] },
  foco: [
    "<b>Meta, a ≈ £250/día desde hoy:</b> la semana gastó £3.355 (£479/día) y el 1 nov £582; el plan de noviembre es £7.500. Recortes ya decididos: UGC ES fuera (ya a £5), FR ABO a la mitad o fuera (£542 / 6, £90), Video1 ≤ 30 %; la pausa de tests > £80 está aprobada desde el 14 oct. Lo aplica el proyecto de Meta.",
    "<b>Noviembre por debajo del ritmo:</b> 50 altas (7,1/día) frente a 8,0/día necesarias (≈ 214 al cierre, −26). El cuello es prueba → curso: 85 pruebas pagadas y 43 familias nuevas (47 %). Cadencia 0/3/10 sobre las 49 pruebas de jueves a domingo y primera lectura de la cesta abandonada con el WhatsApp de 2 h (65 % → 80 %).",
    "<b>Decisiones del 5 y 7 nov:</b> denominador y umbrales del CAC; oferta de BF para familias nuevas y política de pausa larga (vencidas desde el 22 y el 20 oct; de ellas dependen los emails de BF del 5 nov y la pausa del 15 nov); FLAM y schema el 7 nov. La landing de curso directo salía el 3 nov y sigue sin responsable.",
    "<b>Marta:</b> brief de vídeos de BF y textos de la landing con margen hasta el jueves 5 nov; plan de BF e informe «qué vende y qué no» pasaron su límite real (31 oct) sin confirmar. Si no han llegado, los cierra Lucia esta semana: Daniela y Morgane necesitan el brief para los vídeos del 14 nov.",
    "<b>Lo que más cambió:</b> canceladas −36 % (28 frente a 44) y plazas +67 hasta 2.980, a 20 del suelo; IA con su récord de conversiones (33); referidos se mueven por primera vez (3 invitaciones, 5 pruebas) tras el WhatsApp a embajadoras."
  ],
  martaSub: "Fechas de docs/equipo/marta-plan-entregas.md y de la copia del plan Q4 (Notion devolvió 404); su tablero no se consulta. Marta ve solo su fecha; el límite real es el margen de Lucia. Estado: lo confirma Lucia.",
  marta: [
    ["Plan de Black Friday en una página", "Black Friday", "24 oct", "31 oct", "5 días", "Consta (22 oct), sin confirmar; límite pasado"],
    ["Informe \"qué vende y qué no\"", "Creatividades", "28 oct", "31 oct", "3 días", "Sin confirmar; límite pasado"],
    ["Brief de vídeos BF y textos de la landing", "Black Friday", "31 oct", "5 nov", "3 días", "Sin confirmar; margen hasta el jueves"],
    ["5 emails de BF en Brevo", "Black Friday", "5 nov", "10 nov", "3 días", "Esta semana"],
    ["Todo montado y probado", "Black Friday", "10 nov", "14 nov", "4 días", "Próxima"],
    ["Emails de pausa navideña y trimestral", "Emails", "10 nov", "14 nov", "4 días", "Próxima"]
  ],
  barbara: [
    "<b>Sin dato nuevo:</b> seo-lunes no corrió el domingo 1 nov; la última entrada de docs/registros/seo-semanal.md es la de la semana 43.",
    "<b>Último bloque (26 oct):</b> 8 de unos 19 pasos; A1 sin indexar y post de libros sin publicar; 19 contactos, 4 respuestas, 1 ficha con enlace, 0 enlaces de medios; FLAM reclama por su marca (decisión el 7 nov).",
    "<b>Search Console 26 oct–1 nov:</b> 21 clics de padres (20 la anterior); 104 en octubre (objetivo 110 en diciembre). Comparativa de francés el 3 nov, A2 el 6 nov."
  ],
  avisos: [
    "Stripe: el script sigue sin STRIPE_API_KEY; las 85 pruebas pagadas combinan los diarios del proyecto de Meta (26–29 oct, 49) y el conector de Stripe (30 oct–1 nov, 36; mismo filtro). El CAC semanal no es vara: compara el gasto de hoy con matrículas de pruebas de 1–3 semanas antes.",
    "Notion: la página Q4 2026 devuelve 404 a la integración (también en la revisión mensual); fechas de la copia del 14 oct y de la revisión de hoy.",
    "Brevo: sin conector en la sesión programada. Search Console: 31 oct y 1 nov incompletos.",
    "Las canceladas de semanas pasadas se siguen recalculando (semana 43: 49 → 44). «Plazas activas empezadas» del script sigue sin usarse.",
    "Meta: el píxel cuenta matrículas como compras desde agosto; sin cribados esta semana, el CTR del núcleo es el de la cuenta. Ritmo de Meta y Google = octubre cerrado."
  ],
  // Bloque mensual: lo escribe la revisión mensual (día 1); la rutina de los lunes lo conserva tal cual.
  mes: {
    titulo: "Cierre de octubre de 2026",
    lede: "261 altas (objetivo 320) y 171 familias nuevas con 348 pruebas pagadas: el embudo se rompe entre la prueba y la matrícula. Paid £14.821 (+5,9 %), CAC de medios £86,7 por familia nueva de la base (£62 por suscripción nueva de Stripe), LTV:CAC 2,6:1 a 12 meses. Stripe: MRR £120,5k, 239 suscripciones nuevas, cestas pagadas 78 %. Plazas 2.973 el 2 nov (+91). Quedan 439 altas en 59 días.",
    tiles: [
      ["Altas", "261", "objetivo 320 · sep 310 · 171 familias nuevas (sep 223)"],
      ["Plazas activas", "2.973", "2 nov · +91 en el mes · 449 nuevas · 236 canceladas netas (se recontarán)"],
      ["Paid", "£14.821", "Meta £13.567 (+8,5 %) · Google £1.254 · presupuesto £14.000"],
      ["CAC de medios", "£86,7", "por familia nueva (base) · £62,0 por suscripción nueva viva de Stripe (239) · £56,8 por alta · plan ≤ £60"],
      ["Pruebas pagadas", "348", "Stripe, cargos · £39,0 de Meta por prueba · Meta 52 %, orgánico 29 % · conversión 30 d cohorte sep 45,5 %"],
      ["LTV:CAC 12 m", "2,6:1", "ARPU £68,4 (MRR £120,5k / 1.763) · proyectado 5,1–5,8:1 · payback 2,8 meses · con base Stripe 3,4:1"]
    ],
    canales: [
      ["Meta Ads", "Mantener (a la baja)", "£13.567 · 253 compras píxel · 348 pruebas pagadas · £39,0 / prueba", "Nov £7.500: fuera UGC ES, FR ABO a la mitad, Video1 ≤ 30 %"],
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
  fuentes: "Fuentes: base de producción de Diluu (2 nov 2026, 12:05 Bali, scripts/semana-datos.cjs); Supermetrics: Meta Ads (act_2456974117647730 y act_911299640142242), Google Ads (4584208097), GA4 (425989233), Search Console (diluu.com), 1 oct–1 nov 2026; Stripe (conector, 30 oct–1 nov) y diarios del proyecto de Meta (26–29 oct); docs/planes/q4-seguimiento-objetivos-fechas-2026-10-14.md (Notion en 404); docs/equipo/marta-plan-entregas.md. Lo escribe la rutina registro-semanal cada lunes."
};
