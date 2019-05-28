# scaffold

Just a basic project scaffold for Python/Django/Docker/AWS/etc.

## Setup

* Install Docker
* Install pipenv
* Check out source from Github and cd into the project directory.
* Get .env files out of secure storage and add to ./envs.
* Run `pipenv update` to pull down all Python dependencies.
* Run `docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build -d` to start a development environment.
* Check <http://localhost:8000> to ensure things are working.

## Configuring your editor to point to the virtualenv Python

In the ./web directory run `pipenv --venv` to get the path to the virtualenv Python,
then configure your editor to point to that path as its Python.
In Visual Studio Code this can be done in .vscode/settings.json
by setting the python.pythonPath variable.

## Adding new Python dependencies

From the ./web directory do
`pipenv install foo` and then from the root directory do `docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build`

## Starting a development environment

Run `docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build` to start a development environment. You should see all kinds of logs in the shell and it should end with the Django development server running. It will automatically refresh when changes to the filesystem are made, as it mounts the ./web directory as its volume. If
you would like to run detached, simply add the `-d` flag and it will run in the background and give you your shell back.

Check <http://localhost:8000/admin> to ensure things are working, including serving static files.

## Starting a production environment

Run `docker-compose -f docker-compose.yml -f docker-compose.prod.yaml up --build -d` to start a production environment. It will run a system that is much more similar to production, complete with Nginx reverse proxying to a Gunicorn application server.

Check <http://localhost:8000/admin> to ensure things are working, including serving static files.
