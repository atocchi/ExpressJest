FROM node:12.18.1
ENV NODE_ENV=production
WORKDIR /
COPY [ "package.json", "package-lock.json*", "./"]


RUN npm install
COPY . .

EXPOSE 3000

CMD [ "node", "server.js" ]