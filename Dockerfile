FROM node:12.18.1

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production=false

COPY . . 

EXPOSE 3700

CMD ["node", "index.js"]

