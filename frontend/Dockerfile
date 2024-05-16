# syntax=docker/dockerfile:1.4
# Fetching the latest node image on alpine linux
FROM node:alpine AS development


ARG USERNAME=deployer
ARG GROUPNAME=deployer

RUN groupadd -r $GROUPNAME && useradd -g $GROUPNAME $USERNAME  
RUN mkdir /app && chown -R $USERNAME:$GROUPNAME /app

USER $USERNAME

# Setting up the work directory
WORKDIR /app
RUN  chown -R $USER_UID:$USER_GID /app

# Declaring env
ENV NODE_ENV development

# Installing dependencies
COPY ./package*.json /app

RUN npm install

# Copying all the files in our project
COPY src /app/
COPY public /app/
COPY ./.env /app/


# Starting our application
CMD ["npm","start"]
