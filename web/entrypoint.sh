#!/bin/sh

if [ "$DATABASE" = "postgres" ]; then
    echo "Waiting for postgres..."

    while ! nc -z $SQL_HOST $SQL_PORT; do
        sleep 0.25
    done

    echo "PostgreSQL started."
fi

if [ "$DEBUG" = "1" ]; then
    echo "Running database migrations..."
    python manage.py migrate
    echo "Finished running database migrations."
fi

echo "Collecting static files..."
python manage.py collectstatic
echo "Finished collecting static files."

exec "$@"