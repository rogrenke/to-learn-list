const passport = require('passport');

exports.signin = passport.authenticate('local', {
  failureRedirect: '/sessions/new',
  failureFlash: 'Failed Sign in!',
  successRedirect: '/',
  successFlash: 'Signed in!'
});

exports.signout = (req, res) => {
  req.logout();
  req.flash('success', 'You signed out successfully');
  res.redirect('/');
};

exports.signinForm  = (req, res) => {
  res.render('sessions/signin');
};
