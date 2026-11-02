# Fuentes y definiciones de medición

## Base de producción (mongo-read.cjs, solo lectura)
Script: `node "$S/mongo-read.cjs"` con `S=/Users/luciamarin/.claude/plugins/cache/diluu/diluu-ops/<hash>/scripts`
(la ruta exacta la da el aviso de inicio de sesión). Fechas como texto ISO.
- **Plaza activa (definición oficial desde el 8 oct 2026):** matrícula contratada y no finalizada,
  con cualquier fecha de inicio: `count v3-enrolments '{"$or": [{"end": null}, {"end.lastLesson": {"$gte": "<hoy>"}}]}'`
  (8 oct 2026: 2.907; 2.855 sin fin programado + 52 con fin futuro). Incluye las pausadas (las pausas
  viven en `v3-students-pauses`, 75 vigentes el 8 oct, y no cierran la matrícula) y las 101 que
  empiezan en los próximos días. Comprobación: a 2 oct esta definición da 2.882 (createdAt ≤ 2 oct)
  frente a 2.829 del panel bi.diluu.com, la más cercana de las probadas (solo empezadas: 2.554). La
  rutina semanal anota también la cifra del panel cuando esté accesible. Solo empezadas (startDate ≤
  hoy): 2.803.
- Plazas nuevas de un periodo: enrolments con `createdAt` en el periodo y `previousEnrolmentId: null`
  (excluye cambios de grupo). Sep 2026: 519; 1–8 oct: 120.
- **Referidos (desde el 12 oct 2026, fuente de verdad; Stripe no los ve):** `scripts/referidos.sh INI FIN`.
  `v3-referral-codes` = una familia que ha abierto "Referidos" en el panel (código y cupón de Stripe
  del 100 % para la prueba, sin canjes porque la prueba referida no pasa por el checkout);
  `v3-referrals` = cada amigo que reserva una prueba con código (`status`: TRIAL_SCHEDULED,
  NOT_CONVERTED, ...; `earned` = recompensa acreditada); `v3-bookings` con `sourceId` `referral:<código>`
  = la prueba referida (`cancelled`, `convertedEnrolmentIds`); alta referida = enrolment nuevo cuyo
  `trialBookingId` apunta a una de esas pruebas. Se excluyen dos cuentas internas del equipo (ids en
  el script). 23 sep–11 oct: 332 códigos (309 de familias activas), 2 referidos reales, 1 alta, 0
  recompensas acreditadas. GA4 no mide el panel (students.diluu.com).
- Plazas canceladas (bajas): enrolments con `end.lastLesson` en el periodo y `end.reason: "CANCEL"`
  (CHANGE = cambio de grupo, no es baja: en sep 2026 hubo 999 CHANGE y 359 CANCEL). Dentro de CANCEL,
  descuenta `end.cancellationReason` NO_ES_CANCELACION y REACTIVADA (sep: 24 y 8). Sep 2026: 359
  (327 netas); 1–8 oct: 68. Motivos de sep: no tiempo/asuntos familiares 65, cancelan una de sus
  clases 53, otro 47, no responde 32, pago fallido 32, pausa/viaje 24, no les gustan 16, dinero 16.
  El conteo "sin sucesor" vía $lookup sobrestima (sep 402) porque algunos CHANGE no enlazan sucesor.
- Pruebas: `v3-bookings` con `type: "TRIAL"` y `lessonStart` en el periodo. Ago 648, sep 630, 1–8 oct 168.
- No presentados: `v3-trial-results` con `attended: false` (status REPORTED) sobre pruebas con `lessonStart` en el
  periodo; antelación de la reserva = `lessonStart` − `createdAt` del booking (`v3-bookings.id` = `bookingId`).
  Ago 95/602 (15,8 %), sep 85/571 (14,9 %), 1–13 oct 28/208 (13,5 %); sep–oct: < 1 día 6,5 %, 1–3 días 10,5 %,
  3–7 días 23,6 %.
