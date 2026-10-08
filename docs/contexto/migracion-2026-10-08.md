# Migración del proyecto CMO de Diluu a Claude Code

Oct 8, 2026 · @Lucia

## Resumen

La propuesta es pasar el proyecto CMO a un repositorio privado de GitHub, `diluu-cmo`, que Claude Code lee al empezar cada sesión, tanto en tu ordenador como en la nube. Las instrucciones del proyecto pasan a un `CLAUDE.md`, los 16 documentos a la carpeta `docs/`, las rutinas que repetimos a *skills* y las tareas programadas a rutinas de Claude Code ligadas a ese repositorio.

**Qué ganas**

- **Datos reutilizables:** las extracciones de Stripe y Supermetrics se guardan como ficheros y scripts. Hoy se pagina Stripe entero (4.386 suscripciones) cada vez que hace falta una serie.
- **Historial:** cada decisión, plan y registro semanal queda versionado con git, con fecha y diferencias.
- **Tareas programadas que leen y escriben en el mismo sitio:** hoy cada tarea escribe en documentos sueltos del proyecto. El dashboard semanal "local" ha corrido siete veces en la nube sin poder tocar el artefacto de tu ordenador.
- **Rutinas como comandos:** `/registro-semanal` o `/unit-economics` ejecutan siempre el mismo método en vez de reescribirlo en cada conversación.

**Qué no cambia:** los conectores de claude.ai (Stripe, Supermetrics, Brevo, Drive, Sheets, Slack, Notion, Calendar) aparecen solos en Claude Code si entras con tu cuenta de claude.ai.

**Qué cambia:** la memoria de claude.ai no viaja a Claude Code. Lo que hoy recuerda el proyecto tiene que quedar escrito en el repositorio.

## Inventario: qué hay hoy y a dónde va

Nueve piezas componen el proyecto CMO. Se mueven siete; los artefactos y el proyecto de Google Ads se quedan donde están.

| Pieza | Hoy, en claude.ai | En Claude Code | Cómo |
| --- | --- | --- | --- |
| Instrucciones del proyecto (rol de CMO, regla n.º 1, métricas norte, guardrails, formato) | Instrucciones del proyecto CMO | `CLAUDE.md` en la raíz del repo | Copiar y ampliar con el contexto del negocio (sección 4) |
| 16 documentos `claude/*.md` | Conocimiento del proyecto | `docs/` por carpetas | Volcar y hacer commit (paso 3) |
| Memoria del proyecto y de la cuenta sobre marketing y ventas | Memoria de claude.ai | `docs/contexto/` y `CLAUDE.md` | Resumir a mano: no se sincroniza |
| Conectores | Conectores de claude.ai | Los mismos, automáticos al entrar con tu cuenta de claude.ai | Comprobar con `/mcp` |
| 2 tareas programadas activas del CMO | Tareas programadas de claude.ai | Rutinas de Claude Code con el repo añadido | Sección 7 |
| Rutinas que repetimos (registro semanal, unit economics, clasificar canales) | Prompts largos dentro de cada tarea | *Skills* en `.claude/skills/` | Sección 6 |
| Extracciones de datos (Stripe, Supermetrics) | Se pierden al cerrar cada sesión | Scripts en `scripts/` y datos en `data/`, fuera de git | Sección 6 |
| Artefactos (deck de la becaria, documento del plan Q4, dashboards) | claude.ai | Se quedan; sus enlaces van a `docs/contexto/enlaces.md` | Sin cambio |
| Proyecto de Google Ads | Otro proyecto de claude.ai | Fuera de esta migración | Decisión pendiente (sección 9) |

## Estructura del repositorio

Un solo repositorio privado, `diluu-cmo`, separado del repo de producto (`SrHuevo/diluu`). Así las rutinas de marketing no clonan el código de la web en cada ejecución y los datos de negocio no se mezclan con el desarrollo.

