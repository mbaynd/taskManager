# syntax=docker/dockerfile:1.4
# Fetching the latest node image on alpine linux
FROM node:alpine AS development


#ARG USERNAME=deployer
#ARG GROUPNAME=deployer

#RUN groupadd -r $GROUPNAME && useradd -g $GROUPNAME $USERNAME  
#RUN mkdir /app && chown -R $USERNAME:$GROUPNAME /app
#USER $USERNAME
USER node
# Setting up the work directory
RUN mkdir /home/node/app
WORKDIR /home/node/app


# Declaring env
ENV NODE_ENV development

# Installing dependencies
COPY ./package*.json /home/node/app
RUN  chown -R node:node /home/node/app

RUN npm install

# Copying all the files in our project
COPY src /home/node/app/
COPY public /home/node/app/
COPY ./.env /home/node/app/


# Starting our application
CMD ["npm","start"]
