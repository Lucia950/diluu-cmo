# Revisión mensual · octubre de 2026 (lectura del lunes 2 nov, 09:30–11:30 hora de Bali, WITA)

Mes revisado: 1–31 de octubre de 2026. Fuentes: base de producción de Diluu (2 nov, `scripts/mes-datos.cjs` y
`scripts/retencion-familias.sh`); Supermetrics: Meta Ads (act_2456974117647730 y act_911299640142242), Google Ads
(4584208097), GA4 (425989233) y Search Console (sc-domain:diluu.com); Stripe (listado de cargos del 1–3 y 30–31 oct por el
conector; 4–29 oct, diarios del proyecto de Meta); hoja TRACKING VENTAS INTERNO (Sales results monthly, BONUS OCT 2026);
herramienta SEO Diluu (colecciones `contactos`, `ia`, `publicados`); `data/auditoria-web-2026-11-02.md`. Todo en libras,
tipos fijos de CLAUDE.md. Solo lectura en todas las plataformas. Notion no se ha podido leer (la integración devuelve 404 para
la página Q4 2026): las fechas salen de docs/planes/q4-seguimiento-objetivos-fechas-2026-10-14.md y docs/equipo/.

## Resumen en seis líneas

1. **Octubre cierra con 261 altas (objetivo ≥ 320, −18 %) y 171 familias nuevas (sep 223, −23 %)** con 355 pruebas
   pagadas (≈ las de septiembre) y £14.821 de paid (+5,9 % sobre los £14.000 del plan). El embudo se rompió entre la
   prueba y la matrícula, no en el coste por prueba (£38,2 de Meta, mejor que en septiembre).
2. **Plazas: 2.973 el 2 nov** (2.882 el 2 oct: +91). Faltan 27 para el suelo y 127 para el objetivo. 449 nuevas y 236
   canceladas netas (8,2 % del stock de partida; septiembre 321). Las cancelaciones de la segunda quincena (45 y 26 por
   semana frente a 64–72) se recontarán al alza: el registro llega con retraso.
3. **CAC de medios por familia nueva £86,7** (sep £72,9; plan ≤ £60). Por alta, £56,8. Rompe los dos umbrales (£65 de
   Stripe y £79 propuesto para la base): la regla dice bajar Meta un 15 %; el plan de noviembre ya la baja a £7.500.
4. **LTV:CAC a 12 meses 2,3:1** (2,9:1 el 11 oct); proyectado 4,7–5,3:1. La retención no empeora (churn < 3 meses
   8,3 %, antes 9,0 %); empeora el CAC. Meta: MANTENER sin subir.
5. **Conversión prueba → curso a 30 días de la cohorte de septiembre: 45,5 % por prueba, 52,5 % por familia** (agosto
   39,9 % / 46,7 %). Bajas en los primeros 30 días: 8,4 % de las familias (ago 9,2 %). Referidos: 2 altas de 25.
6. **Para el trimestre quedan 439 altas en 59 días (52 a la semana; octubre hizo 59).** Al ritmo de octubre, el 31 dic
   da 3.050–3.130 plazas; con la caída estacional de 2025 (nov −35 %, dic −60 %), 2.950–3.000. El suelo depende de que
   noviembre aguante el ritmo y de los tests de retención, que siguen sin montar.

## 1. El mes contra el plan

### 1.1 Captación y plazas (base de producción)

