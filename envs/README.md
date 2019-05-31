# Environment variables

This directory is where all the environment variables are stored. You should store the settings in some sort of secret vault, be it Lastpass or something like AWS Secrets Manager. There should be dev.env and prod.env files in this directory with the following variables:

DJANGO_SECRET_KEY=YOUR_SECRET_KEY
DJANGO_SETTINGS_MODULE=One of config.dev_settings or config.prod_settings
POSTGRES_DB=YOUR_DB_NAME
POSTGRES_USER=YOUR_DB_USER
POSTGRES_PASSWORD=YOUR_DB_PASSWORD
POSTGRES_HOST=postgres
POSTGRES_PORT=5432
RUN_DB_MIGRATIONS=probably true in Development and false in Production, but change as appropriate

The following setting only needs to be present in config.prod_settings:

GUNICORN_CMD_ARGS=--bind 0.0.0.0:8000 --log-file=- --worker-tmp-dir /dev/shm --workers=2 --threads=4 --worker-class=gthread