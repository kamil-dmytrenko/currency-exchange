const mongoose = require('mongoose');

module.exports = mongoose.model('Exchange', new mongoose.Schema({
  from: {
    type: String
  },
  amountToConvert: {
      type: Number
  },
  to: {
    type: String
  },
  amountAfterConversion: {
    type: Number
  },
})
);