| Indicador | Objetivo oct | Octubre 2026 | Septiembre 2026 | Octubre 2025 | Fuente |
| --- | --- | --- | --- | --- | --- |
| Altas (familias con matrícula nueva) | ≥ 320 | **261** (82 %) | 310 | 198 (Stripe, plan Q4) | Base; 2025 solo Stripe |
| Familias nuevas (primera matrícula) | ≥ 470 en el Q4 | **171** (36 % del Q4) | 223 | 155 (base, incompleta) | Base |
| Desglose de las 261 altas | | 171 nuevas · 53 añaden plaza · 33 vuelven < 90 d · 4 vuelven > 90 d | 223 · 35 · 37 · 15 | | Base |
| Bajas de familias | | 156 con alguna cancelación; **119 sin ninguna plaza activa el 31 oct** | 216 / 137 | | Base |
| Familias activas | | 1.786 (2 nov) | ≈ 1.763 (18 oct) | | Base |
| Plazas activas | ≥ 3.000 el 31 dic | **2.973 (2 nov)**; 2.913 el 26 oct | 2.882 (2 oct) | | Base, lectura del día |
| Plazas nuevas | | 449 (1,72 por alta) | 519 (1,67) | | Base |
| Plazas canceladas netas (brutas) | pérdida ≤ 9,5 % | 236 (278) · **8,2 %** del stock del 2 oct | 321 (359) · ≈ 11 % | | Base; oct se recontará al alza |
| Pruebas (clases) | | 519 · no presentados 14,4 % | 630 · 14,9 % | 358 | Base |
| Pruebas pagadas | | **355** (£38,2 de Meta por prueba) | ≈ 360–380 (semanas del proyecto de Meta) | | Stripe + diarios de Meta |
| Conversión prueba → curso 30 d (cohorte del mes anterior) | ≥ 48 % | sep: **45,5 %** por prueba (53,5 % de las asistidas) · 52,5 % por familia | ago: 39,9 % · 46,7 % · 46,7 % | | Base (definición en fuentes.md) |
| Bajas en los primeros 30 días (cohorte del mes anterior) | ≤ 14 % | sep: 6,7 % plazas · **8,4 % familias** | ago: 9,6 % · 9,2 % | | Base |
| Trimestre: altas | ≥ 700 | 261 (37 %) | | Q4 2025: 377 | |

- Por semana (octubre): plazas nuevas 69 (1–4) · 125 · 92 · 90 · 73 (26–31); canceladas netas 29 · 64 · 72 · 45 · 26;
  pruebas 75 · 119 · 94 · 128 · 103. La semana 44 (26 oct–1 nov) es la primera con menos de 30 cancelaciones registradas
  desde septiembre: no es una mejora, es retraso de registro (la semana 42 pasó de 58 a 80 en una semana).
- Motivos de las 278 cancelaciones brutas: no tiempo / asuntos familiares 52, no es cancelación 34, no responde 34,
  cancelan una de sus clases 26, otro 23, pausa o viaje 22, no les gustan 18, inconformes 18, pasan a presenciales 16,
  pago fallido 12, reactivada 8, dinero 5.
- Países de las 449 plazas nuevas: EE. UU. 230 (51 %), Reino Unido 98 (22 %), Australia 27, Alemania 19, Países Bajos 10.
- Stock y flujos siguen sin cuadrar: +91 de stock frente a +213 de flujos (449 − 236). El stock reconstruido a una fecha
  pasada con la base no sirve (da 4.357 el 1 oct): se sigue con la lectura del día (fuentes.md).
- El mismo mes de 2025 solo es comparable en paid y SEO: la base empieza en octubre de 2025 (1.399 matrículas creadas ese
  mes por la migración), así que las altas de 2025 son las de Stripe del plan (oct 198, nov 129, dic 50).

### 1.2 Paid

| Canal | Presupuesto oct | Gasto oct | Resultado | Coste | Septiembre | Octubre 2025 |
| --- | --- | --- | --- | --- | --- | --- |
| Meta Ads | £12.500 | **£13.567 (+8,5 %)** | 253 compras píxel (incluyen matrículas) · 355 pruebas pagadas (Stripe, todos los orígenes) · CTR cuenta 1,12 %, núcleo 1,17 % · CPM £16,1 · frecuencia ≤ 2,9 | £53,6 / compra píxel · **£38,2 / prueba pagada** | £14.544 · 292 · £49,8 · CTR 1,11 % · CPM £18,7 | £8.467 · 177 · £47,8 · CTR 1,29 % · CPM £10,9 |
| Google Ads | £1.500 | £1.254 (−16 %) | 22 conversiones | £57 / conv. | £1.709 · 38 · £45 | £300 · 33 · £9 |
| Total | £14.000 | **£14.821 (+5,9 %)** | | | £16.253 | £8.767 |

