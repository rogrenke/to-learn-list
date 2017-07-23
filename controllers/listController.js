const mongoose = require('mongoose');
const List = mongoose.model('List');
const Item = mongoose.model('Item');

exports.createForm = (req, res) => {
  res.render('listForm', { title: 'Create List' });
};

exports.createList = async (req, res) => {
  req.body.author = req.user._id;
  const newList = new List(req.body);
  await newList.save();
  res.redirect(`/lists/${newList._id}`);
};

exports.getLists = async (req, res) => {
  async function listWithAuthor(lists){
    let result = {};
    for(let list of lists) {
      result[list.name] = await list.authorName();
    }
    return result;
  }
  const lists = await List.find();
  const listAndAuthorName = await listWithAuthor(lists);
  res.render('lists', { lists: listAndAuthorName, title: 'Lists' });
};

exports.getListById = async (req, res) => {
  const list = await List.findOne({ _id: req.params.id });
  const items = await Item.find({});
  res.render('list', { list, items, name: list.name });
};

exports.createItem = async (req, res) => {
  const newItem = new Item(req.body);
  await newItem.save();
  res.redirect(`/lists/${req.params.id}`);
};
