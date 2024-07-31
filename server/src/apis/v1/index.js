
const express = require('express');
const productRoute = require('../../modules/v1/product/routers/product.routes');
const invoiceRoute = require('../../modules/v1/invoice/routers/invoice.routes');

const apiV1 =  () => {

  const api = express.Router();

  productRoute(api);
  invoiceRoute(api);

  api.get('/', (req, res) => {
    res.json({
      version: '1.0'
    })
  })

  return api
}


module.exports = apiV1;