CAC de medios (Meta + Google, base de producción): **£86,7 por familia nueva** (171) · £56,8 por alta (261) · £84,7 por
familia "comprada" (171 nuevas + 4 que vuelven tras > 90 días). Septiembre: £72,9 / £52,4. Solo Meta: £79,3 por familia
nueva. Objetivo del plan: ≤ £60 (medido con familias nuevas de Stripe; sin cifra de Stripe este mes). Por el embudo:
£38,2 por prueba pagada ÷ 48 % de familias nuevas por prueba pagada (171/355) ≈ £79 de Meta.

Meta por campaña (octubre; entre paréntesis, los 14 días 18–31 oct):
- FR Prospecting Video1: £4.224, 107 compras, £39 (14 d £1.196 / 37 = £32). **31,1 % del gasto: supera el tope del 30 %.**
- USA Prospecting ES: £2.999, 59, £51 (£1.833 / 33 = £56).
- FR TEST Creativos ABO: £2.079, 20, **£104** (£1.264 / 12 = £105). Test con CPA > £80 todo el mes.
- USA TEST Conversión ES: £1.483, 20, £74 (£974 / 14 = £70). En la media de la cuenta por Stripe (26 oct): se queda.
- FR Prospecting Compra de prueba (desde el 19): £968, 14, £69 (sin 14 días completos hasta el 2 nov).
- ES Europa+AU pool: £940, 21, £45 (£418 / 10 = £42). Frecuencia 2,9, la más alta.
- USA TEST Creativos UGC ES: £725, 11, £66 (£226 / 3 = £75). Por Stripe (12–25 oct) £194 por prueba: sobra.
- Cribados por reproducciones £62; Placements Feeds+Stories £88 / 1.
- Tests (ABO + Conversión + UGC): £4.287, 32 % del gasto, 51 compras (£84).
- Pruebas FR en Stripe −20/−25 % desde septiembre con −27 % de gasto FR (nota del proyecto de Meta, 31 oct): el coste por
  prueba FR no empeora (£44–50); Australia sin entrega desde el 5 oct.

Google por campaña (octubre; 14 días 18–31 oct):
- Búsqueda Español keywords EN: £390, 7 conv., £56 (£142 / 2,5 = £57). MANTENER.
- Búsqueda Francés idioma inglés: £374, 4, **£94** (£166 / 1). > £90: no sube a £20/día.
- Búsqueda EEUU Español online (exacta): £148, **0** (parada desde el 20; sep £209 / 3). **Test EE. UU.: CORTAR** (decidido en
  esta revisión; desde el 1 sep £356 por 3 conversiones, £119).
- Búsqueda Español keywords ES (genérica): £137, 3, £46; las 3 fueron del 1 al 4 oct (14 d £40 / 0). Sigue congelada.
- PMax Español EN (prueba, desde el 23): £91, 229 clics, 0,26 conv. MEDIR hasta el 6 nov (14 días).
- Búsqueda Francés keywords FR (desde el 23): £39, 24 clics, 0. MEDIR hasta el 6 nov.
- Marca: £74, 7,7 conv.

### 1.3 GA4 (sesiones / eventos clave; eventos fiables desde julio)

| Canal | Octubre | Septiembre | Oct 2025 (sesiones) |
| --- | --- | --- | --- |
| Paid Social | 10.273 / 1.703 | 6.684 / 984 | 7.677 |
| Organic Search | 8.003 / 453 | 7.761 / 295 | 15.810 (mapas) |
| Direct | 3.110 / 482 | 3.378 / 638 | 2.980 |
| Paid Search | 974 / 234 | 1.194 / 282 | 811 |
| Referral | 939 / 73 | 689 / 90 | 428 |
| Organic Social | 246 / 110 | 498 / 71 | 414 |
| Email | 216 / 95 | 239 / 51 | — |
| AI Assistant | **164 / 69** | 135 / 44 | — |
| Unassigned | 87 / 21 | 3.220 / 507 | 2.893 |

Paid Social dobla eventos con +1,7 % de gasto: el píxel y GA4 cuentan matrículas y reservas, no altas. Unassigned se ha
reasignado (3.220 → 87).

### 1.4 SEO, IA, email, referidos, ventas

