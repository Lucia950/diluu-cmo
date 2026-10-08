# scripts/

- `plazas.sh INI FIN`: plazas activas, nuevas, perdidas y pruebas desde la base de producción (usa
  mongo-read.cjs del plugin diluu-ops; credenciales en ~/.diluu). Solo lectura.
- Stripe: pendiente un `stripe_semana.py` que pagine suscripciones (status=all) y calcule altas,
  bajas y familias nuevas por semana y mes; necesita una clave de solo lectura en `.env`
  (STRIPE_API_KEY). Comprobar contra 2.523 altas en ene–sep 2026. Mientras tanto, el conector de
  Stripe de claude.ai en la conversación.
- Supermetrics y GA4 se consultan con el conector (ids en docs/medicion/fuentes.md); guarda los
  extractos en data/ con fecha.
