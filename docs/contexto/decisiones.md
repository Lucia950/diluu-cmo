# Decisiones (más reciente arriba)

- **2026-11-09** · Revisión de la estrategia SEO y herramienta v42 (Lucia, 17:00 Bali; análisis en
  docs/analisis/seo-revision-estrategia-2026-11-09.md):
  (1) **Qué convierte** (GA4, 11 ago–8 nov, Organic Search + AI Assistant, eventos clave): mapas 10.800 sesiones → 11; blog
  sin mapas 1.400 → 10; páginas de clases 930 → 270 (/french-classes-for-kids 402 → 148); IA 390 → 140. Decisiones: desde el
  A4 (último informativo), los artículos de Bárbara solo con intención de compra o de problema; francés primero; las páginas
  de clases de español son un problema de páginas (encargo de Lucia), no de posts; medir por página de destino.
  (2) **No se invierte en «clases de español para niños» ni «español para niños»** (Search Console 6 meses: 110 impresiones,
  1 clic, posición 35; México 43, España 17, EE. UU. 16, Reino Unido 10; Google enseña el A1 ES, no la página de clases).
  La página ES se orienta a la diáspora. **Fuera de las 30 búsquedas** «cursos para niños de 10 a 12 años» y las dos de
  lectoescritura (9 impresiones en 6 meses, México y España); **entran** «clases de español online para niños en Estados
  Unidos» (página ES, Lucia), «mi hijo entiende español pero no lo habla» (A3 ES + test) y «cómo mantener el español de mi
  hijo en el extranjero» (A1 ES). Hoy las tres tienen 0 impresiones: son objetivo. Hoja y herramienta actualizadas.
  (3) **Ciudades: ningún programa.** «london» 105 impresiones y 2 clics en 12 meses; Dublin, Manchester, Nueva York y Miami
  0. Solo el test de Londres de enero (≥ 1 prueba pagada en 8 semanas) y mejorar /blog/spanish-classes-for-kids-near-me/
  (4 sesiones → 7 eventos clave).
  (4) **Herramienta v42** (versión 1794216192-50ef): estados de las 30 búsquedas «Página de Lucia / Artículo / Mejorar /
  Vigilar / Sin plan» (nunca «Pendiente») y columna de impresiones con su periodo (90 días desde el 15 nov); motivo
  obligatorio al mover una tarjeta a Rechazado o Sin respuesta (campo `motivo`, se añade a notas); aviso rojo bajo la
  cabecera si los datos tienen más de 8 días (`D.actualizado`); en los pasos con más de 7 días pendientes, «¿qué te frenó?»
  que se guarda en `preguntasLucia` (de «Herramienta») y llega a Lucia por el aviso diario; el paso de las IA del viernes
  pasa desde diciembre a revisar las respuestas de la API (10 min; la ronda del 27 nov es la última a mano, para
  comparar); nueva tabla «Qué páginas convierten» (`D.convPaginas`) y tendencia semanal de las 10 búsquedas de compra
  (`D.compraSerie`, la rellena seo-lunes). Search Console en Supermetrics perdió la conexión el 9 nov: Lucia la reconecta.

- **2026-11-09** · Rutinas en la nube y preguntas a las IA por API (Lucia, 15:00–16:30 Bali):
  (1) **Aviso diario por Slack** de las novedades de Bárbara: rutina en la nube `trig_01VNb5bPhpwTNRqbWxU4X1UK` («Diluu SEO ·
  aviso diario a Lucia», 10:00 Bali, Sonnet 5.5, conector Slack), primera ejecución el 10 nov. Lee `contactos` (actualizado en
  26 h con estado Respondió / En negociación / Enlace conseguido / Ficha publicada / Rechazado / Sin respuesta), `preguntas`
  para Lucia sin respuesta, `preguntasLucia` respondidas, `revisiones` y la nota del día; si hay algo, un DM a Lucia; si no, nada.
  (2) **seo-lunes pasa a la nube**: rutina `trig_012ahJ9Mm5z9VcHmHH92EtRw` (domingo 20:00 Bali, Fable 5.1, conectores
  Supermetrics y Google Sheets, repo diluu-cmo), primera ejecución el 15 nov; la rutina local de Claude Code del domingo
  se desactiva cuando la de la nube lleve dos ejecuciones correctas. El repo `Lucia950/diluu-cmo` que figuraba desde el
  8 oct **nunca se había creado**: Lucia lo creó privado el 9 nov (≈ 16:30 Bali) y Claude hizo el primer push (36 commits). La skill seo-lunes lee desde hoy `preguntasLucia` y sabe que corre en la nube (sin
  mongo ni claves; push a main o rama + PR).
  (3) **Preguntas a las IA por API, no a mano**: `scripts/ia-respuestas.cjs` (OpenAI Responses + web_search con ubicación,
  Gemini con grounding, Perplexity sonar; 36 llamadas; país del padre fijado por pregunta; clasificación igual que la
  herramienta; citas). Lo ejecuta la revisión mensual desde el 1 dic. Claves que Lucia guarda con claves-propias:
  `OPENAI_API_KEY`, `GEMINI_API_KEY`, `PERPLEXITY_API_KEY`. El paso manual del viernes de Bárbara se mantiene hasta comparar las
  dos lecturas en diciembre (decisión pendiente). GA4 sigue siendo la métrica que decide.
  (4) **Cómo se redactan las respuestas de colaboración** (Lucia dio por perfecta la de El Ibérico): prosa natural, sin
  listas de «lo que os ofrecemos»; la entrevista se reserva en el Caluu de Lucia, sin plazos; recursos al final; regla en
  docs/equipo/barbara-seo-propuesta.md (Enlaces) y en la memoria de Claude.
  (5) El Ibérico: la respuesta a Paco deja claro que lo gratuito es el cuestionario online de 2 minutos, no una clase (la clase
  de prueba cuesta 3 £); si el periodista escribe «prueba gratuita», se pide la corrección.

- **2026-11-09** · SEO de Bárbara, semana 45 y herramienta v41 (Lucia, mediodía Bali):
  (1) **Preguntas a Bárbara por la herramienta, no por Slack**: bloque «Preguntas para ti» en Hoy (colección `preguntasLucia`;
  cada pregunta con su campo de respuesta y botón «Pedir ayuda a Peter», que responde con el contexto de la herramienta). Lucia
  escribe las suyas desde el mismo bloque; Claude las escribe por la base; la rutina seo-lunes lee las respuestas. Primeras 12 el
  9 nov: artículo 2 en «cambios» (84/100: los 5 cambios son menores, Claude da el «listo» cuando sepamos qué la frenó), los tres
  directorios pasados a Rechazado el 6 nov (020.co.uk, Homeschool Hub Utah y Online Homeschool Curriculum Directory tienen alta
  gratuita), Hoop, Happity, FLAM Dublin (respuesta final sin confirmar envío), Connection First y Spanish Mama (sin seguimiento
  desde el 19 oct), Growing Up Bilingual (125 $: no se paga), cómo hizo la línea base de las IA, The Raising Bilinguals y El Ibérico.
  (2) **Método fijo para las preguntas a las IA** (paso del viernes y guía): ChatGPT y Perplexity en incógnito y sin sesión; Gemini
  con una cuenta de Google creada solo para esto y la actividad desactivada; nunca la cuenta de Diluu ni la de Bárbara (con memoria,
  el asistente sabe que quiere oír «Diluu»); una conversación nueva por pregunta; anotar cuenta y país. Si la línea base del 30 oct
  (10 de 36) se hizo con sesión, se repite. La métrica que decide sigue siendo GA4 (sesiones y eventos clave desde asistentes).
  (3) **El Ibérico**: Lucia da declaraciones. Paco de la Coba (fundador y director del periódico gratuito en español de Londres,
  2010; hoy digital) pidió el 6 nov la propuesta a su correo: respuesta redactada en la tarjeta, Bárbara la envía el lunes 9 a
  director@eliberico.com. Propuesta editorial (reportaje sobre niños que entienden español pero no lo hablan, test gratuito); si
  contestan con tarifas, se cierra.
  (4) Instagram: Lucia da acceso a Bárbara el 10 nov (desde Meta Business Suite no podía iniciar conversaciones). La Tundra, los
  seguimientos parados por Instagram y Hoop pasan al martes.
  (5) El brief del artículo 3 se escribió en local el 3 nov y no se publicó hasta hoy (la rutina seo-lunes del 9 nov se interrumpió
  en un permiso): Bárbara no lo veía. Publicado en la v41 con las 10 búsquedas de compra. Pendiente: pasar seo-lunes a rutina en la
  nube (domingo 20:00 Bali = 12:00 UTC) y una rutina diaria que avise a Lucia por Slack de las respuestas de colaboraciones.

