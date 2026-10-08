# Navidad 2026: plan de ejecución

Tres tests y un calendario. Todo tiene que estar montado y probado el 14 de noviembre: la semana de Black Friday (24 nov) es cuando empiezan las bajas, y las clases paran del 22 de diciembre al 5 de enero.

## Calendario conjunto

| Semana | Qué tiene que quedar hecho | Responsables |
| --- | --- | --- |
| 13 oct | Aprobar las tres ofertas, los precios trimestrales corregidos y la política de pausa | Lucia |
| 20–31 oct | Botón de trimestral (o plan B), canje de la tarjeta regalo y procedimiento de pausa en Stripe | Producto y operaciones |
| 3–7 nov | Textos en tres idiomas, guion de pausa, formación al equipo, diseño de la tarjeta y la landing | Lucia con Claude, Victoria, diseño |
| 10–14 nov | Segmentos y listas, plantillas de WhatsApp aprobadas y prueba completa de los tres tests en modo test | Bárbara y producto |
| 15–17 nov | Pausa larga activa; aviso proactivo a la base; aviso de Black Friday | Soporte, ventas y Bárbara |
| 24 nov – 1 dic | Trimestral de Black Friday | Bárbara, Lucía F. y Virginia |
| 1–24 dic | Tarjeta regalo | Lucia, Bárbara y Lucía F. |
| 15 dic | Campaña de enero lista: 8 creatividades y audiencias | Lucia con Claude |
| 22 dic – 5 ene | Pausa de clases; Meta en su suelo y relanzamiento desde el 26 de diciembre | Lucia |
| 5–6 ene | Recordatorio a familias pausadas y win-back de enero | Bárbara |
| 31 ene, 15 feb y 31 mar | Lecturas de los tres tests | Claude y Bárbara |

## Test 1 · Trimestral de Black Friday para familias activas

**La oferta.** "Pásate al trimestral y te regalamos una semana": 13 semanas de clase por el precio de 12, solo del 24 de noviembre al 1 de diciembre. El trimestral ya es más barato que pagar cada 4 semanas (entre un 3,6 % y un 9 % según la moneda y las clases semanales), así que no se toca el precio: el gancho de Black Friday es la semana extra, igual en todas las monedas (≈ 8 %). Son semanas *de clase*: la pausa del 22 de diciembre al 5 de enero alarga el periodo, no lo consume. Después renueva como trimestral normal, o vuelve a 4 semanas si la familia lo pide.

**A quién.** Familias activas con plan de 4 semanas, con 2 a 9 meses de antigüedad, sin baja programada ni impagos. Las de menos de 2 meses aún están decidiendo y las de más de 9 ya se quedan sin descuento. Estimación: 800–1.000 familias.

**Mecánica**

- **Opción A, recomendada:** botón "Pásate a trimestral" en el panel del alumno. Cambia el precio en Stripe en la próxima renovación (sin prorrateo) y retrasa una semana el primer cobro trimestral, que es la semana regalada. Se hace con Claude Code.
- **Opción B, si producto no llega:** formulario de solicitud y operaciones aplica el cambio a mano en Stripe (cambio programado a la próxima renovación + cupón). Viable hasta \~150 familias; con más, satura a soporte.
- En los dos casos la suscripción lleva el metadato `promo=bf26_trimestral` para poder medirlo.

**Comunicación** (en español, inglés y francés; nada de anuncios a público frío)

| Fecha | Canal | Mensaje | Responsable |
| --- | --- | --- | --- |
| 17 nov | Email | Aviso: "La semana que viene, una oferta solo para familias Diluu" | Bárbara |
| 24 nov | Email, WhatsApp y banner en el panel | Lanzamiento: 12 semanas por el precio de 10,8 hasta el 1 de diciembre | Bárbara (email); Lucía F. y Virginia (WhatsApp) |
| 27 nov | Email a quien no abrió | Recordatorio de Black Friday | Bárbara |
| 30 nov | WhatsApp a quien abrió y no se cambió | "Mañana se acaba" | Lucía F. |
| 1 dic | Email | Último día | Bárbara |
| 24 nov – 1 dic | Conversaciones del día a día | Mencionarlo a cada familia contenta | Todo el equipo de ventas |

