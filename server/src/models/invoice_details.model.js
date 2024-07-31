const uuid = require('uuid/v4');

const mongoose = require('mongoose');

const invoiceDetailsSchema = new mongoose.Schema({
  invcd_id: {
    type: String,
    default: uuid,
  },
  invcd_fk_invc_id: {
    type: String,
  },
  invcd_fk_prdct_id: {
    type: String,
  },
  invcd_prdct_rate: {
    type: Number,
  },
  invcd_prdct_unit: {
    type: Number,
  },
  invcd_qty: {
    type: Number,
  },
  invcd_discount: {
    type: Number,
  },
  invcd_net_amount: {
    type: Number,
  },
  invcd_total_amount: {
    type: Number,
  },
}, { timestamps: false });

const InvoiceDetailsModel = mongoose.model('invoice_details', invoiceDetailsSchema);

module.exports = InvoiceDetailsModel;
