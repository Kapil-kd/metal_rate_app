const mongoose = require('mongoose');
const { METALS } = require('../utils/constants');

const PuritySchema = new mongoose.Schema({
  metal: {
    type: String,
    enum: METALS,
    required: true
  },
  name: { type: String, required: true }, 
  value: { type: Number, required: true } 
}, { timestamps: true });

module.exports = mongoose.model('Purity', PuritySchema);
