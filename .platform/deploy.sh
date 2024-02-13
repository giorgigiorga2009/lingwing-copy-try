#!/bin/bash
# Check if Yarn is installed
if ! type "yarn" > /dev/null; then
  npm install -g yarn
fi

# Install dependencies with Yarn
yarn install --production

# Build your Next.js app (skip if you're deploying a pre-built app)
yarn build

# Use the following line if you want to start your app using a custom command.
# For example, for Next.js you might use `yarn start`. This is just an example
# and might not be necessary for your deployment process.
yarn start