- **2026-11-04** · WhatsApp de cesta abandonada a las 2 h: **funciona desde hoy, 4 nov** (Lucia), no desde el 24–25 oct como
  decían el registro de la semana 43 y la revisión de octubre. Los cuatro workflows de n8n («Cestas › abierta», «2 h sin
  pagar», «pagada», «nos escribe») se publicaron el 4 nov a las 12:18 Bali; plantilla `curso_directo_dudas_<idioma>`;
  **la tarea de Kommo a las 24 h no está montada**. Lucia pide su efectividad en los próximos informes: entra en
  registro-semanal (bloque "Cesta abandonada") y en revision-mensual, con `scripts/cestas.cjs` (fuentes.md). Se mide por
  familia, no por pedido: **línea base sin WhatsApp (sem. 40–44) 90,4 % de las familias que abren cesta de curso directo
  acaban pagando; de las 39 que seguían sin pagar a las 2 h, 24 (61,5 %) pagaron solas después**. El margen real del
  WhatsApp son ≈ 3 familias por semana (las 15 de 39 que no volvieron), no "una de cada tres" como sugería el 68 % por
  pedido de Stripe (que mezcla reintentos de la misma familia). Efecto = recuperadas tarde − 61,5 % × abiertas a las 2 h;
  nada que concluir antes de 4 semanas (≈ 1 dic). Análisis: docs/analisis/cesta-abandonada-linea-base-2026-11-04.md.

- **2026-11-04** · Diciembre 2026, propuesta de ads (pendiente del OK de Lucia): docs/planes/ads-diciembre-2026.md. Datos de la
  Navidad de 2025: con Meta apagado (£68 en todo diciembre) hubo 56 pruebas y 25 altas; la demanda volvió el 29 dic (33 reservas,
  £1.695) y desde el 5 ene 120 reservas/semana a £33–36 por compra del píxel, el coste más bajo del año; apagar no costó
  aprendizaje. Propuesta: £150/día del 1 al 13 dic solo núcleo, tarjeta regalo £500, £100/día de mantenimiento del 14 al 25
  ("reserva tu prueba de enero" + retargeting), relanzamiento £2.000 del 26 al 31 subiendo un 20 %/día hacia los £700/día de
  enero; Google £1.000 con genérica y PMax paradas del 15 al 26. Total ≈ £6.700 (plan £4.500). Decisión final el 1 dic con la
  conversión a 14 días de noviembre (si < 35 %, 1–13 dic a £100/día). Pendiente también desde el 4 nov: meses facturados por
  familia en Stripe en la revisión del 1 dic (añadido a la skill revision-mensual).

- **2026-11-04** · Presupuesto de paid de noviembre (Lucia, OK): **£17.000** = Meta £13.500 (≈ £450/día, el nivel de octubre)
  + Black Friday £2.000 aparte (24 nov–1 dic, templadas) + Google £1.500. Sustituye a los £9.000 del plan del 2 oct
  (Meta £7.500), que se fijaron antes de ver octubre y con una estacionalidad de noviembre de 2025 que no vale (Meta gastó
  £3,4k ese mes y cambió de objetivo). Motivos: coste por prueba pagada estable (£35,5–42,2 con £2.700–3.600 semanales),
  CAC Stripe £62 (tope 3:1: £73; techo £100) y 439 altas pendientes para 700. Freno semanal: coste por prueba pagada de
  Meta > £46 dos semanas seguidas, o CAC Stripe del 1–15 nov > £65 → −15 %. Enero sigue en £22.000. Trimestre: ≈ £36.300
  de paid frente a £27.500 del plan, dentro de los £44.100 de marketing del P&L si "otro marketing" se queda en ≈ £12k.
  **Seguimiento del LTV**: cada revisión mensual recalcula la vida en el primer año con las cohortes que ya tienen 12 meses
  (noviembre añade la de nov-25) y publica los indicadores adelantados (supervivencia a 1, 3 y 6 meses de las últimas
  cohortes frente a la base may–jul 2025, churn por antigüedad, ARPU de Stripe); el LTV12 "mejora" cuando la cohorte que
  cumple 12 meses supera 7,3 meses o cuando m3/m6 de las nuevas superan 67 %/55 %. Pendiente para el 1 dic: meses
  facturados por familia en Stripe (facturas por cliente) para sustituir los meses de calendario.

- **2026-11-04** · LTV:CAC con un solo CAC (Lucia): el ratio y las decisiones se calculan solo con el CAC de medios por
  suscripción nueva viva de Stripe (+ £10 de ventas); octubre 3,4:1 a 12 meses (antes se daban dos: 2,6:1 con la base y
  3,4:1 con Stripe). El CAC por familia nueva de la base y el CAC por alta se anotan como contraste, sin ratio. LTV12 de
  contribución £248 = 7,3 meses de vida en el primer año (cohortes may–jul 2025, base de producción, tiempo entre la
  primera y la última clase con tope de 365 días, incluye pausas) × £34 de contribución mensual (ARPU Stripe £68,4 × 55 %
  tras profes − £3,45 de soporte). Aviso: si las pausas no se cobran, 7,3 meses de calendario sobreestiman los meses
  pagados; pendiente de medir meses facturados por familia en Stripe. Noviembre 2025 no sirve de referencia estacional:
  Meta gastó £3,4k (−60 % frente a octubre) y cambió de objetivo (CPM £5–7, 24 compras, £143 por compra).

- **2026-11-03** · Enlaces internos desde las páginas con más tráfico (Lucia dio el OK a tocar los mapas): no hace falta. Las
  tres páginas de mapas ya enlazan 3 veces cada una a su página de clases con el texto de la búsqueda de compra, y los
  13 posts con más sesiones orgánicas de octubre también (1–3 enlaces cada uno). La palanca está agotada. Diagnóstico de
  los clics de padres (Search Console, ago–oct 2025 frente a 2026): la caída está en las páginas en español, que
  perdieron su tráfico con el cambio de URL de abril de 2026 (antiguas /es/spanish-classes-for-kids/,
  /es/spanish-for-kindergartners/ y literacy-from-scratch: ≈ 208 clics en ago–oct 2025; las nuevas, ≈ 15 en ago–oct 2026).
  Se recuperan desde que las redirecciones se arreglaron (clases ES: 49 → 148 → 253 impresiones de ago a oct).
  /french-classes-for-kids/ sube de 80 a 424 clics. /spanish-classes-for-kids/ nunca ha posicionado para búsquedas
  genéricas (posición 40–80 también en 2025).

