const uuid = require('uuid/v4');

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  prdct_id: {
    type: String,
    default: uuid,
  },
  prdct_name: {
    type: String,
    trim: true
  },
  prdct_rate: {
    type: Number
  },
  prdct_unit: {
    type: Number,
  }
}, { timestamps: false });

const ProductModel = mongoose.model('products', productSchema);

module.exports = ProductModel;
