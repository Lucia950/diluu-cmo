---
name: registro-semanal
description: Rutina semanal del CMO de Diluu (lunes). Mide cómo contribuye cada canal al objetivo del trimestre, actualiza el dashboard "Semana CMO Diluu", escribe la entrada en docs/registros/registro-semanal-canales.md, dice en qué centrarse esta semana y lista las tareas y fechas de Marta con su margen. Úsala los lunes o cuando Lucia pida el informe semanal, el control de presupuesto o los guardrails. La parte de SEO y Bárbara la hace la skill seo-lunes (domingo por la noche).
---

Trabaja desde la raíz del repo CMO. Hoy en hora de Bali (UTC+8). Nada se escribe en Stripe, Meta,
Google Ads, Brevo ni Notion (solo lectura). Objetivo de la rutina: menos de 20 minutos y pocas lecturas:
un script para la base, siete consultas fijas de Supermetrics, un fichero de datos de 10 KB para el dashboard.
No explores fuentes ni campos: todo lo que hace falta está aquí. Si una fuente falla, escribe "sin dato" y por qué,
sin reintentar más de una vez.

## 1. Periodo
- Semana ISO completa anterior (lunes–domingo) y "trimestre hasta hoy" (1 oct – ayer). Días que quedan hasta el
  31 dic y semanas completas.

## 2. Base de producción y Stripe: un solo comando
```bash
node scripts/semana-datos.cjs
```
(sin argumentos toma la semana ISO anterior; `node scripts/semana-datos.cjs 2026-10-12` para otra semana). Tarda
1–3 minutos, abre UNA conexión y escribe `data/semana-AAAA-SS.json`; el resumen que imprime tiene todo lo que
necesitas: plazas activas (definición oficial, con pausadas), empezadas, cancelaciones programadas, familias
activas; por semana, semana anterior y trimestre: plazas nuevas, canceladas netas y brutas, pruebas, no presentados,
altas (familias), familias nuevas, bajas aprox.; motivos de cancelación, pruebas y nuevas por día; referidos de la
semana y acumulados desde el 23 sep; pruebas pagadas de Stripe (semana y anterior) si hay `STRIPE_API_KEY` en `.env`.
Si Stripe sale "sin dato", NO sigas sin él (Lucia, 26 oct): saca las pruebas pagadas con el conector de Stripe de la
sesión (`stripe_api_read`, `GetCharges` con `created[gte]`/`created[lt]` en hora de Londres, `limit 100`, paginando con
`starting_after`; mismo filtro que el script: `succeeded`, `metadata.direct_trial = true`, sin reembolso ni pruebas internas de Lucia). Nunca la búsqueda de Stripe
(el 19 oct dio 51 en vez de 69). Si tampoco se puede, "falta Stripe" va el primero en "Pendientes para Lucia" y Meta y
el CAC no se juzgan con el píxel: el píxel mete matrículas y se deja pruebas. No uses plazas.sh ni
referidos.sh en esta rutina: están dentro del script. Definiciones en docs/medicion/fuentes.md.

## 3. Supermetrics: siete consultas fijas (data_query, compress true; nada de discovery)
Fechas: M1 = día 1 del mes, D = domingo de la semana, L = lunes. Cuentas en GBP; cost llega sin moneda.
1. **Meta por día** · ds `FA` · cuentas `["act_2456974117647730","act_911299640142242"]` · campos
   `Date,cost,impressions,action_link_click,offsite_conversions_fb_pixel_purchase,link_CTR,CPM` · M1→D.
2. **Meta por campaña (semana)** · `FA` · mismas cuentas · `adcampaign_name,cost,impressions,action_link_click,offsite_conversions_fb_pixel_purchase,link_CTR,frequency` · L→D.
3. **Google por día y campaña** · ds `AW` · cuenta `["4584208097"]` · `Date,Campaignname,Cost,Clicks,Conversions` · M1→D.
4. **GA4 por día y canal** · ds `GAWA` · cuenta `["425989233"]` · `date,sessionDefaultChannelGrouping,sessions,conversions` · M1→D.
5. **Search Console por día** · ds `GW` · cuenta `["sc-domain:diluu.com"]` · settings `{"report_type":"STANDARD"}` · `Date,clicks,impressions` · L→D.
6. **Search Console, búsquedas de padres por día** · igual que 5 con filtro
   `query =~ "class|clases|cours|lesson|tutor|learn (spanish|french)|aprender español|apprendre|online (spanish|french)|(spanish|french) for kids|(español|francés) para niños|heritage|bilingual kids|lectoescritura" AND query !~ "diluu|dilluu|hey spanish|map|mapa|carte|hispanohablantes|hispanophones|spanish speaking countries|países|paises|disney"`
   (es la regla del panel SEO; no uses otra). Para el mes, misma consulta con `Yearmonth` M1→D.
7. **Brevo**: una llamada a `email_campaign_management_get_email_campaigns` con `limit 10` y `excludeHtmlContent true`,
   sin filtro de fechas; mira `sentDate`. Los envíos A/B y las automatizaciones no salen en la lista: si Lucia dice que
   un email salió, salió; escribe "no aparece en la API" y nunca "no se envió".