- **SEO.** Clics de padres (páginas de clases, prueba y precios, por página, menos marca): **104 en octubre** (sep 101, jul
  108, ago 101; oct 2025 143; objetivo 110 en diciembre, 150 en marzo). Impresiones de padres 5.486 (sep 5.011). Search
  Console total 6.520 clics (sep 7.060; oct 2025 14.341: la caída es de los mapas). Páginas: /french-classes-for-kids 104
  clics, /fr/cours-de-francais-pour-enfants-en-ligne 44, /spanish-classes-for-kids 35. GA4 orgánico en páginas de padres
  ≈ 400 sesiones y ≈ 134 eventos clave (/french-classes-for-kids 175 / 73). Búsquedas ocultas: 96 % de los clics sin marca
  de las páginas de clases llegan sin búsqueda visible (sep 99 %). Publicado en octubre: artículo 1 (ES/EN/FR, 15 oct;
  revisión ok) y el post de libros mejorado (30 oct). Indexación del A1 sin pedir desde el 20 oct.
- **Enlaces** (tablero de Bárbara, 37 tarjetas): 4 "enlace conseguido", todos directorios o perfiles (Qwoted, ActivityHero,
  Mum's Guide To, KidsActivities.ie) → **4 de 10 directorios, 0 de 8 enlaces de medios**; 4 respondieron (Le Petit Journal
  cobra 150 €, Cathy Duffy no reseña directo, BiliKids pide Zoom, FLAM reclama por su marca), 17 contactados, 11 por
  contactar, 1 rechazado.
- **IA.** GA4: 164 sesiones y 69 eventos clave (ChatGPT ≈ 120; objetivo de diciembre 150 sesiones: cumplido en octubre).
  Línea base (Bárbara, 30 oct, 12 preguntas × ChatGPT, Gemini y Perplexity): **Diluu aparece en 10 de 36 respuestas**
  (ChatGPT 5 de 12, todas en 1.º–3.º; Perplexity 5 de 12, 3 en 1.º–3.º; Gemini 0 de 12). Objetivo: +2 preguntas el 31 dic.
- **Email.** Sin conector de Brevo en esta sesión (ni en la lista de herramientas): altas por automatización sin dato.
  GA4: 216 sesiones y 95 eventos (sep 239 / 51); las landings de prueba desde Brevo suman 59 sesiones y 54 eventos. El
  email de referidos del 15 oct (A/B) se lee en la web de Brevo.
- **Referidos** (base, octubre): 361 códigos nuevos (549 familias con código, 31 % de las activas), 6 amigos invitados,
  10 pruebas referidas (3 convertidas), **2 altas (3 plazas)** y 2 recompensas acreditadas. Desde el 23 sep: 2 altas de 25
  (8 %). Coste por alta: 30 $ de crédito + prueba gratis ≈ £25.
- **Ventas** (hoja TRACKING VENTAS INTERNO). Plazas de octubre: 321 (Lucía F. 80, Bárbara 36, directo 205, Victoria 0;
  sep 397: 85 / 49 / 256 / 7). Bonus de octubre: Lucía F. 49 familias (298 $), Bárbara 27 (84 $), Virginia 1, Victoria 0;
  vendedoras 77 de 182 familias pagadas (42 %); curso directo sin vendedora 105 familias / 205 plazas. Conversión a 30 días
  del panel: pendiente de Victoria. Enlaces de pago creados en Stripe: sin dato (objetivo 0 desde el 1 nov).

### 1.5 Tests del plan (ninguno tiene métrica todavía)

| Test | Métrica de éxito | Estado el 2 nov |
| --- | --- | --- |
| T1 Trimestral de Black Friday (familias activas) | ≥ 80 familias, ≤ £2.000 | Textos 3 nov, montado 13 nov, 24 nov–1 dic |
| T2 Pausa larga con plaza reservada | ≥ 25 % aceptan, ≥ 70 % vuelven | **Política pendiente desde el 20 oct**; Stripe 31 oct sin confirmar; activa 15 nov |
| T3 Tarjeta regalo | ≥ 40 vendidas | Creativos hoy 2 nov; landing 7 nov; campaña 19 nov; lanzamiento 1 dic |
| Black Friday familias nuevas (Marta) | ≥ 60 altas, CAC ≤ £55, £1.500 | **Oferta sin elegir desde el 22 oct** (análisis: oferta 1); emails de Marta el 5 nov |
| Landing de curso directo con garantía | ≤ £110 por familia, £60/día × 28 | Quién la hace: pendiente desde el 28 oct; salida prevista 3 nov |
| Cesta abandonada (WhatsApp 2 h) | Cestas pagadas 68 % → 80 % | Activo desde el 24–25 oct; 15 checkouts caducados del 23 al 29 (proyecto de Meta) |

