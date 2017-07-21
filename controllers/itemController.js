const mongoose = require('mongoose');
const List = mongoose.model('List');
const Item = mongoose.model('Item');

exports.createItem = async (req, res, next) => {
  req.body.list = req.params.id;
  const newItem = new Item(req.body);
  await newItem.save();
  res.redirect(`/lists/${req.params.id}`);
  next()
};