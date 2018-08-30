'use strict';

const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const express = require('express');
const mognoose = require('mongoose');

const config = require('./config');
const errorHandler = require('./src/middlewares/errorHandler');
const routes = require('./src/routes');

const url = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}` +
    `@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`;
mognoose.connect(url, { useNewUrlParser: true });
const app = express();
app.use(cors());
app.use(bodyParser.json());
routes(app);
app.use(errorHandler);
// eslint-disable-next-line no-console
app.listen(config.port, () => console.log(`Сервис работает на ${config.port} порту`));
