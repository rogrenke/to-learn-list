const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const md5 = require('md5');
const validator = require('validator');
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const passportLocalMongoose = require('passport-local-mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: 'Please provide an email address',
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'Invalid email address']
  },
  name: {
    type: String,
    required: 'Please provide a name',
    trim: true
  }
});

userSchema.plugin(passportLocalMongoose, { usernameField: 'email'});
userSchema.plugin(mongodbErrorHandler);
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
