
FROM node:18-alpine
WORKDIR /app
COPY package.json /app
COPY yarn.lock /app
RUN yarn install --production
COPY . /app/
CMD yarn dev
EXPOSE 3000

# CMD ["yarn", "dev"]