- **2026-11-02** · WordPress, hecho con Claude in Chrome (Lucia, OK): las redirecciones de /referidos-diluu/,
  /referrals-diluu/ y /programme-de-parrainage/ (plugin Redirection; llevaban a formularios de Google cerrados, 668, 472
  y 512 visitas acumuladas) van ahora a https://students.diluu.com/referrals (panel de familias). Las páginas de WordPress
  «French» (/fr/french/, cuya redirección la hace el servidor) y las tres de referidos pasan a borrador: salen del sitemap
  de Yoast y las redirecciones siguen. La portada /fr/ es estática y no cambia. auditoria-web --rapido: 200 URLs, todas
  200. Encargo al developer en un solo prompt: FLAM, llms.txt (hoy lo genera el plugin Hostinger Tools con 2 URLs que dan
  404) y sameAs del schema Organization (docs/analisis/encargo-dev-2026-11-02-flam-llms-schema.md; faltan las URLs de
  Instagram, Facebook y LinkedIn). Fichas públicas (2 nov): Google Maps ya sin dirección, 108 reseñas, 5,0, pero sigue
  enlazando a heyspanish.com; Trustpilot (94 reseñas, 4,9, «no ha pedido reseñas recientemente») y Yelp siguen con
  178 Webheath, NW6. Bing Webmaster Tools: sin verificar (ni DNS, ni fichero, ni etiqueta).

- **2026-11-02** · SEO, segunda tanda (Lucia, 17:00 Bali):
  (1) **FLAM: se quita de toda la web y no se vuelve a nombrar nunca** (textos, metas, schema, menús, URL; tampoco
  «Français Langue Maternelle»). /fr/cours-flam-en-ligne/ pasa a /fr/francais-pour-enfants-bilingues/ con 301; hoy
  15 páginas y 61 menciones, y el menú de todas las páginas FR. Encargo al developer: docs/analisis/encargo-dev-flam-2026-11.md.
  Bárbara contesta hoy a FLAM Dublin (texto en su tarjeta: retirada antes del vie 6 nov) y confirma cuando esté en la web;
  Parapluie FLAM pasa a Rechazado (sin seguimientos). El menú del blog FR (74 ficheros) lo cambia Claude desde el repo del
  blog cuando la URL nueva esté publicada.
  (2) **«Pregúntale a Peter»** en la herramienta SEO Diluu (v40), en honor a Peter Lead: chat con Claude (capacidad sample)
  con el plan, las reglas (`D.peter.reglas`) y el paso o la tarjeta. Marca, dinero, terceros, accesos y cambios de plan
  van «para Lucia» (colección `preguntas`; Lucia contesta en la pestaña Semana).
  (3) **10 búsquedas de compra** (`D.compra`, pestaña Datos), cada una con una sola página; todos los enlaces internos y
  externos de Bárbara van a esa página. Posición semanal en seo-lunes. La comparativa de español del 7 dic rehace
  /blog/best-online-spanish-courses-for-kids/, que es la URL que Google enseña para «online spanish classes for kids».
  (4) Herramienta: plan por estado (el A2, publicado el 29 oct, ya no pide publicarse), campos de precios en el paso de la
  comparativa que entran solos en el texto, columna «a quién recomienda cada IA» en las preguntas, brief del A3 con mapa
  de búsquedas (la versión FR no se toca: 201 impresiones, posición 19,6). Reseñas de Google al mes, métrica de ops.

- **2026-11-02** · SEO de Bárbara, auditoría de la semana 44 (Lucia, 16:00 Bali):
  (1) **Objetivos nuevos de Bárbara**: sesiones desde asistentes de IA 220 al mes en diciembre (antes 150; octubre 164–171)
  y Diluu en 14 de 36 respuestas de las IA en diciembre (línea base 30 oct: 10 de 36; Gemini 0 de 12, prioridad). Enlaces:
  10 fichas de directorio + 3 menciones en podcasts o medios (antes 8 enlaces de medios). Las fichas cuentan como presencia
  (citas), no como enlaces: de las 4 «conseguidas», solo Mum's Guide To lleva un enlace visible (nofollow); KidsActivities.ie
  solo enlaza en Premium (no se paga) y ActivityHero lo carga con JavaScript. Clics de padres (110 en dic) queda como métrica
  del equipo, que depende sobre todo de las páginas de clases (Lucia). Bárbara ve también lo que trae el canal: pruebas
  pagadas de origen orgánico en Stripe (octubre: 100 de 348; incluye búsquedas de marca y asistentes).
  (2) Pieza libre de la semana del 7 dic: comparativa de clases de español online para niños (equivalente a la de francés).
  (3) **Los briefs y todas las comprobaciones previas los hace Claude** (búsquedas que trae el post y cuáles conserva o se
  mueven a otra URL, canibalización, enlaces, datos), siempre antes de encargarle nada a Bárbara y según lo que haya que
  publicar; no se espera al domingo anterior. El brief del A3 se hace ahora.
  (4) El plan de la herramienta avanza por el estado de cada pieza, no por la fecha: si ya está publicada, salta a revisión.
  La herramienta guía para que lo que Bárbara averigua (precios de la comparativa, a quién citan las IA) entre directamente
  en el texto del artículo o del brief, no para guardarlo aparte. Las capturas de las IA no se guardan.
  (5) Redes: Bárbara tiene acceso al Instagram de Learn with Diluu y usa su Facebook personal para los mensajes por otra vía.
  (6) BiliKids: sí al Zoom con Lucia; se reserva en https://caluu.diluu.com/VNKv8VsEGkgTsBPb1hHg6QvE (vale para cualquier
  reunión de enlaces).
  (7) Los 5 enlaces internos del 22 oct están publicados (commit aa309ff del blog, 30 oct). Respuesta a Bárbara publicada en la herramienta el 2 nov (respuestas/2026-11-02).

- **2026-11-02** · Guardrail del CAC de Meta, decidido (Lucia, 13:10 Bali): **la base es Stripe**, como en el plan del 2 oct.
  Denominador = suscripciones creadas en el mes y vivas al cierre (una por familia; leídas por el conector, `GetSubscriptions`
  con `created` del mes y estado `trialing`/`active`/`past_due`). Umbrales del plan: CAC de medios < £50 → Meta +15 %;
  > £65 → −15 %; entre medias, mantener. Octubre: £14.821 / 239 = **£62,0 → mantener** (sep £60,2). En términos de LTV
  (contribución £34/mes, LTV12 £248): £65 de medios + £10 de ventas = 3,3:1 a 12 meses, coherente con el mínimo de 3:1.
  La cifra por familia nueva de la base de producción (£86,7) se sigue anotando como contraste, no decide. La regla no
  obliga a bajar Meta en noviembre: el nivel (plan £7.500 frente a la propuesta de £11.500 del registro de la semana 44)
  es una decisión de presupuesto pendiente de Lucia.

- **2026-11-02** · Correcciones y decisiones de Lucia sobre el registro de la semana 44 (12:40 Bali):
  (1) El presupuesto de Meta se decide por rendimiento, no por el plan: los £7.500 de noviembre eran una cifra del
  2 oct. Coste por prueba pagada estable (£35,5–42,2 en las semanas 41–44 con gasto de £2.700–3.600; sin saturación),
  pero CAC de medios £86,7 por familia nueva (> £65) y LTV:CAC 2,6:1 a 12 meses (< 3:1): la regla da −15 %, no −45 %.
  Propuesta de Claude: Meta ≈ £11.500 en noviembre (≈ £385/día) + BF aparte; pendiente del OK de Lucia. Dato que falta:
  conversión de las pruebas de nov–dic 2025 frente a oct 2025 (efecto Navidad), se saca de la base.
  (2) La conversión prueba → familia nueva no es el problema (42 %, 43 %, 47 % en las últimas tres semanas; cohorte
  sep 45,5 %; objetivo 48 %). Las 50 altas de la semana 44 son 43 familias nuevas (+43 %) y 7 añadidos/vueltas (oct
  ≈ 20/semana): la caída está en hermanos, segundo idioma y vueltas, no en captación. Datos que faltan: conversión por
  cohorte semanal (7/14/30 d), por idioma y por canal de origen de la prueba (se añaden a semana-datos.cjs); Kommo
  (tiempo al primer contacto, motivo de no compra) no está disponible.
  (3) Black Friday para familias nuevas, oferta decidida: «apúntate ahora, diciembre gratis y lo que pagas empieza en
  enero». Diciembre gratis cuesta 3 semanas de clase (1–21 dic): ≈ £26 de contribución por familia. Presupuesto
  propuesto: £2.000 en Meta (24 nov–1 dic, templadas: ≈ 900 familias con prueba sin curso desde julio, web 90 d, lista),
  +£500–1.000 a lookalikes si al tercer día el coste por alta es < £40; objetivo 60 altas ≤ £55 de medios. Primer cobro
  de renovación (febrero) = punto de churn a vigilar. Noviembre total ≈ £15.000 (Meta £11.500 + BF £2.000 + Google £1.500).
  (4) Umbral de CAC de medios por familia nueva (contribución £34/mes, LTV12 £248): ≤ £73 permite escalar (3:1 a
  12 meses); £100 es el techo (5:1 a vida completa, payback 3 meses). Propuesta para el 5 nov: < £75 subir Meta 15 %,
  > £100 bajar 15 %, entre medias mantener; semanal, coste por prueba pagada en banda £33–42.
  (5) Stripe: no hace falta `STRIPE_API_KEY`; el conector (GetCharges por listado, hora de Londres, jq sobre los
  ficheros) es la vía oficial de la rutina. Se retira el pendiente.
  (6) Notion: la página Q4 2026 sigue en la misma URL; el 404 es de la integración de Claude (1f8d872b…): Lucia la
  comparte con la conexión desde Notion. Brevo: el conector está en la sesión; última campaña clásica 30 sep (RTG26).
  (7) Política de pausa larga: email a las familias con la información de la pausa de Navidad el 15 nov.
  (8) Landing de curso directo con garantía: no sale el 3 nov; se prueba dentro de la oferta de BF y, según vaya, se
  arranca en enero.
  (9) Marta: plan de BF, informe «qué vende y qué no» y brief de vídeos de BF entregados (Lucia, 2 nov).

