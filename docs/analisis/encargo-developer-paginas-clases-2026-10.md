<!-- Encargo para el proyecto de developer. Fuente y datos: docs/analisis/brief-paginas-clases-2026-10.md (13 oct 2026). -->
# Encargo: páginas de clases de español EN/ES (SEO + conversión)

Objetivo: que Google asocie estas tres páginas a sus búsquedas comerciales (hoy posiciona posts del
blog en su lugar) y que el tráfico en inglés llegue a la clase de prueba en inglés. Auditoría del
13 oct 2026 (HTML servido, Search Console y GA4). Ordenado por prioridad. Lucia escribe los textos;
donde pone [TEXTO-LUCIA: …], deja el hueco marcado y no inventes contenido, cifras, reseñas ni precios.

Páginas (no cambiar sus slugs):
- EN: https://diluu.com/spanish-classes-for-kids/
- ES: https://diluu.com/es/clases-de-espanol-para-ninos-online/
- ES preescolar: https://diluu.com/es/espanol-para-preescolar/
Son HTML estático servido por LiteSpeed (Hostinger); el blog va aparte (WordPress + Yoast). Si en
tu repo estas páginas se generan de otra forma (plantillas, Next.js), aplica lo mismo en la fuente.

## 0. Redirecciones, sitemap e idioma del botón (hacer primero; no dependen del texto)

### 0.1 Redirecciones 301 (hoy están mal)

| Desde | Hoy | Debe ir a |
|---|---|---|
| /es/spanish-classes-for-kids/ (con y sin barra) | 301 → /blog/spanish-classes-for-kids-near-me/ | /es/clases-de-espanol-para-ninos-online/ |
| /es/spanish-for-kindergartners/ (con y sin barra) | 404 | /es/espanol-para-preescolar/ |
| /fr/spanish-classes-for-kids/ | 301 → /blog/spanish-classes-for-kids-near-me/ | /fr/cours-despagnol-pour-enfants-en-ligne/ |
| /fr/spanish-for-kindergartners/ | 404 | /fr/espagnol-pour-la-maternelle/ |

Una sola redirección, sin cadenas. Busca la regla actual que manda /es/ y /fr/spanish-classes-for-kids/
al post (en .htaccess o en el plugin de redirecciones de WordPress) y sustitúyela.

### 0.2 Botón de prueba en inglés
/trial-sp/ elige el idioma así: `?lang=`, si no localStorage, y si no "es" (el idioma del navegador no
se usa). Por eso, en las páginas en inglés, todos los enlaces a la prueba de español deben llevar
`?lang=en`:
- /spanish-classes-for-kids/ (3 enlaces `https://diluu.com/trial-sp/`)
- /spanish-for-kindergartners/ (4), /spanish-classes-for-kids-4-6/ (3) y la home / (7)
- Revisa también /spanish-classes-for-kids-7-9/, /spanish-classes-for-kids-10-12/,
  /spanish-for-heritage-speakers-kids/ y /spanish-literacy-for-kids/.
Las páginas ES no cambian (`/trial-sp/` sin parámetro = español). Las de francés ya lo hacen bien
(`/trial-fr/?lang=en`).

### 0.3 Sitemap
Ninguna de las tres páginas está en `sitemap_index.xml` (Yoast solo conoce WordPress). Si ya está
hecha la tarea del sitemap propio (`sitemap-pages.xml` + índice), comprueba que incluye las tres
con `lastmod` y `xhtml:link` hreflang en/es/fr/x-default. Si no, haz al menos un `sitemap-pages.xml`
con las páginas estáticas de clases (EN, ES y FR, edades, heritage, preescolar, lectoescritura) y
añádelo a `robots.txt`. Excluye /trial-sp-b/, /trial-fr-b/, /thank-you/ y /landing/.

### 0.4 Posts del blog en el sitemap
Los índices /blog/, /es/blog/ y /fr/blog/ enlazan 123 posts distintos, pero `post-sitemap.xml` (Yoast) solo
lista 47. Comprueba por qué faltan (¿idiomas de Polylang, posts marcados noindex, otro tipo de contenido?) y
haz que todos los posts publicados e indexables estén en el sitemap, con su hreflang si el plugin lo permite.
No cambies URLs ni contenido de los posts: el blog lo lleva Bárbara.

