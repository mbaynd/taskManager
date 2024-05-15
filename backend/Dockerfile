# syntax=docker/dockerfile:1.4
FROM python:3.9.8-slim


WORKDIR /app

COPY ./.env /app
COPY ./app /app
COPY ./main.py /app
COPY ./requirements.txt /app


RUN pip install -r requirements.txt

EXPOSE 8000