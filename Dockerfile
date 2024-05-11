FROM node:18-alpine as builder

ENV NODE_ENV=development
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


FROM node:18-alpine

ARG NPM_TOKEN
ARG GL_TOKEN

COPY --from=builder /usr/src/app/dist /usr/src/app/dist
COPY --from=builder /usr/src/app/package.json /usr/src/app/package.json
COPY --from=builder /usr/src/app/package-lock.json /usr/src/app/package-lock.json
COPY --from=builder /usr/src/app/.npmrc /usr/src/app/.npmrc

WORKDIR /usr/src/app

RUN npm i --omit=dev

CMD npm run start:prod