**Medición**

- Familias que se cambian (Stripe, `promo=bf26_trimestral`): objetivo ≥ 80.
- Grupo de comparación: familias elegibles que no se cambian, con la misma antigüedad. Se comparan las bajas solicitadas del 1 de diciembre al 15 de febrero. Éxito: la tasa de quienes se cambian es la mitad o menos.
- Caja adelantada en diciembre y coste de la semana regalada: tope £2.000. Una semana son £15–19 por familia (1,66 plazas de media), así que cubre unas 110 familias.
- Riesgo: si se cambian sobre todo familias que no se iban a ir, el descuento es coste sin retorno. Por eso el filtro de 2 a 9 meses y la comparación por antigüedad.

**Tareas**

- [ ] 13 oct · Lucia: aprobar la oferta de la semana extra
- [ ] 20 oct · Claude Code: botón de trimestral (opción A); plan B solo si no llega
- [ ] 3 nov · Lucia con Claude: textos en tres idiomas
- [ ] 10 nov · Bárbara: segmento de Stripe, listas en Brevo y plantillas de WhatsApp enviadas a aprobar
- [ ] 12 nov · Producto u operaciones: prueba completa en modo test (cambio, cupón, metadato y fecha de renovación)
- [ ] 24 nov – 1 dic · Ejecución según el calendario
- [ ] 15 dic · Bárbara: primera lectura (cambios, caja y descuento)
- [ ] 15 feb · Claude y Bárbara: bajas frente al grupo de comparación

## Test 2 · Pausa larga con plaza reservada

**El problema.** En 2025, la semana de Black Friday tuvo 54 bajas y noviembre y diciembre sumaron 254 (Stripe). Muchas familias de diáspora viajan a su país 4–6 semanas en Navidad, y la pausa general (22 dic – 5 ene) solo cubre dos. Si no pueden pausar más, cancelan, y en enero no todas vuelven.

**La política.** Del 15 de noviembre al 31 de diciembre, a toda familia que pida la baja por viaje, vacaciones o "retomamos en enero" se le ofrece una pausa de hasta 4 semanas además de la general (por ejemplo, del 1 de diciembre al 19 de enero), sin coste y conservando grupo, horario y profe. No se cobra mientras dura y se reanuda sola en la fecha acordada, con aviso 7 días antes. Si la baja es por insatisfacción o precio, no se ofrece pausa sino cambio de grupo u horario.

**Lo que cuesta.** Cuatro semanas de una plaza son \~£35–46 sin cobrar, y el profe da la clase igual porque el grupo sigue. Lo que se salva si la familia vuelve: \~£165 de contribución en 12 meses.

**Guion para soporte y ventas**

1. "Siento que os vayáis. ¿Me cuentas el motivo?"
2. Si es viaje, vacaciones o mucho lío: "No hace falta cancelar. Pausamos la plaza hasta el \[fecha\], sin coste, y \[nombre\] vuelve a su grupo, con su profe y su horario."
3. Si acepta: confirmar la fecha de vuelta por escrito con la plantilla.
4. Si no: tramitar la baja y registrar el motivo.

**Mecánica en Stripe.** Usar la pausa de cobro de Stripe con fecha de reanudación, en lugar de los cupones "PAUSA…" de 2025, y añadir el metadato `pausa=navidad26`. Así se mide sola. Producto confirma que el panel y el BI tratan bien la suscripción pausada.

**Comunicación**

- Desde el 15 nov: aviso fijo en el panel (banner, no ventana emergente) con el botón "Pausar hasta enero". 17 nov: email a todas las familias activas: "¿Os vais de viaje estas fiestas? No canceléis, pausad". WhatsApp solo a quien no abra el email en 5 días y, en el guion, a quien pida la baja: los tres canales a la vez para todas sería demasiado y quemaría el WhatsApp para Black Friday, que cae justo después.
- 5 ene: recordatorio a las familias pausadas: "volvemos el 6 de enero" (o su fecha).

**Medición**

