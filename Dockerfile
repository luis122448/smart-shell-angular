# Build stage
FROM node:18.0.0-alpine3.14 AS build
COPY ./src /home/app/src
COPY angular.json /home/app
COPY package*.json /home/app
COPY tsconfig*.json /home/app
COPY tailwind.config.js /home/app

RUN npm install
COPY . .
RUN npm run build
EXPOSE 4200
CMD ["npm", "start"]
