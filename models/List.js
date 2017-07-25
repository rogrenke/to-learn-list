const mongoose = require('mongoose');
mongoose.promise = global.Promise;

const listSchema = new mongoose.Schema({

  name: {
    type: String,
    trim: true,
    required: 'Please enter a list name'
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  mentee: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  feedback: {
    type: String,
    trim: true
  }
});

module.exports = mongoose.model('List', listSchema);
