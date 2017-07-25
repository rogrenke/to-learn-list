const mongoose = require('mongoose');
const Mentor = mongoose.model('Mentor');

exports.formMentor = (req, res) => {
  res.render('mentorNew');
};

exports.createMentor = async (req, res) => {
  const currentUserId = req.user._id;
  const mentor = new Mentor({ user: currentUserId, bio: req.body.bio });
  await mentor.save();
  res.redirect('/');
}

exports.listMentors = async (req, res) => {
  const mentors = await Mentor.find().populate('user', 'name');
  res.render('mentors', { mentors });
}
