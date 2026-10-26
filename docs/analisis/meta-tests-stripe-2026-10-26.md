# Meta: pruebas pagadas por campaña en Stripe (12–25 oct 2026)

Pregunta de Lucia (26 oct): si alguno de los tres tests con CPA de píxel > £80 sobra de verdad, juzgado con Stripe y no
con el píxel.

Fuentes: Stripe, listado de cargos (`GetCharges`, 1.236 cargos del 12 al 25 oct en hora de Londres, leídos enteros);
prueba = cargo con éxito y `metadata.direct_trial = true`, sin reembolsos ni pruebas internas; campaña = `metadata.utm_id`.
Gasto: Supermetrics (FA), por campaña y semana. Sin datos personales.

## Totales

- Pruebas pagadas: 68 en la semana 42 y 90 en la 43 (Lucia, desde el proyecto de Meta: 69 y 92; diferencia ≤ 3 %).
- Con `utm_id` de una campaña de Meta: 31 y 50 (81 de 158, el 51 %). Sin utm: 61; con `fbclid` pero sin utm: 7; Google: 9.
- Gasto de Meta en los 14 días: £6.511. Por prueba con utm: £80,4 (por prueba pagada de cualquier origen sin Google: £43,7).
  El coste por prueba con utm duplica al real porque la mitad de las pruebas no lleva utm; sirve para comparar campañas
  entre sí (índice = coste de la campaña ÷ media de la cuenta), suponiendo que la falta de utm se reparte igual.

## Por campaña

| Campaña | Gasto 14 d | Pruebas con utm (s42 + s43) | £ por prueba utm | Índice | Semana 42 → 43 | Píxel 14 d |
| --- | --- | --- | --- | --- | --- | --- |
| ES — Europa+AU — pool sept26 | £416 | 11 (5 + 6) | £38 | 0,47 | £42 → £34 | 10 |
| USA — Prospecting — ES | £1.394 | 27 (11 + 16) | £52 | 0,64 | £44 → £57 | 32 |
| FR — Prospecting — Compra de prueba (desde el 19) | £383 | 5 (0 + 5) | £77 | 0,95 | — → £77 | 6 |
| **USA — TEST Conversión — ES** | £834 | 10 (2 + 8) | £83 | 1,04 | £171 → £62 | 10 |
| **FR — TEST Creativos — ABO** | £1.141 | 11 (3 + 8) | £104 | 1,29 | £141 → £90 | 11 |
| FR — Prospecting — Diluu (Video1) | £1.912 | 15 (10 + 5) | £127 | 1,59 | £121 → £141 | 37 |
| **USA — TEST Creativos — UGC ES** | £389 | 2 (0 + 2) | £194 | 2,42 | — → £92 | 2 |
| Cribados por reproducciones (semana 42) | £43 | 0 | — | — | — | 0 |

Muestras pequeñas (2–27 pruebas por campaña): sirven para ordenar, no para afinar.

## Lectura

1. **UGC ES sobra**: £389 y 2 pruebas en 14 días; a coste medio habría traído 5. Cortar.
2. **USA TEST Conversión ES no sobra**: en la media de la cuenta en 14 días y por debajo en la semana 43 (£62, desde que
   optimiza a «Compra de prueba» con los carteles, 17 oct). Con la regla del píxel (£82) se habría pausado: el píxel
   lo ordena mal. Lectura de 14 días del proyecto de Meta: 31 oct.
3. **FR TEST Creativos ABO, en observación**: 1,3 veces la media en 14 días, pero mejora (£141 → £90) mientras su gasto
   sube un 69 %. No debería gastar más que la gemela.
4. **El problema mayor no es un test: es Video1 FR**, la línea francesa principal: £1.912, 1,6 veces la media, y empeora
   (£121 → £141). Cuadra con la caída de la landing francesa de la semana 42. Lo revisa el proyecto de Meta por anuncio
   (Video1 frente a Video5 con `utm_content`).
5. La regla «pausar tests con CPA de píxel > £80» clasifica mal: propuesta para Lucia, cambiarla por «test con ≥ £300 en
   14 días y coste por prueba con utm > 1,5 veces la media de la cuenta → pausar» (hoy, > £120).

## Aviso sobre el script

`scripts/semana-datos.cjs` contaba como prueba los cargos ≤ 400: se perdían las de 2–3 niños (800 y 1.200 USD) y las de
AUD, NZD, JPY, SEK y DKK (semana 43: 67 frente a 90). Corregido el 26 oct: cuenta por `metadata.direct_trial`.
