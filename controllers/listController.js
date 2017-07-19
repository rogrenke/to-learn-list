const mongoose = require('mongoose');

exports.createList = async (req, res) => {
  // const newList = new List(req.body)
  // await newList.save();
  res.redirect('/lists')
}