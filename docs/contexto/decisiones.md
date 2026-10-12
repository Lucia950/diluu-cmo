# Decisiones (más reciente arriba)

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
