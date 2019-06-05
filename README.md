# scaffold

Just a basic project scaffold for Python/Django/Docker/Vue/AWS/etc. The production configuration has NGinx serving Vue.js on the frontend and reverse-proxying to a Django application running a REST API on the backend. The project is containerized using Docker and orchestrated with Docker Compose.

## Setup

* Install Docker
* Install pipenv
* Check out source from Github and cd into the project directory.
* Get .env files out of secure storage and add to ./envs.
* Run `pipenv update` to pull down all Python dependencies.
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

Check <http://localhost:8000/admin> to ensure things are working.

## Starting a production environment

```shell
> make prod-up
```

This will build and start a system that is similar to production, complete with Nginx reverse proxying to a Gunicorn application server on the backend and serving Vue itself on the frontend.

Check <http://localhost:8000/> to ensure things are working.

## Creating a new backend app

With the dev environment running, start a new app called foo:

```shell
> make new-backend-app name=foo
```

## Creating database migration files

With the dev environment running, create database migration files:

```shell
> make migrations
```

## Migrating the database

To run migrations on the database in the development environment:

```shell
> make migrate-db
```

## Creating a superuser

To create a superuser in the development environment:

```shell
> make superuser
```
