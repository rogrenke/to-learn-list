const mongoose = require('mongoose');
mongoose.promise = global.Promise;

const itemSchema = new mongoose.Schema({

  text: {
      type: String,
      trim: true,
      required: 'Please enter the item text'
  }
});

module.exports = mongoose.model('Item', itemSchema);