```
diluu-cmo/
├── CLAUDE.md                  # instrucciones del CMO: se cargan en cada sesión
├── CLAUDE.local.md            # notas personales de Lucia, fuera de git
├── .gitignore                 # data/, CLAUDE.local.md, .env
├── .claude/
│   ├── settings.json          # permisos: qué puede hacer sin preguntar
│   └── skills/
│       ├── registro-semanal/SKILL.md
│       ├── revision-mensual/SKILL.md
│       ├── vigilante-checkout/SKILL.md
│       ├── outreach-seo-fr/SKILL.md
│       ├── unit-economics/SKILL.md
│       └── clasificar-canal/SKILL.md
├── docs/
│   ├── contexto/              # negocio.md, decisiones.md, enlaces.md, mapa-proyectos.md
│   ├── planes/                # plan Q4 y 2027, prioridades sep–dic, referidos, email, escalado de Meta
│   ├── analisis/              # unit economics (ago y sep), churn temprano, diagnóstico de canales, crecimiento 2026, retargeting
│   ├── equipo/                # rol de la becaria, contenido de Daniela
│   ├── medicion/              # instrucciones de medición de Meta
│   └── registros/             # registro-semanal-canales.md, revision-mensual-AAAA-MM.md
├── scripts/                   # extracciones repetibles en Python (Stripe, Supermetrics)
└── data/                      # extractos crudos, fuera de git
```

Los 16 documentos actuales se reparten así:

| Carpeta | Documentos |
| --- | --- |
| `docs/contexto/` | mapa-proyectos-marketing |
| `docs/planes/` | plan-q4-2026-y-hoja-de-ruta-2027, plan-prioridades-sep-dic-2026, plan-referidos-2026-09, plan-email-retencion-winback-2026, plan-escalado-meta-2026-08 |
| `docs/analisis/` | unit-economics-2026-09, unit-economics-2026-08, churn-temprano-evolutivo-2026-08, diagnostico-canales-2026-08-11, crecimiento-2026-para-equipo-19ago, retargeting-sept26-revision-cmo-2026-08-24 |
| `docs/equipo/` | becaria-marketing-rol-2026-10, contenido-2026-daniela-19ago |
| `docs/medicion/` | instrucciones-medicion-meta-2026-09 |
| `docs/registros/` | registro-semanal-canales |

Solo `CLAUDE.md` y lo que importe con `@ruta` se carga en cada sesión. El resto de `docs/` se lee cuando hace falta, así que el contexto no crece con cada documento nuevo.

## CLAUDE.md propuesto

Este fichero va en la raíz del repo y sustituye a las instrucciones del proyecto. Conserva tus reglas tal cual y añade lo que hoy vive en la memoria: cuentas, definiciones y dónde está cada cosa. Ocupa menos de 100 líneas; la documentación de Claude Code recomienda no pasar de 200.

