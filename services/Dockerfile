FROM node:16

COPY package*.json ./
RUN npm install

RUN npm i

COPY . .
RUN npm run build

CMD ["node", "./dist/index.js"]