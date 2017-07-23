const mongoose = require('mongoose');
const User = mongoose.model('User');
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

listSchema.methods.authorName = async function() {
  const user = await User.findById(this.author);
  return user.name;
};

module.exports = mongoose.model('List', listSchema);
