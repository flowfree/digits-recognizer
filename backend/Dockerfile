FROM python:3.8-slim

WORKDIR /app

COPY . /app

RUN apt update -y && \
    apt install -y wget libgl1 libgl-dev libglib2.0-0 && \
    pip install pipenv && \
    mkdir .venv && \
    pipenv --python 3.8 && \
    pipenv install && \
    # Manually grab the handler.py from zappa
    # This script contains all the zappa magic that routes API gateway requests
    wget https://github.com/zappa/Zappa/blob/master/zappa/handler.py

CMD ["handler.lambda_handler"]

