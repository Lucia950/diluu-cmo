# Ads en diciembre de 2026: propuesta (4 nov 2026, pendiente del OK de Lucia)

Pregunta de Lucia: ¿parar unos días, bajar presupuesto u otro tipo de campañas? Lo que hacen otras empresas y lo que dicen
nuestros datos. Fuentes: base de producción (pruebas, reservas y matrículas por semana, 27 oct 2025 – 1 feb 2026), Meta por
Supermetrics (gasto y compras del píxel por semana, nov 2025 – ene 2026), plan Q4 (docs/planes/plan-q4-2026-y-hoja-de-ruta-2027.md).
Las clases se pausan del 22 dic al 5 ene.

## 1. Lo que pasó en la Navidad de 2025

| Semana (lunes) | Gasto Meta | Compras píxel (entonces ≈ pruebas) | Pruebas dadas | Reservas hechas | Plazas nuevas | Altas |
| --- | --- | --- | --- | --- | --- | --- |
| 10 nov | £629 | 2 | 44 | 43 | 127 | 32 |
| 17 nov | £278 | 0 | 68 | 20 | 57 | 18 |
| 24 nov | £645 | 1 | 19 | 19 | 41 | 19 |
| 1 dic | £2 | 0 | 17 | 14 | 36 | 11 |
| 8 dic | £0 | 0 | 21 | 10 | 25 | 9 |
| 15 dic | £0 | 0 | 9 | 6 | 10 | 3 |
| 22 dic | £0 | 0 | 6 | 1 | 2 | 1 |
| 29 dic | £1.695 | 34 (£50) | 3 | 33 | 21 | 8 |
| 5 ene | £2.630 | 80 (£33) | 6 | 126 | 88 | 33 |
| 12 ene | £2.632 | 77 (£34) | 106 | 123 | 180 | 51 |
| 19 ene | £2.654 | 74 (£36) | 126 | 119 | 194 | 58 |

Octubre y noviembre de 2025 no sirven de referencia de demanda: la base se migró en esas semanas (897 "plazas nuevas" la
semana del 27 oct) y Meta cambió de objetivo en noviembre (CPM £5–7, £96–645 por compra). Lo que sí se lee:

1. **Con los anuncios apagados, diciembre dio 56 pruebas y 25 altas** (orgánico y marca). La primera quincena todavía
   movía 17–21 pruebas y 10–14 reservas a la semana; del 15 al 28 de diciembre, 6–9 pruebas y 1–6 reservas.
2. **La demanda vuelve el 29 de diciembre, no el 5 de enero**: 33 reservas esa semana con £1.695 de gasto, y a partir del
   5 de enero 120 reservas semanales a £33–36 por compra del píxel, el coste más bajo del año.
3. **Apagar no costó aprendizaje**: la cuenta arrancó el 29 dic desde cero y a la semana siguiente estaba en £33. El
   reinicio del aprendizaje de Meta pesa menos que la estacionalidad.
4. La conversión prueba → curso de las cohortes de 2025 no se puede medir (la base no enlazaba prueba y matrícula hasta
   2026): no sabemos si las familias de diciembre convirtieron peor. En 2026 lo mediremos con `scripts/conversion-cohortes.cjs`.

## 2. Lo que hacen otras empresas (práctica del sector; sin cifras suyas)

- Nadie con suscripción familiar apaga del todo: bajan a un gasto de mantenimiento sobre los anuncios ganadores (un ad set
  pausado más de 7 días pierde el aprendizaje; una bajada de presupuesto de más del 20 % en un día lo reinicia también),
  y concentran el dinero del 26 dic al 15 ene, cuando el CPM cae un 30–40 % frente a la primera quincena de diciembre
  (retail) y la intención de "empezar algo nuevo" es máxima.
- Del 1 al 20 de diciembre cambian el mensaje, no la audiencia: tarjeta regalo (abuelos, familia), "reserva tu plaza de
  enero" y campañas a quien ya hizo la prueba (en nuestro caso, ≈ 1.000 familias con prueba sin curso desde julio).
- Las campañas de alcance o reproducciones baratas de diciembre no venden: nuestro propio noviembre de 2025 (£96–645 por
  compra) es el ejemplo.

## 3. Propuesta para diciembre de 2026 (Meta + Google ≈ £6.700; el plan decía £4.500)

| Tramo | Meta por día | Qué corre | Mensaje | Gasto |
| --- | --- | --- | --- | --- |
| 1–13 dic | £150 | Solo los dos ad sets ganadores de noviembre (núcleo ES EE. UU. y FR Compra de prueba); sin tests | "Empieza ya: tus primeras clases antes de Navidad" hasta el 7 dic; desde el 8, "reserva tu clase de prueba de enero" (la prueba de la semana del 15 ya cae en enero para muchos horarios) | £1.950 |
| 1–20 dic | £500 en total | Tarjeta regalo (T3 del plan): templadas y familias activas | Regalo de clases | £500 |
| 14–25 dic | £100 | Mantenimiento: mismos dos ad sets + retargeting a prueba sin curso (audiencia de BF) | "Plaza de enero reservada, pagas en enero" | £1.200 |
| 26–31 dic | £330 | Relanzamiento (plan): núcleo con los creativos nuevos de enero (listos el 14 dic) | Año nuevo, "empieza enero hablando español/francés" | £2.000 |
| Google, todo el mes | ≈ £35 | Marca, keywords EN y francés; genérica y PMax paradas del 15 al 26 | | £1.000 |

Reglas: no pausar ningún ad set más de 7 días; las bajadas de presupuesto en dos pasos de −20 % (1 y 3 dic; 14 y 16 dic)
para no reiniciar el aprendizaje; a partir del 26 dic subir un 20 % al día hasta los £700/día de enero (£22.000). Coste
máximo aceptado en diciembre: £55 por prueba pagada de Meta (CPM alto) y lectura el 1 dic con la conversión a 14 días de
las cohortes de noviembre; si la conversión de noviembre baja del 35 %, el tramo 1–13 dic se recorta a £100/día.

Lo que hay que tener listo porque diciembre lo decide enero: creativos de enero el 14 dic (plan), landing y páginas de
clases con precios de la API (encargo al developer), metadatos de utm en Stripe (medición mínima), email de pausa larga
(15 nov), emails de referidos de Navidad (1–20 dic) y secuencia tras la baja (23 dic).

## 4. Qué cambiaría frente al plan del 2 oct

El plan tenía £4.500 (≈ £80/día del 1 al 25, más £500 de tarjeta y £2.000 de relanzamiento). La propuesta sube a
£6.700 para no apagar del todo y poder "comprar" las reservas de enero desde el 8 de diciembre. Si Lucia prefiere el plan,
el dato de 2025 dice que apagar no castigó el arranque de enero: es una opción válida, con menos reservas en diciembre
(≈ 40–60 pruebas pagadas menos) y la misma salida el 26 dic.
