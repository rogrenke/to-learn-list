const mongoose = require('mongoose');
const List = require('../models/List');
const Item = require('../models/Item');

exports.createForm = (req, res) => {
  res.render('listForm', { title: 'Create List' });
};

exports.createList = async (req, res) => {
  const newList = new List(req.body);
  await newList.save();
  res.redirect(`/lists/${newList._id}`);
};

exports.getLists = async (req, res) => {
  const lists = await List.find();
  // const items = await Item.find({});
  res.render('lists', { lists, title: 'Lists' });
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
}
