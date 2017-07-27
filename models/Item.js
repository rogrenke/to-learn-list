const mongoose = require('mongoose');
mongoose.promise = global.Promise;
const itemSchema = new mongoose.Schema({

  text: {
    type: String,
    trim: true,
    required: 'Please enter the item text'
  },

  description: {
    type: String,
    trim: true,
  },

  linkToResource: {
    type: String,
    trim: true,
  },

  feedback: {
      type: String,
      trim: true,
      default: ""
  },

  status: {
    type: String,
    default: 'incomplete'
  },

  youtubeVideo: {
    type: String,
    trim: true,
    default: ''
  },

  list: {
    type: mongoose.Schema.ObjectId,
    ref: 'List',
    required: 'Please assign to a list'
  }
});

module.exports = mongoose.model('Item', itemSchema);
