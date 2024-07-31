const middleware = require('../../../../middleware/index');

const productController = require('../controller/product.controller');

const { addProductSchema, getProductSchema } = require('../validator');

const productRoute = (api) => {
  api.get('/product/lookup', productController.productLookup);

  api.get('/product/:prdct_id', middleware.commonValidator(getProductSchema), productController.getProductById);

  // only for adding product (not used in FE)
  api.post('/product', middleware.commonValidator(addProductSchema), productController.addProduct)
}


module.exports = productRoute;
