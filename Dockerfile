# Build stage
FROM node:21-alpine AS build

WORKDIR /home/app

ARG API_URL
ARG API_SUNAT_TOKEN

ENV API_URL: $API_URL
ENV API_SUNAT_TOKEN: $API_SUNAT_TOKEN

COPY ./angular.json /home/app
COPY ./package*.json /home/app
COPY ./tsconfig*.json /home/app
COPY ./tailwind.config.js /home/app
RUN npm install

COPY ./src /home/app/src

# Replace environment placeholders
RUN sed -i "s#\\[API_URL\\]#$API_URL#g" /home/app/src/environments/environment.ts
RUN sed -i "s#\\[API_SUNAT_TOKEN\\]#$API_SUNAT_TOKEN#g" /home/app/src/environments/environment.ts

# Build
RUN npm run build --prod

# Serve app with nginx server
# Use official nginx image as the base image
FROM nginx:latest

# Copy the custom nginx configuration file to the container in the default location
COPY ./nginx.conf /etc/nginx/nginx.conf
# Copy the build output to replace the default nginx contents.
COPY --from=build /home/app/dist/smart-shell /usr/share/nginx/html

EXPOSE 4201
