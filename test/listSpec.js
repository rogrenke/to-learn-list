const app = require('../app');
const chai = require('chai'),
  assert = chai.assert,
  expect = chai.expect;
const helpers = require('./helpers');
const mongoose = require('mongoose');

const User = mongoose.model('User');
const List = mongoose.model('List');

describe('List', () => {

  it( 'creates a list', async() => {
    const mentor = await new User({
      name: 'Mentor',
      email: 'mentor@listtest.com'
    }).save()

    const mentee = await new User({
      name: 'Mentee',
      email: 'mentee@listtest.com'
    }).save()

    const list = await new List({
      name: 'New List',
      mentor: mentor._id,
      mentee: mentee._id
    }).save()

    List.find({}, function(err, lists) {
      console.log(lists);
      expect(lists[0].name).to.equal('New List')
    })
  })
})