## 2. Unit economics

Detalle en docs/analisis/unit-economics-2026-10-cierre.md. ARPU por familia £63 (sin recalcular: Stripe sin clave), vida
en el primer año 7,3 meses, LTV12 de contribución £226, proyectado £450–510. **CAC de medios £86,7 y completo £96,7 por
familia nueva → LTV:CAC 2,3:1 a 12 meses (11 oct: 2,9:1) y 4,7–5,3:1 proyectado; payback 3,1 meses.** Churn por antigüedad
(1 may → 2 nov): 8,3 % (< 3 meses), 6,2 % (3–12), 4,5 % (> 12). Lo que empeora es el CAC, no el valor de la familia.
Guardrail: < 3:1 a 12 meses → Meta no se escala.

## 3. Canales: clasificación y presupuesto de noviembre (£9.000: Meta £7.500 + Google £1.500)

| Canal | Clasificación | Por qué | Noviembre |
| --- | --- | --- | --- |
| Meta Ads | **MANTENER (a la baja)** | CAC por familia nueva £86,7 > £65 y > £79; CTR del núcleo 1,17 % (≥ 1,1 %); Video1 FR 31 % del gasto (> 30 %); frecuencia ≤ 2,9; £38,2 por prueba pagada mejora | £7.500 como en el plan (−40 %; absorbe el −15 % de la regla). Dentro: cortar UGC ES (£725 / 11 en el mes, £194 por prueba Stripe); FR ABO a la mitad o fuera (£105 por compra en 14 días, 17 % del gasto FR); Video1 ≤ 30 %; Compra de prueba FR y USA Conversión siguen como tests con lectura el 16 nov. Fuerte hasta el 20 nov; después retargeting y ganadores |
| Google Ads | **MANTENER** | £57 por conversión; keywords EN £56; francés £94 (> £90) | £1.500. EEUU exacta CORTAR (decisión de hoy); genérica congelada; francés sin subir; PMax y keywords FR se leen el 6 nov con 14 días (si 0 conversiones con > £120, fuera) |
| SEO | **ARREGLAR** | 104 clics de padres (objetivo 110 en dic); 0 enlaces de medios de 8; A1 sin indexar | Sin presupuesto. Comparativa de francés 3 nov, A2 6 nov, A3 20 nov, "Diluu en 10 datos" 27 nov; encargo al developer (sección 0) sin desplegar |
| IA (asistentes) | **MANTENER** (antes MEDIR) | 164 sesiones / 69 eventos; línea base 10 de 36 respuestas | Comparativa de francés y página de 10 datos; lectura 7 dic |
| Email | CAMBIAR DE FUNCIÓN | Sin dato de Brevo; GA4 216 / 95 | Email 1 "prueba sin pago" el 15 nov (Marta 12 nov); 0 envíos masivos |
| Referidos | **ARREGLAR** | 2 altas de 25; 6 invitaciones en el mes con 549 códigos | Lectura del A/B y del WhatsApp a embajadoras (26 oct) el 16 nov; si < 5 altas acumuladas el 30 nov, el objetivo de 25 se revisa |
| Social orgánico | MANTENER | 246 sesiones / 110 eventos | — |
| Leads | CORTAR (vigente) | — | — |

Reasignación: ninguna hacia arriba. El dinero que sale de UGC ES y FR ABO (≈ £2.800 al ritmo de octubre) no se recoloca:
noviembre baja a £7.500 y la regla de mitad de mes (15 nov) solo permite subir si el CAC de medios de 1–15 nov queda por
debajo del umbral que decida Lucia.

