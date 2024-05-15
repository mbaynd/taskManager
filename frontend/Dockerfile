# syntax=docker/dockerfile:1.4
# Fetching the latest node image on alpine linux
FROM node:alpine AS development


ARG USERNAME=nonroot
ARG USER_UID=1000
ARG USER_GID=$USER_UID

# Create the user
RUN groupadd --gid $USER_GID $USERNAME \
    && useradd --uid $USER_UID --gid $USER_GID -m $USERNAME \
    #
    # [Optional] Add sudo support. Omit if you don't need to install software after connecting.
    && apt-get update \
    && apt-get install -y sudo curl\
    && echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME \
    && chmod 0440 /etc/sudoers.d/$USERNAME

# ********************************************************
# * Anything else you want to do like clean up goes here *
# ********************************************************

# [Optional] Set the default user. Omit if you want to keep the default as root.
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
COPY ../frontend /app/

# Starting our application
CMD ["npm","start"]
