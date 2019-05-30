# Environment variables

This directory is where all the environment variables are stored. You should store the settings in some sort of secret vault, be it Lastpass or something like AWS Secrets Manager. There should be the following .env files with the following variables:

* db.dev.env:
  * POSTGRES_DB
  * POSTGRES_USER
  * POSTGRES_PASSWORD
* db.prod.env:
  * Same as db.dev.env
* web.dev.env
  * APP_SECRET_KEY
  * APP_DATABASE
  * APP_SQL_ENGINE
  * APP_SQL_DATABASE
  * APP_SQL_USER
  * APP_SQL_PASSWORD
  * APP_SQL_HOST
  * APP_SQL_PORT
  * APP_RUN_MIGRATIONS=true
  * DJANGO_SETTINGS_MODULE=app.settings.dev
* web.prod.env
  * Same as web.dev.env except for:
  * GUNICORN_CMD_ARGS
  * APP_RUN_MIGRATIONS=false
  * DJANGO_SETTINGS_MODULE=app.settings.prod