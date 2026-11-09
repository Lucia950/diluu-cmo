---
name: revision-mensual
description: Revisión mensual del CMO de Diluu (día 1 de cada mes). Cierra el mes anterior contra el plan Q4, recalcula los unit economics (skill unit-economics), clasifica los canales y dice qué hay que tener en cuenta para llegar a los objetivos del trimestre. Escribe docs/registros/revision-mensual-AAAA-MM.md. Úsala el día 1 o cuando Lucia pida el cierre del mes.
---

Trabaja desde la raíz del repo CMO. Mes a revisar: el anterior completo. Solo lectura en todas las
plataformas.

## 1. El mes contra el plan
Tabla con objetivo (docs/planes/plan-q4-2026-y-hoja-de-ruta-2027.md, sección Objetivos Q4), real,
mes anterior y mismo mes de 2025:
- Altas, familias nuevas, bajas y neto (base de producción; Stripe solo para ingresos y MRR).
  Plazas activas a fin de mes (base; panel como contraste), plazas nuevas y canceladas y pérdida
  mensual de plazas.
- Paid: Meta y Google (gasto, compras píxel/conversiones, CTR, CPM) frente al presupuesto del mes y
  CAC de medios por alta y por familia nueva.
- Conversión prueba → curso a 30 días (base de producción: pagos de prueba del mes anterior al
  revisado, emparejados con su matrícula posterior). Bajas en los primeros 30 días de la cohorte.
- SEO (clics de padres, pruebas desde páginas de padres, sesiones desde IA, artículos, enlaces:
  tablero y panel de Bárbara), email (altas por automatización),
  referidos (`scripts/referidos.sh` del mes: familias que invitan, pruebas y altas referidas, coste
  por alta = crédito + incentivo al amigo; desde feb 2027, retención de las referidas frente al
  resto), ventas (ventas válidas por código y enlaces de pago creados).
- **Preguntas a las IA por API** (desde la revisión de diciembre; Lucia, 9 nov): `node "$(ls -td
  ~/.claude/plugins/cache/diluu/diluu-ops/*/ | head -1)scripts/personal-keys.cjs" run -- node scripts/ia-respuestas.cjs`
  (claves propias de Lucia: OPENAI_API_KEY, GEMINI_API_KEY, PERPLEXITY_API_KEY; ≈ 36 llamadas, sin sesión ni memoria, con el
  país del padre que pregunta). Escribe `data/ia-respuestas-AAAA-MM.{json,md}`. Con el JSON, escribe en la base del
  artefacto SEO Diluu (slug 8d1e7569-a31f-4070-92d4-31519c64d89b) el documento `ia/AAAA-MM` con `r`, `citasApi`, `fecha`, `resumen`, `fuente: "api"`
  y `actualizado` (merge con `ifVersion` si existe; si Bárbara ya rellenó `r` a mano ese mes, guarda lo de la API en `rApi` y
  compara los dos en la revisión). Métrica: «Diluu aparece en X de 36» (línea base manual 30 oct: 10; objetivo 14 en
  diciembre; Gemini 0 de 12) y a quién recomiendan. Es un indicador: la métrica que decide sigue siendo GA4 (sesiones y
  eventos clave desde asistentes). Si una clave falta, el script lo dice y se anota en pendientes; no se inventa.
- Cesta abandonada de curso directo (desde la revisión de noviembre, Lucia 4 nov):
  `node "$(ls -td ~/.claude/plugins/cache/diluu/diluu-ops/*/ | head -1)scripts/personal-keys.cjs" run -- node
  scripts/cestas.cjs --desde <lunes de la semana 40>` (la versión más reciente del plugin en caché) y, por familia (fuentes.md): familias que abrieron, % pagadas, abiertas a las 2 h y
  recuperadas tarde del mes frente a la línea base sin WhatsApp (sem. 40–44: 90,4 % y 61,5 %); WhatsApp de n8n
  enviados, pagaron después y en 24 h; matrículas atribuibles al mes (recuperadas tarde − 61,5 % × abiertas a las 2 h)
  y su valor (× £68 de ARPU × meses de vida). Con ≥ 4 semanas de datos, decide si el test sigue, cambia el mensaje
  o se añade la tarea de Kommo a las 24 h (no existe en n8n el 4 nov).
