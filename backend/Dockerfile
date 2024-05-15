# syntax=docker/dockerfile:1.4
FROM python:3.9.8-slim

RUN addgroup -S nonroot \
    && adduser -S nonroot -G nonroot

USER nonroot

WORKDIR /app

COPY . /app

RUN apt-get update && apt-get install -y curl

RUN pip install -r requirements.txt

EXPOSE 8000