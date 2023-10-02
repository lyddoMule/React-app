FROM node:latest

WORKDIR /app/src

COPY package.json .

RUN npm install

COPY . .

EXPOSE 5000

CMD [ "npm","run","server" ]