### 0.5 Redirecciones de heyspanish.com que acaban en 404
heyspanish.com redirige conservando la ruta (heyspanish.com/X → diluu.com/X), y muchas rutas antiguas no existen en
diluu.com: /based, /booking y /contact dan 404 (comprobado el 13 oct 2026). Hay enlaces vivos a ellas (descripciones
de YouTube a heyspanish.com/based). Cambia la regla: las rutas de heyspanish.com que no existan en diluu.com van con
301 a https://diluu.com/spanish-classes-for-kids/ (y /based y /booking a https://diluu.com/trial-sp/?lang=en). Las que
sí existen (por ejemplo /blog/…) siguen conservando la ruta. Comprobación:
`for u in based booking contact blog/spanish-books-for-kids; do curl -sIL -o /dev/null -w "%{http_code} %{url_effective}\n" https://heyspanish.com/$u; done`
→ ningún 404.

### 0.6 Más URLs antiguas con tráfico que dan 404 o van a mal sitio (añadido el 26 oct 2026)
Revisión de todas las URLs con más de 40 impresiones en Search Console desde jun 2025 (curl, 26 oct). Clics =
clics históricos de Google (jun 2025–oct 2026). Todas 301, de un solo salto, con y sin barra final. Las de 0.1
siguen pendientes y van primero.

**a) Páginas de clases y de la web (hacer ya)**

| Desde | Hoy | Debe ir a | Clics |
|---|---|---|---|
| /es/home/ | 404 | /es/ | 775 |
| /es/online-language-classes-4-6-year-olds/ | 404 | /es/clases-de-espanol-para-ninos-de-4-a-6-anos/ | 7 |
| /es/online-language-classes-7-9-year-olds/ | 404 | /es/clases-de-espanol-para-ninos-de-7-a-9-anos/ | 7 |
| /es/online-language-classes-10-12-year-olds/ | 404 | /es/clases-de-espanol-para-ninos-de-10-a-12-anos/ | 17 |
| /fr/online-language-classes-4-6-year-olds/ | 404 | /fr/cours-despagnol-pour-enfants-de-4-a-6-ans/ | 23 |
| /fr/online-language-classes-7-9-year-olds/ | 404 | /fr/cours-despagnol-pour-enfants-de-7-a-9-ans/ | 26 |
| /fr/online-language-classes-10-12-year-olds/ | 404 | /fr/cours-despagnol-pour-enfants-de-10-a-12-ans/ | 12 |
| /fr/literacy-from-scratch-course/ | 404 | /fr/lire-et-ecrire-en-espagnol-pour-enfants/ | 4 |
| /en/es/literacy-from-scratch-course/ | 2 saltos | /es/lectoescritura-en-espanol-para-ninos/ (directo) | 110 |
| /es/spanish-courses/ | 404 | /es/clases-de-espanol-para-ninos-online/ | 24 |
| /spanish-courses/ | 404 | /spanish-classes-for-kids/ | 4 |
| /fr/cours-de-francais-pour-la-maternelle-meilleur-programme-pour-les-enfants/ | 404 | /fr/cours-de-francais-pour-enfants-de-4-a-6-ans/ | 2 |
| /es/our-teachers/ y /en/es/our-teachers/ | 404 | /es/nuestros-profesores/ | 54 |
| /fr/our-teachers/ | 404 | /fr/decouvrez-nos-professeurs-de-langues-pour-enfants/ | 10 |
| /teacher-lucia-marin/, /teacher-laura-nunez/, /teacher-estefania-gil-suarez/ | 404 | /our-teachers/ | 20 |
| /es/teacher-lucia-marin/, /es/teacher-laura-nunez/, /es/teacher-estefania-gil-suarez/ | 404 | /es/nuestros-profesores/ | 35 |
| /fr/teacher-lucia-marin/, /fr/teacher-laura-nunez/, /fr/teacher-estefania-gil-suarez/ | 404 | /fr/decouvrez-nos-professeurs-de-langues-pour-enfants/ | 6 |
| /blog/heyspanish-is-diluu/, /es/blog/heyspanish-is-diluu/, /fr/blog/heyspanish-is-diluu/ | 404 | Si el post está en la papelera o en las revisiones de WordPress, **recupéralo** (explica el cambio de marca y lo buscan por «heyspanish»). Si no, 301 a /, /es/ y /fr/ | 524 |
| /blog/duolingo-for-kids-learn-spanish/ | va al post en español | /blog/best-spanish-learning-app-for-kids/ | 29 |
| /fr/blog/duolingo-for-kids-learn-spanish/ | va al post en español | /fr/blog/meilleure-application-apprendre-francais-enfants/ | 12 |

