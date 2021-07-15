FROM node:latest
USER root

WORKDIR /frontend
COPY . /frontend

RUN yarn install

COPY . ./

RUN yarn run build
