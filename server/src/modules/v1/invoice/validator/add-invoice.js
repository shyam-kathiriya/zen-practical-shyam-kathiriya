const Joi = require('joi');

const addInvoiceSchema = Joi.object({
  invc_customer_name: Joi.string().required(),
  invc_items: Joi.array().items(
    Joi.object({
      invcd_fk_prdct_id: Joi.string().required(),
      invcd_prdct_rate: Joi.number().required(),
      invcd_prdct_unit: Joi.number().required(),
      invcd_qty: Joi.number().required(),
      invcd_discount: Joi.number().required(),
      invcd_net_amount: Joi.number().required(),
      invcd_total_amount: Joi.number().required(),
    }).unknown(true)
  ),
}).unknown(true);

module.exports = addInvoiceSchema;


