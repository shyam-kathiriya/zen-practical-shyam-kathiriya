
const ProductModel = require('../../../../models/product.model');
const errorManager = require('../../../../helpers/error-manager');

const productLookup = async () => {
  return await ProductModel.find({}, { prdct_id: 1, prdct_name: 1, _id: 0 });
}

const getProductById = async (data) => {
  const response = await ProductModel.findOne({ prdct_id: data.prdct_id }, { _id: 0 });
  if (!response) throw errorManager.getHttpError('DATA_NOT_FOUND');
  return response;
}

const addProduct = async (data) => {
  const product = await ProductModel.create(data);
  return product;
}

module.exports = {
  productLookup,
  addProduct,
  getProductById
}
