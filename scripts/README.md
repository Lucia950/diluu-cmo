# scripts/

- **`auditoria-web.py [--rapido] [--gsc CSV] [--oculto OCULTOS SIN_MARCA]`**: auditoría técnica de diluu.com,
  solo lectura (peticiones HTTP). `--rapido` (≈ 25 s, rutina seo-lunes): las URLs de los sitemaps deben dar 200
  sin redirección. Completa (≈ 75 s, revisión mensual del día 1): (1) URLs de los sitemaps y con tráfico en Search
  Console (`auditoria-urls-historicas.csv`, que `--gsc` amplía con el CSV del mes) que dan 404, encadenan
  redirecciones, cambian de idioma o acaban en una portada; (2) enlaces internos a páginas rotas o que redirigen;
  (3) páginas de clases sin JavaScript: contadores, línea de precios con los precios de la API, precio del schema
  (10 USD grupo, 15,75 EUR lectoescritura según la API), canonical, noindex, hreflang; (4) sitemap de Yoast;
  (5) alarma si > 50 % de los clics sin marca de las páginas de clases llegan sin búsqueda visible. Informe en
  `data/auditoria-web-AAAA-MM-DD.md`. Redirecciones aceptadas a propósito: `auditoria-excepciones.txt`.
- **`semana-datos.cjs [LUNES] [--sin-stripe]`**: todos los datos de la rutina semanal en UNA conexión a la
  base de producción (≈ 20 s): plazas activas (definición oficial), empezadas, cancelaciones programadas,
  familias activas; por semana, semana anterior y trimestre: plazas nuevas, canceladas netas y brutas, pruebas,
  no presentados, altas (familias), familias nuevas, bajas aprox.; motivos de cancelación y series por día;
  referidos de la semana y acumulados desde el 23 sep; pruebas pagadas de Stripe (listado /v1/charges por día
  en hora de Londres, cargos con éxito ≤ 400) si hay `STRIPE_API_KEY` en `.env`. Escribe
  `data/semana-AAAA-SS.json` e imprime un resumen de 10 líneas. Usa lib/mongo.cjs del plugin diluu-ops (la ruta
  se resuelve sola). Lo usa la skill registro-semanal; sustituye a plazas.sh y referidos.sh en la rutina.
- `plazas.sh INI FIN`: plazas activas, nuevas, perdidas y pruebas desde la base de producción (usa
  mongo-read.cjs del plugin diluu-ops; credenciales en ~/.diluu). Solo lectura. Para consultas sueltas.
- `referidos.sh INI FIN`: embudo de referidos desde la base de producción: familias con código,
  amigos invitados (v3-referrals, por estado y recompensas acreditadas), pruebas referidas (bookings
  con sourceId `referral:`) y altas referidas. Excluye las cuentas internas del equipo. Lo usan
  registro-semanal (semana y trimestre) y revision-mensual. Stripe no ve los referidos.
  Truco de mongo-read.cjs: `$regex` y `$nin` sobre el mismo campo van en un `$and` separado (juntos,
  Mongo ignora el `$nin`).
- Stripe: pendiente un `stripe_semana.py` que pagine suscripciones (status=all) y calcule altas,
  bajas y familias nuevas por semana y mes; necesita una clave de solo lectura en `.env`
  (STRIPE_API_KEY). Comprobar contra 2.523 altas en ene–sep 2026. Mientras tanto, el conector de
  Stripe de claude.ai en la conversación.
- Supermetrics y GA4 se consultan con el conector (ids en docs/medicion/fuentes.md); guarda los
  extractos en data/ con fecha.
- `retencion-familias.sh 2025-05 2025-06`: curva de retención de familias por cohorte de primera
  matrícula (supervivencia a 1, 2, 3, 6, 9 y 12 meses, vivas hoy y días medios del primer año);
  `--antiguedad AAAA-MM-DD` da el churn por tramo de antigüedad desde esa fecha. Base de producción,
  solo lectura. Lo usa docs/analisis/unit-economics-2026-10.md.
- **`mes-datos.cjs AAAA-MM`** (desde el 2 nov 2026, revisión mensual): todos los datos del mes de la base de producción en
  UNA conexión (≈ 80 s): plazas nuevas, canceladas netas y brutas, cambios de grupo, altas, familias nuevas, bajas de
  familias (aprox. y "sin ninguna plaza activa a fin de mes"), pruebas y no presentados, por semana ISO, por país; desglose
  de las altas (nueva / añade plaza / vuelve < 90 d / vuelve > 90 d); conversión prueba → curso a 30 días de las cohortes de
  los dos meses anteriores (por prueba no cancelada, por prueba asistida y por familia); bajas en los primeros 30 días;
  referidos del mes y desde el 23 sep; lo mismo para el mes anterior y el mismo mes de 2025. Escribe `data/mes-AAAA-MM.json`.
  Ojo: `plazas_activas_ini/fin` (stock reconstruido con createdAt ≤ fecha) NO sirve: da 4.357 → 3.155 en octubre porque los
  finales se editan después y los cambios de grupo dejan matrículas solapadas; el stock oficial es la lectura del día
  (`plazas_activas_hoy`) y las de los lunes. `course.language` no existe (el idioma está en `course.subject`).
  Las pruebas pagadas de Stripe no están en este script: con `STRIPE_API_KEY` usar la función de `semana-datos.cjs`.
