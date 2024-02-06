FROM node:18.16.0-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci && npm cache clean --force

COPY . .

RUN npm run build

RUN chown node:node ./

USER node

EXPOSE $PORT

CMD ["node", "dist/server/index.js"]
