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
});

module.exports = mongoose.model('List', listSchema);
