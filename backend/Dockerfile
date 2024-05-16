# syntax=docker/dockerfile:1.4
#FROM python:3.9.8-slim
FROM python:3.9-alpine

ARG USERNAME=deployer
ARG GROUPNAME=deployer

RUN adduser -D $USERNAME
#RUN addgroup  $GROUPNAME && addgroup $USERNAME $GROUPNAME  
RUN mkdir /app && chown -R $USERNAME:$GROUPNAME /app

USER $USERNAME

WORKDIR /app

COPY ./.env /app
COPY ./app /app
COPY ./main.py /app
COPY ./requirements.txt /app


RUN pip install -r requirements.txt

EXPOSE 8000
