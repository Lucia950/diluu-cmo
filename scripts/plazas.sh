#!/usr/bin/env bash
# Plazas de Diluu desde la base de producción (solo lectura). Uso: scripts/plazas.sh AAAA-MM-DD AAAA-MM-DD
# Devuelve: activas empezadas hoy, nuevas y perdidas en el rango (fin sin sucesor) y pruebas TRIAL.
set -euo pipefail
S="${DILUU_SCRIPTS:-$(ls -d /Users/luciamarin/.claude/plugins/cache/diluu/diluu-ops/*/scripts | tail -1)}"
INI="$1"; FIN="$2"; HOY="$(date +%F)"
echo "activas_empezadas_hoy:"; node "$S/mongo-read.cjs" count v3-enrolments "{\"end\": null, \"startDate\": {\"\$lte\": \"${HOY}T23:59:59\"}}"
echo "nuevas_${INI}_${FIN}:"; node "$S/mongo-read.cjs" count v3-enrolments "{\"createdAt\": {\"\$gte\": \"$INI\", \"\$lt\": \"${FIN}T23:59:59\"}, \"previousEnrolmentId\": null}"
echo "canceladas_${INI}_${FIN} (end.reason CANCEL):"; node "$S/mongo-read.cjs" count v3-enrolments "{\"end.lastLesson\": {\"\$gte\": \"$INI\", \"\$lt\": \"${FIN}T23:59:59\"}, \"end.reason\": \"CANCEL\", \"end.cancellationReason\": {\"\$nin\": [\"NO_ES_CANCELACION\", \"REACTIVADA\"]}}"
echo "pruebas_${INI}_${FIN}:"; node "$S/mongo-read.cjs" count v3-bookings "{\"type\": \"TRIAL\", \"lessonStart\": {\"\$gte\": \"$INI\", \"\$lt\": \"${FIN}T23:59:59\"}}"
