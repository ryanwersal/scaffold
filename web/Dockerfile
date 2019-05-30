# Psycopg2 must be built from source on Alpine and it doesn't
# seem to work with pipenv and I don't want to screw with apk right now.
FROM python:3.7-slim-stretch

LABEL Name=web

# Don't write .pyc files.
ENV PYTHONDONTWRITEBYTECODE 1

# Don't buffer stdin and stdout.
ENV PYTHONUNBUFFERED 1

# Set the work directory.
WORKDIR /code

# Install system dependencies.
RUN apt-get update \
    && apt-get install -y --no-install-recommends netcat \
    && rm -rf /var/lib/apt/lists/*

# Install project dependencies.
RUN pip install --upgrade pip
RUN pip install pipenv
COPY Pipfile Pipfile.lock /code/
RUN pipenv install --system --deploy

# Run as non-root.
RUN groupadd -g 999 appuser && \
    useradd -r -u 999 -g appuser appuser
USER appuser

# Copy project code.
COPY . /code/

# Run initialization script.
ENTRYPOINT ["./entrypoint.sh"]