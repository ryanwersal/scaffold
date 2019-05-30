#!/bin/sh

if [ "$APP_DATABASE" = "postgres" ]; then
    echo "Waiting for PostgreSQL..."

    while ! nc -z $APP_SQL_HOST $APP_SQL_PORT; do
        sleep 0.25
    done

    echo "PostgreSQL started."
fi

if [ "$APP_RUN_MIGRATIONS" = "true" ]; then
    echo "Running database migrations..."
    python manage.py migrate --no-input
    echo "Finished running database migrations."
fi

echo "Collecting static files..."
python manage.py collectstatic --no-input
echo "Finished collecting static files."

exec "$@"