- Solicitudes de baja del 15 nov al 31 dic con motivo registrado (soporte y Kommo).
- Porcentaje que acepta la pausa: objetivo ≥ 25 %.
- Pausas que vuelven a pagar antes del 31 de enero: ≥ 70 %.
- Pérdida de plazas en el panel en noviembre y diciembre: no peor que en octubre.

**Tareas**

- [ ] 20 oct · Lucia: aprobar la política (duración máxima y quién puede ofrecerla)
- [ ] 31 oct · Operaciones: procedimiento de pausa en Stripe con metadato y fecha de vuelta, probado
- [ ] 3 nov · Lucia con Claude: guion y plantillas de email y WhatsApp en tres idiomas
- [ ] 7 nov · Victoria: 30 minutos de formación con el guion para soporte y ventas
- [ ] 10 nov · Bárbara: hoja de seguimiento (solicitud, motivo, oferta, resultado y fecha de vuelta)
- [ ] 15 nov · Soporte y ventas: política activa
- [ ] 17 nov · Bárbara: aviso proactivo a toda la base
- [ ] 5 ene · Bárbara: recordatorio de vuelta
- [ ] 31 ene · Claude y Bárbara: lectura

## Test 3 · Tarjeta regalo "Regala español / francés"

**Producto.** Dos tarjetas: 4 semanas y 12 semanas de clase en grupo, al precio de lista de cada moneda. Se compran en un pago único y llegan al momento por email: un PDF imprimible con el nombre del niño, un mensaje y el código. Sirven para empezar entre el 6 de enero y el 31 de marzo de 2027.

**Canje.** La familia que recibe el regalo introduce el código en la web de curso directo, elige grupo y añade su tarjeta de pago. El código convierte las 4 o 12 semanas en un periodo gratuito (en Stripe, 28 u 84 días de prueba); después la suscripción sigue a precio normal salvo que la cancele, con aviso 7 días antes del primer cobro. Eso es lo que convierte un regalo en un cliente. La suscripción lleva los metadatos `gift_code` y `gift_buyer`.

**Plan B si producto no llega:** solo la tarjeta de 4 semanas, vendida con un enlace de pago por moneda y canjeada con un cupón del 100 % de un solo uso que cubre la primera cuota.

**Quién compra y cómo le llega**

- Abuelos, tíos y padrinos en España, Latinoamérica y Francia de niños que viven fuera.
- Familias activas que lo regalan a primos o amigos (otra forma de referido).
- Canales: email a la base el 1, 10 y 18 de diciembre ("Díselo a los abuelos", con enlace para reenviar); WhatsApp a la base el 1 de diciembre; banner en el panel; redes orgánicas; y £500 en Meta del 1 al 20 de diciembre (retargeting de visitantes y público de 50+ años en España, México, Colombia y Francia con el ángulo "tus nietos viven fuera"). Landing /regalo en español, inglés y francés.

**Medición**

- Tarjetas vendidas (Stripe, producto "Tarjeta regalo"): ≥ 40.
- Canjeadas a 31 de enero: ≥ 50 %, y cuántas son familias nuevas.
- Familias que siguen pagando tras el periodo regalado (lectura el 31 de marzo): ≥ 40 %.
- Coste de Meta por tarjeta vendida y por familia que acaba pagando.
- Contabilidad: se cobra en diciembre pero se consume entre enero y marzo; hay que tratarlo como ingreso diferido en el P&L.

**Tareas**

- [ ] 13 oct · Lucia: aprobar formato y precios
- [ ] 27 oct · Producto: canje con periodo gratuito en el checkout, o plan B
- [ ] 7 nov · Diseño: tarjeta imprimible y landing /regalo en tres idiomas
- [ ] 14 nov · Producto: compra y canje probados en modo test en USD, GBP y EUR
- [ ] 21 nov · Lucia con Claude: creatividades y campaña de Meta preparadas
- [ ] 1 dic · Lanzamiento por email, WhatsApp, panel y Meta
- [ ] 10 y 18 dic · Bárbara: recordatorios por email
- [ ] 31 ene y 31 mar · Claude y Bárbara: lecturas
