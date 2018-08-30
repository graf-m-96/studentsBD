FROM node:8

COPY src /src
COPY config.js /
COPY index.js /
COPY package.json /

RUN npm install --production

ENV PORT 3000
EXPOSE 3000

CMD npm run build
CMD npm start
