FROM node:16

WORKDIR /app

COPY package*.json ./

COPY prisma ./prisma/

RUN npm install

COPY . .

RUN npm run build

ENTRYPOINT [ "npm" ]

CMD [ "run", "start" ]
