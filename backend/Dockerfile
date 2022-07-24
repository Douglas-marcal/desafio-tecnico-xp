FROM node:16

WORKDIR /app

COPY package*.json ./

COPY prisma ./prisma/

RUN npm install

COPY . .

RUN npm run build

WORKDIR /dist

CMD node server.js
