FROM node:22.6.0

WORKDIR /app

COPY package*.json .
COPY tsconfig.json .

RUN npm ci

COPY ./prisma prisma/

RUN npx prisma generate

COPY ./src src/

RUN npm run build

EXPOSE 3033

CMD ["node", "./.dist/main.js"]