- **Stock de plazas a una fecha pasada: no se reconstruye.** `count` con `createdAt ≤ fecha` y `end` nulo o posterior da
  4.357 el 1 oct y 3.155 el 31 oct 2026 (frente a 2.882 y 2.973 leídos en el día): los finales se editan después de la
  lectura y los cambios de grupo (≈ 1.000 CHANGE al mes) dejan la matrícula vieja y la nueva solapadas. La serie oficial
  son las lecturas del día (lunes y día 1). La base empieza en octubre de 2025 (1.399 matrículas creadas ese mes por la
  migración): no sirve para comparar altas interanuales; para 2025 se usan las cifras de Stripe del plan Q4.
- **Conversión prueba → curso a 30 días** (`scripts/mes-datos.cjs`): pruebas con `lessonStart` en el mes, no canceladas,
  emparejadas con matrículas cuyo `trialBookingId` es esa prueba y creadas en los 30 días siguientes. Sep 2026: 45,5 % por
  prueba (53,5 % de las asistidas con resultado; 52,5 % por familia); ago: 39,9 % / 46,7 % / 46,7 %. El panel direct-course
  mide otra cosa (ago 45 %): no mezclar.
- **Bajas en los primeros 30 días**: plazas nuevas del mes con CANCEL neta y última clase ≤ 30 días tras la creación. Sep
  2026: 6,7 % de las plazas, 8,4 % de las familias (ago 9,6 % / 9,2 %). El 14,8 % de agosto del plan era por suscripción
  de Stripe: otra definición.
- Los campos `course.weekday`/`course.time` están en UTC.
- **Retención de familias** (scripts/retencion-familias.sh): familia = `client.id`; cohorte = mes de su
  primera matrícula (`min createdAt`); viva = alguna matrícula con `end` null o `end.lastLesson` ≥ hoy;
  vida = última `end.lastLesson` menos primera `startDate` (incluye pausas y Navidad). Lectura del
  11 oct 2026 en docs/analisis/unit-economics-2026-10.md: 7,4 meses de vida en el primer año, 42 %
  vivas a los 12 meses, churn 4,5 %/mes a partir del año.

## Supermetrics (ds_id → cuentas)
- FA (Meta): act_2456974117647730, act_911299640142242. Campos: Date, cost, impressions,
  action_link_click, offsite_conversions_fb_pixel_purchase, link_CTR, CPM, adcampaign_name.
- AW (Google Ads): 4584208097. Campos: Date, Cost, Clicks, Conversions, Campaignname.
- GW (Search Console): sc-domain:diluu.com, settings {"report_type": "STANDARD"}. Campos:
  Yearmonth/Date, query, page, clicks, impressions, position. "Clics de padres" (desde el 26 oct 2026) = clics a
  las páginas de clases, de prueba y de precios, por página y sin la dimensión de búsqueda, menos los
  clics de marca visibles en esas páginas (diluu, dilluu, dillu, diilu, dilu, hey spanish). Filtros
  exactos en .claude/skills/seo-lunes/SKILL.md. Antes se filtraba por el texto de la búsqueda y salía
  ≈ 1 clic al mes: Google oculta la mayoría de las búsquedas de una web pequeña (1–25 oct 2026: 2.169
  clics de diluu.com sin búsqueda visible). Con la definición nueva: jul–sep 2026, 103 al mes.
- GAWA (GA4): 425989233. Campos: date/yearMonth, sessionDefaultChannelGrouping, landingPage,
  sessions, conversions. Ojo: en oct 2026 aparece "Cross-network" con 905 sesiones (sep: 14): revisar
  el etiquetado antes de atribuir.
- SIB (Brevo): autenticado; sin explorar aún.

- Altas (familias con matrícula nueva en el periodo): `aggregate v3-enrolments '[{"$match": {"createdAt": {"$gte": "<ini>", "$lt": "<fin>"}, "previousEnrolmentId": null}}, {"$group": {"_id": "$client.id"}}, {"$count": "n"}]'`
  (sep 2026: 310; 1–8 oct: 82). Familias nuevas (primera matrícula de su historia en el periodo):
  `[{"$group": {"_id": "$client.id", "first": {"$min": "$createdAt"}}}, {"$match": {"first": {"$gte": "<ini>", "$lt": "<fin>"}}}, {"$count": "n"}]` (sep: 223; 1–8 oct: 45).
  Bajas de familias (última plaza cancelada en el periodo, aproximación): familias con alguna
  plaza CANCEL en el periodo (sep: 220; 1–8 oct: 65); afinar excluyendo las que conservan otra plaza.

