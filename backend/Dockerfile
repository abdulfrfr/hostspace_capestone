#backend application
FROM node:latest AS backend

WORKDIR /backend

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY backend.js .

CMD [ "node" , "backend.js"]

EXPOSE 5000