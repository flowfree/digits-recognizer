FROM python:3.8-slim

WORKDIR /app

COPY . /app

RUN apt update -y && \
    apt install -y wget libgl1 libgl-dev && \
    pip install pipenv && \
    pipenv lock -r > requirements.txt && \
    pip freeze > old.txt && \
    pip uninstall -y -r old.txt && \
    rm -f old.txt && \
    pip install -r requirements.txt && \
    pip install zappa && \
    pip install --target /app awslambdaric && \
    # Manually grab the handler.py from zappa
    # This script contains all the zappa magic that routes API gateway requests
    wget https://raw.githubusercontent.com/zappa/Zappa/master/zappa/handler.py

ENTRYPOINT [ "/usr/local/bin/python", "-m", "awslambdaric" ]
CMD [ "handler.lambda_handler" ]