```markdown
# Diluu · CMO

Actúas como CMO data-driven de Diluu. Objetivo: hacer crecer Diluu todo lo posible
de forma sostenible, maximizando el rendimiento de cada canal. Ninguna recomendación
estratégica se hace "de oídas": antes de proponer, consulta los datos.

Habla en español de España. Lucia quiere análisis directos y con evidencia,
sin suavizar: si algo va mal o un plan no se sostiene, dilo con cifras.

## El negocio en breve
- Clases en directo y online de español y francés para niños de 4 a 12 años de
  familias de diáspora. Mercados principales: EEUU y Reino Unido (español);
  francés fuerte en Irlanda, Australia y Reino Unido.
- Embudo: anuncio o búsqueda → web → clase de prueba (3 €) → compra sola en la
  web de curso directo o ventas le hace seguimiento (WhatsApp/llamada, Kommo) →
  suscripción cada 4 semanas, trimestral (más barato a propósito) o anual.
- Ventas no crea enlaces de pago en Stripe: envía a la web de curso directo.
- Las clases se pausan en Navidad (2026: del 22 dic al 5 ene).
- Objetivo 2026: 3.000 plazas activas en el panel bi.diluu.com (no cuenta bajas
  programadas). Prioridad 2027: crecer lo máximo posible siendo rentables.
- Lucia lleva Meta Ads y Google Ads con Claude. Contenido: Daniela (ES) y Morgane (FR).

## Fuentes y cuentas
- Stripe (fuente de verdad), cuenta acct_1Om8TdS8nQmVtctK, livemode. Sigma no está
  disponible: lista suscripciones paginando (status=all). La búsqueda con negación
  de status devuelve cifras erróneas: no la uses para series.
- Meta Ads: act_2456974117647730 y act_911299640142242 (GBP), vía Supermetrics.
- Google Ads: cuenta "2 - Hey Spanish", 4584208097 (GBP), vía Supermetrics.
- GA4: propiedad 425989233. Key events fiables solo desde julio de 2026.
- Search Console: sc-domain:diluu.com (datos desde 7 jun 2025). Existe también
  sc-domain:heyspanish.com.
- Brevo: email (automatizaciones y campañas). La API no da estadísticas de flujos.
- Instagram/Facebook Insights y Google Business Profile: fuera de la licencia de
  Supermetrics. Si hacen falta, revisarlos a mano o por navegador.
- Hoja "Main Metrics" (Google Sheets) y panel bi.diluu.com para plazas y churn.

## Definiciones
- Alta = suscripción de pago creada (excluye incomplete e incomplete_expired).
- Baja = suscripción con canceled_at en el periodo (excluye incomplete_expired).
- Plaza (enrolment) = un alumno en un grupo; una familia puede tener varias.
- CAC de medios = gasto en anuncios ÷ altas o familias nuevas. CAC completo = él
  más el coste de ventas. Di siempre cuál usas.
- Moneda de trabajo: libras. Tipos fijos: USD 0,735 · EUR 0,855 · AUD 0,479 ·
  SEK 0,0752 · NZD 0,436 · JPY 0,00496 · CAD 0,538 · CHF 0,915 · resto 0,77.
- Unit economics vigentes: docs/analisis/unit-economics-2026-09.md.

## Regla n.º 1: datos antes que opinión
Antes de planificar, priorizar o presupuestar, consulta los datos reales (Stripe,
GA4, Meta, Google Ads, Search Console, Brevo). Si falta un dato para decidir, dilo
y propone cómo obtenerlo. Nunca inventes cifras ni extrapoles sin avisar.

## Métricas norte
1. CAC por canal (inversión del canal / nuevos clientes de pago atribuidos).
2. LTV y ratio LTV:CAC (mínimo 5:1 para escalar).
3. ROAS y coste por prueba/lead por campaña.
4. Churn y retención mensual.
Compara con el periodo anterior y con el mismo periodo del año pasado, y avisa si
la muestra es demasiado pequeña para concluir.

## Cómo maximizar cada canal
Clasifica cada canal con datos: ESCALAR, MANTENER, ARREGLAR o CORTAR. Propón
reasignaciones concretas (de dónde sale y a dónde va el dinero) con cifras.
Contrasta lo que reporta cada plataforma con GA4 y Stripe antes de dar por bueno
un ROAS: el píxel de Meta sobreatribuye o infravalora según la semana.

## Guardrails
- No escalar un canal si empeora el CAC blended o el LTV:CAC baja de 3:1.
- Vigilar fatiga creativa (frecuencia, CTR a la baja) antes de subir presupuesto.
- Nunca decidir sobre anuncios con menos de 14 días de datos.
- Todo experimento con hipótesis, métrica de éxito, presupuesto máximo y fecha
  de revisión.
- Nada de escribir en Stripe, Meta, Google Ads o Brevo (crear, editar, enviar)
  sin el OK explícito de Lucia en la conversación.

## Formato de trabajo
- Cada análisis termina en decisiones accionables, no solo en un informe.
- Cifras siempre con su fuente y su rango de fechas.
- Decisiones nuevas: añádelas con fecha a docs/contexto/decisiones.md.
- Registros periódicos: docs/registros/. Planes: docs/planes/. Análisis: docs/analisis/.
- Extracciones: scripts en scripts/ y resultados en data/ (no se suben a git).
- Nunca subas a git datos personales de clientes (nombres, emails, teléfonos).

## Contexto que se carga siempre
@docs/contexto/decisiones.md
@docs/contexto/mapa-proyectos.md
```

## Conectores

No hay que configurar nada nuevo: si entras en Claude Code con tu cuenta de claude.ai, los conectores que ya tienes en claude.ai aparecen solos. Salen en `/mcp` marcados como procedentes de claude.ai.

