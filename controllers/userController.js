const mongoose = require('mongoose');

exports.signupForm = (req, res) => {
  res.render('./users/new');
}
