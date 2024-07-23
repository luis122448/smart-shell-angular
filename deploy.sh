#!/bin/bash
# Description: Deploy the application

# Stop the application
sudo docker compose down

# Pull the latest changes
sudo git pull origin main

# Build and run the application
sudo docker compose up --build --force-recreate --no-deps -d