## 4. Lo que hay que tener en cuenta para el trimestre

- **Altas:** 261 de 700. Faltan 439 en 59 días (8 semanas y 3 días): **52 a la semana**. Octubre hizo 59 a la semana con
  £14.800 de paid; noviembre tendrá £9.000 y diciembre £4.500 con pausa desde el 22. Reparto necesario: nov ≥ 270, dic ≥ 170
  (el plan decía 240 / 140 contando con 320 en octubre). Al ritmo de octubre: nov ≈ 250, dic ≈ 175 → ≈ 690. Con la
  estacionalidad de 2025 (nov −35 %, dic −60 % sobre oct): ≈ 600.
- **Plazas:** 2.973; faltan 27 para 3.000 y 127 para 3.100. Al ritmo de octubre (1,72 plazas por alta, pérdida 8–9 %):
  3.130 el 30 nov y 3.050–3.090 el 31 dic (pérdida de diciembre 11–12 %). Con la estacionalidad de 2025: 2.950–3.000. El
  suelo se juega en noviembre.
- **Riesgos con cifra:** (1) las 236 cancelaciones de octubre subirán al recontar (la segunda quincena registra 71 frente a
  136 la primera: +40–60 probables); (2) CAC de medios £86,7 frente a £60 del plan (+45 %) con 171 familias nuevas: cada
  10 familias nuevas menos suben el CAC £5; (3) Video1 FR concentra el 31 % del gasto y las pruebas FR han caído un 20–25 %;
  (4) Navidad: pausa 22 dic–5 ene, pérdida ≈ 12 % en 2025 (≈ 360 plazas sobre 3.000); (5) tres tests de retención sin
  montar y dos decisiones vencidas (pausa larga desde el 20 oct, Black Friday familias nuevas desde el 22 oct); (6)
  referidos 2 de 25; (7) FLAM reclama la marca de /fr/cours-flam-en-ligne (3 sesiones orgánicas en octubre: coste bajo de
  retirarla).
- **Las 3 decisiones de Lucia este mes:**
  1. **5 nov · CAC:** denominador y umbrales del guardrail de Meta. Propuesta: CAC de medios por familia nueva de la base,
     mensual; subir Meta un 15 % si < £80, bajar un 15 % si > £100; semanalmente, coste por prueba pagada de Stripe
     (banda £33–42). Octubre (£86,7) → Meta se queda en los £7.500 del plan.
  2. **5 nov · Black Friday y pausa larga:** elegir la oferta de BF para familias nuevas (análisis del 22 oct: oferta 1)
     antes de que Marta escriba los 5 emails (5 nov), y escribir la política de pausa larga (T2, vencida el 20 oct) para
     que Stripe y el guion de ventas (3 nov) salgan.
  3. **7 nov · FLAM y precios:** responder a FLAM Monde y decidir si /fr/cours-flam-en-ligne se retira o se renombra; y
     confirmar si el schema Course sigue a la API (10,25 $ desde el 1 nov) o se fija en 10 $ (decisión del 26 oct), porque
     hoy las 39 páginas de clases llevan un precio que la API ya no da.
  Vencidas además: landing con garantía (quién la hace, 28 oct; salida 3 nov), confirmación 48 h de pruebas (24 oct),
  encargo al developer sección 0 (24 oct), marca HeySpanish (24 oct), test EE. UU. de Google (hoy: cortar).
- **Marta (docs/equipo/marta-plan-entregas.md; estado lo confirma Lucia):** octubre: plan de BF (24 oct; consta una
  versión del 22 oct), informe "qué vende y qué no" (28 oct; sin confirmar), brief de vídeos y textos de la landing
  (31 oct → límite 5 nov). Noviembre: 5 emails de BF (5 → 10 nov), todo montado y probado (10 → 14), emails de pausa y
  trimestral (10 → 14), email 1 "hizo la prueba y no pagó" (12 → 15), emails de tarjeta regalo y referidos (27 → 30),
  brief de la campaña de enero (28 nov → 1 dic).