- **2026-11-02** · Revisión mensual de octubre (docs/registros/revision-mensual-2026-10.md): 261 altas (objetivo 320), 171
  familias nuevas, 2.973 plazas el 2 nov, paid £14.821 (+5,9 %), CAC de medios £86,7 por familia nueva (sep £72,9),
  LTV:CAC 2,3:1 a 12 meses. Clasificación: Meta MANTENER a la baja (£7.500 en noviembre, como el plan; cortar UGC ES, FR ABO
  a la mitad o fuera, Video1 FR ≤ 30 %), Google MANTENER (£1.500; **EEUU exacta CORTADA**: £148 / 0 en octubre, £356 / 3 desde
  septiembre; PMax y keywords FR se leen el 6 nov), SEO ARREGLAR, IA pasa de MEDIR a MANTENER (164 sesiones, línea base
  10 de 36 respuestas), Email CAMBIAR DE FUNCIÓN, Referidos ARREGLAR (2 de 25), Social MANTENER. Tres decisiones para Lucia:
  5 nov CAC (propuesta: familia nueva de la base, subir < £80 / bajar > £100) y Black Friday + pausa larga; 7 nov FLAM y
  schema de precios. Script nuevo `scripts/mes-datos.cjs`; el stock de plazas a fecha pasada no se reconstruye (fuentes.md).
  Auditoría web: 39 páginas de clases con el schema desfasado porque la API subió los precios EUR/USD el 1 nov (encargo 0.8).
  Stripe leído por el conector a petición de Lucia (2 nov, 12:30 Bali): 348 pruebas pagadas (£39,0 de Meta por prueba),
  ingresos cobrados ≈ £125,2k, MRR £120,5k en 1.763 familias (£68,4 por familia), 239 suscripciones nuevas vivas (CAC de
  medios £62,0 con esta base, la del plan), cestas pagadas 78 %, 23 enlaces de pago con vendedora todavía en octubre.
  LTV:CAC 2,6:1 a 12 meses con la base de producción y 3,4:1 con Stripe. Las suscripciones vivas están en `trialing` desde
  la migración de cobros del 22 oct: el MRR se suma con `trialing` + `active` + `past_due`. Notion: la integración no ve
  la página Q4 2026 (404; la búsqueda solo encuentra EQUIPO OPS): hay que compartirla con la conexión de Claude.

- **2026-10-28** · Revisión SEO de los posts sobre lo publicado, sin pasar por Lucia (Lucia): Bárbara publica con el OK
  de la persona en la sesión del blog, saca el informe de la página publicada (`scripts/informe-revision.py` del repo
  del blog: title, meta, canonical, hreflang, fechas, H1/H2/H3, enlaces y alt reales) y lo pega en «Revisar con
  Claude». La herramienta rechaza el texto copiado y solo acepta el informe. Si pide cambios: aplicar, republicar y
  revisar otra vez; con el «listo», indexar. Claude da el «listo» solo: los datos de libros, precios y Diluu son
  públicos y ya no van a «Datos a confirmar» (solo bloquean los corchetes o las cifras inventadas). La herramienta
  no puede leer la URL por sí misma: el blog es estático y no envía CORS. Pasos y textos cambiados en la herramienta
  (v37), en la skill seo-lunes y en el CLAUDE.md del blog. Post de libros: OK de Lucia el 28 oct sobre la página
  publicada (la nota de 68/100 era sobre texto plano, incompleto). La comparativa de francés tampoco necesita ya el OK
  de Lucia (cambia la decisión del 26 oct): se publica el 3 nov y pasa la revisión después; lo que no se pueda comprobar
  en una web pública se quita. Script y regla subidos al repo del blog (commit c1a1d79, sin despliegue).

- **2026-10-27** · Herramienta SEO Diluu, tablero de Enlaces (Lucia): «Enlace conseguido» (en directorios, «Ficha
  publicada») se puede marcar desde cualquier estado, no solo desde Respondió o En negociación: en un directorio basta
  con registrarse. Sigue pidiendo la URL donde está el enlace; si falta, abre la ficha con el campo listo (v36).

- **2026-10-26** · Auditoría técnica automática de la web (Lucia, OK): `scripts/auditoria-web.py`. Cada domingo (seo-lunes)
  `--rapido`: las URLs de los sitemaps deben dar 200 directo. Cada día 1 (revisión mensual, sección 4 bis) la completa:
  URLs con tráfico histórico (`scripts/auditoria-urls-historicas.csv`, 293 rutas de Search Console desde jun 2025, se
  amplía cada mes), enlaces internos, páginas de clases sin JavaScript (contadores, precios de la API, schema,
  canonical, hreflang), sitemap de Yoast y alarma de búsquedas ocultas (> 50 % de los clics sin marca de las páginas
  de clases; sep 2026: 100 de 101). Primera pasada (26 oct): páginas de clases 39/39 bien; 23 URLs con tráfico que
  cambian de idioma o dan 404, /fr/french/ enlazada desde 40 páginas y los formularios de referidos cerrados →
  encargo al developer, sección 0.7. WordPress (26 oct, Lucia): 8 posts que redirigían pasados a borrador (los 3 de
  0.6 d, Duolingo EN y 4 duplicados ES); salen del sitemap de Yoast y las redirecciones siguen. Indexación pedida en
  Search Console para los 9 posts recuperados (Thanksgiving, idioma más fácil, HeySpanish is Diluu, en ES/EN/FR);
  los 9 EN nuevos, el 27 oct en la tarea programada de PageSpeed.

- **2026-10-26** · Métrica del SEO (Lucia, OK): «clics de padres» = clics de Google a las páginas de clases, de prueba
  y de precios, contados por página (sin la dimensión de búsqueda), menos los clics de marca visibles. La regla anterior
  filtraba por el texto de la búsqueda y daba ≈ 1 clic al mes porque Google oculta la mayoría de las búsquedas de una
  web pequeña (1–25 oct: 2.169 clics de diluu.com sin búsqueda visible). Serie nueva: jul–sep 2025 179/mes, jul–sep
  2026 103/mes, 1–25 oct 85. Objetivos: 110 al mes en diciembre (antes 25) y 150 en marzo. Filtros en la skill
  seo-lunes (y registro-semanal); panel de Bárbara actualizado (v35). Encargo al developer: sección 0.6 del encargo
  de páginas de clases (URLs antiguas con tráfico que dan 404, p. ej. /es/home/ con 775 clics, y enlaces internos a
  ellas). Canibalización: docs/analisis/canibalizacion-paginas-clases-2026-10.md (Lucia da el OK a tres 301
  de posts a /spanish-classes-for-kids/: online-spanish-classes-for-kids, -lessons- y -usa; encargo 0.6 d). Enlaces internos de Bárbara: a las páginas de francés y por edad (posición
  3–15), no a «online spanish classes for kids» (posición 50+).

