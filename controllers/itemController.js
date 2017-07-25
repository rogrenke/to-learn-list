const mongoose = require('mongoose');
const List = mongoose.model('List');
const Item = mongoose.model('Item');
const embed = require('embed-video');

exports.createItem = async (req, res, next) => {
  req.body.list = req.params.id;
  const newItem = new Item(req.body);
  await newItem.save();
  res.redirect(`/lists/${req.params.id}`);
  next();
};

exports.updateItem = async (req, res, next) => {
  let newStatus = req.query.status == 'incomplete' ? 'complete' : 'incomplete';
    const updatedItem = await Item.findOneAndUpdate(
    { _id: req.query.item },
    { status: newStatus },
    { new: true }
  );
  res.redirect(`/lists/${updatedItem.list}`);
  next();
};

exports.getItemById = async (req, res, next) => {
  const itemToGet = await Item.findById(req.params.id)
  if (itemToGet.youtubeVideo) {
      youtubeVideoIframe = embed(itemToGet.youtubeVideo,{ attr: { width:800, height: 400}});
    res.render('item', { itemToGet, youtubeVideoIframe });
  } else {
    res.render('item', { itemToGet })
  }
  next();

}
