FROM node:16

WORKDIR /app

COPY package*.json ./

COPY prisma ./prisma/

RUN npm install

RUN npm run build

COPY . .

ENTRYPOINT [ "npm" ]

CMD [ "run", "build" ]
