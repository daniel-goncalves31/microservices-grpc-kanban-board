FROM node:12.13-alpine

WORKDIR /usr/src/app

COPY package*.json ./
COPY yarn.lock ./

RUN yarn

COPY . .

CMD ["yarn", "dev"]