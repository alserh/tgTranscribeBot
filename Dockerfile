FROM node:18.17.1-alpine3.18 as build
WORKDIR /app
COPY package.json /app
RUN npm install --omit=dev
COPY ./ /app
EXPOSE 3000
ENTRYPOINT [ "node", "index.js" ]