Cálculos: semana = suma de L→D; ritmo del mes = gasto M1→D ÷ días × días del mes; CTR del núcleo = clics ÷
impresiones de las campañas sin "CRIBADO" ni "Reproducciones"; CPA píxel = cost ÷ compras; coste por prueba pagada =
gasto Meta de la semana ÷ pruebas pagadas de Stripe; CAC de medios por familia nueva = (Meta + Google) ÷ familias
nuevas de la base, semana y mes. Guardrails de CLAUDE.md: tests con CPA píxel > £80, Video1 FR ≤ 30 % del gasto,
CTR del núcleo ≥ 1,1 %, frecuencia ≤ 3,5, CAC < £50 / > £65 (base Stripe; ≈ £60/£79 con la base de producción,
propuesto el 12 oct), Google: genérica congelada, francés sube solo con CPA 14 d < £90, nada con < 14 días.

## 4. Marta, plan Q4 y Bárbara (una página de Notion; sin tablero de Marta, sin Chrome; decidido el 19 oct)
- **Plan Q4 de Lucia, fuente oficial de fechas**: `notion-fetch` de
  https://app.notion.com/p/Q4-2026-b450218fc6ff822dbda4019e331b3a0d (DILUU › STRATEGY › GOALS › Q4 2026; solo
  lectura). Las acciones llevan 📅 y las tachadas están hechas. Lista las de esta semana y la siguiente y las vencidas
  en un bloque "Pendientes para Lucia". Si la lectura falla, usa docs/planes/q4-seguimiento-objetivos-fechas-2026-10-14.md
  y dilo. Si una fecha cambió en Notion, actualiza esa copia.
- **Marta**: sus siete entregas de Black Friday están en la sección 8 de esa página con "fecha de Marta (límite real)";
  las demás, en docs/equipo/marta-plan-entregas.md. No se consulta su tablero de Notion (Lucia, 19 oct). El estado
  (hecha o no) lo confirma Lucia; si no consta, "estado: sin confirmar", no "vencida".
- **Bárbara / SEO**: no la analices aquí. Copia el bloque "Para el registro del lunes" de la última entrada de
  docs/registros/seo-semanal.md (lo escribe seo-lunes el domingo). Si no existe, "sin dato: seo-lunes no ha corrido".
- El panel bi.diluu.com no se lee: la cifra oficial de plazas es la de la base (decidido el 8 oct).

## 5. Cálculo del aporte de cada canal al objetivo
- Objetivo: ≥ 3.000 plazas el 31 dic (3.100 deseable) y ≥ 700 altas en el Q4 (320/240/140).
- Altas necesarias por semana = (altas objetivo del mes − altas del mes hasta hoy) ÷ semanas que quedan del mes.
  Di a cuánto cierra el mes al ritmo actual. Plazas: idem con 1,65 plazas por alta y pérdida del 9,5–10,5 % mensual.
- Por canal, en la semana: inversión, resultado (compras píxel y pruebas pagadas / conversiones / clics de padres /
  altas referidas), coste por resultado, semana anterior y clasificación vigente (ESCALAR, MANTENER, ARREGLAR,
  CORTAR, MEDIR). Las altas se reparten por canal solo con utm o código; si no, reparto de conversiones de GA4 y dilo.
- Si el stock de plazas no cuadra con nuevas − canceladas, dilo con las cifras y sigue el objetivo con el stock del lunes.

## 6. Foco de la semana (3 a 5 puntos, en orden de impacto)
Reglas: (a) un guardrail saltado va primero, diciendo si la acción ya está aprobada (las pausas de tests > £80 lo
están desde el 14 oct: entran en la rutina diaria de Meta, no se vuelven a pedir); (b) si el ritmo de altas del mes
va por debajo del objetivo, el foco es conversión prueba→curso y seguimiento, no más gasto; (c) decisiones con fecha
esta semana o vencidas (plan Q4, decisiones.md); (d) entregas de Marta que vencen; (e) lo que más cambió respecto
a la semana anterior. Cada punto con la cifra que lo justifica.

## 7. Salidas
1. Nueva entrada al principio de docs/registros/registro-semanal-canales.md con el formato de la anterior (objetivo,
   plazas, altas, tabla de canales, CAC, detalle de Meta y Google, GA4, guardrails, foco, Marta, Bárbara en tres
   líneas, avisos de datos).
2. Dashboard: edita SOLO `dashboard/semana-cmo-data.js` (el `const D`; añade la semana a las series y quita la más
   antigua para dejar seis). Valida con `node -e "new Function(require('fs').readFileSync('dashboard/semana-cmo-data.js','utf8')+';return D')()"`.
   Antes de publicar, lee la versión viva (`Artifact` action `read`, url https://claude.ai/artifact/LsYQbEjQcBu4xcmiTWL5Lw);
   si no, la publicación se rechaza. Publica con `Artifact`: `file_path dashboard/semana-cmo.html`, esa `url` y
   `files {"semana-cmo-data.js": "dashboard/semana-cmo-data.js"}`. No toques el HTML salvo que Lucia lo pida.
3. Sin Slack (quitado el 19 oct): lo que Lucia tiene que decidir va en el bloque "Pendientes para Lucia" del registro
   y en el foco del dashboard; ella lo lee cuando abre la sesión.
4. Decisiones nuevas de Lucia a docs/contexto/decisiones.md. Commit en git con mensaje "registro semanal AAAA-SS"
   añadiendo solo los ficheros que tocaste (registro, semana-cmo-data.js, decisiones.md); el resto del árbol no es tuyo.
5. Antes de cerrar, una comprobación de coherencia: pruebas pagadas de Stripe del script frente a la cifra diaria del
   proyecto de Meta si está a mano (diferencia > 5 % → di cuál usas y por qué); coste por prueba = gasto de la misma
   semana completa ÷ pruebas de la misma semana completa (nunca 7 días de gasto con 6 de pruebas); y si una cifra
   cambia más de un 25 % respecto a la semana anterior, vuelve a leer la fuente antes de escribirla.
