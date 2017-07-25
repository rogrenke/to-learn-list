const mongoose = require('mongoose');
mongoose.promise = global.Promise;
const mentorSchema = new mongoose.Schema({

  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  bio: {
    type: String,
  }
});

module.exports = mongoose.model('Mentor', mentorSchema);
