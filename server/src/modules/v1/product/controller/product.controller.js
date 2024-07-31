const httpResponse = require('../../../../helpers/http-response');
const productService = require('../services/product.service');

const productLookup = async (req, res) => {
  try {
    const response = await productService.productLookup();
    httpResponse.sendSuccess(res, response);
  } catch (err) {
    httpResponse.sendFailer(req, res, err, null);
  }
}

const getProductById = async (req, res) => {
  try {
    const data = Object.assign({}, req.body);
    const response = await productService.getProductById(data);
    httpResponse.sendSuccess(res, response);
  } catch (err) {
    httpResponse.sendFailer(req, res, err, null);
  }
}

const addProduct = async (req, res) => {
  try {
    const data = Object.assign({}, req.body);
    const response = await productService.addProduct(data);
    httpResponse.sendSuccess(res, response);
  } catch (err) {
    httpResponse.sendFailer(req, res, err, null);
  }
}

module.exports = {
  productLookup,
  addProduct,
  getProductById
};