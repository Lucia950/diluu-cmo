# Fuentes y definiciones de medición

## Base de producción (mongo-read.cjs, solo lectura)
Script: `node "$S/mongo-read.cjs"` con `S=/Users/luciamarin/.claude/plugins/cache/diluu/diluu-ops/<hash>/scripts`
(la ruta exacta la da el aviso de inicio de sesión). Fechas como texto ISO.
- **Plaza activa (definición oficial desde el 8 oct 2026, incluye pausadas):** matrícula empezada y
  sin fin pasado: `count v3-enrolments '{"startDate": {"$lte": "<hoy>T23:59:59"}, "$or": [{"end": null}, {"end.lastLesson": {"$gte": "<hoy>"}}]}'`
  (8 oct 2026: 2.803, de las que 49 tienen fin programado). Las pausas (`v3-students-pauses`, 75
  vigentes el 8 oct) no cierran la matrícula, así que ya están dentro. Quedan fuera las 101
  matrículas con inicio futuro. El panel bi.diluu.com daba 2.829 el 2 oct; la rutina semanal anota
  las dos cifras hasta que cuadren.
- Plazas nuevas de un periodo: enrolments con `createdAt` en el periodo y `previousEnrolmentId: null`
  (excluye cambios de grupo). Sep 2026: 519; 1–8 oct: 120.
- Plazas canceladas (bajas): enrolments con `end.lastLesson` en el periodo y `end.reason: "CANCEL"`
  (CHANGE = cambio de grupo, no es baja: en sep 2026 hubo 999 CHANGE y 359 CANCEL). Dentro de CANCEL,
  descuenta `end.cancellationReason` NO_ES_CANCELACION y REACTIVADA (sep: 24 y 8). Sep 2026: 359
  (327 netas); 1–8 oct: 68. Motivos de sep: no tiempo/asuntos familiares 65, cancelan una de sus
  clases 53, otro 47, no responde 32, pago fallido 32, pausa/viaje 24, no les gustan 16, dinero 16.
  El conteo "sin sucesor" vía $lookup sobrestima (sep 402) porque algunos CHANGE no enlazan sucesor.
- Pruebas: `v3-bookings` con `type: "TRIAL"` y `lessonStart` en el periodo. Ago 648, sep 630, 1–8 oct 168.
- Los campos `course.weekday`/`course.time` están en UTC.

## Supermetrics (ds_id → cuentas)
- FA (Meta): act_2456974117647730, act_911299640142242. Campos: Date, cost, impressions,
  action_link_click, offsite_conversions_fb_pixel_purchase, link_CTR, CPM, adcampaign_name.
- AW (Google Ads): 4584208097. Campos: Date, Cost, Clicks, Conversions, Campaignname.
- GW (Search Console): sc-domain:diluu.com, settings {"report_type": "STANDARD"}. Campos:
  Yearmonth/Date, query, page, clicks, impressions, position. "Búsquedas de padres" = consultas sin
  marca (diluu, dilluu, hey spanish) ni mapas (map, mapa, carte, hispanohablantes, hispanophones,
  spanish speaking countries, países) que contengan class, clases, cours, lessons, tutor, kids,
  niños, enfants, online, aprender, learn.
- GAWA (GA4): 425989233. Campos: date/yearMonth, sessionDefaultChannelGrouping, landingPage,
  sessions, conversions. Ojo: en oct 2026 aparece "Cross-network" con 905 sesiones (sep: 14): revisar
  el etiquetado antes de atribuir.
- SIB (Brevo): autenticado; sin explorar aún.

## Stripe
Conector claude.ai (lectura). Altas = suscripciones creadas con pago (sin incomplete); bajas =
canceled_at. Si el conector falla ("connection invalidated"), reconectar desde ajustes de conectores.
Proxy mientras tanto: pestaña ATRIBUCIÓN AUTOMÁTICA de TRACKING VENTAS INTERNO (la rutina
diluu-atribucion-ventas-diaria la rellena cada día con compras web y enlaces de pago).

## Plan Q4: cifras de referencia
Presupuesto paid oct £14.000 (Meta 12.500 + Google 1.500), nov £9.000, dic £4.500. Altas objetivo
oct 300 / nov 220 / dic 120. Sep 2026: Meta £14.544 y 292 compras píxel (CPA £49,8); Google £1.709 y
35 conversiones (£48,8); altas 359; familias nuevas 270; CAC medios/familia nueva £60,2.
