#!/bin/bash
# Description: Install the application for development

# Create environment variables file
touch .env

# Install Node.js
sudo apt update
sudo apt install nodejs npm

# Install libraries
npm install

# Install Angular CLI
sudo npm install -g @angular/cli

# Start the application
ng serve -o