- **Bárbara (docs/equipo/barbara-seo-propuesta.md):** octubre: A1 publicado y revisado, post de libros mejorado, línea base
  de IA, 19 contactos y 4 fichas de directorio con enlace; sin hacer: indexación del A1 (desde el 20 oct). Noviembre:
  comparativa de francés (3 nov), A2 apps (6 nov), fichas de directorio (6, 13 y 20 nov), A3 heritage (20 nov), "Diluu
  en 10 datos" (27 nov), seguimientos de enlaces (12 correos del 19 oct vencen el 2 nov). Pendientes de Lucia en su
  herramienta: FLAM, BiliKids, ActivityHero (tarjeta), Qwoted.

## 4 bis. Salud de la web (`python3 scripts/auditoria-web.py --gsc data/gsc-paginas-2026-10.csv --oculto 100 104`, 2 nov)

| Apartado | 26 oct | 2 nov | Qué cambia |
| --- | --- | --- | --- |
| URLs con tráfico que redirigen mal o dan 404 | 23 de 324 | **23 de 333** | Las mismas 23: nada desplegado (encargo 0.6 y 0.7) |
| Enlaces internos a páginas rotas o que redirigen | 19 | **19** | /fr/french/ sigue enlazada desde 40 páginas |
| Páginas de clases con problemas (sin JavaScript) | 0 de 39 | **39 de 39** | La API cambió precios el 1 nov (grupo 12,75 € / 14,25 $; anual 10,25 $; lectoescritura 16 €) y el HTML sigue con 10 $ / 15,75 €; 11 páginas con la línea de precios desactualizada |
| Sitemap de Yoast sin 200 directo | 4 | 4 | 3 formularios de referidos cerrados + /fr/french/ |
| Búsquedas ocultas (clics sin marca de páginas de clases) | 99 % | 96 % | Sigue la alarma: medir por página |

Los 10 problemas con más clics: /fr/french/ (556 clics, en el sitemap y redirige), /fr/french-classes-for-kids/ (97, fr→en),
/fr/blog/spanish-kids-shows-on-youtube/ (82, fr→es), /es/french-classes-for-kids/ (38, es→en), /fr/blog/family-activities-…
(37, fr→es), /fr/blog/online-language-classes-vs-apps-for-kids/ (5), /fr/blog/best-languages-… (5), /es/fr/blog/best-online-…
(3, 404), /fr/fr/blog/spanish-as-a-second-language-… (3, 404), /en/fr/literacy-from-scratch-course/ (2, dos saltos).
Al developer: sección 0.8 añadida a docs/analisis/encargo-developer-paginas-clases-2026-10.md (precios de la API en el HTML
en el build; nada nuevo de redirecciones). A Lucia: la subida de precios en EUR y USD del 1 nov (¿intencionada?) y la
decisión sobre el schema. `scripts/auditoria-urls-historicas.csv` pasa de 293 a 295 rutas.

## 5. Avisos sobre los datos

- Stripe: sin `STRIPE_API_KEY`. Las pruebas pagadas son 297 de los diarios del proyecto de Meta (4–29 oct; la semana 12–18
  con la cifra de Lucia, 69) más 58 leídas con el conector (442 cargos del 1–3 y 30–31 oct, hora de Londres, mismo filtro
  que el script). Ingresos, MRR y suscripciones nuevas del mes: sin dato hasta la revisión del CFO (5 nov).
- Base de producción: las cancelaciones se registran con retraso; octubre se recontará. El stock a fecha pasada no se
  reconstruye (fuentes.md). `course.language` no existe en las matrículas (idioma en `course.subject`): el reparto por
  idioma queda para el script del mes que viene.
- Notion: la página Q4 2026 devuelve 404 a la integración (desde el 19 oct se leía bien): fechas de la copia del 14 oct.
- Brevo: sin conector en esta sesión. Panel bi.diluu.com: no se lee (decidido el 19 oct). Supermetrics devuelve `cost`
  sin moneda (GBP). El píxel de Meta cuenta matrículas como compras desde agosto.
- Search Console: límite histórico 2 jul 2025 (la serie de clics de padres empieza en julio de 2025, no en junio).
- Conversión a 30 días: definición propia (fuentes.md); el panel direct-course mide otra cosa.