**b) Posts del blog que han desaparecido (no son de padres, pero traían visitas)**
Mira si están en la papelera o en una copia de la base de WordPress. Si están, recupéralos con su URL; si no, déjalos
en 404 y dímelo (no los redirijas a cosas que no tienen que ver):
- /blog/does-mexico-celebrate-thanksgiving/ (+ /es/ y /fr/): 100 clics y 63.000 impresiones. Es de temporada:
  Acción de Gracias es el 26 nov, así que, si se recupera, que sea antes del 15 nov.
- /blog/the-easiest-language-to-learn-for-spanish-speakers/ (+ /es/ y /fr/): 111 clics y 43.000 impresiones.
- /blog/spanish-immersion-summer-camps/ (+ /es/): 5.700 impresiones. Si no se recupera, 301 a /spanish-classes-for-kids/.
- Versiones en inglés que ya no existen y hoy redirigen a la versión en español: /blog/spanish-kids-shows-on-youtube/
  (61 clics, 23.780 impresiones; es el post de series que Bárbara mejora en diciembre), /blog/family-activities-to-practice-spanish-during-vacation/,
  /blog/online-schooling-for-expat-families/, /blog/raising-bilingual-children-dominant-language/,
  /blog/why-kids-learn-better-with-native-speaker-teachers/ y
  /blog/what-to-do-if-your-child-struggles-with-vocabulary-second-language/. Dime cuáles se pueden recuperar.

**c) Enlaces internos a URLs viejas**
Busca en el contenido del blog (base de WordPress) y en las páginas estáticas los enlaces a cualquier URL de 0.1 y
0.6 y cámbialos por el destino nuevo (directo, sin pasar por la redirección). Ejemplo: /fr/blog/elever-enfants-bilingues-langue-dominante/
enlaza a /fr/online-language-classes-4-6-year-olds/, …-7-9-…, …-10-12-… y /fr/literacy-from-scratch-course/, y es el
post al que apuntan 6 de los contactos de enlaces en francés. Pásame la lista de posts cambiados.

**d) Aprobado por Lucia el 26 oct (docs/analisis/canibalizacion-paginas-clases-2026-10.md):** 301 de /blog/online-spanish-classes-for-kids/,
/blog/online-spanish-lessons-for-kids/ y /blog/online-spanish-classes-for-kids-usa/ a /spanish-classes-for-kids/, y
sus versiones /es/ y /fr/ a /es/clases-de-espanol-para-ninos-online/ y /fr/cours-despagnol-pour-enfants-en-ligne/.

**Comprobación de 0.1 y 0.6:**
`for u in es/home es/spanish-for-kindergartners fr/spanish-for-kindergartners es/spanish-classes-for-kids fr/spanish-classes-for-kids fr/online-language-classes-4-6-year-olds es/online-language-classes-7-9-year-olds fr/literacy-from-scratch-course en/es/literacy-from-scratch-course es/spanish-courses es/our-teachers teacher-lucia-marin blog/duolingo-for-kids-learn-spanish; do curl -sL -o /dev/null -w "%{http_code} %{num_redirects} $u -> %{url_effective}\n" https://diluu.com/$u/; done`
→ todas 200, con 1 redirección y al destino de la tabla.

### 0.7 Lo que encontró la primera auditoría automática (26 oct 2026, scripts/auditoria-web.py del repo CMO)
Informe completo en el repo CMO: data/auditoria-web-2026-10-26.md. 301 de un salto, con y sin barra final.

