const Joi = require('joi');

const addProductSchema = Joi.object({
  prdct_name: Joi.string().required(),
  prdct_rate: Joi.string().required(),
  prdct_unit: Joi.string().required(),
}).unknown(true)

module.exports = addProductSchema;