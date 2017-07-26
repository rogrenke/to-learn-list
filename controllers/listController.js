const mongoose = require('mongoose');
const List = mongoose.model('List');
const Item = mongoose.model('Item');
const User = mongoose.model('User');

exports.createForm = (req, res) => {
  res.render('listForm', { title: 'Create List' });
};

exports.createList = async (req, res) => {
  const listName = req.body.name;
  const listAuthor = req.user._id;
  try {
    const mentee = await User.findOne({ name: req.body.mentee });
    if(String(req.user._id) == String(mentee._id)) {
      console.log("went wrong")
      req.flash('error', "You cannot assign a list to yourself!");
      res.redirect('/lists/new');
    } else {
      const newList = new List({name: listName, author: listAuthor, mentee: mentee._id});
      await newList.save();
      res.redirect(`/lists/${newList._id}`);
    }
  } catch (err) {
    console.log("flash")
    req.flash('error', `The user ${req.body.mentee} does not exist.`);
    res.redirect('/lists/new');
  }
};

exports.getLists = async (req, res) => {
  const currentUserId = req.user._id;
  const currentUserAuthoredLists = await List.find({author: currentUserId}).populate('mentee', 'name');
  const listsAssignedToCurrentUser = await List.find({mentee: currentUserId}).populate('author', 'name');
  res.render('lists', { currentUserAuthoredLists, listsAssignedToCurrentUser, title: 'Lists' });
};

exports.getListById = async (req, res) => {
  const list = await List.findOne({ _id: req.params.id }).populate('author', 'email');
  const items = await Item.find({ list: req.params.id });
  const completeItems = await Item.find({ list: req.params.id, status: "complete" });
  console.log(completeItems);
  let complete;
  (items.length === completeItems.length && items.length!==0 && !list.feedback) ? complete = " is-active" : complete = "";
  console.log(complete)
  res.render('list', { list, items, complete, name: list.name });
};

exports.createItem = async (req, res) => {
  const newItem = new Item(req.body);
  await newItem.save();
  res.redirect(`/lists/${req.params.id}`);
};

exports.updateList = async (req, res) => {
  const listToBeUpdated = await List.findOneAndUpdate(
    { _id: req.body.id },
    { feedback: req.body.feedback },
    { new: true }
  );
  res.redirect(`/lists/${req.body.id}`)
};

exports.bookFaceToFaceOnListCompleted = async (req, res) => {
  const listToBeUpdated = await List.findOneAndUpdate(
    { _id: req.query.listId },
    { faceToFaceBooked: true },
    { new: true }
  );
  res.redirect(`/lists/${req.query.listId}`)
};
