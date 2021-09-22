FROM python:3.8

WORKDIR /app

COPY . /app

RUN apt update -y && \
    apt install -y libgl1 libgl-dev && \
    pip install pipenv && \
    mkdir .venv && \
    pipenv --python 3.8 && \
    pipenv install

CMD pipenv run ./manage.py runserver 0.0.0.0:8000

