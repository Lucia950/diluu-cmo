# Encargo al developer (9 nov 2026): páginas de clases orientadas a la diáspora y a la intención local

Contexto para Lucia (no va en el prompt). Del encargo del 13 oct (docs/analisis/brief-paginas-clases-2026-10.md) ya está
hecho lo comprobable con curl el 9 nov: redirecciones 301 (incluidas las antiguas de lectoescritura), botones de prueba
EN con `?lang=en`, precio en el HTML sin JavaScript («Desde 10,25 $ por clase…»), schema con 10.25 USD (sin 47,80),
sitemap-static.xml con las páginas de clases. Sigue pendiente: bloque «Online desde cualquier ciudad» (punto 3.9), FAQ
nuevas, `alt` (18 imágenes sin alt en la página ES) y el H3 de heritage dentro de «cómo funciona». Lo nuevo del 9 nov:
orientar la página ES a las familias que viven fuera (la genérica «clases de español para niños» la buscan México y
España: no se persigue) y dar a EN y ES un bloque de intención local para «spanish classes london», «near me» y las
ciudades. Datos: docs/analisis/seo-revision-estrategia-2026-11-09.md.

## Prompt (pegar tal cual en el proyecto del developer)

```md
# Encargo: páginas de clases de español, orientación a familias que viven fuera + bloque local (9 nov 2026)

Páginas (no cambiar slugs, canonical ni hreflang):
- ES: https://diluu.com/es/clases-de-espanol-para-ninos-online/
- EN: https://diluu.com/spanish-classes-for-kids/
Haz también lo que sigue pendiente del encargo del 13 oct (sección 3.9 «Online desde cualquier ciudad», FAQ nuevas,
`alt` de imágenes y sacar el H3 de heritage del bloque «cómo funciona»); lo demás de ese encargo ya está en producción.
Los textos van aquí redactados: cópialos tal cual. Donde pone [CONFIRMAR: …] déjalo marcado y no inventes datos.
No cambies precios, contadores ni el widget de precios (salen de la API).

## 1. Página ES: para familias hispanohablantes que viven fuera

Por qué: quien busca «clases de español para niños» a secas está en México o España. Nuestra familia vive en
EE. UU., Reino Unido o Alemania y busca «clases de español online para niños en Estados Unidos», «español para niños
bilingües», «mi hijo entiende español pero no lo habla». La página tiene que decirlo desde la primera línea.

1.1 `<title>` (≤ 60 caracteres):
    Clases de español online para niños que viven fuera | Diluu
1.2 H1 (único): Clases de español online para niños que viven fuera de un país hispanohablante
1.3 Meta description (≤ 155):
    Clases de español en directo para niños de 4 a 12 años de familias hispanohablantes en EE. UU., Reino Unido y
    Europa. Grupos de máximo 4 con profes nativas. Prueba por 3 €.
    `og:title` y `og:description` iguales a title y meta.
1.4 Párrafo del hero (sustituye al actual «Clases de español para niños de 4 a 12 años, en vivo…»):
    Para familias españolas y latinoamericanas que viven en Estados Unidos, Reino Unido o cualquier otro país: clases
    de español en directo, en grupos de máximo 4 niños de la misma edad y nivel, con profesoras nativas. Tu hijo habla
    español con otros niños que también lo tienen en casa y lo oyen poco fuera. Horarios por zona horaria.
    [CONFIRMAR: «máximo 4» y la cifra de familias/países que hoy pone «56 países»].
1.5 Bloque nuevo después de «¿Tu hijo ya entiende el español en casa?» (H2 + 3 párrafos cortos + enlaces):
    H2: Si entiende español pero contesta en inglés, está en el sitio correcto
    P1: Es lo más habitual en las familias que llegan a Diluu: el colegio y los amigos van en inglés, y el español se
    queda en casa con cada vez menos usos. No es falta de interés, es falta de ocasiones en las que hablarlo haga falta.
    P2: En clase, la profesora no traduce y el grupo solo habla español: con otros niños en su misma situación, hablar
    deja de dar vergüenza. Por edades, con juegos y con un objetivo cada semana.
    P3 con dos enlaces: «Haz el test de 2 minutos: ¿por qué entiende español pero no lo habla?» →
    https://diluu.com/es/test/mi-hijo-entiende-espanol-pero-no-lo-habla/ y «Lee cómo trabajamos con estos niños» →
    https://diluu.com/es/blog/clases-de-espanol-para-ninos-que-entienden-pero-no-lo-hablan/ (ancla exacta:
    «clases de español para niños que entienden pero no lo hablan»).
1.6 FAQ nuevas (texto visible y en el `FAQPage` del schema, idéntico):
    - ¿Sirve si vivimos en Estados Unidos o en Reino Unido? → Sí: la mayoría de nuestras familias viven allí. Las
      clases se dan por videollamada y los horarios se muestran en tu zona horaria. [CONFIRMAR: «la mayoría»]
    - Mi hijo entiende español pero no lo habla, ¿puede empezar? → Sí, es el caso más frecuente. Lo colocamos en un
      grupo de su edad y su nivel real de habla, y la profesora trabaja para que hable desde el primer día.
    - ¿Con qué frecuencia son las clases? → [CONFIRMAR: 1 a 3 clases a la semana, 30 o 45 min según la edad].
1.7 Enlaces internos que faltan en el cuerpo: «clases de español para preescolar» → /es/espanol-para-preescolar/;
    «español para niños bilingües» → /es/espanol-para-ninos-bilingues/; en el bloque de precio, «cuánto cuestan las
    clases de español online para niños» → /es/blog/cuanto-cuestan-clases-de-espanol-online-para-ninos/.

## 2. EN y ES: bloque «Online desde cualquier ciudad» (pendiente del 13 oct, sección 3.9)

Colocar después de «Profesoras nativas…» y antes de «Lo que dicen las familias». Sin páginas nuevas por ciudad.
EN:
    H2: Online Spanish classes for kids in London, New York, Dublin or wherever you live
    P1: Diluu is online, so your child gets a native teacher and a small group even if there is no Spanish school
    nearby. Families join us from London, Manchester, New York, Miami, Dublin, Sydney and 50+ other cities.
    [CONFIRMAR: ciudades con familias reales; «50+»]
    P2: Class times are shown in your time zone, with afternoon and weekend slots for the UK, Ireland, the US East and
    West coasts and Australia. [CONFIRMAR: franjas reales por zona]
    P3 enlace: «Looking for Spanish classes for kids near you? Here is how online compares» →
    https://diluu.com/blog/spanish-classes-for-kids-near-me/ (ancla exacta: «Spanish classes for kids near me»).
ES:
    H2: Clases de español online para niños en Londres, Nueva York, Dublín o donde vivas
    P1: Diluu es online: tu hijo tiene profesora nativa y un grupo pequeño aunque no haya una escuela de español cerca.
    Hay familias en Londres, Mánchester, Nueva York, Miami, Dublín, Sídney y más de 50 ciudades. [CONFIRMAR]
    P2: Los horarios se muestran en tu zona horaria, con tardes y fines de semana para Reino Unido, Irlanda, las dos
    costas de EE. UU. y Australia. [CONFIRMAR]

## 3. Pendientes del 13 oct que siguen sin hacer

3.1 Sacar el H3 «¿Por qué entiende español pero no lo habla?» / «Why does he understand Spanish but won't speak it?»
    del bloque «cómo funciona» y llevarlo al bloque de heritage (ES: al bloque nuevo 1.5).
3.2 `alt` en todas las imágenes: descriptivo en las fotos de alumnos y profesoras, `alt=""` en mascotas y adornos.
    Hoy la página ES tiene 18 `<img>` sin alt.
3.3 FAQ del 13 oct que falten (precio, equipo necesario, progreso, online frente a presencial) con los textos de ese
    encargo o [CONFIRMAR].

## 4. Comprobación (antes de decir «hecho»)

1. `curl -sL <url> | grep -oE '<h1[^>]*>[^<]*'` → un solo H1 con el texto nuevo; `<title>` ≤ 60 y meta ≤ 155.
2. `curl -sL <url> | grep -oE '<h2[^>]*>[^<]*'` incluye los H2 nuevos en el orden indicado.
3. `curl -sL <url> | grep -oE 'href="https://diluu.com/[^"]*"' | sort -u` incluye los enlaces de 1.5, 1.7 y 2.
4. `FAQPage` del schema: mismo número de preguntas que las visibles y mismo texto; Rich Results Test sin errores.
5. `curl -sL <url> | grep -oE '<img[^>]*>' | grep -vcE 'alt="[^"]*"'` → 0.
6. `grep -c "CONFIRMAR"` en el HTML publicado → 0 (Lucia confirma antes de publicar).
7. Nada roto: widget de precios, botón de prueba (ES sin parámetro; EN con `?lang=en`), canonical y hreflang como hoy.
8. Deja la salida de cada comprobación en PAGINAS-CLASES-VERIFICACION.md.
```
