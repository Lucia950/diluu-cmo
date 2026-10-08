# Que Bárbara publique en el blog con Claude Code, sin tocar el resto de la web

Propuesta para Daniel (producto). La web diluu.com es Next.js (GA4 muestra /_next/image) en el
repo SrHuevo/diluu. Hay tres capas de control; con las dos primeras basta.

1. **Repositorio aparte solo para el blog** (`Lucia950/diluu-blog`): una carpeta por idioma con
   un fichero Markdown por artículo (título, slug, meta, fecha, idioma, imagen) y una carpeta de
   imágenes. Bárbara tiene permiso de escritura solo en ese repo. La web lee los artículos de ahí
   (un paso de build que copia `content/blog/**` o un fetch en build) y nada más. Alternativa si
   Daniel prefiere un solo repo: rama protegida + CODEOWNERS en `content/blog/**` y una GitHub
   Action que rechaza cualquier PR que toque ficheros fuera de esa carpeta.
2. **Claude Code en el repo del blog**, con un `CLAUDE.md` de editora de blog y
   `.claude/settings.json` que solo permite `Edit`/`Write` dentro de `content/blog/**` y deniega
   el resto, más una skill `/articulo` que: crea el fichero desde la plantilla, pasa la revisión
   (skill `/revisar-articulo`: búsqueda objetivo en título y H1, meta, preguntas de padre, enlaces
   internos, llamada a la prueba, idioma, datos sin inventar) y abre un PR.
3. **Publicación**: al fusionar el PR, la Action despliega. Los tres primeros artículos los
   aprueba Lucia; después la revisión es de Claude y Lucia solo lee el PR si quiere. Un artículo
   publicado se puede retirar con un revert.

Qué necesita Daniel: decidir repo aparte o carpeta protegida, el formato de los artículos (frontmatter)
y el paso de build. Qué necesita Bárbara: cuenta de GitHub, Claude Code con la cuenta de Diluu y
una hora de formación con Lucia.
