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
  console.log(req.query.feedback);
  let newStatus = req.query.status == 'incomplete' ? 'complete' : 'incomplete';
      const firstUpdatedItem = await Item.findOneAndUpdate(
        { _id: req.query.item },
        { status: newStatus },
        { new: true }
      );
      console.log(firstUpdatedItem);
      const updatedItem = await Item.findOneAndUpdate(
        { _id: req.query.item },
        { feedback: req.query.feedback},
        { new: true }
      );
  console.log(updatedItem);
  res.redirect(`/lists/${updatedItem.list}`);
  next();
};

exports.getItemById = async (req, res, next) => {
  const itemToGet = await Item.findById(req.params.id);
  res.render('item', { itemToGet, text: itemToGet.text });
  next();
}
