# Unit economics · cierre de octubre de 2026 (revisión mensual, 2 nov)

Método v4.1 adaptado a familia (docs/analisis/unit-economics-2026-10.md, 11 oct). Todo en libras con los tipos fijos
de CLAUDE.md. Fuentes: base de producción a 2 nov 2026 (`scripts/retencion-familias.sh`, `scripts/mes-datos.cjs`);
Meta y Google por Supermetrics (1–31 oct); coste de ventas y soporte del P&L de septiembre y agosto (sin cierre de octubre
hasta la revisión del CFO del 5 nov). Stripe leído con el conector el 2 nov (sin clave en `.env`): cargos de octubre,
suscripciones creadas en octubre y todas las suscripciones vivas (sección 0).

## 0. Actualización con Stripe (2 nov, 13:00 Bali): sustituye a las cifras de las secciones 2 y 3

| Medida | Valor | Base |
| --- | --- | --- |
| MRR a 2 nov | **£120,5k** | 1.763 suscripciones vivas (`trialing` 1.705, `active` 46, `past_due` 12; una por familia), importe de los items normalizado a mes (4 semanas × 13/12), tipos fijos de CLAUDE.md |
| Ingreso por familia y mes (ARPU) | **£68,4** | £120,5k ÷ 1.763 (2 oct: £63 = £105–110k ÷ 1.688). Parte del salto es la estructura de precios nueva del 22 oct (migración de cobros) |
| Contribución por familia y mes | **£34** | £68,4 × 55 % tras profes − £3,45 de soporte |
| LTV12 de contribución | **£248** | 7,3 meses × £34 |
| LTV proyectado de contribución | **£495–560** | 14,5–16,5 meses × £34 |
| Ingresos cobrados en octubre | **≈ £125,2k** | 2.355 cargos con éxito netos de £0,5k de reembolsos (pruebas £1,3k); sep P&L £118,8k; el P&L del 5 nov manda |
| Suscripciones nuevas de octubre | 328 creadas · **239 vivas** · 18 canceladas · 71 checkouts caducados | Cestas pagadas 78 % (objetivo 80 %); MRR de las nuevas £17,2k = £72 por familia nueva |
| CAC de medios por suscripción nueva viva (base Stripe) | **£62,0** | £14.821 ÷ 239 (sep £60,2 ÷ 270; objetivo del plan ≤ £60 con esta base) |
| CAC completo (base) → LTV:CAC | £96,7 → **2,6:1 a 12 meses · 5,1–5,8:1 proyectado · payback 2,8 meses** | 171 familias nuevas de la base de producción |
| CAC completo (Stripe) → LTV:CAC | £72 → 3,4:1 a 12 meses · 6,9–7,8:1 proyectado · payback 2,1 meses | 239 suscripciones nuevas vivas |

Lectura: el valor de la familia sube (ARPU £63 → £68) y el ratio a 12 meses queda en 2,6:1 con la base de producción,
por debajo del 3:1 que pide el guardrail; con la base de Stripe (la del plan) sí pasa el 3:1. La diferencia entre
denominadores (171 frente a 239) era la decisión del CAC pendiente desde el 15 oct, tomada el 2 nov a favor de Stripe: con Stripe el CAC de medios
de octubre es £62 (≈ objetivo); con la base de producción, £86,7 (+45 %).

## Resumen

- **LTV:CAC a 12 meses baja de 2,9:1 a 2,3:1** porque el CAC de medios por familia nueva sube de £72,9 (sep) a **£86,7**
  (oct: £14.821 de Meta + Google entre 171 familias nuevas de la base). Proyectado, 4,7–5,3:1 (antes 5,7–6,5:1).
  Payback 3,1 meses (2,5). El guardrail del 3:1 solo se cumple en proyectado: Meta no se escala.
- La retención no empeora: churn mensual por antigüedad 8,3 % (< 3 meses), 6,2 % (3–12) y 4,5 % (> 12), frente a
  9,0 / 6,1 / 4,5 el 11 oct. Las cohortes nuevas siguen reteniendo mejor al tercer mes (jul-26 73 %, ago-26 81 %
  provisional; jul-25 67 %).
- El problema de octubre es el numerador (gasto +8,5 % sobre presupuesto en Meta) y el denominador (171 familias nuevas,
  −23 % frente a septiembre con pruebas pagadas casi iguales), no el valor de la familia.


## 0 bis. CAC máximo que soportan las campañas (pregunta de Lucia, 2 nov; el 4 nov Lucia fija que el ratio se calcula solo con el CAC de Stripe)

