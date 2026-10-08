---
name: registro-semanal
description: Rutina semanal del CMO de Diluu (lunes). Mide cómo contribuye cada canal al objetivo del trimestre, actualiza el dashboard "Semana CMO Diluu", escribe la entrada en docs/registros/registro-semanal-canales.md, dice en qué centrarse esta semana y lista las tareas y fechas de Marta con su margen. Úsala los lunes o cuando Lucia pida el informe semanal, el control de presupuesto o los guardrails.
---

Trabaja desde la raíz del repo CMO. Hoy en hora de Bali (UTC+8). Nada se escribe en Stripe, Meta,
Google Ads, Brevo ni Notion (solo lectura; el tablero de Marta se lee, no se edita).

## 1. Periodo
- Semana ISO completa anterior (lunes–domingo) y "trimestre hasta hoy" (1 oct – ayer).
- Días que quedan hasta el 31 dic y semanas completas.

## 2. Datos (cada cifra con fuente y rango)
1. **Plazas** (base de producción, docs/medicion/fuentes.md): activas empezadas hoy; nuevas y
   perdidas en la semana y en el trimestre; pruebas (TRIAL) de la semana. Si el panel bi.diluu.com
   está accesible por el navegador, anota también su cifra de plazas activas.
2. **Stripe** (conector; si falla, dilo y usa la pestaña ATRIBUCIÓN AUTOMÁTICA como proxy): altas de
   pago, familias nuevas y bajas de la semana y del mes; altas con utm_campaign=bf26 o promo
   bf26_trimestral cuando toque; altas con código de referido.
3. **Meta** (Supermetrics FA, dos cuentas, por día): gasto, impresiones, clics, compras de píxel,
   CTR, CPM. **Google** (AW): gasto, clics, conversiones por campaña. Compara el ritmo mensual con el
   presupuesto del mes (docs/contexto/decisiones.md) y aplica los guardrails de CLAUDE.md.
4. **Search Console** (GW, STANDARD): clics y impresiones de la semana, divididos en marca, mapas y
   búsquedas de padres (regla en docs/medicion/fuentes.md). **GA4** (GAWA): sesiones y conversiones
   por canal; pruebas con tráfico orgánico cuya página de destino sea de clases o artículo.
5. **Brevo**: si hay datos de automatizaciones o campañas de la semana, anótalos; si no, "sin dato".
6. **Marta** (Notion, query de collection://f9158902-f0d3-410c-a0d1-9fa3bbf28940): tareas con
   Entrega en esta semana y la siguiente, y las vencidas que no estén en Done. Cruza con
   docs/equipo/marta-plan-entregas.md para calcular el margen hasta la fecha límite real.
7. **Bárbara**: fechas de sus entregas de la semana (plan Q4 y docs/equipo/barbara-seo-propuesta.md).

## 3. Cálculo del aporte de cada canal al objetivo
- Objetivo: ≥ 3.000 plazas el 31 dic (3.100 deseable) y ≥ 640 altas en el Q4 (300/220/120).
- Altas necesarias por semana = (altas objetivo del mes − altas del mes hasta hoy) ÷ semanas que
  quedan del mes. Plazas: idem con 1,65 plazas por alta y la pérdida prevista (9,5–10,5 % mensual).
- Por canal, en la semana: inversión, resultado (compras píxel / conversiones / clics de padres /
  altas por email / altas referidas), coste por resultado, y su clasificación vigente (ESCALAR,
  MANTENER, ARREGLAR, CORTAR, MEDIR). Reparte las altas de Stripe por canal solo cuando haya utm o
  código; si no, muestra el reparto de conversiones de GA4 y dilo.

## 4. Foco de la semana (3 a 5 puntos, en orden de impacto)
Reglas: (a) un guardrail saltado va primero; (b) si el ritmo de altas del mes va por debajo del
objetivo, el foco es conversión prueba→curso y seguimiento, no más gasto; (c) decisiones con fecha
esta semana (plan Q4, decisiones.md); (d) entregas de Marta o Bárbara que vencen; (e) lo que
cambió más respecto a la semana anterior. Cada punto con la cifra que lo justifica.

## 5. Salidas
1. Nueva entrada al principio de docs/registros/registro-semanal-canales.md con el formato de la
   anterior (tabla de canales, plazas, foco, Marta, avisos de datos).
2. Actualiza el bloque `const D = {...}` de dashboard/semana-cmo.html (solo datos; añade la semana
   a las series) y publica el artefacto "Semana CMO Diluu" con el Artifact tool al mismo URL que
   figura en docs/contexto/enlaces.md.
3. Mensaje a Lucia por Slack (DM a U030M5K0C0Y): 10 líneas máximo: plazas y altas frente a objetivo,
   foco de la semana, tareas de Marta de la semana con fecha y margen, enlace al dashboard.
4. Si hay una decisión nueva, añádela a docs/contexto/decisiones.md. Haz commit en git con mensaje
   "registro semanal AAAA-SS".
