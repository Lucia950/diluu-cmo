# Unit economics · cierre de octubre de 2026 (revisión mensual, 2 nov)

Método v4.1 adaptado a familia (docs/analisis/unit-economics-2026-10.md, 11 oct). Todo en libras con los tipos fijos
de CLAUDE.md. Fuentes: base de producción a 2 nov 2026 (`scripts/retencion-familias.sh`, `scripts/mes-datos.cjs`);
Meta y Google por Supermetrics (1–31 oct); coste de ventas y soporte del P&L de septiembre y agosto (sin cierre de octubre
hasta la revisión del CFO del 5 nov). Stripe sigue sin clave en `.env`: el ingreso por familia no se ha recalculado.

## Resumen

- **LTV:CAC a 12 meses baja de 2,9:1 a 2,3:1** porque el CAC de medios por familia nueva sube de £72,9 (sep) a **£86,7**
  (oct: £14.821 de Meta + Google entre 171 familias nuevas de la base). Proyectado, 4,7–5,3:1 (antes 5,7–6,5:1).
  Payback 3,1 meses (2,5). El guardrail del 3:1 solo se cumple en proyectado: Meta no se escala.
- La retención no empeora: churn mensual por antigüedad 8,3 % (< 3 meses), 6,2 % (3–12) y 4,5 % (> 12), frente a
  9,0 / 6,1 / 4,5 el 11 oct. Las cohortes nuevas siguen reteniendo mejor al tercer mes (jul-26 73 %, ago-26 81 %
  provisional; jul-25 67 %).
- El problema de octubre es el numerador (gasto +8,5 % sobre presupuesto en Meta) y el denominador (171 familias nuevas,
  −23 % frente a septiembre con pruebas pagadas casi iguales), no el valor de la familia.

## 1. Cohorte y retención (base de producción, 2 nov)

| Cohorte (primera matrícula) | Familias | 1 mes | 2 | 3 | 6 | 9 | 12 | Vivas el 2 nov |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| may-25 | 119 | 92 % | 84 % | 78 % | 59 % | 54 % | 44 % | 33 % |
| jun-25 | 114 | 90 % | 78 % | 68 % | 54 % | 45 % | 43 % | 32 % |
| jul-25 | 96 | 88 % | 74 % | 67 % | 54 % | 47 % | 39 % | 34 % |
| oct-25 | 155 | 90 % | 87 % | 81 % | 63 % | 46 % | 38 % | 38 % |
| ene-26 | 160 | 93 % | 79 % | 72 % | 58 % | 44 % | | 43 % |
| abr-26 | 119 | 93 % | 85 % | 82 % | 59 % | | | 59 % |
| jul-26 | 209 | 89 % | 81 % | 73 % | | | | 70 % |
| ago-26 | 243 | 93 % | 85 % | 81 %* | | | | 81 % |
| sep-26 | 223 | 93 %* | | | | | | 90 % |

Asterisco: la cohorte acaba de cumplir ese mes. La cohorte oct-25 cierra el año en el 38 % (la media may–jul 2025 es 42 %).

- **Vida en el primer año: 7,3 meses por familia** (may–jul 2025: 235, 216 y 217 días con tope 365; 7,4 el 11 oct).
- **Churn por antigüedad** (familias vivas el 1 may 2026 y el 2 nov, 6,1 meses): > 12 meses 369 → 278, **4,5 %/mes**;
  3–12 meses 540 → 365, **6,2 %/mes**; < 3 meses 429 → 253, **8,3 %/mes** (11 oct: 9,0 %).
- **Vida esperada total: 14,5–16,5 meses** (sin cambio: 7,3 el primer año + 42 % de supervivientes con cola de 4,5–6 %).

## 2. ARPU y margen (sin lectura nueva de Stripe)

| Medida | Valor | Base |
| --- | --- | --- |
| Ingreso por familia y mes | £63 | Stripe, 2 oct (MRR £105–110k ÷ 1.688 familias). Sin recalcular: falta `STRIPE_API_KEY` |
| Contribución por familia y mes | £31 | £63 × 55 % tras profes − £3,45 de soporte (P&L ago) |
| LTV12 de contribución | £226 | 7,3 meses × £31 |
| LTV proyectado de contribución | £450–510 | 14,5–16,5 meses × £31 |

Pendiente para el 5 nov (CFO): ingresos de octubre, MRR a 31 oct y coste de ventas y soporte del mes.

## 3. CAC, ratio y payback

| Medida | Octubre 2026 | Septiembre 2026 | Base |
| --- | --- | --- | --- |
| Gasto Meta + Google | £14.821 (£13.567 + £1.254) | £16.253 | Supermetrics, GBP |
| Familias nuevas (base de producción) | 171 | 223 | Primera matrícula de su historia |
| CAC de medios por familia nueva | **£86,7** | £72,9 | |
| CAC de medios por alta (261 / 310 familias con matrícula nueva) | £56,8 | £52,4 | Incluye las que añaden plaza o vuelven |
| CAC de medios por familia "comprada" (nuevas + vuelven tras > 90 días: 175) | £84,7 | £85,6 (1–25 oct) | |
| Coste de Meta por prueba pagada (Stripe, 355 pruebas) | £38,2 | sem. 41–43: £35,5 / £42,2 / £39,1 | |
| CAC completo (+ £10 de ventas por familia nueva, dato de sep) | **£96,7** | £83 | Octubre: bonus de ventas 382 $ ≈ £281; salarios sin cerrar |
| LTV:CAC a 12 meses (contribución) | **2,3:1** | 2,8:1 | £226 ÷ £96,7 |
| LTV:CAC proyectado | 4,7–5,3:1 | 5,4–6,1:1 | |
| Payback | 3,1 meses | 2,7 | £96,7 ÷ £31 |

Lectura: con el CAC por alta (£56,8 + ventas) el ratio a 12 meses sería 3,4:1, pero el LTV se ha medido por familia nueva,
así que el denominador coherente es el de familias nuevas. El embudo cuadra: £38,2 por prueba pagada ÷ 48 % de familias
nuevas por prueba pagada (171 / 355) ≈ £79 solo Meta, más Google.

## 4. Qué cambia frente al 11 oct

1. CAC de medios por familia nueva £86,7 frente a £69 (1–10 oct) y £72,9 (sep): +19 % en un mes. Causa: Meta gastó
   £13.567 (presupuesto £12.500) y las familias nuevas cayeron de 223 a 171 con 355 pruebas pagadas (septiembre tuvo
   unas 360–380 según las semanas del proyecto de Meta: el problema está entre la prueba y la matrícula, no en el coste
   por prueba, que mejora a £38,2).
2. Retención igual o mejor: churn < 3 meses 8,3 % (9,0 %). La cohorte jul-26 baja al 73 % en el mes 3 (la lectura
   provisional del 11 oct era 77 %), todavía por encima de jul-25 (67 %).
3. Ratio: 2,3:1 a 12 meses. Guardrail de CLAUDE.md: LTV:CAC < 3:1 → no escalar Meta. Noviembre ya baja a £7.500 por plan.

## 5. Pendientes

- [ ] Lucia: `STRIPE_API_KEY` de solo lectura en `.env` (pendiente desde el 11 oct) → ARPU por familia real y pruebas
  pagadas sin pasar por el conector (esta revisión ha tenido que leer 442 cargos de Stripe por el conector para 5 días).
- [ ] 5 nov (CFO): ingresos y MRR de octubre, coste de ventas y soporte → CAC completo de octubre con dato real.
- [ ] 1 dic: releer con la cohorte oct-26 al mes 1 y ago-26 al mes 3 cerrado.
