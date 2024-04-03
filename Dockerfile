FROM node:18

RUN apt-get update && apt-get install -y mongodb

WORKDIR /wish-list/src/app

COPY package*.json ./
RUN npm install
COPY . .

CMD mongod --fork --logpath /var/log/mongodb.log && npm run start:prod

