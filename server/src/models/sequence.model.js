// external packages
const mongoose = require('mongoose');

const sequenceSchema = new mongoose.Schema({
  type: {
    type: String,
    trim: true,
  },
  sequence: {
    type: Number,
    default: 0
  }
}, { timestamps: false });

const SequenceModel = mongoose.model('sequences', sequenceSchema);

module.exports = SequenceModel;
