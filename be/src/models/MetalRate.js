const mongoose = require('mongoose');

const metalRateSchema = new mongoose.Schema({
  metal: {
    type: String,
    required: true,
    enum: ['Gold', 'Silver', 'Platinum'],
  },
  purity: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Purity',
    required: true,
  },
  rate: {
    type: Number,
    required: true,
  },
  rateDate: {
    type: Date,
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('MetalRate', metalRateSchema);
