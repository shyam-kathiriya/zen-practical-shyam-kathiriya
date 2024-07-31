const uuid = require('uuid/v4');

const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  invc_id: {
    type: String,
    default: uuid,
  },
  invc_no: {
    type: Number,
  },
  invc_date: {
    type: Date,
    default: new Date()
  },
  invc_customer_name: {
    type: String,
    trim: true
  },
  invc_total_amount: {
    type: Number,
    default: 0
  }
}, { timestamps: false });

const InvoiceModel = mongoose.model('invoices', invoiceSchema);

module.exports = InvoiceModel;