| Conector | Para qué lo usa el CMO | Escribe |
| --- | --- | --- |
| Stripe | Altas, bajas, plazas, ingresos, cupones | Sí: puede crear y modificar objetos |
| Supermetrics | Meta Ads, Google Ads, GA4, Search Console | Sí: puede crear y editar campañas |
| Brevo | Campañas, listas, plantillas y estadísticas de email | Sí: crea campañas y plantillas |
| Google Drive y Sheets | Tracker de creatividades, Main Metrics, P&L | Sí |
| Slack | Mensajes del equipo y avisos de las tareas | Sí: envía mensajes |
| Notion | Calendario editorial | Sí |
| Google Calendar | Fechas del equipo | Sí |
| Claude Docs | Documentos como este | Sí |

Tres cosas a vigilar:

1. **Entra con tu cuenta de claude.ai, no con una clave de API.** Si en tu terminal hay una variable `ANTHROPIC_API_KEY`, Claude Code la usa y los conectores de claude.ai no se cargan.
2. **Bloquea la escritura en local.** En `.claude/settings.json`, añade reglas `deny` para las herramientas de escritura de Stripe y de Supermetrics (las de crear o editar campañas). Saca los nombres exactos de `/mcp` antes de escribir la regla.
3. **En las rutinas no hay permisos que valgan.** Una rutina en la nube usa todas las herramientas de los conectores que le añadas, incluidas las de escritura, sin preguntar. A cada rutina dale solo los conectores que necesita.

## Skills y scripts

Cada rutina que hoy se reescribe en un prompt largo pasa a ser una *skill*: un fichero `.claude/skills/<nombre>/SKILL.md` que se lanza con `/<nombre>` o que Claude carga solo cuando la tarea encaja con su descripción. Las tareas programadas solo tendrán que decir "ejecuta `/registro-semanal`".

| Skill | Qué hace | Sale de | Cuándo |
| --- | --- | --- | --- |
| `registro-semanal` | Control de presupuesto, cifras de la semana (Stripe, Meta, Google, GA4, Search Console, Brevo), guardrails y entrada nueva en `docs/registros/registro-semanal-canales.md` | Tarea "Dashboard semanal canales Diluu" | Lunes, por rutina |
| `revision-mensual` | Cierre del mes contra el plan vigente y decisiones para Lucia en `docs/registros/revision-mensual-AAAA-MM.md` | Tarea "Revisión mensual CMO Diluu" | Día 2, por rutina |
| `vigilante-checkout` | Comprueba en Stripe que entran pagos desde las landings de prueba, para detectar una caída del checkout como la del 30 de septiembre | Tarea del proyecto FACEBOOK ADS | Cada 2 h, por rutina |
| `outreach-seo-fr` | Resumen semanal del outreach SEO en francés | Tarea del proyecto SEO | Viernes, por rutina |
| `unit-economics` | Recalcula LTV, CAC completo, LTV:CAC y payback con el método v4.1 | `docs/analisis/unit-economics-2026-09.md` | A petición |
| `clasificar-canal` | Clasifica un canal (ESCALAR, MANTENER, ARREGLAR, CORTAR) con los guardrails y propone reasignación | Instrucciones del proyecto | A petición |

El vigilante y el resumen de outreach son de otros proyectos: solo entran en este repo si unificas los proyectos de marketing (sección 9). Los prompts actuales de cada tarea programada son el punto de partida de cada skill: se copian y se recortan. Las skills que solo debes lanzar tú llevan `disable-model-invocation: true`, para que Claude no las ejecute por su cuenta.

Ejemplo de cabecera:

```markdown
---
name: registro-semanal
description: Registro semanal de canales de Diluu. Úsalo los lunes o cuando Lucia pida el informe semanal, el control de presupuesto o los guardrails de Meta.
---

1. Calcula la última semana ISO completa (lunes a domingo).
2. Ejecuta `python scripts/stripe_semana.py <inicio> <fin>` para altas, bajas e ingreso nuevo.
3. Pide a Supermetrics el gasto de Meta y Google, GA4 por canal y Search Console.
4. Compara con el presupuesto del mes y con los guardrails de CLAUDE.md.
5. Añade la entrada al principio de docs/registros/registro-semanal-canales.md,
   con el mismo formato que la anterior, y haz commit.
```

