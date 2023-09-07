
FROM node:18-alpine
WORKDIR /app
COPY package.json yarn.lock /app/
RUN yarn install --production && cache clean
COPY . /app/
RUN yarn build
CMD yarn start
EXPOSE 3000

# CMD ["yarn", "dev"]