- **2026-10-26** · Apuesta de visibilidad en asistentes de IA (Lucia): comparativa de clases de francés online para niños
  (Diluu, Preply, italki y Outschool; Novakid solo enseña inglés) rehaciendo /blog/online-french-classes-for-kids/ (EN,
  0 impresiones en 6 meses). La escribe Bárbara esta semana (precios mié 28, borrador jue 29, revisión y nota vie 30) y
  se publica el 3 nov solo con el OK de Lucia. Precios de Diluu de la API pública; los de la competencia, como rangos
  (son marketplaces) que verifica Bárbara con fecha. Preguntas a las IA: 12 (las 10 de la línea base + «best online
  french classes for kids» y «meilleurs cours de français en ligne pour enfants»). Encargo al developer: contadores y
  precios escritos en el HTML (hoy salen a 0 y vacíos sin JavaScript) y textos del bloque de precios en el idioma de
  cada página (docs/analisis/encargo-dev-contadores-precios-2026-10.md). Schema Course (Lucia): «desde 10 $ por clase» (plan
  anual, 3 clases a la semana, en grupo) en todas las páginas de clases; hoy llevan 11, 44 o 47,80 €. Lectoescritura (Lucia): solo individual, desde 15,75 € por clase (plan anual, 3/semana); schema 15.75 EUR y widget solo individual (encargo, sección 5). Brief y medición: docs/analisis/brief-comparativa-frances-2026-10.md
  (revisión 7 dic y 8 ene 2027).

- **2026-10-26** · Correcciones de Lucia al registro de la semana 43: (1) si Stripe falta, se usa el conector de Stripe
  (listado de cargos, nunca la búsqueda) o se pide el acceso; Meta y el CAC no se juzgan con el píxel (skill y rutina
  actualizadas). Semana 43: 92 pruebas pagadas, £39,1 por prueba (sem. 42: 69, £42,2). (2) El WhatsApp automático a la
  familia a las 2 h de una cesta de matrícula abandonada se activó el fin de semana del 24–25 oct (decidido el 14 oct);
  la tarea de Kommo a las 24 h, sin confirmar. Octubre hasta el 25 (Stripe): 103 checkouts de matrícula completados y
  56 caducados; la lectura del efecto se hace con las cestas abiertas desde el 26 oct. Pendiente de Lucia: denominador y
  umbral del CAC (propuesta en el registro de la semana 43).

- **2026-10-22** · Artículo 1: Lucia da por buena la revisión (58/100), que casi todo era falso positivo. Contrastada con la
  web: la versión FR siempre ha sido la traducción de este post (hreflang), en la web no hay imágenes pendientes y la fecha
  es el 18 oct, y el test, el quiz y /trial-sp/ existen. Lo real y menor (7 menciones a Diluu por versión, 5 dominios externos en ES,
  entradillas de los H3 y dos FAQ algo cortas) lo ajusta Lucia sin prisa. `revisiones/a1` pasa a ok (revisora Lucia; el
  comentario de Claude queda en `comentarioClaude`). Revisión de la herramienta corregida: cuenta los idiomas del plan
  (no da por «no pedida» ninguna versión), incluye las páginas de test y de prueba como llamadas a la acción y avisa de los
  10 posts de /fr/blog/ cuya URL dice «français» pero tratan de español.

- **2026-10-22** · Enlaces (Lucia, respuesta a la nota de Bárbara del 20 oct): ActivityHero sigue (la ficha es gratuita); Bárbara
  tiene invitación al Instagram de Diluu (barbara.fuentes.palma@gmail.com) para La Tundra el 4 nov y los accesos de Hoop y Happity
  por Zoho Vault; si Yell pide verificar por teléfono, lo hacen juntas en la reunión. Blog: los cambios sin guardar del 16 oct
  en su carpeta son su intento de cambiar la URL ES del A1 (descartado el 17 oct); los aparta y publica solo su post.

- **2026-10-21** · Herramienta SEO Diluu (Lucia): Bárbara marcó dos pasos sin querer. Se desmarcan en la base los
  pasos l1 y l2 del lunes 19, que había marcado el martes 20, y vuelven a «Pendiente de días anteriores». Nuevo bloque
  plegable en Hoy, «Ya marcados de otros días» (últimos 14 días, sin hoy ni los adelantos abiertos): lista los pasos
  marcados con su fecha y se desmarcan quitando la casilla. Antes, un paso pendiente desaparecía al marcarlo y no
  había forma de corregirlo. Los pasos de hoy se desmarcan volviendo a pulsar la casilla.

- **2026-10-20** · Herramienta SEO Diluu (Lucia): los pasos que cambian el blog (publicar, primera publicación, enlazar,
  enlaces a clases, quitar LOROPEPE y los de `pub`) no se pueden marcar sin pegar la URL publicada en diluu.com. La rutina
  seo-lunes comprueba cada domingo esas URLs con curl y escribe `verificaciones/<día>_<paso>`; si falla, el paso vuelve a
  pendientes con el motivo hasta que Bárbara guarde otra URL. Primera verificación: la «primera publicación» del 13 oct
  (marcada el 19) no está en la web; martes 20, paso propio para revisarla.
- **2026-10-20** · Enlaces (Lucia): CourseHorse descartado (marketplace con comisión, sin enlace); Cathy Duffy sí, con prueba +
  4 semanas gratis para un niño de su equipo; SourceBottle y Qwoted sí, perfiles gratuitos a nombre de Lucia con las dos citas de
  las tarjetas (las nuevas, a Lucia). Los artículos «ya escritos» que ofrecen cinco correos (Le Petit Journal, UFE, Express News,
  homeschool.com, Spanish Mama) no se escriben hasta que respondan. Bárbara contactó 15 sitios el lunes 19 (plan: 5). Su «primera
  publicación» (enlace a la página de clases en /blog/online-spanish-classes-for-kids-usa/) está marcada pero no publicada:
  se le pide en la herramienta que la publique o diga qué la frenó.
