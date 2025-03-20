#!/bin/bash

# Exit on error
set -e

echo "===== Starting website update script ====="

# Navigate to the repository directory
cd /var/www/roberto/repo

# Pull the latest changes
echo "Pulling latest changes from GitHub..."
git pull

# Install any new dependencies
echo "Installing dependencies..."
npm ci

# Build the application
echo "Building the application..."
npm run build

# Restart the application
echo "Restarting the application with PM2..."
pm2 restart roberto

echo "===== Website update completed! =====" 