# syntax=docker/dockerfile:1.4
# Fetching the latest node image on alpine linux
FROM node:alpine AS development

RUN addgroup -S nonroot \
    && adduser -S nonroot -G nonroot

USER nonroot

# Declaring env
ENV NODE_ENV development

# Setting up the work directory
WORKDIR /app

# Installing dependencies
COPY ./package*.json /app

RUN npm install

# Copying all the files in our project
COPY ../frontend /app/

# Starting our application
CMD ["npm","start"]
