---
name: unit-economics
description: Recalcula los unit economics de Diluu (ARPU, vida media, LTV a 12 meses y proyectado, CAC de medios y completo, margen de contribución, LTV:CAC y payback) con el método v4.1, todo en libras. Úsala a petición de Lucia o desde revision-mensual.
disable-model-invocation: true
---

Todo en libras con los tipos fijos de CLAUDE.md. Di siempre qué cohorte y qué CAC usas.

1. **Cohorte de referencia**: suscripciones de pago creadas 12+ meses antes (hoy, may–jul 2025) y,
   como contraste, las de los últimos 6 meses para retención temprana. Stripe paginando (status=all).
2. **ARPU mensual** = ingresos cobrados ÷ meses facturados por suscripción (media y mediana).
3. **Vida media** = meses facturados por suscripción en su primer año. **Curva de retención** = %
   activas al cumplir cada mes de vida (mes 1 … 12).
4. **LTV12** = ingresos reales por suscripción en 12 meses. **LTV proyectado** = LTV12 + cola con el
   churn estable (hoy ≈6 %/mes desde el mes 6).
5. **CAC de medios** = Meta + Google del periodo ÷ familias nuevas (Stripe, primera suscripción).
   **CAC completo** = + coste del equipo de ventas del periodo ÷ familias nuevas (P&L, hoja de
   ventas; sep 2026 ≈ £10).
6. **Margen de contribución mensual** = ARPU × (1 − 55 % de profes) − coste de soporte por
   suscripción activa (P&L ÷ suscripciones activas; ago 2026 £3,45).
7. **LTV:CAC** con LTV12 de contribución y con LTV proyectado; **payback** = CAC completo ÷ margen
   de contribución mensual.
8. Compara con el cálculo anterior (docs/analisis/) y con el panel CFO; explica cada diferencia.
   Guardrail: LTV:CAC < 3:1 → el escalado de Meta queda en revisión.

Nota: el documento "unit-economics-2026-09 (v4.1)" del proyecto de claude.ai es la referencia
completa del método; cópialo a docs/analisis/ cuando Lucia lo exporte.
