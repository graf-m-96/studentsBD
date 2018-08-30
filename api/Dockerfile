FROM node:8

COPY src /src
COPY .env /
COPY config.js /
COPY index.js /
COPY package.json /

RUN npm install --production

ENV PORT 8080
EXPOSE 8080

CMD npm start
