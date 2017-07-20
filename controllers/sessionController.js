const passport = require('passport');

exports.login = passport.authenticate('local', {
  failureRedirect: '/sessions/new',
  failureFlash: 'Failed Login!',
  successRedirect: '/',
  successFlash: 'Logged in!'
});
