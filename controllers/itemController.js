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

exports.updateItem = async (req, res) => {
  let newStatus = req.query.status == 'incomplete' ? 'complete' : 'incomplete';
      const firstUpdatedItem = await Item.findOneAndUpdate(
        { _id: req.query.item },
        { status: newStatus },
        { new: true }
      );
      const updatedItem = await Item.findOneAndUpdate(
        { _id: req.query.item },
        { feedback: req.query.feedback },
        { new: true }
      );
  res.redirect(`/lists/${updatedItem.list}`);
};

exports.getItemById = async (req, res, next) => {
  const itemToGet = await Item.findById(req.params.id)
  if (itemToGet.youtubeVideo !== "") {
      youtubeVideoIframe = embed(itemToGet.youtubeVideo,{ attr: { width:800, height: 400}});
    res.render('item', { item: itemToGet, youtubeVideoIframe });
  } else {
      youtubeVideoIframe = null
    res.render('item', { item: itemToGet, youtubeVideoIframe });
  }
  next();

}
