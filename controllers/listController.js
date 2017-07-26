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
  const mentee = await User.findOne({ name: req.body.mentee });
  const newList = new List({name: listName, author: listAuthor, mentee: mentee._id});
  await newList.save();
  res.redirect(`/lists/${newList._id}`);
};

exports.getLists = async (req, res) => {
  const currentUserId = req.user._id;
  const currentUserAuthoredLists = await List.find({author: currentUserId}).populate('mentee', 'name');
  const listsAssignedToCurrentUser = await List.find({mentee: currentUserId}).populate('author', 'name');
  res.render('lists', { currentUserAuthoredLists, listsAssignedToCurrentUser, title: 'Lists' });
};

exports.getListById = async (req, res) => {
  const list = await List.findOne({ _id: req.params.id });
  const items = await Item.find({ list: req.params.id });
  const completeItems = await Item.find({ list: req.params.id, status: "complete" });
  let complete;
  (items.length === completeItems.length && items.length!==0 && !list.feedback) ? complete = " is-active" : complete = "";
  res.render('list', { list, items, complete, name: list.name });
};

exports.createItem = async (req, res) => {
  const newItem = new Item(req.body);
  await newItem.save();
  res.redirect(`/lists/${req.params.id}`);
};

exports.updateList = async (req, res, next) => {
  const listToBeUpdated = await List.findOneAndUpdate(
    { _id: req.body.id },
    { feedback: req.body.feedback },
    { new: true }
  );
  next();
};