**a) Redirecciones que llevan a otro idioma (destino correcto según el hreflang de la página)**

| Desde | Hoy va a | Debe ir a | Clics |
|---|---|---|---|
| /fr/french-classes-for-kids/ | /french-classes-for-kids/ | /fr/cours-de-francais-pour-enfants-en-ligne/ | 97 |
| /es/french-classes-for-kids/ | /french-classes-for-kids/ | /es/clases-de-frances-para-ninos-online/ | 38 |
| /fr/spanish-courses/ | /french-classes-for-kids/ | /fr/cours-despagnol-pour-enfants-en-ligne/ | 0 |
| /fr/blog/spanish-kids-shows-on-youtube/ | /es/blog/… | /fr/blog/chaines-youtube-en-francais-pour-enfants/ | 82 |
| /fr/blog/family-activities-to-practice-spanish-during-vacation/ | /es/blog/… | /fr/blog/activites-en-famille-pratiquer-francais-vacances/ | 37 |
| /fr/blog/online-language-classes-vs-apps-for-kids/ | /es/blog/… | /fr/blog/cours-de-langues-en-ligne-vs-applications-pour-enfants/ | 5 |
| /fr/blog/best-languages-to-teach-kids-based-on-their-age/ | /es/blog/… | /fr/blog/meilleures-langues-enseigner-enfants-selon-age/ | 5 |
| /fr/blog/benefits-group-language-learning-for-children/ | /es/blog/… | /fr/blog/avantages-apprentissage-langues-en-groupe-enfants/ | 2 |
| /fr/blog/raising-bilingual-children-dominant-language/ | /es/blog/… | /fr/blog/elever-enfants-bilingues-langue-dominante/ | 1 |
| /fr/blog/my-child-doesnt-want-to-speak-spanish/ | /es/blog/… | /fr/blog/mon-enfant-ne-veut-pas-parler-francais/ | 1 |
| /fr/blog/online-schooling-for-expat-families/ | /es/blog/… | /fr/blog/enseignement-en-ligne-familles-expatriees/ | 1 |
| /fr/es/blog/are-language-learning-apps-safe-for-kids/ | /es/blog/… | /fr/blog/applications-langues-sont-elles-sures-pour-enfants/ | 0 |
| /es/blog/spanish-immersion-summer-camps/ | /spanish-classes-for-kids/ | /es/clases-de-espanol-para-ninos-online/ | 1 |
| /blog/my-child-doesnt-want-to-speak-spanish/ (EN, no existe) | /es/blog/… | Si está en la copia de WordPress, recupérala como las 9 EN; si no, /blog/spanish-for-kids-who-understand-but-wont-speak-it/ | 0 (252 impr.) |

**b) 404 con tráfico**

| URL | Debe ir a | Clics |
|---|---|---|
| /es/fr/blog/best-online-spanish-courses-for-kids/ | /fr/blog/meilleurs-cours-de-francais-en-ligne-pour-enfants/ | 3 |
| /fr/fr/blog/spanish-as-a-second-language-benefits-tips-methods/ | /fr/blog/le-francais-langue-seconde-avantages-conseils-methodes/ | 3 |
| /fr/blog/spanish-immersion-summer-camps/ | /fr/cours-despagnol-pour-enfants-en-ligne/ | 0 (139 impr.) |
| /en/fr/literacy-from-scratch-course/ (hoy 2 saltos) | /fr/lire-et-ecrire-en-espagnol-pour-enfants/ en un salto | 2 |

**c) Enlaces internos a URLs que redirigen**
- /fr/french/ está enlazada desde 40 páginas (parece el menú o el selector de idioma de las páginas de WordPress): cámbiala
  por /fr/cours-de-francais-pour-enfants-en-ligne/.
- /es/blog/ enlaza a /es/curso-online-de-lectoescritura-en-espanol-aprende-a-leer-y-escribir-con-diluu/ → /es/lectoescritura-en-espanol-para-ninos/.
- /es/frances-para-ninos-bilingues/ enlaza a /es/blog/criar-ninos-bilingues-como-mantener-vivo-el-idioma-minoritario/ → /es/blog/raising-bilingual-children-dominant-language/.
- /blog/several-languages-at-home/ y /blog/should-i-speak-english-to-my-kids-if-im-not-fluent/ enlazan a /blog/my-child-doesnt-want-to-speak-spanish/ (ver a).
- El resto sale de páginas de WordPress que no deberían estar en el sitemap (ver d).

