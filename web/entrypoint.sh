#!/bin/sh

if [ "$DATABASE" = "postgres" ]; then
    echo "Waiting for postgres..."

    while ! nc -z $SQL_HOST $SQL_PORT; do
        sleep 0.25
    done

    echo "PostgreSQL started"
fi

if [ "$MIGRATE_DB_ON_STARTUP" = "True" ]; then
    echo "Running database migrations..."
    python manage.py migrate
fi

exec "$@"