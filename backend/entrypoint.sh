#!/bin/bash
set -e

rm -f /app/tmp/pids/server.pid

if [ "$RAILS_ENV" = "production" ]; then
  exec rails server -b 0.0.0.0
else
  exec "$@"
fi
