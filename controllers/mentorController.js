const mongoose = require('mongoose');
const Mentor = mongoose.model('Mentor');

exports.formMentor = (req, res) => {
  res.render('mentorNew');
};

exports.createMentor = async (req, res) => {
  const currentUserId = req.user._id;
  const mentor = new Mentor({ user: currentUserId, bio: req.body.bio });
  await mentor.save();
  res.render('mentorNew');
}
