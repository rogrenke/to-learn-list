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

// Functionality of checking / unchecking taken out for the moment until we have checkbox implemented.
exports.updateItem = async (req, res, next) => {
  let newStatus = req.query.status == 'incomplete' ? 'complete' : 'incomplete';
  console.log("4");
  const updatedItem = await Item.findOneAndUpdate(
    { _id: req.query.item },
    { status: newStatus },
    { new: true }
  );
  console.log("5");
  res.redirect(`/lists/${updatedItem.list}`);
  next();
};

exports.getItemById = async (req, res, next) => {
  console.log("1");
  console.log(req.params);
  const itemToGet = await Item.findById(req.params.id);
  console.log(itemToGet);
  res.render('item', { itemToGet, text: itemToGet.text });
  next();
}
