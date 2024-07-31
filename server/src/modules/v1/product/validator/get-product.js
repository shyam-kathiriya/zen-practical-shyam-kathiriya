const Joi = require('joi');

const getProductSchema = Joi.object({
  prdct_id: Joi.string().required(),
}).unknown(true)

module.exports = getProductSchema;