**Scripts.** La extracción de Stripe que hoy hace un agente paginando la API cabe en un script de Python que guarda las suscripciones en `data/` y calcula altas, bajas y activas por mes. Se escribe una vez, se prueba contra las cifras del deck (2.523 altas en enero–septiembre de 2026) y lo usan todas las skills.

## Tareas programadas

Tus tareas programadas ya son rutinas de Claude Code: se gestionan en [claude.ai/code/routines](https://claude.ai/code/routines) o con `/schedule` desde Claude Code. Lo que cambia es que hoy corren sin repositorio. Hay que añadirles `diluu-cmo` y cambiar su prompt para que lean y escriban en el repo en vez de en los documentos del proyecto.

| Tarea | Proyecto | Horario actual | Estado | Qué hacer |
| --- | --- | --- | --- | --- |
| Dashboard semanal canales Diluu (local) | CMO | Lunes 01:00 UTC (09:00 en Bali) | Activa; siempre corre en la nube | Añadir el repo; prompt: ejecuta `/registro-semanal`. Conectores: Stripe, Supermetrics, Brevo |
| Revisión mensual CMO Diluu | CMO | Día 2, 01:00 UTC | Activa | Añadir el repo; prompt: ejecuta `/revision-mensual`. Mismos conectores |
| Vigilante checkout pruebas Diluu | FACEBOOK ADS | Cada 2 h, de 09:50 a 23:50 hora de Madrid | Activa | Sin cambios salvo que unifiques proyectos |
| Diluu SEO · Resumen semanal outreach FR | SEO | Viernes 01:00 UTC | Activa | Sin cambios salvo que unifiques proyectos |
| Dashboard semanal canales Diluu (nube) | CMO | Lunes 01:00 UTC | Apagada | Borrar |
| Google Ads: estrategia mensual, sesión quincenal, chequeo de averías | Google Ads | Día 1; días 12 y 26; lunes | Apagadas aquí | Fuera de esta migración |
| Revisar Google Business Profile e Instagram por Chrome | CMO | Una vez, 4 sep | Caducada | Descartar |

Tres detalles de las rutinas que conviene saber:

- **Dónde escriben.** Por defecto suben sus cambios a una rama `claude/…`, no a la principal. Para que el registro semanal quede en `main`, el prompt tiene que pedirlo, o la rutina abre un PR que apruebas tú.
- **Sin tu ordenador.** Una rutina en la nube no ve tus ficheros locales. Si alguna vez una tarea necesita tu ordenador, se crea como tarea local en la app de escritorio (Code → Routines → Local), que solo corre con el ordenador encendido.
- **Coste.** Las rutinas gastan de tu misma suscripción que las conversaciones.

## Plan de migración

Son unas dos tardes de trabajo, sin parar nada: el proyecto de claude.ai sigue funcionando hasta que el repo haya pasado una semana de prueba.

**Día 1 · Montar el repo**

- [ ] Crear el repositorio privado `diluu-cmo` en GitHub y darle acceso a Claude (lo pide la propia app la primera vez).
- [ ] Abrir Claude Code (app de escritorio, pestaña Code, o claude.ai/code) con tu cuenta de claude.ai, no con una clave de API.
- [ ] Volcar los 16 documentos del proyecto a `docs/` con la estructura de la sección 3. Se lo puedes pedir a Claude en una sesión con este proyecto abierto.
- [ ] Quitar de los documentos los datos personales de clientes antes del primer commit. El plan Q4 (actualización v5) tiene nombres y emails de familias con pagos fallidos.
- [ ] Crear `CLAUDE.md` (sección 4), `docs/contexto/decisiones.md` con las decisiones que hoy están en la memoria y `docs/contexto/enlaces.md` con los artefactos.
- [ ] Crear `.gitignore` (`data/`, `CLAUDE.local.md`, `.env`) y `.claude/settings.json` con las reglas `deny` de escritura.
- [ ] Comprobar con `/mcp` que aparecen Stripe, Supermetrics y Brevo.

**Día 2 · Skills y prueba**

- [ ] Escribir el script de Stripe y comprobar que da 2.523 altas en enero–septiembre de 2026.
- [ ] Crear las skills `registro-semanal` y `revision-mensual` a partir de los prompts de sus tareas.
- [ ] Lanzar `/registro-semanal` a mano para la semana 40 y compararlo con la entrada del 5 de octubre del registro actual.
- [ ] Crear `unit-economics` y `clasificar-canal`.

**Semana 1 · Cambiar las tareas**

- [ ] Añadir el repo a las rutinas del CMO y cambiar su prompt (sección 7). Probar con *Run now*.
- [ ] Revisar la primera ejecución real del lunes: entrada nueva en el registro, cifras con fuente, nada escrito en Stripe ni en las plataformas.
- [ ] Borrar la tarea apagada "Dashboard semanal canales Diluu (nube)".

**Semana 2 · Cerrar**

- [ ] Tras dos ejecuciones correctas, dejar el proyecto CMO de claude.ai como archivo de consulta: no se borra, pero ya no se escribe en él.

La migración está bien hecha cuando una sesión nueva de Claude Code responde sin ayuda a tres preguntas: ¿cuál es el presupuesto de paid de noviembre?, ¿qué método de bajas usa el registro semanal? y ¿qué se decidió sobre Black Friday?

## Riesgos y decisiones pendientes

**Riesgos**

| Riesgo | Por qué importa | Cómo se cubre |
| --- | --- | --- |
| La memoria no viaja | La memoria de claude.ai no llega a Claude Code. La memoria automática de Claude Code vive solo en tu ordenador y las rutinas en la nube no la ven | Toda decisión va a `docs/contexto/decisiones.md`, que se carga en cada sesión |
| Datos personales en git | Los documentos tienen datos de clientes, y un repo se comparte o se clona con facilidad | Repo privado, limpiar antes del primer commit y `data/` fuera de git |
| Rutinas que escriben sin preguntar | Una rutina puede usar cualquier herramienta de sus conectores, también las de escritura de Stripe o de campañas | Darle solo los conectores necesarios y prohibir la escritura en el prompt |
| Dos sitios a la vez | Si se sigue escribiendo en el proyecto de claude.ai, los dos se desincronizan | Fecha de corte al acabar la semana 2 |
| Datos sensibles para el equipo | Si la becaria o ventas entran al repo, verán bonus, márgenes y unit economics | Decidir quién tiene acceso antes de invitar a nadie |

**Decisiones que te tocan**

1. **Cuenta de GitHub:** `Lucia950` o `SrHuevo`, que ya tiene el repo de producto.
2. **¿Un repo para todo el marketing?** Los proyectos de Google Ads, FACEBOOK ADS y SEO podrían ser carpetas del mismo repo y compartir `CLAUDE.md`, scripts y decisiones. Así se acaba el problema que hoy resuelve el mapa de proyectos. Mi recomendación: empezar solo con el CMO y sumar Google Ads cuando el registro semanal funcione.
3. **Dónde escriben las rutinas:** directamente en `main` (más simple) o por PR que apruebas tú (más control).
4. **Acceso de la becaria:** sin acceso, o a un repo aparte solo con lo que necesita.

Alternativa a vigilar: Claude Code tiene en beta unos *Projects* propios con instrucciones y memoria compartida por sesiones en la nube. Se están activando poco a poco, empezando por cuentas que no tienen proyectos en claude.ai, así que este plan no depende de ellos.

**Fuentes** (documentación de Claude Code, consultada el 8 oct 2026)

- [Memoria y CLAUDE.md](https://code.claude.com/docs/en/memory)
- [Skills](https://code.claude.com/docs/en/skills)
- [MCP y conectores de claude.ai](https://code.claude.com/docs/en/mcp)
- [Rutinas](https://code.claude.com/docs/en/routines)
- [Tareas programadas en la app de escritorio](https://code.claude.com/docs/en/desktop-scheduled-tasks)
- [Projects en Claude Code](https://code.claude.com/docs/en/claude-projects)
