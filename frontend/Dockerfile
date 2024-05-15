# syntax=docker/dockerfile:1.4
# Fetching the latest node image on alpine linux
FROM node:alpine AS development


ARG USERNAME=nonroot
ARG USER_UID=1000
ARG USER_GID=$USER_UID



# Setting up the work directory
WORKDIR /app


# Declaring env
ENV NODE_ENV development


# Installing dependencies
COPY ./package*.json /app

RUN npm install

# Copying all the files in our project
COPY . /app/

# Starting our application
CMD ["npm","start"]
