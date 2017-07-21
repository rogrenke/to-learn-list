const mongoose = require('mongoose');
const List = mongoose.model('List');
const Item = mongoose.model('Item');

exports.createItem = async (req, res, next) => {
  req.body.list = req.params.id;
  const newItem = new Item(req.body);
  await newItem.save();
  res.redirect(`/lists/${req.params.id}`);
  next();
};

exports.updateItem = async (req, res, next) => {
  console.log(req.query.status);
  let newStatus;
  if (req.query.status == 'incomplete') {
    newStatus = 'complete'
  } else {
    newStatus = 'incomplete'
  }
  const updatedItem = await Item.findOneAndUpdate({ _id: req.query.item }, { status: newStatus }, { new: true });
  res.redirect(`/lists/${updatedItem.list}`);
  next();
}