**d) WordPress (con Lucia)**
- Páginas de archivo en el sitemap de Yoast que enlazan a URLs viejas: /blog/author/lucia/, /blog/category/blog/,
  /es/blog/category/uncategorized-es/, /fr/blog/category/uncategorized-fr/. En Yoast, autores y categorías → «no
  mostrar en los resultados de búsqueda» (salen del sitemap y llevan noindex).
- Páginas que parecen internas y están en el sitemap: /es/extras/ («Extras»), /es/nh/ («Nh»), /es/ui-level/ («UI Level»).
  Pregunta a Lucia qué son antes de tocarlas; si no se usan, a borrador.
- /referidos-diluu/, /referrals-diluu/ y /programme-de-parrainage/ redirigen a formularios de Google **cerrados**. El
  programa de referidos vive ahora en el panel de familias: decide con Lucia adónde llevarlas.
- /fr/french/ (página de WordPress que redirige): a borrador cuando c) esté hecho.

Comprobación: `python3 scripts/auditoria-web.py` en el repo CMO (o pide a Lucia que lo lance): los apartados 1 y 2
no deben listar ninguna URL de esta sección.

### 0.8 Segunda auditoría automática (2 nov 2026, revisión mensual): los precios del schema ya no cuadran con la API

El 1 nov la API pública cambió los precios en EUR y USD (grupo desde 12,75 € y 14,25 $, antes 12,50 € y 14 $; GBP sigue en
10,50 £; precio del plan anual con 3 clases a la semana: 10,25 $ en grupo y 16 € en lectoescritura, antes 10 $ y 15,75 €).
Las 39 páginas de clases llevan el precio escrito en el HTML, así que el schema Course de todas dice 10 USD (lectoescritura
15.75 EUR) y la línea de precios de las 11 páginas principales sigue mostrando los importes antiguos (`data/auditoria-web-2026-11-02.md`,
apartado 3). Es exactamente lo que pide la sección 5 (precios de la API escritos en el HTML en el build): mientras no se
haga, cada cambio de la API deja las 39 páginas desfasadas y Google puede marcar el schema como engañoso.

| Qué | Hoy en el HTML | API el 1 nov | Páginas |
| --- | --- | --- | --- |
| Schema Course, grupo | 10 USD | 10,25 USD | 33 |
| Schema Course, lectoescritura | 15.75 EUR | 16 EUR | 6 |
| Línea de precios "desde" (EUR / USD) | 12,50 € / 14 $ | 12,75 € / 14,25 $ | 11 principales |

Lo demás no cambia desde el 26 oct: las mismas 23 URLs con tráfico que redirigen mal o dan 404 (0.6 y 0.7), los mismos
19 enlaces internos a redirecciones (/fr/french/ en 40 páginas) y las 4 entradas del sitemap de Yoast. Nada de la sección 0
se ha desplegado todavía.

## 1. Enlaces internos en el idioma correcto

| Página | Enlace | Hoy | Debe ir a |
|---|---|---|---|
| ES y ES preescolar | "qué pasa en la clase de prueba" / "cómo es una clase de prueba de español de 3 €" | /blog/trial-spanish-class-for-kids/ | /es/blog/clase-de-prueba-de-espanol-para-ninos/ |
| ES preescolar | "Hablantes de herencia" (menú, pie y cuerpo) | /spanish-for-heritage-speakers-kids/ | /es/espanol-para-ninos-bilingues/ |
| ES preescolar | "Blog" (menú) | /blog/ | /es/blog/ |
| ES preescolar | "Cómo funciona" / "Precios" (menú) | /es/clases-de-espanol-para-ninos-online/ | la misma URL + `#how-it-works` / `#prices` |
| ES | "Leer más en Google" | https://www.google.com/search?q=diluu+reviews | [TEXTO-LUCIA: Trustpilot o página de reseñas] |

