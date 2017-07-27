const app = require('../app');
const chai = require('chai'),
  assert = chai.assert,
  expect = chai.expect;
const helpers = require('./helpers');
const mongoose = require('mongoose');

const User = mongoose.model('User');
const List = mongoose.model('List');
const Item = mongoose.model('Item');

describe('Item', () => {

  it( 'creates an item', async() => {
    const mentor = await new User({
      name: 'Mentor',
      email: 'mentor@itemtest.com'
    }).save()

    const mentee = await new User({
      name: 'Mentee',
      email: 'mentee@itemtest.com'
    }).save()

    const list = await new List({
      name: 'New Item',
      mentor: mentor._id,
      mentee: mentee._id
    }).save()

    const item = await new Item({
      text: "I'm an Item",
      list: list._id
    })

    var items = Item.find({}, (err, items) => {
      if (err) {
        console.log('Error in finding items', err);
      } else {
        expect(items[0].name).to.equal('New Item')
      }
    })
  })
})
