# scaffold

Just a basic project scaffold for Django/Vue/Postgres/Docker/AWS/etc. The production configuration has NGinx serving Vue.js on the frontend and reverse-proxying to a Django application running a REST API on the backend. The project is containerized using Docker and orchestrated with Docker Compose.

## Setup

* Install these dependencies:
  * Docker
  * Python 3.7 (use pyenv if you prefer)
  * pipenv
  * nodejs
  * vue-cli
* Check out source from Github and cd into the project directory.
* Get .env files out of secure storage and add to ./envs. See the section below on Environment Variables.
* Change to ./backend and run `pipenv update` to pull down all Python dependencies.
* Change to ./frontend and run `npm install` to pull down all the JS dependencies.
* Follow the rest of the instructions for Starting a development environment.

## Configuring your editor to point to the virtualenv Python

In the ./backend directory run `pipenv --venv` to get the path to the virtualenv Python,
then configure your editor to point to that path as its Python.
In Visual Studio Code this can be done in .vscode/settings.json
by setting the python.pythonPath variable.

## Adding new Python dependencies

```shell
> cd ./backend
> pipenv install foo
> cd ..
> make dev-up
```

## Starting a development environment

```shell
> make dev-up
```

This will build and start a development environment. You should see all kinds of logs in the shell from the various Docker containers. Both the frontend and backend should automatically pick up changes to the filesystems as you do your development.

Check <http://localhost:8000/> to ensure things are working.

You can tear down the environment by hitting Ctrl-C, or in another terminal:

```shell
> make dev-down
```

## Starting a production environment

First, ensure that you have the necessary files in place such that HTTPS works correctly, as that is a requirement in the production configuration. See the section below on SSL.

```shell
> make prod-up
```

This will build and start a system that is similar to production, complete with Nginx reverse proxying to a Gunicorn application server on the backend and serving Vue itself on the frontend.

Check <http://localhost/> to ensure things are working. You should be redirected to <https://localhost/> if things are working correctly. If you used a self-signed certificate (hopefully only for your own testing, *not* actual production) then you'll likely get the big scary warning in your browser about it not being secure.

You can tear down the environment by:

```shell
> make prod-down
```

## Creating a new backend app

With an environment running, to start a new app called foo:

```shell
> make new-backend-app name=foo
```

## Creating database migration files

With an environment running:

```shell
> make migrations
```

## Migrating the database

With an environment running, to actually execute the database migration:

```shell
> make migrate-db
```

## Creating a superuser

With an environment running:

```shell
> make superuser
```

## Environment variables

All the environment variables are stored in files in the .envs directory. You should store the settings in some sort of secret vault, be it Lastpass or something like AWS Secrets Manager, and generate the files with the appropriate data. There should be dev.env and prod.env files in this directory with the following variables:

* DOMAIN=YOUR_DOMAIN_NAME
* DJANGO_DEBUG=true in Development, false in Production
* DJANGO_SECRET_KEY=YOUR_SECRET_KEY
* POSTGRES_DB=YOUR_DB_NAME
* POSTGRES_USER=YOUR_DB_USER
* POSTGRES_PASSWORD=YOUR_DB_PASSWORD
* POSTGRES_HOST=postgres
* POSTGRES_PORT=5432
* RUN_DB_MIGRATIONS=probably true in Development and false in Production, but change as appropriate

The following setting only needs to be present in the production environment:

* GUNICORN_CMD_ARGS=--bind 0.0.0.0:8000 --log-file=- --worker-tmp-dir /dev/shm --workers=2 --threads=4 --worker-class=gthread

These are optional settings that have reasonably safe defaults:

* DJANGO_EMAIL_BACKEND= See <https://docs.djangoproject.com/en/2.2/topics/email/#email-backends>
* DJANGO_EMAIL_HOST=smtp server hostname or None if using console-based email backend
* DJANGO_EMAIL_PORT=smtp server port or -1 if using console-based email backend

## SSL

SSL is a hard requirement in the production configuration and all HTTP requests will be redirected to the appropriate HTTPS route. Feel free to use a self-signed cert for development and testing, but *do not* use it for production. Just get one from [Let's Encrypt](<https://letsencrypt.org>) or whatever. You need to have the following files present in /nginx/ssl:

* app.crt
* app.key
* app.pem
