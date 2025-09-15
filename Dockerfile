# Stage 1: Build the angular application
FROM node:21-alpine AS build

WORKDIR /home/app

COPY ./angular.json /home/app
COPY ./package*.json /home/app
COPY ./tsconfig*.json /home/app
COPY ./tailwind.config.js /home/app
RUN npm install

COPY ./src /home/app/src

RUN npm run build --prod

# Stage 2: Serve app with nginx server
FROM nginx:latest

# Install packages to use envsubst
RUN apt-get update && apt-get install -y gettext-base curl

# Copy the nginx template
COPY ./nginx.template /etc/nginx/templates/default.conf.template

# Copy and grant execution permissions to the entrypoint script
COPY ./entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Copy the build output
COPY --from=build /home/app/dist/smart-shell /usr/share/nginx/html

EXPOSE 80

# Set the entrypoint
ENTRYPOINT ["/entrypoint.sh"]