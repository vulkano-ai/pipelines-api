FROM node:18-alpine

ARG NODE_ENV=production
ARG NPM_TOKEN
ARG GL_TOKEN

RUN mkdir -p /usr/src/app
COPY package.json /usr/src/app/
COPY package-lock.json /usr/src/app/
COPY .npmrc /usr/src/app/.npmrc

WORKDIR /usr/src/app
RUN npm i

COPY . /usr/src/app

RUN npm run build

CMD npm run start:prod