# Encargo al developer (9 nov 2026): páginas de clases de español, versión única y autocontenida

Para Lucia: sustituye a lo que quedaba del encargo del 13 oct (lo que ya está en producción no se repite: redirecciones,
botones EN con idioma, precio en el HTML, schema con 10,25 $, sitemap). Comprobado con curl el 9 nov. Datos que
justifican el cambio: docs/analisis/seo-revision-estrategia-2026-11-09.md.

## Prompt (pegar tal cual en el proyecto del developer)

```md
# Encargo: páginas de clases de español de Diluu (SEO y conversión), 9 nov 2026

## Contexto
Diluu da clases online en directo de español y francés a niños de 4 a 12 años de familias que viven fuera de un país
donde se habla el idioma (sobre todo Estados Unidos y Reino Unido para el español). Las páginas de clases son HTML
estático servido en diluu.com (el blog va aparte, en WordPress). Precios y contadores salen de la API pública
(https://platform.diluu.com/api/public/class-prices) y ya están bien: no se tocan, ni el widget de precios.

Problema que resolvemos: quien busca en Google «clases de español para niños» a secas está en México o España, donde no
vendemos. Nuestra familia vive en EE. UU., Reino Unido o Europa y busca cosas como «clases de español online para niños
en Estados Unidos», «español para niños bilingües» o «mi hijo entiende español pero no lo habla». La página en español
tiene que decir desde la primera línea para quién es. Además, las dos páginas (ES y EN) necesitan un bloque para quien
busca clases «cerca de mí» o en su ciudad (Londres, Nueva York, Dublín), porque esa intención convierte y hoy no la
recogemos.

Páginas:
- ES: https://diluu.com/es/clases-de-espanol-para-ninos-online/
- EN: https://diluu.com/spanish-classes-for-kids/
- ES preescolar: https://diluu.com/es/espanol-para-preescolar/

Reglas:
- No cambiar slugs, canonical, hreflang, redirecciones, precios, contadores ni el widget de precios.
- Los textos van redactados aquí: cópialos tal cual. Donde pone [CONFIRMAR: …] deja la marca visible en el borrador
  y no inventes el dato; Lucia lo confirma antes de publicar. No se publica nada con «CONFIRMAR».
- Un solo H1 por página; sin saltos de nivel (ningún H3 sin H2 padre); `og:title` y `og:description` iguales a
  `title` y meta; el `FAQPage` del schema con exactamente las mismas preguntas y respuestas que se ven en la página.

## 1. Página ES: para familias hispanohablantes que viven fuera

1.1 `<title>` (≤ 60 caracteres): Clases de español online para niños que viven fuera | Diluu
1.2 H1: Clases de español online para niños que viven fuera de un país hispanohablante
1.3 Meta description (≤ 155): Clases de español en directo para niños de 4 a 12 años de familias hispanohablantes en
    EE. UU., Reino Unido y Europa. Grupos de máximo 4 con profes nativas. Prueba por 3 €.
1.4 Párrafo del hero (sustituye al actual, que empieza «Clases de español para niños de 4 a 12 años, en vivo…»):
    Para familias españolas y latinoamericanas que viven en Estados Unidos, Reino Unido o cualquier otro país: clases
    de español en directo, en grupos de máximo 4 niños de la misma edad y nivel, con profesoras nativas. Tu hijo habla
    español con otros niños que también lo tienen en casa y lo oyen poco fuera. Horarios en tu zona horaria.
    [CONFIRMAR: «máximo 4»; y la cifra de la frase actual «familias en 56 países», si se conserva en otro sitio]
1.5 Bloque nuevo, justo después del bloque «¿Tu hijo ya entiende el español en casa?»:
    H2: Si entiende español pero contesta en inglés, está en el sitio correcto
    P1: Es lo más habitual en las familias que llegan a Diluu: el colegio y los amigos van en inglés, y el español se
    queda en casa con cada vez menos usos. No es falta de interés, es falta de ocasiones en las que hablarlo haga falta.
    P2: En clase, la profesora no traduce y el grupo solo habla español: con otros niños en su misma situación, hablar
    deja de dar vergüenza. Por edades, con juegos y con un objetivo cada semana.
    P3, dos enlaces: «Haz el test de 2 minutos: ¿por qué entiende español pero no lo habla?» →
    https://diluu.com/es/test/mi-hijo-entiende-espanol-pero-no-lo-habla/ · «Lee cómo trabajamos con estos niños» →
    https://diluu.com/es/blog/clases-de-espanol-para-ninos-que-entienden-pero-no-lo-hablan/ (texto del enlace, exacto:
    «clases de español para niños que entienden pero no lo hablan»).
1.6 FAQ nuevas (visibles y en el schema):
    - ¿Sirve si vivimos en Estados Unidos o en Reino Unido? → Sí: la mayoría de nuestras familias viven allí. Las
      clases se dan por videollamada y los horarios se muestran en tu zona horaria. [CONFIRMAR: «la mayoría»]
    - Mi hijo entiende español pero no lo habla, ¿puede empezar? → Sí, es el caso más frecuente. Lo colocamos en un
      grupo de su edad y su nivel real de habla, y la profesora trabaja para que hable desde el primer día.
    - ¿Con qué frecuencia son las clases? → [CONFIRMAR: de 1 a 3 clases a la semana; 30 o 45 minutos según la edad]
    - ¿Qué necesitamos en casa? → Un ordenador o tableta con cámara y micrófono, conexión estable y un sitio tranquilo.
      Con los más pequeños conviene que haya un adulto cerca los primeros días. [CONFIRMAR: dispositivo y adulto]
    - ¿Cómo sabremos si avanza? → [CONFIRMAR: informes de progreso, cada cuánto y qué incluyen; acceso al panel de
      familias en students.diluu.com]
1.7 Enlaces que hay que corregir o añadir en el cuerpo:
    - El enlace a «cómo es una clase de prueba» apunta hoy al post en inglés /blog/trial-spanish-class-for-kids/;
      debe ir a https://diluu.com/es/blog/clase-de-prueba-de-espanol-para-ninos/.
    - «Leer más en Google» apunta hoy a una búsqueda de Google (google.com/search?q=diluu+reviews); debe ir a
      [CONFIRMAR: https://diluu.com/reviews/ o la página de Trustpilot].
    - Añadir: «clases de español para preescolar» → /es/espanol-para-preescolar/; «español para niños bilingües» →
      /es/espanol-para-ninos-bilingues/; en el bloque de precios, «cuánto cuestan las clases de español online para
      niños» → /es/blog/cuanto-cuestan-clases-de-espanol-online-para-ninos/.
    - En las páginas ES no debe quedar ningún enlace a /blog/ (blog en inglés): todos a /es/blog/.

## 2. EN y ES: bloque «Online desde cualquier ciudad»

Colocar después del bloque de profesoras y antes de los testimonios. Sin páginas nuevas por ciudad.
EN:
    H2: Online Spanish classes for kids in London, New York, Dublin or wherever you live
    P1: Diluu is online, so your child gets a native teacher and a small group even if there is no Spanish school
    nearby. Families join us from London, Manchester, New York, Miami, Dublin, Sydney and 50+ other cities.
    [CONFIRMAR: ciudades con familias reales y «50+»]
    P2: Class times are shown in your time zone, with afternoon and weekend slots for the UK, Ireland, the US East and
    West coasts and Australia. [CONFIRMAR: franjas reales]
    P3, un enlace: «Looking for Spanish classes for kids near you? Here is how online compares» →
    https://diluu.com/blog/spanish-classes-for-kids-near-me/ (texto del enlace, exacto: «Spanish classes for kids near me»).
ES:
    H2: Clases de español online para niños en Londres, Nueva York, Dublín o donde vivas
    P1: Diluu es online: tu hijo tiene profesora nativa y un grupo pequeño aunque no haya una escuela de español cerca.
    Hay familias en Londres, Mánchester, Nueva York, Miami, Dublín, Sídney y más de 50 ciudades. [CONFIRMAR]
    P2: Los horarios se muestran en tu zona horaria, con tardes y fines de semana para Reino Unido, Irlanda, las dos
    costas de EE. UU. y Australia. [CONFIRMAR]

## 3. Página EN: ajustes

3.1 El H3 «Why does he understand Spanish but won't speak it?» está hoy dentro del bloque «in three easy steps»
    (cómo funciona). Muévelo, con su quiz, al bloque «Does your child already understand Spanish at home?».
3.2 El schema `FAQPage` tiene 8 preguntas y en la página se ven 9: iguálalo (mismo texto, mismo número).
3.3 `<title>` actual: «Online Spanish Classes for Kids (4–12) · Trial €3 | Diluu». La moneda de la prueba para
    EE. UU. y Reino Unido es [CONFIRMAR: «Trial $4», «Trial £3» o quitar el precio del title].
3.4 Añadir a la FAQ las mismas dos preguntas de equipo y progreso de 1.6, en inglés:
    - What do we need at home? → A computer or tablet with camera and microphone, a stable connection and a quiet spot.
      For the youngest, an adult nearby helps during the first sessions. [CONFIRMAR]
    - How will we know they are making progress? → [CONFIRMAR: progress reports, how often, what they include; family
      dashboard at students.diluu.com]

## 4. Página ES preescolar

4.1 `<title>`: Clases de español para preescolar (4 a 6 años) | Diluu   [CONFIRMAR: edad 4–6 o 3–5]
4.2 H1: Clases de español online para preescolar. La frase actual del H1 («su primera aventura en un nuevo idioma»)
    pasa a subtítulo en un `<p>` debajo.
4.3 Meta (≤ 155): Clases de español online para niños de 4 a 6 años: 30 minutos de canciones, cuentos y juego con una
    profe nativa, máximo 4 por grupo. Prueba por 3 €. [CONFIRMAR: edad, 30 minutos, máximo 4]
4.4 FAQ nueva: ¿Y si tiene 3 años? → [CONFIRMAR: respuesta]
4.5 Enlaces: «Hablantes de herencia» (menú, pie y cuerpo) → /es/espanol-para-ninos-bilingues/ (hoy va a la página en
    inglés); «Blog» del menú → /es/blog/; «Cómo funciona» y «Precios» del menú → /es/clases-de-espanol-para-ninos-online/
    con `#how-it-works` y `#prices`. [Si ya está hecho, solo compruébalo.]