Base: contribución £34 por familia y mes (ARPU Stripe £68,4 × 55 % tras profes − £3,45 de soporte), LTV12 de contribución
£248, LTV proyectado £495–560, coste de ventas £10 por familia nueva. CAC de medios = CAC completo − £10. Todo por familia
nueva de la base de producción (171 en octubre); con la base de Stripe (239) el CAC de octubre es £62 y entra en la banda.

| Criterio | CAC completo máximo | CAC de medios máximo | Payback | Octubre 2026 (base: £96,7 / £86,7) |
| --- | --- | --- | --- | --- |
| Escalar (5:1 a 12 meses) | £50 | £40 | 1,5 meses | No |
| Guardrail mínimo (3:1 a 12 meses) | £83 | **£73** | 2,4 meses | No (2,6:1) |
| Escalar con el LTV proyectado (5:1) | £99–112 | £89–102 | 3 meses | Sí (5,1–5,8:1) |
| Mínimo con el LTV proyectado (3:1) | £165–187 | £155–177 | 5 meses | Sí |
| No perder dinero en 12 meses (1:1) | £248 | £238 | 7 meses | Sí |
| No perder dinero en la vida de la familia | £495–560 | £485–550 | 15–16 meses | Sí |

Lectura: por encima de £73 de medios por familia nueva la familia tarda más de 2,4 meses en devolver lo que costó y el
ratio a 12 meses baja del 3:1; sigue siendo rentable (se recupera en el primer trimestre de vida y rinde 5:1 a vida
completa), pero sin margen para una caída de retención: con el churn de los meses 2–6 al 10 % en vez del 8 %, el LTV12 baja
un 11 % y £73 pasa a ser £65. Techo absoluto razonable: £100 de medios (5:1 proyectado, payback 3 meses); por encima, cada
familia extra no se paga hasta el cuarto mes y la hoja de ruta de 2027 (crecer siendo rentables) no cuadra.

**Decisión de Lucia (2 nov, 13:10 Bali): la base del guardrail es Stripe** (suscripciones nuevas vivas del mes) con los umbrales
del plan, £50 / £65; octubre £62,0 → mantener. £65 de medios equivalen a 3,3:1 a 12 meses con esta contribución. Lo que sigue
era la propuesta alternativa con la base de producción, que queda como referencia: **< £60 subir un 15 %**
(≈ 3,5:1 a 12 meses, equivale a los £50 de Stripe del plan), **£60–75 mantener**, **> £75 bajar un 15 %**, **> £100 cortar
tests y volver al núcleo**. Octubre (£86,7) → bajar; noviembre ya baja a £7.500. Si Lucia prefiere la base de Stripe (la del
plan), los umbrales son los del 2 oct (£50 / £65) y octubre (£62) cae en "mantener".

## 0 ter. Cómo sabremos si el LTV mejora (pregunta de Lucia, 4 nov)

Los 7,3 meses solo se pueden medir en cohortes que ya han cumplido un año, así que la cifra se mueve despacio: cada revisión
mensual añade la cohorte que acaba de cumplir 12 meses (la de nov-25 el 1 dic; hoy la de oct-25 da 7,6 meses, 231 días).
Para ver la mejora antes, la revisión mensual publica estos indicadores adelantados de la tabla de la sección 1:

| Indicador | Base (may–jul 2025) | Último dato (2 nov) | Lectura |
| --- | --- | --- | --- |
| Supervivencia al mes 1 | 90 % | sep-26 93 %, ago-26 93 % | mejor |
| Supervivencia al mes 3 | 67–78 % (media 71 %) | jul-26 73 %, ago-26 81 % (provisional) | mejor |
| Supervivencia al mes 6 | 54–59 % (media 56 %) | abr-26 59 % | igual |
| Churn mensual < 3 meses de antigüedad | 9,0 % (11 oct) | 8,3 % | mejor |
| Ingreso por familia y mes (Stripe) | £63 (2 oct) | £68,4 | mejor |

Regla: el LTV12 se da por mejorado cuando la cohorte que cumple 12 meses supera los 7,3 meses, o cuando m3 y m6 de las
cohortes nuevas superan el 71 % y el 56 % de la base dos meses seguidos. Si m3 de ago-26 se confirma en 81 % y m6 sigue
≥ 59 %, el LTV12 de las familias que compramos hoy estaría en £270–290, no en £248. Pendiente (1 dic): sustituir los
meses de calendario por meses facturados por familia en Stripe (facturas por cliente), que descuentan las pausas.

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