## Stripe
Solo para ingresos, MRR, cupones y metadatos de campaña (bf26, promo, referral_code). No se usa
para contar altas ni bajas: hay familias que pagan por Seal Subscriptions fuera de Stripe. Si el
conector falla ("connection invalidated"), reconectar desde ajustes de conectores de claude.ai.
- **Sigma no está contratado** (11 oct 2026): `stripe_analytics` devuelve "requires a Sigma subscription".
  El conector MCP (`stripe_api_read`) funciona, pero devuelve cada suscripción entera (≈ 3.000 tokens):
  no sirve para paginar cohortes ni contar; solo para consultas puntuales.
- **Supermetrics tiene conector de Stripe (ds ST)**, autenticado el 11 oct 2026, pero la licencia
  1847450 no lo incluye (`LICENSE_DATA_SOURCE_NOT_AVAILABLE`). Campos útiles si se contrata: report
  Charges con customer_id, customer_created_date, charge_currency, charge_amount, charge_amount_refunded.
- Vía para el cálculo exacto (unit economics v4.1 por cliente): clave restringida de solo lectura en
  `.env` como `STRIPE_API_KEY` (la pega Lucia; `.env` está en .gitignore) y script en scripts/.
- **Lectura por el conector (2 nov 2026, sin clave):** `GetCharges` con `created` por día de Londres (≈ 100 cargos al día;
  los días con más de 100 necesitan `starting_after`), `GetSubscriptions` con `created` por ventanas y `status`. Cada
  respuesta supera el límite de tokens y se guarda en un fichero de tool-results: se procesa con `jq` sin cargarla.
  **Desde la migración de cobros del 22 oct casi todas las suscripciones vivas están en `trialing`** (el periodo de prueba
  acaba en el siguiente cobro): el MRR se suma con `trialing` + `active` + `past_due`, items normalizados a mes (4 semanas
  × 13/12). 2 nov: 1.763 vivas, MRR £120,5k, £68,4 por familia. Suscripciones nuevas del mes = creadas en el mes
  (`enrolment_checkout` = landing, `sales_agent` = enlace de pago de vendedora, sin metadato = panel); `incomplete_expired`
  = checkout caducado. Octubre: 328 creadas, 239 vivas, 71 caducadas. Ingresos cobrados = cargos `succeeded` netos de
  `amount_refunded` (oct ≈ £125,2k). Tipos sin fijar en CLAUDE.md usados: DKK 0,115, HKD 0,098, ILS 0,21, PLN 0,20,
  SGD 0,58, AED 0,21 (el 0,77 de "resto" infla el DKK).
- **Pruebas pagadas (desde el 19 oct 2026):** cargos con éxito ≤ 400 (4 $, 3 €, £3), agrupados por día en hora
  de Londres (así los cuenta el proyecto de Meta). Se leen con el listado `/v1/charges` paginado
  (scripts/semana-datos.cjs, con `STRIPE_API_KEY`), nunca con la búsqueda (`/v1/charges/search`): la búsqueda
  dejó fuera el domingo 18 oct y dio 51 pruebas en vez de 69. Semana 5–11 oct: 76; 12–18 oct: 69 (£42,2 de Meta
  por prueba). No incluye pruebas referidas (gratis).

## Plan Q4: cifras de referencia
Presupuesto paid oct £14.000 (Meta 12.500 + Google 1.500), nov £9.000, dic £4.500. Altas objetivo
oct 300 / nov 220 / dic 120. Sep 2026: Meta £14.544 y 292 compras píxel (CPA £49,8); Google £1.709 y
35 conversiones (£48,8); altas 359; familias nuevas 270; CAC medios/familia nueva £60,2.