## 5. Imágenes
Las fotos de alumnos y profesoras llevan `alt` descriptivo («Niña de 6 años en una clase de español online de Diluu»);
las mascotas y adornos llevan `alt=""`. Hoy la página ES tiene 18 imágenes con `alt=""`: comprueba que ninguna es una
foto real.

## 6. Comprobación antes de decir «hecho» (deja la salida en PAGINAS-CLASES-VERIFICACION.md)
1. `curl -sL <url> | grep -oE '<h1[^>]*>[^<]*'` → un solo H1 con el texto nuevo; `title` ≤ 60 y meta ≤ 155 caracteres.
2. `curl -sL <url> | grep -oE '<h2[^>]*>[^<]*'` → aparecen los H2 nuevos en su sitio.
3. `curl -sL <url> | grep -oE 'href="https://diluu.com/[^"]*"' | sort -u` → están los enlaces de 1.5, 1.7 y 2; en las
   páginas ES no queda ningún `href` a `https://diluu.com/blog/` ni a `/spanish-for-heritage-speakers-kids/`.
4. `FAQPage`: `grep -oE '"@type": *"Question"' | wc -l` coincide con las preguntas visibles; Rich Results Test de
   Google sin errores (Course, FAQPage, BreadcrumbList).
5. `grep -c "CONFIRMAR"` en cada HTML publicado → 0.
6. `curl -sL <url> | grep -oE '<img[^>]*>' | grep -vcE 'alt="[^"]*"'` → 0.
7. Nada roto: widget de precios con moneda, botón de prueba (ES a /trial-sp/ sin parámetro; EN a /trial-sp/?lang=en),
   canonical y hreflang iguales que hoy.
