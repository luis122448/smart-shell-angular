# Build stage
FROM node:21-alpine AS build

WORKDIR /home/app

COPY ./angular.json /home/app
COPY ./package*.json /home/app
COPY ./tsconfig*.json /home/app
COPY ./tailwind.config.js /home/app
RUN npm install

COPY ./src /home/app/src
RUN npm run build --prod

# Serve app with nginx server
# Use official nginx image as the base image
FROM nginx:latest

# Copy the build output to replace the default nginx contents.
COPY --from=build /home/app/dist/smart-shell /usr/share/nginx/html

# Expose port 80
EXPOSE 80
