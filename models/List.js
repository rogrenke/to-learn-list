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
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true }
});

// listSchema.methods.authorName = (author) => {
//     const user = User.findById(author, function(err, user) {
//   });
//   return user.name
// };

listSchema.virtual('authorName', {
  ref: 'User',
  localField: '_id',
  foreignField: 'name'
});

function autopopulate(next) {
  this.populate('authorName');
  next();
}
listSchema.pre('find', autopopulate);
listSchema.pre('findOne', autopopulate);

module.exports = mongoose.model('List', listSchema);
