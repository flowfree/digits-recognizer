FROM python:3.8-slim

WORKDIR /app

COPY . /app

RUN apt update -y && \
    apt install -y wget libgl1 libgl-dev libglib2.0-0 && \
    # Generate requirements.txt file for the project
    pip install pipenv && pipenv lock -r > requirements.txt && \
    # Remove pipenv and its dependencies
    pip freeze > old.txt && pip uninstall -y -r old.txt && rm -f old.txt && \
    # Install the dependencies for the project
    pip install -r requirements.txt && \
    # Install the dependencies for Lambda
    pip install zappa && \
    pip install --target /app awslambdaric && \
    # Manually grab the handler.py from zappa
    # This script contains all the zappa magic that routes API gateway requests
    wget https://raw.githubusercontent.com/zappa/Zappa/master/zappa/handler.py

ENTRYPOINT [ "/usr/local/bin/python", "-m", "awslambdaric" ]
CMD [ "handler.lambda_handler" ]
