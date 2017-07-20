const mongoose = require('mongoose');
mongoose.promise = global.Promise;

const listSchema = new mongoose.Schema({

  name: {
    type: String,
    trim: true,
    required: 'Please enter a list name'
  }
});

module.exports = mongoose.model('List', listSchema);
