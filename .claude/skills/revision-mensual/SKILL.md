---
name: revision-mensual
description: Revisión mensual del CMO de Diluu (día 1 de cada mes). Cierra el mes anterior contra el plan Q4, recalcula los unit economics (skill unit-economics), clasifica los canales y dice qué hay que tener en cuenta para llegar a los objetivos del trimestre. Escribe docs/registros/revision-mensual-AAAA-MM.md. Úsala el día 1 o cuando Lucia pida el cierre del mes.
---

Trabaja desde la raíz del repo CMO. Mes a revisar: el anterior completo. Solo lectura en todas las
plataformas.

## 1. El mes contra el plan
Tabla con objetivo (docs/planes/plan-q4-2026-y-hoja-de-ruta-2027.md, sección Objetivos Q4), real,
mes anterior y mismo mes de 2025:
- Altas de pago, familias nuevas, bajas, neto (Stripe). Plazas activas a fin de mes (panel y base
  de producción), plazas nuevas y perdidas (base de producción) y pérdida mensual de plazas.
- Paid: Meta y Google (gasto, compras píxel/conversiones, CTR, CPM) frente al presupuesto del mes y
  CAC de medios por alta y por familia nueva.
- Conversión prueba → curso a 30 días (base de producción: pagos de prueba del mes anterior al
  revisado, emparejados con su matrícula posterior). Bajas en los primeros 30 días de la cohorte.
- SEO (clics de padres, pruebas desde páginas de padres), email (altas por automatización),
  referidos (altas con código), ventas (ventas válidas por código y enlaces de pago creados).
- Tests activos del plan (Black Friday, pausa, tarjeta regalo, garantía) con su métrica de éxito.

## 2. Unit economics
Ejecuta la skill unit-economics con el mes cerrado y guarda el resultado en
docs/analisis/unit-economics-AAAA-MM.md. Comenta el cambio frente al mes anterior.

## 3. Canales
Para cada canal, aplica clasificar-canal y propón la reasignación de presupuesto del mes que
empieza, con la regla de ajuste a mitad de mes (decisiones.md) y los guardrails de CLAUDE.md.

## 4. Lo que hay que tener en cuenta para el trimestre
- Plazas y altas que faltan para 3.000/3.100 y 640, repartidas por semanas que quedan.
- Riesgos con cifra (pérdida de plazas, CAC, fatiga creativa, dependencia de un anuncio, Navidad).
- Las 3 decisiones que Lucia debe tomar este mes, con fecha.
- Entregas de Marta y Bárbara del mes (docs/equipo/) y las que se retrasaron.

## 5. Salidas
docs/registros/revision-mensual-AAAA-MM.md (secciones 1–4, cifras con fuente), decisiones nuevas a
decisiones.md, actualización del bloque mensual de dashboard/semana-cmo.html, DM a Lucia en Slack
(U030M5K0C0Y) con 12 líneas y el enlace, y commit "revisión mensual AAAA-MM".
