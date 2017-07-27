const passport = require('passport');

exports.signin = passport.authenticate('local', {
  failureRedirect: '/sessions/signin',
  failureFlash: 'Failed Sign in!',
  successRedirect: '/',
  successFlash: 'Signed in!'
});

exports.signout = (req, res) => {
  req.logout();
  req.flash('success', 'You signed out successfully');
  res.redirect('/');
}

exports.signinForm  = (req, res) => {
  res.render('sessions/signin');
}

exports.validateRegister = (req, res, next) => {
  req.checkBody('email', 'That Email is not valid!').isEmail();
  req.sanitizeBody('email').normalizeEmail({
    remove_dots: false,
    remove_extension: false,
    gmail_remove_subadresses: false
  });
  req.checkBody('password', 'Password cannot be blank!').notEmpty();

  const errors = req.validationErrors();
  if (errors) {
    req.flash('error', errors.map(err => err.msg));
    res.render('newUser', {body: req.body, flashes: req.flash()});
    return;
  }
  next();
};
