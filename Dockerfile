FROM node:15.14.0-alpine

RUN mkdir -p /usr/src/app
COPY package.json /usr/src/app/
COPY package-lock.json /usr/src/app/


WORKDIR /usr/src/app
RUN npm i

COPY . /usr/src/app

RUN npm run build

CMD npm run start:prod