FROM python:3.9.8-slim

WORKDIR /app

COPY . /app

RUN apt-get update && apt-get install -y curl

RUN pip install -r requirements.txt

EXPOSE 8000