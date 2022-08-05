const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const routes = require('./routes/index');
const errorHandler = require('./middlewares/errorHandler');
const cors = require('./middlewares/cors');
const limiter = require('./middlewares/limiter');
const { DB, PORT, NODE_ENV, MONGOOSE_DB } = require('./utils/config');

const app = express();

mongoose.connect(NODE_ENV === 'production' ? MONGOOSE_DB : DB);

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(helmet());

app.use(requestLogger);

app.use(limiter);

app.use(cors);

app.use(routes);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
