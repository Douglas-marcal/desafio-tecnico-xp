FROM node:16

WORKDIR /app

COPY package*.json ./

COPY prisma ./prisma/

RUN npm install

COPY . .

RUN yarn migrate:deploy && tsc

RUN prisma migrate deploy

COPY . /app

