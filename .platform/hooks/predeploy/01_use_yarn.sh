#!/bin/bash
# Navigate to the app directory
cd /var/app/staging || exit
# Use yarn to install dependencies
yarn install --production