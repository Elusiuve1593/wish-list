FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

COPY .env .env.development ./

RUN npm run build

EXPOSE 3001

ENV MONGO_URI mongodb://mongodb:27017/database?authSource=admin&authMechanism=SCRAM-SHA-256

CMD ["sh", "-c", "sleep 5 && npm run start:prod"]

