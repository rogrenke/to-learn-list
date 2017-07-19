const mongoose = require('mongoose');
const List = require('../models/List');

exports.createForm = (req, res) => {
  res.render('listForm', { title: 'Create List' })
}

exports.createList = async (req, res) => {
  const newList = new List(req.body)
  await newList.save();
  res.redirect('/lists')
}

exports.getLists = (req, res) => {
  List.find({}, (err, lists) => {
    res.render('lists', { title: 'Lists', lists });
  })
}
