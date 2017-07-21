const passport = require('passport');

exports.login = passport.authenticate('local', {
  failureRedirect: '/sessions/new',
  failureFlash: 'Failed Login!',
  successRedirect: '/',
  successFlash: 'Logged in!'
});

exports.logout = (req, res) => {
  console.log('inside the session controller');
  req.logout();
  req.flash('success', 'You logged out successfully');
  res.redirect('/');
}

exports.signinForm  = (req, res) => {
  res.render('sessions/signin');
}
