const mongoose = require('mongoose');
const Mentor = mongoose.model('Mentor');
const Mentorship = mongoose.model('Mentorship');

exports.formMentor = (req, res) => {
  res.render('mentorNew');
};

exports.createMentor = async (req, res) => {
  const currentUserId = req.user._id;
  const mentor = new Mentor({ user: currentUserId, bio: req.body.bio });
  await mentor.save();
  res.redirect('/');
};

exports.listMentors = async (req, res) => {
  const mentors = await Mentor.find({ mentor: { $not: /req.user._id/  } }).populate('user', 'name');
  res.render('mentors', { mentors });
};

exports.checkMentor = async (req, res, next) => {
  console.log(req.params.id)
  const mentor = await Mentor.findById(req.params.id);
  if (String(mentor.user) == String(req.user._id)) {
    throw Error("You can't invite yourself");
    return;
  }
  next();
}

exports.inviteMentor = async (req, res) => {
  console.log(req.params.id)
  const mentor = await Mentor.findById(req.params.id);
  const mentorship = new Mentorship({
    mentee: req.user._id,
    mentor: mentor.user
  });
  await mentorship.save();
  req.flash('success', 'Invite Sent!');
  res.redirect('/mentors');
};

exports.listInvites = async (req, res) => {
  const invites = await Mentorship.find({ mentor: req.user._id, status:'pending'})
    .populate('mentor', 'name')
    .populate('mentee', 'name');
  res.render('invites', { invites });
};

exports.acceptInvite = async (req, res) => {
  const mentorship = await Mentorship.findById(req.params.id);
  if (String(mentorship.mentor) == String(req.user._id)) {
    await Mentorship.findByIdAndUpdate(req.params.id, {
      status: 'active'
    });
  } else {
    throw Error('You are not the assigned mentor')
  }
  res.redirect('/mentors/invites');
};

exports.declineInvite = async (req, res) => {
  const mentorship = await Mentorship.findById(req.params.id);
  if (String(mentorship.mentor) == String(req.user._id)) {
    await Mentorship.findByIdAndUpdate(req.params.id, {
      status: 'declined'
    });
  } else {
    throw Error('You are not the assigned mentor')
  }
  res.redirect('/mentors/invites');
};

exports.listAssignedMentors = async (req, res) => {
  const mentorships = await Mentorship.find({mentee: req.user._id}).populate('mentor', 'name');
  res.render('assignedMentors', { mentorships });
}

exports.listAssignedMentees = async (req, res) => {
  const mentorships = await Mentorship.find({mentor: req.user._id}).populate('mentee', 'name');
  res.render('assignedMentees', { mentorships });
}
