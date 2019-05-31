#!/bin/sh

echo "Waiting for PostgreSQL..."
while ! nc -z $POSTGRES_HOST $POSTGRES_PORT; do
    sleep 0.25
done

echo "PostgreSQL started."

if [ "$RUN_DB_MIGRATIONS" = "true" ]; then
    echo "Running database migrations..."
    python manage.py migrate --no-input
    echo "Finished running database migrations."
fi

echo "Collecting static files..."
python manage.py collectstatic --no-input
echo "Finished collecting static files."

exec "$@"