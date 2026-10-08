# Referidos: comunicación y medición

El panel nuevo ya permite invitar: la familia que invita gana 30 € por cada alumno que se apunte y la invitada hace la prueba gratis. El email del 26 de septiembre lo contaba entre muchas novedades. Ahora necesita un empujón propio, momentos automáticos y una forma de medirlo, porque hoy Stripe no lo ve.

## Calendario de comunicación

| Fecha | Canal | A quién | Mensaje | Responsable |
| --- | --- | --- | --- | --- |
| 13 oct | Email propio (ES, EN y FR) | Todas las familias activas | "Invita a una familia: ellos prueban gratis y tú ganas 30 € por cada alumno que se apunte", con botón directo al apartado del panel | Bárbara |
| Desde el 13 oct | Tarjeta fija en la portada del panel | Todas las familias | Tu código y un botón "Compartir por WhatsApp" con el mensaje ya escrito | Claude Code |
| 15–31 oct | WhatsApp personal | ≈ 150 familias "embajadoras": 3 meses o más, con hermanos o buenas valoraciones | Mensaje personal de Lucía F. u operaciones | Lucía F. |
| Siempre (automático) | Email tras la 4.ª clase y tras una valoración positiva | Cada familia en ese momento | "¿Os está gustando? Comparte tu código con otra familia" | Bárbara (Brevo) |
| 10–16 nov | Email + panel | Todas las familias | Semana de recompensa doble (60 €): mide cuánto pesa el incentivo | Bárbara |
| 1–20 dic | Email + panel | Todas las familias | "Regala una clase de prueba a otra familia esta Navidad" | Bárbara |

El canal que más rinde en familias de diáspora suele ser el grupo de WhatsApp (padres del cole, comunidad hispana o francesa local). Por eso el botón de compartir por WhatsApp con el mensaje escrito es la pieza más importante.

## Cómo medirlo

**El problema.** Los 198 códigos de referido creados desde el 8 de septiembre son cupones de Stripe para la prueba, pero la prueba se cobra fuera del checkout de suscripción y un cupón no puede aplicarse ahí. Ningún cargo ni suscripción desde el 25 de septiembre lleva rastro de un referido. Tal y como está, un referido no se vería en Stripe aunque ocurriera.

**El cambio (con Claude Code):** cuando alguien usa un código de referido, guardar `referral_code` y `referrer_client_id` en el registro de la prueba y en los metadatos de la suscripción cuando se apunte. Con eso, todo se lee en Stripe y en el panel.

| Paso del embudo | Fuente | Objetivo Q4 |
| --- | --- | --- |
| Familias que comparten o copian su código | Evento del panel | ≥ 10 % de las familias activas (≈ 170) |
| Pruebas con código de referido | Base de datos de pruebas | ≥ 80 |
| Altas de pago referidas | Stripe (metadatos) | ≥ 40 |
| Altas que pagan la segunda cuota | Stripe | ≥ 35 |
| Coste por alta referida | 30 € de crédito + prueba gratis | ≤ £35 (frente a £60 de paid) |

Se revisa cada lunes en el registro semanal de canales, con lecturas el 15 de noviembre (¿funciona la recompensa doble?) y el 15 de diciembre. A partir de febrero, comparar la retención de las familias referidas con la del resto: suele ser mejor, y eso subiría lo que se puede pagar por referido.