Enlaces nuevos en el cuerpo (anclas exactas):
- EN, en el bloque de precio → /blog/how-much-do-online-spanish-classes-for-kids-cost/ ("how much online Spanish classes for kids cost")
- EN, en el bloque heritage → /blog/spanish-for-kids-who-understand-but-wont-speak-it/
- ES, en el bloque de precio → /es/blog/cuanto-cuestan-clases-de-espanol-online-para-ninos/
- ES, en el bloque "¿Tu hijo ya entiende el español en casa?" → /es/blog/clases-de-espanol-para-ninos-que-entienden-pero-no-lo-hablan/
- ES → ES preescolar con el ancla "clases de español para preescolar"; ES preescolar → ES con "clases de español para niños" (ya existe).

## 2. Title, meta, H1 y schema

| Página | `<title>` | H1 | Meta description |
|---|---|---|---|
| EN | Se mantiene ("Online Spanish Classes for Kids (4–12) · Trial €3 \| Diluu"), salvo [TEXTO-LUCIA: moneda de la prueba en el title] | Se mantiene ("Online Spanish classes for kids") | Añadir el precio "from [TEXTO-LUCIA: £X] a class"; ≤ 155 caracteres |
| ES | Se mantiene ("Clases de español para niños online (4–12) \| Diluu") | Se mantiene | Añadir "desde [TEXTO-LUCIA: X €] la clase"; ≤ 155 |
| ES preescolar | Clases de español para preescolar (4 a 6 años) \| Diluu | Clases de español online para preescolar (la frase actual "su primera aventura en un nuevo idioma" pasa a subtítulo `<p>`) | Clases de español online para niños de 4 a 6 años: 30 minutos de canciones, cuentos y juego con una profe nativa, máximo 4 por grupo. Prueba por 3 €. |

La edad de preescolar (4–6 o 3–5) la confirma Lucia antes de publicar: [TEXTO-LUCIA: edad].
`og:title` y `og:description` iguales a `title` y meta. Un solo H1 por página. Sin saltos de nivel (no H3 sin H2 padre).

Schema (JSON-LD):
- `Course.offers`: quitar `price: 47.80 EUR`, que no corresponde a ninguna tarifa. Usar `AggregateOffer`
  con `lowPrice` y `highPrice` por clase en la moneda principal de la página, tomados de
  https://platform.diluu.com/api/public/class-prices (grupo, `visibility: PUBLIC`). Precio por clase
  a 1 oct 2026: GBP 7,50–10,50 · EUR 9,00–12,50 · USD 10,00–14,00. Añadir un `Offer` para la clase
  de prueba con [TEXTO-LUCIA: precio y moneda de la prueba].
- `Course` en ES preescolar: añadir `url` e `inLanguage: "es"`, y `name` con la edad confirmada.
- `FAQPage`: debe contener exactamente las preguntas y respuestas visibles en la página (mismo
  texto). Se añaden las nuevas de la sección 3.
- `aggregateRating`: solo si Lucia confirma la cifra y la fuente, y las reseñas se muestran en la página.

## 3. Estructura de bloques (EN y ES con el mismo orden; preescolar mantiene el suyo y añade 3.b)

Reordenar los bloques existentes y crear los nuevos con huecos para el texto:

1. Hero: H1, una frase [TEXTO-LUCIA: qué es, en 25 palabras], botón de prueba, reseñas con cifra [TEXTO-LUCIA: nº y fuente].
2. Por edades (ya existe): tres franjas, preescolar, heritage y lectoescritura.
3. Precio (ya existe como widget): **nuevo párrafo estático en el HTML, encima del widget**, que se
   vea sin JavaScript: [TEXTO-LUCIA: "Clases en grupo desde X la clase · Y cada 4 semanas con 1 clase a la semana · sin permanencia"].
   El widget sigue igual. Arreglar que los textos del servidor salgan en el idioma de la página
   ("En grupo", "Individual", "Clases por semana", "Ver precios en" aparecen en español en la página EN
   antes de que cargue el JS).