- Tests activos del plan (Black Friday, pausa, tarjeta regalo, garantía, cesta abandonada) con su métrica de éxito.

## 2. Unit economics
Ejecuta la skill unit-economics con el mes cerrado y guarda el resultado en
docs/analisis/unit-economics-AAAA-MM.md. Comenta el cambio frente al mes anterior. Incluye el seguimiento del LTV
(paso 9 de la skill: cohorte que cumple 12 meses e indicadores adelantados). **Desde el 1 dic 2026 (Lucia, 4 nov): meses
facturados por familia en Stripe** en vez de meses de calendario: facturas pagadas (`GetInvoices`, `status paid`, por
`created`, paginadas por el conector y procesadas con jq desde los ficheros) agrupadas por cliente para las cohortes de
familias con 12 meses; meses pagados = facturas de suscripción pagadas en los 12 meses siguientes a la primera. Compara con
los 7,3 meses de calendario y usa el dato facturado para el LTV12.

## 3. Canales
Para cada canal, aplica clasificar-canal y propón la reasignación de presupuesto del mes que
empieza, con la regla de ajuste a mitad de mes (decisiones.md) y los guardrails de CLAUDE.md.

## 4. Lo que hay que tener en cuenta para el trimestre
- Plazas y altas que faltan para 3.000/3.100 y 700 altas, repartidas por semanas que quedan.
- Riesgos con cifra (pérdida de plazas, CAC, fatiga creativa, dependencia de un anuncio, Navidad).
- Las 3 decisiones que Lucia debe tomar este mes, con fecha.
- Entregas de Marta y Bárbara del mes (docs/equipo/) y las que se retrasaron.

## 4 bis. Auditoría técnica de la web (scripts/auditoria-web.py)
1. Search Console del mes cerrado (Supermetrics, ds GW, `["sc-domain:diluu.com"]`, settings `{"report_type":"STANDARD"}`):
   `page,clicks,impressions` con filtro `impressions > 10`, `max_rows 2000` → escríbelo en
   `data/gsc-paginas-AAAA-MM.csv` (page,clicks,impressions).
2. Búsquedas ocultas en las páginas de clases, mismo mes, con el filtro A de los clics de padres (skill seo-lunes):
   clics totales (A), clics de marca (B) y clics con `query == "(unknown)"` (C). Sin marca = A − B.
3. `python3 scripts/auditoria-web.py --gsc data/gsc-paginas-AAAA-MM.csv --oculto C A−B` (≈ 75 s). Amplía
   `scripts/auditoria-urls-historicas.csv` (va al commit) y escribe `data/auditoria-web-AAAA-MM-DD.md`.
4. En la revisión, sección «Salud de la web»: cuántos problemas por apartado frente al mes anterior y los 10 más
   importantes por clics. Lo que sea del developer (redirecciones, enlaces, páginas de clases) se añade al encargo
   abierto (docs/analisis/encargo-developer-paginas-clases-2026-10.md o uno nuevo con fecha) con su tabla; lo de
   WordPress, a Lucia. Una redirección que esté así a propósito va a `scripts/auditoria-excepciones.txt` con motivo.

## 5. Salidas
docs/registros/revision-mensual-AAAA-MM.md (secciones 1–4, cifras con fuente), decisiones nuevas a
decisiones.md, actualización del bloque mensual de dashboard/semana-cmo.html, DM a Lucia en Slack
(U030M5K0C0Y) con 12 líneas y el enlace, y commit "revisión mensual AAAA-MM".