- **2026-10-19** · Rutina de los lunes más barata (Lucia, OK a los seis cambios): (1) `scripts/semana-datos.cjs`
  saca todos los datos de la base en una conexión (20 s frente a 8 min); (2) las pruebas pagadas de Stripe van en
  ese script con `STRIPE_API_KEY` en `.env` (pendiente de que Lucia pegue la clave), por listado de cargos en hora de
  Londres, nunca por búsqueda; (3) las consultas de Supermetrics quedan fijadas en la skill (siete, con la regex del
  panel); (4) los datos de los dashboards viven en `dashboard/semana-cmo-data.js` y `dashboard/seo-diluu-data.js`,
  publicados con `files`, y se lee la versión viva antes de publicar; (5) la rutina se parte en cmo-semana-diluu
  (lunes 08:30) y seo-lunes-diluu (domingo 20:00 Bali, skill seo-lunes, registro en docs/registros/seo-semanal.md);
  (6) la rutina deja de usar Chrome y Slack y, de Notion, solo lee la página Q4 2026 de Lucia (nueva ubicación:
  https://app.notion.com/p/Q4-2026-b450218fc6ff822dbda4019e331b3a0d), que es la fuente oficial de fechas; el
  tablero de Marta no se consulta (sus entregas de Black Friday están en la sección 8 de esa página), el panel bi
  no se lee (la cifra oficial es la de la base) y lo que Lucia tiene que decidir va en el bloque "Pendientes para
  Lucia" del registro, no en un DM. Black Friday para familias nuevas ya está en Notion y el presupuesto de
  noviembre vuelve al plan (£9.000 de paid + £4.000; Lucia quitó el ≥ £15k de Notion): los dos pendientes del 17 oct
  quedan resueltos. Artículo 1: completado por Lucia el 19 oct; se quita de la herramienta de Bárbara el paso
  "Compara el artículo 1 con su brief"; quedan la revisión y la indexación del martes 20.
  Herramienta SEO Diluu: las tarjetas "Por contactar" ya no aparecen vencidas; su fecha es el inicio del outreach
  (19 oct) y solo vencen los seguimientos.
- **2026-10-19** · Correcciones de Lucia al registro de la semana 42: el coste de Meta por prueba pagada es £42,2
  (69 pruebas, hora de Londres), no £57 (la búsqueda de Stripe dejó fuera el domingo 18); el email de referidos sí
  salió el 15 oct a toda la base (test A/B, lectura el 29 oct). Las pausas de los tests de Meta con CPA > £80
  estaban aprobadas desde el 14 oct y entran en la rutina diaria: la semanal las menciona, no las vuelve a pedir.

- **2026-10-18** · Botones de prueba del blog según el tema del post (Lucia): español → trial-sp, francés → trial-fr
  (en fr/blog con lang=fr), genérico → home de su idioma («Ver las clases»). Hoy los 9 posts de francés llevan la
  cabecera a trial-sp y los 30 genéricos van a trial-sp. Impacto pequeño (GA4 1 jul–17 oct: unas 40 sesiones de
  entrada en los genéricos y unas 40 en los de francés): va al developer detrás de las páginas de clases. La regla
  queda en el CLAUDE.md del blog junto con la de no publicar posts del plan de SEO sin el «listo» de la revisión.
- **2026-10-18** · Artículo 1: lo completa Lucia desde el proyecto del developer (docs/analisis/encargo-dev-articulo-1-2026-10.md,
  que añade también al CLAUDE.md del blog la regla de no publicar posts del plan de SEO sin el «listo» de la revisión). Bárbara
  lo pasa por «Revisar con Claude» el martes 20 y pide la indexación. Herramienta SEO Diluu: los pasos sin marcar de días
  anteriores siguen en Hoy hasta que se marcan (los que ya no aplican los decide Lucia/Claude en RESUELTOS, con motivo);
  barra de progreso semanal y objetivos en Hoy, animación al marcar cada paso, aviso «sin listo, no publiques» en los pasos de
  publicar y revisión también para las mejoras de posts (libros, 21 oct).
- **2026-10-17** · Artículo 1 (Bárbara): publicado el 15–16 oct en ES, EN y FR, con 1.340 palabras y 4 de las 11 secciones
  del brief, sin pasar la revisión de la herramienta (`revisiones` vacía). Hay que completarlo (semana realista, si no
  hablas español, entiende pero contesta en inglés, recursos, errores y 5 preguntas frecuentes). El A1 lleva FR porque la
  versión francesa tiene tráfico real (2.243 impr. y 30 clics en 12 meses, heredados de /fr/blog/how-to-teach-…, frente a
  27 clics del ES); A2–A4 siguen en dos idiomas. La URL del ES no se cambia (respuesta de Lucia en la herramienta). La
  revisión con Claude compara ahora con el esquema y la longitud del brief, y no se publica sin su «listo». Indexación:
  Bárbara la pide con Claude in Chrome en Search Console (ya tiene acceso). Semana del 19 oct: completar A1, mejorar el
  post de libros, primeros contactos y dos fichas de directorio; el post de series pasa a la semana del 14 dic. Dos fichas
  de directorio cada viernes (23 oct, 6, 13 y 20 nov, 4 dic) para llegar a las 10 antes del 31 dic.

- **2026-10-14** · Lucia corrige su página de Notion "Q4 2026": 700 altas y £27.500 de medios en el trimestre (igual
  que el plan). Trimestral por defecto, bonos de continuidad y ventas adicionales en la página de gracias se ven en
  enero de 2027. Siguen abiertas: marketing de noviembre (Notion ≥ £15k frente a £9.000 de paid + £4.000) y si
  Black Friday para familias nuevas sigue (no está en Notion; Marta tiene 7 entregas).
- **2026-10-14** · Lucia confirma las seis decisiones del plan Q4 (casillas marcadas en el artefacto): presupuesto
  de paid, pausar tests con CPA > £80, bonus nuevo y códigos con prefijo (ya aplicado), curso directo con garantía y
  Black Friday templadas, email de referidos (sale el 15 oct) y los tres tests de Navidad.
- **2026-10-14** · Referidos: objetivo 25 altas referidas en el Q4 (≤ £40 por alta). Sin semana de recompensa doble
  (requiere código): se elimina del plan y la entrega 8 de Marta. Calendario de Lucia: email 15 oct, email automático
  tras la 4.ª clase y texto en el de bienvenida, WhatsApp personal a 150 embajadoras el 26 oct. Todo lo demás agendado.
- **2026-10-14** · Ventas, ya en marcha (Lucia): cadencia día 0/3/10 en Kommo; salvamento de bajas < 90 días por
  operaciones; medición por persona desde Stripe y Kommo; bonus nuevo aplicado. Cesta abandonada: en vez de aviso al
  equipo, WhatsApp automático a la familia a las 2 h y tarea en Kommo a las 24 h con el código del 10 % (objetivo:
  cestas pagadas 68 % → 80 %, BI). Recordatorios de prueba: 12 h y 4 h antes (no "víspera y 1 h").
- **2026-10-14** · Email marketing entero lo hace Lucia (con Claude; Marta escribe textos); Bárbara solo SEO. Lo que
  en los planes de Navidad y referidos figuraba como Bárbara pasa a Lucia.
- **2026-10-14** · La página de Notion "Q4 2026" (DILUU › STRATEGY › GOALS) es el plan resumido de Lucia con fechas;
  la rutina de los lunes la lee y recuerda lo pendiente de la semana. Fechas de Lucia: T1 montado 13 nov y lanzado
  24 nov; pausa larga: email 16 nov, WhatsApp 20 nov, recordatorio 14 dic; tarjeta regalo: creativos 2 nov, campaña
  19 nov; landing de curso directo con garantía como muy tarde el 3 nov (£60/día × 28 ≈ £1.700, solo ES y EE. UU.,
  ≤ £110 por familia matriculada); campaña de enero: creativos pedidos 7 dic, listos 14 dic, encendida 26 dic;
  secuencia de email tras la baja configurada el 23 dic; plantillas del win-back de enero a aprobación el 28 dic.
- **2026-10-14** · No presentados en pruebas (base de producción, v3-trial-results): ago 95/602 (15,8 %), sep 85/571
  (14,9 %), 1–13 oct 28/208 (13,5 %). Sep–oct por antelación de la reserva: < 1 día 6,5 %, 1–3 días 10,5 %, 3–7 días
  23,6 %, > 7 días 4/27. Propuesta pendiente de Lucia: confirmación 48 h antes solo para pruebas reservadas con ≥ 3 días.
- **2026-10-14** · Pendiente de Lucia (17 oct): cuatro diferencias entre Notion y el plan (altas 620/700, medios
  £25.400/£27.500, marketing de noviembre ≥ £15k frente a £9.000 + £4.000, Black Friday para familias nuevas no está
  en Notion aunque Marta tiene 7 entregas) y si trimestral por defecto, bonos de continuidad y ventas adicionales se
  descartan o pasan a enero. Pestaña "Seguimiento Q4: objetivos y fechas" en el artefacto del plan.
- **2026-10-13** · Directorios: solo 10 de los revisados son gratuitos y encajan (6 con enlace directo y follow, 1 nofollow,
  3 sin enlace); ninguno de Australia. En el tablero: Online Homeschool Curriculum Directory (alta), French Morning,
  ActivityHero, KidsActivities.ie, Homeschool Hub Utah (registro), Oxford Brookes Babylab y OFTP Ontario (por correo) y
  Happity (ya existe happity.co.uk/diluu: actualizarla, añadir francés y retirar la de HeySpanish). Descartados por cobrar:
  Expatica, Moving to the UK, Expat Child, Le Petit Journal (packs), Homeschool.com (sin alta gratuita), entre otros.
- **2026-10-13** · Marca antigua HeySpanish: 27 fichas encontradas (docs/analisis/marca-heyspanish-2026-10.md). Urgente
  para Lucia: dirección antigua de un piso publicada (Trustpilot, Yelp, Mum's Guide To, Scoot, pin de Google); enlace
  de reservas de Google a heyspanish.com; 16+ vídeos de YouTube con "HeySpanish" y enlaces a heyspanish.com/based,
  que acaba en 404 (encargo al developer, sección 0.5). Hoop, Happity, Yell y Mum's Guide To, al tablero de Bárbara.
- **2026-10-13** · Ya no hay prueba gratis (Lucia): la clase de prueba cuesta 3 € o 4 $; el código LOROPEPE no vale.
  Quedaba en tres posts (los dos del A1, que se rehacen, y /fr/blog/enseigner-le-francais-a-la-maison-gratuitement/,
  que Bárbara corrige el viernes 16). El A1 lo firma Lucia Marin; el "caso real" se escribe como caso típico presentado
  como tal (sin nombre, citas ni cifras), no como un alumno inventado que se hace pasar por real.
- **2026-10-13** · Artículo 1 se publica esta semana (Lucia): martes 13 arranque, miércoles borrador con el brief,
  jueves revisión y revisión SEO con Claude, viernes 16 publicación (ES y EN). Calendario adelantado: semana del 19 oct
  mejorar los dos posts que casi posicionan (libros 13,5; series 31) y primeros contactos; A2 6 nov, A3 20 nov,
  A4 4 dic, "Diluu en 10 datos" 27 nov; semana del 7 dic, artículo 5 a elegir por Lucia. Lucia contesta antes del
  miércoles las preguntas del brief del A1 (ejemplos de clase, LOROPEPE, firma, fotos).
- **2026-10-13** · Directorios como vía propia dentro de Enlaces (propuesta, pendiente del OK de Lucia al objetivo): tarjetas
  "Registro" sin correo ni seguimientos (formulario + datos de la ficha copiables + comprobación a los 14 días).
  Objetivo propuesto: 10 fichas antes del 31 dic, contadas aparte de los 8 enlaces de medios y asociaciones.
  020.co.uk pasa a registro nuevo como Diluu + aviso para retirar la ficha antigua de HeySpanish (su enlace va por
  redirect: valor SEO bajo).
- **2026-10-13** · Herramienta de Bárbara "a prueba de principiante" (Lucia): los correos de enlaces llegan
  redactados en cada tarjeta (investigación + correo + mensaje por otra vía + 2 seguimientos + hora de envío),
  enviados desde partnerships@diluu.com (Zoho; contraseña en Zoho Vault). Secuencia de 5 toques en 35 días por
  correo y otra vía. Briefs de artículos preparados por Claude con la competencia real. Fuera hojas de cálculo:
  URLs publicadas y preguntas a las IA se registran en la herramienta; resultados por post en Datos. Glosario.
  Unificar growth (CMO + FACEBOOK ADS + GOOGLE ADS) en un solo proyecto el 22–23 dic
  (docs/planes/migracion-growth-2026-12.md; recordatorio programado el 21 dic).
- **2026-10-13** · Enlaces (outreach) en un tablero dentro de la herramienta SEO Diluu (pestaña Enlaces, colección
  `contactos`), no en la pestaña Contactos de la hoja. Seguimiento: primer mensaje → seguimiento 1 a los 7 días →
  seguimiento 2 a los 14 → "Sin respuesta" a los 14 → reintento con otra oferta a los 3 meses. Sembrado con los 6
  sitios de la hoja. Bárbara (barbara.fuentes.palma@gmail.com y heyspanishuk@gmail.com) debe seguir como Editora:
  quien entra invitado por email desde fuera de la organización solo puede escribir con ese nivel, y no hay que
  activar el enlace público (le quitaría la escritura).
- **2026-10-13** · Los cuatro artículos del Q4 ya tienen post en el blog (lista completa de /blog, /es/blog y
  /fr/blog: 123 posts; el sitemap solo lista 47): se rehacen con su URL, no se escriben nuevos. A2 pasa a
  "las mejores apps para aprender español" (el post ES posiciona 8,6) y A4 a ES+EN. Cada artículo lleva
  las búsquedas reales que ya traen el post (Search Console) dentro del texto para Claude. La revisión
  previa a publicar la hace Claude desde la herramienta (capacidad sample); a Lucia solo le llegan los
  datos sobre Diluu que Claude no puede verificar. Bárbara empieza el martes 13 oct (hora de Chile): arranque
  con su primera publicación (M), primeros contactos (X), enlaces a las páginas de clases (J), cierre (V). Botón "Adelantar"
  para hacer el día siguiente si le sobra tiempo (lo marcado se guarda en ese día).
- **2026-10-13** · Bárbara no usa Notion (Lucia): todo va en la herramienta "SEO Diluu". Notas del día y
  respuestas de Lucia, y revisión de los tres primeros artículos (Bárbara los envía el jueves desde su
  paso; Lucia pide cambios o da el OK en la pestaña Semana), en la base del artefacto (`dias`,
  `respuestas`, `revisiones`). El tablero de Notion queda en la papelera.
- **2026-10-13** · Calendario de Bárbara aprobado (Lucia): A1 31 oct, A2 14 nov, A3 28 nov, A4 12 dic
  (A1–A3 rehacen posts existentes) y dos posts mejorados el 19 dic. Preguntas a IA: 8 de la propuesta +
  2 cambiadas por búsquedas reales de Search Console ("cours de français en ligne pour enfants
  expatriés"; "¿cuáles son las mejores aplicaciones para aprender español para niños?", 82 impr.,
  pos. 8,6, abr–oct). Dato: ChatGPT manda 68 sesiones y 38 eventos clave a /french-classes-for-kids
  (jun–12 oct, GA4); es la página que más recomiendan las IA. Aprendizaje de SEO semanal y recursos
  (incl. @peter.lead, recomendado por Lucia) en la herramienta.
- **2026-10-13** · Las páginas de clases (/spanish-classes-for-kids, /es/spanish-classes-for-kids,
  /es/spanish-for-kindergartners) las hace Lucia, no Bárbara (Lucia). Brief de cambios para el proyecto
  de developer en docs/analisis/brief-paginas-clases-2026-10.md. Bárbara lleva blog, enlaces e IA.
  Propuesta de calendario (pendiente de OK de Lucia; Notion aún con las fechas antiguas): un artículo
  cada dos semanas (escribir / publicar), A1 31 oct, A2 14 nov, A3 28 nov, A4 12 dic, y dos posts
  existentes mejorados el 19 dic.
  Hallazgos del brief (13 oct, comprobados con curl): /es/spanish-classes-for-kids/ redirige a un post
  en inglés y /es/spanish-for-kindergartners/ da 404 (las páginas reales son
  /es/clases-de-espanol-para-ninos-online/ y /es/espanol-para-preescolar/); los botones de prueba de
  /spanish-classes-for-kids/ van a /trial-sp/ sin ?lang=en (los de francés sí lo llevan). Tres de los
  cuatro artículos del plan ya tienen post en el blog: se rehacen con su URL, no se duplican.
- **2026-10-13** · Bárbara trabaja el SEO desde una sola herramienta: el artefacto "SEO Diluu" pasa de
  panel a herramienta diaria (qué toca hoy con casillas, datos, semana, plan y guías con animaciones;
  las casillas y la nota del día se guardan en la base del artefacto, Lucia las ve en la pestaña
  Semana y la rutina de los lunes las lee). Publica sola en el blog con Claude Code (/empezar-blog,
  sesión en workspaces/diluu-blog). Hay que compartirle el artefacto como colaboradora. Las 10
  preguntas a IA de la guía son una propuesta pendiente de Lucia.

- **2026-10-12** · Referidos: la acreditación de los 30 $ funciona (Lucia). La alta referida del 6 oct es
  de una familia de Seal Subscriptions y se le acredita a mano. Se levanta el bloqueo: el email propio de
  referidos puede salir el 15 oct. El canal sigue en ARREGLAR por participación (2 invitaciones en 19
  días), no por el circuito.
- **2026-10-12** · Guardrail de CTR de Meta: se mide solo sobre las campañas optimizadas a compra, no
  sobre la cuenta (Lucia): el CTR de cuenta baja cada vez que corre un cribado por reproducciones.
  Semana 41: cuenta 1,02 %, núcleo 1,28 %. Meta se juzga además con el coste por prueba pagada de
  Stripe (sem. 41: £35,5, 76 pruebas), no solo con el píxel. Los informes de anuncios los hace Lucia.
- **2026-10-12** · Tablero de Marta sin tareas recurrentes (Lucia): "Rutina de los lunes" y "Reunión de
  los viernes" se han sacado del tablero (movidas a la página MARKETING de Notion). Quedan solo entregas.
- **2026-10-12** · Panel bi.diluu.com: la rutina lo lee desde Chrome con la sesión de Lucia (12 oct:
  2.881 activas, 2.931 en vigor; la base, 2.933). Brevo: las estadísticas de automatizaciones se leen
  en la web, no por API.
- **2026-10-12** · Referidos se miden en la base de producción (`v3-referral-codes`, `v3-referrals`,
  bookings con `sourceId referral:`; `scripts/referidos.sh`), no en Stripe: la prueba referida es
  gratis y no pasa por el checkout. 23 sep–11 oct: 332 familias con código, 2 referidos reales, 1 alta
  (6 oct) sin acreditar los 30 $. Canal en ARREGLAR hasta que Daniel confirme la acreditación; el
  email de referidos no sale antes (propuesta: 15 oct, lo manda Lucia con Claude). Objetivo propuesto
  pendiente de Lucia: suelo 25, objetivo 40 altas referidas en el Q4, ≤ £40 por alta
  (docs/planes/referidos-2026-10.md).
- **2026-10-08** · Fuente de verdad de altas, bajas y plazas: la base de producción, no Stripe (hay
  familias en Seal Subscriptions que no pasan por Stripe). Stripe queda para ingresos y metadatos.
- **2026-10-08** · SEO entero para Bárbara, con objetivos propios y con Claude; Marta no hace SEO:
  lleva creatividades, Black Friday, email marketing (automatizaciones, Navidad, referidos) y la
  campaña de enero. Bárbara no toca Brevo. Las reseñas de Google las pide todo el equipo de ops.
  Con Bárbara no hay reunión semanal: seguimiento asíncrono en Notion. Nuevo objetivo de canal:
  visibilidad en asistentes de IA (ChatGPT trajo 135 sesiones y 44 conversiones en septiembre).

- **2026-10-08** · Plaza activa = matrícula contratada y no finalizada, con cualquier fecha de inicio,
  incluidas las pausadas (Lucia: "tomaría el que tiene en cuenta a los pausados"). Base de producción,
  8 oct: 2.907; es la definición que más se parece al panel (2.882 frente a 2.829 el 2 oct). El
  objetivo de 3.000/3.100 se mide con ella; el panel se anota como contraste.
- **2026-10-08** · Suelo de altas del Q4 revisado de 640 a ≥ 700 (Lucia, OK): septiembre tuvo 359
  cancelaciones de plaza (≈ 12 % de la base), no el 10,5 % que suponía el plan. Reparto orientativo:
  oct ≥ 320, nov ≥ 240, dic ≥ 140.
- **2026-10-08** · Repo GitHub privado: Lucia950/diluu-cmo.

- **2026-10-08** · Las fechas de entrega de Marta llevan margen: cada entrega tiene una fecha de
  Marta y una fecha límite real posterior (docs/equipo/marta-plan-entregas.md). Marta solo ve sus
  fechas en Notion. Si no llega, Lucia la termina en el margen.
- **2026-10-08** · El objetivo del SEO se mide solo sobre búsquedas y páginas de padres: 150 clics al
  mes de consultas sin marca ni mapas y 10 pruebas al mes desde páginas de clases y artículos
  (GA4 por página de destino) el 31 mar 2027. Las páginas de mapas no se tocan ni cuentan.
- **2026-10-08** · Reparto del SEO (propuesta, pendiente de Lucia y de la revisión de Bárbara del
  13 oct): Marta analiza y propone (diagnóstico, páginas, briefs); Bárbara escribe los artículos,
  consigue enlaces y cuida la ficha de Google; Lucia publica con Claude Code. Lucía F. pide reseñas.
- **2026-10-08** · Black Friday para familias nuevas: Lucia cierra la oferta el 13 oct; el plan en
  una página de Marta es del 24 oct (no del 31); todo probado el 10 nov (límite real, 14 nov).
- **2026-10-08** · Rutinas locales de Claude Code: registro semanal (lunes 08:30 Bali) y revisión
  mensual (día 1, 09:00 Bali). Sustituyen a las tareas del proyecto CMO de claude.ai cuando lleven
  dos ejecuciones correctas.
- **2026-10-07** · Atribución de ventas: cuenta para la vendedora por código (LF-, BA-, VI-, VC-) o
  por enlace de pago con client_reference_id; manda el código. Se cobra aunque no paguen el 2.º mes.
- **2026-10-06** · Descuento de seguimiento en Course Pending: 10 % (antes 20 %), cupón VENTAS10.
- **2026-10-02** · Presupuesto de paid Q4: £14.000 oct (12.500 Meta + 1.500 Google), £9.000 nov,
  £4.500 dic; enero £22.000. Regla a mitad de mes: CAC de medios por familia nueva < £50 → Meta
  +15 %; > £65 → −15 %. Objetivo de plazas: 3.000 suelo, 3.100 objetivo.
- **2026-10-02** · Meta: pausar tests con CPA de píxel > £80; Video1 FR ≤ 30 % del gasto; 6–8
  creativos nuevos. Google: francés hasta £20/día si CPA 14 d < £90; genérica no sube (CPA £100).
- **2026-10-02** · Bonus de ventas nuevo desde el 1 nov, por tramos (16–29 ventas: 7 $; 30–39: 9 $;
  40–49: 11 $; 50+: 13 $), sin tope; equipo 50/100 $ si conversión ≥ 48/52 %. Ningún enlace de pago
  creado en Stripe desde el 1 nov.
- **2026-10-02** · Tests de Navidad: trimestral de Black Friday para familias activas (≥ 80 cambios),
  pausa larga con plaza reservada (≥ 25 % acepta, ≥ 70 % vuelve), tarjeta regalo (≥ 40 vendidas).
  Todo montado y probado el 14 nov. Black Friday para captar solo con audiencias templadas (≥ 60
  altas, ≤ £55, £1.500 en Meta). Curso directo con garantía: test en noviembre.
- **2026-10-02** · Email: parar envíos masivos; pasar a automatizaciones de ciclo de vida. Email
  propio de referidos el 13 oct. Guardar referral_code en la prueba y en la suscripción.
- **2026-09-15** · Bárbara: tres compromisos de ventas con revisión el 13 oct (velocidad ≤ 30 min y
  ≥ 60 % en 1 h; 0 tareas CALL 2/3 vencidas al cerrar; 0 errores críticos).
- **2026-09-03** · Clasificación de canales vigente: Meta MANTENER (sin subir), Google francés
  ESCALAR con control, Google genérica ARREGLAR, SEO ARREGLAR, Email CAMBIAR DE FUNCIÓN, Referidos
  MEDIR, Social orgánico MANTENER, Leads CORTAR.