```

## Respuestas a las marcas [CONFIRMAR] (9 nov, 21:30 Bali; fuentes: páginas vivas de diluu.com, API de precios, GA4)

Lo que se puede cerrar sin Lucia (comprobado en la web o en la API el 9 nov):
- **Tamaño de grupo**: máximo 6 niños por clase; 4 en los grupos de principiantes y en preescolar (4–6 años). La frase
  «grupos de máximo 4» del hero y la meta ES era un error del encargo: sustituir por «grupos de máximo 6 niños (4 en los
  grupos de principiantes)». En preescolar sí es «máximo 4».
- **Meta ES** (155 caracteres): «Español en directo para niños de 4 a 12 años de familias hispanohablantes en EE. UU.,
  Reino Unido y Europa. Grupos de máximo 6, profes nativas. Prueba 3 €.»
- **Frecuencia y duración**: la familia contrata 1, 2 o 3 clases a la semana (la API recomienda 2); las clases duran
  30 minutos (es lo que dice la web para todas las edades desde los 4 años). Si los grupos de 10–12 duran más, lo dice
  Lucia; si no, «30 minutos».
- **Adulto cerca**: la FAQ actual ya lo dice: para menores de 6, un adulto cerca en las primeras sesiones; a partir de 6,
  suelen participar más solos. Usar ese texto.
- **Edad de preescolar**: 4 a 6 años, máximo 4 niños, 30 minutos (página actual).
- **¿Y si tiene 3 años?**: la página ya responde: con 3 años todavía no; recomendamos el canal de YouTube de Diluu y
  empezar las clases al cumplir 4.
- **Informes de progreso**: la página ya anuncia «Informes de progreso: seguimiento periódico para los padres». FAQ:
  «Recibes informes de progreso periódicos de la profesora y puedes ver su evolución en el panel de familias», sin cifra
  de frecuencia (no está publicada).
- **Reseñas**: «Leer más» → https://diluu.com/reviews/ (existe, 200).
- **56 países**: cifra que ya está en las tres páginas (contador); se conserva donde esté.
- **Ciudades** (GA4, 11 ago–8 nov, eventos clave por ciudad): Londres 752, Nueva York 234, Los Ángeles 172, Dublín 134,
  Sídney 130, Bath 126, Miami 97, Melbourne 91, Chicago 88, Houston 83, Seattle 75, Boston 60, Bristol 47, Birmingham 46,
  Mánchester 26; más de 60 ciudades con 5 o más eventos clave. Texto: «Londres, Nueva York, Los Ángeles, Dublín, Sídney,
  Miami y más de 50 ciudades» (EN igual). Son eventos clave de la web, no familias contadas: proxy aceptable para la frase.
- **Precio de la prueba en el title EN**: la página dice «€3 or $4». Recomendación: quitar el precio del title («Online
  Spanish Classes for Kids (4–12) | Live, Small Groups | Diluu») y dejarlo en la meta: «Trial class €3 or $4».

Confirmado por Lucia (9 nov, 21:40 Bali). Textos definitivos para las marcas que quedaban:
- **Familias en EE. UU. y Reino Unido**: no se afirma «la mayoría». FAQ ES: «¿Sirve si vivimos en Estados Unidos o en
  Reino Unido? → Sí: gran parte de nuestras familias viven allí. Las clases se dan por videollamada y los horarios se
  muestran en tu zona horaria.»
- **Franjas horarias**: fuera la frase de «tardes y fines de semana por zona». En el bloque de ciudades (EN y ES) el P2
  queda solo: «Class times are shown in your time zone.» / «Los horarios se muestran en tu zona horaria.»
- **Equipo**: FAQ ES «¿Qué necesitamos en casa? → Un ordenador o tableta con cámara y micrófono, y una conexión estable.»
  EN: «What do we need at home? → A computer or tablet with a camera and microphone, and a stable connection.» (Lo del
  adulto cerca ya está en la FAQ actual de menores de 6; no se repite aquí.)
- **Duración**: todas las clases de principiantes duran 30 minutos; las de 10–12 años de nivel intermedio, 45. FAQ ES:
  «¿Con qué frecuencia son las clases? → Contratas 1, 2 o 3 clases a la semana (recomendamos 2). Las clases duran 30
  minutos; las de 10 a 12 años de nivel intermedio, 45.» EN: «How often are the classes? → You book 1, 2 or 3 classes a
  week (we recommend 2). Classes last 30 minutes; intermediate groups aged 10–12 have 45-minute classes.»
Con esto no queda ninguna marca [CONFIRMAR] abierta: las demás están resueltas arriba (grupo de máximo 6, 4 en
principiantes y preescolar; meta ES de 155 caracteres; preescolar 4–6 años; FAQ de 3 años con el texto actual; informes de
progreso sin cifra; reseñas a /reviews/; ciudades por GA4; title EN sin precio y «Trial class €3 or $4» en la meta).
