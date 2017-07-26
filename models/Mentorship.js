const mongoose = require('mongoose');
mongoose.promise = global.Promise;

const mentorshipSchema = new mongoose.Schema({
  mentee: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'Please assign a mentee'
  },
  mentor: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'Please assign a mentor'
  },
  status: {
    type: String,
    default: 'pending'
  }
});

module.exports = mongoose.model('Mentorship', mentorshipSchema);
