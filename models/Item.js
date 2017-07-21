const mongoose = require('mongoose');
mongoose.promise = global.Promise;

const itemSchema = new mongoose.Schema({

  text: {
      type: String,
      trim: true,
      required: 'Please enter the item text'
  },

  status: {
    type: String,
    trim: true,
    default: 'incomplete'
  },

  list: {
    type: mongoose.Schema.ObjectId,
    ref: 'List',
    required: 'Please assign to a list'
  }
});

module.exports = mongoose.model('Item', itemSchema);
