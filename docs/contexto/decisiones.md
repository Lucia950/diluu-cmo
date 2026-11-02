# Decisiones (más reciente arriba)

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