4. Cómo funciona (ya existe: 3 pasos). Sacar de aquí el H3 "Why does he understand Spanish but won't speak it?" y llevarlo al bloque 6.
5. Metodología (ya existe) + **nuevo "Qué necesitáis en casa"**: [TEXTO-LUCIA: dispositivo, conexión, adulto presente sí/no por edad, duración].
6. Heritage (ya existe) con el quiz.
7. **Nuevo "Cómo veréis el progreso"**: [TEXTO-LUCIA: informes, cada cuánto, qué incluyen] + el bloque "Mucho más que una clase" (ya existe).
8. Profesoras: 3 visibles y enlace "ver todas" a /our-teachers/ o /es/nuestros-profesores/.
9. **Nuevo "Online desde cualquier ciudad"** (EN: "Online from anywhere"): [TEXTO-LUCIA: online frente a una academia cercana, horarios por zona horaria; ciudades: Londres, Nueva York, Dublín, Sídney…].
10. Testimonios (ya existe).
11. FAQ (ya existe) + nuevas: [TEXTO-LUCIA: precio, equipo necesario, progreso, online frente a presencial]. En preescolar: [TEXTO-LUCIA: precio, 30 minutos de pantalla con 4 años, si no quiere hablar, y si tiene 3 años].
12. CTA final (ya existe).

3.b Preescolar: añadir el bloque de precio estático (como el punto 3) y la FAQ "¿Y si tiene 3 años?".

## 4. Imágenes
`alt` descriptivo en las fotos de alumnos (/spanish-for-heritage-speakers-kids/assets/*.jpg) y
`alt=""` en las mascotas decorativas (/trial-sp/assets/*-felices.png). Hoy faltan en 18 (EN), 17 (ES) y 17 (preescolar).

## 5. Criterios de aceptación y cómo comprobarlo

1. Redirecciones (deben devolver un solo 301 al destino y luego 200):
   `for u in es/spanish-classes-for-kids es/spanish-classes-for-kids/ es/spanish-for-kindergartners es/spanish-for-kindergartners/ fr/spanish-classes-for-kids/ fr/spanish-for-kindergartners/; do curl -sIL -o /dev/null -w "%{http_code} %{num_redirects} %{url_effective}\n" https://diluu.com/$u; done`
2. Botones EN: `curl -sL https://diluu.com/spanish-classes-for-kids/ | grep -oE 'href="[^"]*trial-sp/[^"]*"' | sort | uniq -c`
   devuelve solo `trial-sp/?lang=en`. Lo mismo en /spanish-for-kindergartners/, /spanish-classes-for-kids-4-6/ y /.
   Abrir /trial-sp/?lang=en en una ventana privada: la página sale en inglés.
3. Sitemap: `curl -s https://diluu.com/sitemap-pages.xml | grep -cE 'spanish-classes-for-kids/|clases-de-espanol-para-ninos-online/|espanol-para-preescolar/'` ≥ 3, y el sitemap figura en robots.txt.
4. Precio sin JS: `curl -sL <página> | sed 's/<[^>]*>/ /g' | grep -iE '(£|€|\$)[0-9]'` encuentra el precio por clase en las tres páginas.
5. Schema: las tres pasan el Rich Results Test de Google sin errores (`Course`, `FAQPage`, `BreadcrumbList`). Ninguna lleva `47.80`.
   El número de preguntas de `FAQPage` coincide con las visibles.
6. Enlaces: en las dos páginas ES no queda ningún `href` a `/blog/` (inglés) ni a `/spanish-for-heritage-speakers-kids/`:
   `curl -sL <url> | grep -oE 'href="https://diluu.com/(blog/|spanish-for-heritage)[^"]*"'` sin resultados.
7. Un `<h1>` por página; `title` ≤ 60 caracteres y meta ≤ 155; canonical a sí misma; hreflang en/es/fr/x-default recíprocos (sin cambios respecto a hoy).
8. Ningún hueco [TEXTO-LUCIA] publicado: `grep -c "TEXTO-LUCIA"` = 0 en el HTML publicado.
9. Nada roto en /trial-sp/ ni en el widget de precios (se ve en EN y ES, con moneda y CTA).
10. Deja un `PAGINAS-CLASES-VERIFICACION.md` con la salida de cada comprobación.
