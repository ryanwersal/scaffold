# scaffold

Just a basic project scaffold for Python/Django/Docker/AWS/etc.

## Setup

* Install Docker
* Install pipenv
* Check out source from Github and cd into the project directory.
* Get .env files out of secure storage and add to project root.
* Run `pipenv update` to pull down all Python dependencies.
* Run `docker-compose up --build -d` to start a development environment.
* Check <http://localhost:8000> to ensure things are working.

## Configuring your editor to point to the virtualenv Python

Run `pipenv --venv` to get the path to the virtualenv Python,
then configure your editor to point to that path as its Python.
In Visual Studio Code this can be done in .vscode/settings.json
by setting the python.pythonPath variable.

## Adding new Python dependencies

`pipenv install foo` and then `docker-compose up --build -d`
