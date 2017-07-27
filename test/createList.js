const app = require('../app');
const Browser = require('zombie');
const chai = require('chai'),
  assert = chai.assert,
  expect = chai.expect;
const helpers = require('./helpers');
const mongoose = require('mongoose');

const browser = new Browser();
const User = mongoose.model('User');
const List = mongoose.model('List');

Browser.localhost('localhost', 7777);

describe('List', () => {

  it( 'creates a list', async() => {
    const mentor = await new User({
      name: 'Mentor',
      email: 'mentor@test.com'
    }).save()
    const mentee = await new User({
      name: 'Mentee',
      email: 'mentee@test.com'
    }).save()
    const list = await new List({
      name: 'New List',
      mentor: mentor._id,
      mentee: mentee._id
    }).save()
    var lists = List.find({}, (err, lists) => {
      if (err) {
        console.log('Error in finding lists', err);
      } else {
        expect(lists[0].name).to.equal('New List')
      }
    })
  })
})
