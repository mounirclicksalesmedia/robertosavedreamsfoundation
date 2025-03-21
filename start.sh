#!/bin/bash

# Kill any existing processes
pm2 delete all
pkill -9 node

# Clean build artifacts
rm -rf .next node_modules/.cache

# Install dependencies
npm install

# Build the application
npm run build

# Set environment variables and start the application
export PORT=3001
export NODE_ENV=production
pm2 start npm --name roberto -- start 