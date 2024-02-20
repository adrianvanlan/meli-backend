const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

require('dotenv').config();

const middlewares = require('./middlewares');
const itemsRoutes = require('./routes/items.routes');

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/api/items', itemsRoutes);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
