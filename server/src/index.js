const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config();
require('./db');

const apiV1 = require('./apis/v1/');
const middleware = require('./middleware/');

const app = express();

app.use(bodyParser.json());

app.use(cors());

app.use('/api/v1', apiV1());

app.get('/', (req, res) => {
  res.status(200).send('Welcome')
})

app.use(middleware.notFoundHandler)

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`)
})

module.exports = app;
