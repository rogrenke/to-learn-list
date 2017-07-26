const app = require('../app');
const chai = require('chai'),
  assert = chai.assert,
  expect = chai.expect;
const mongoose = require('mongoose');

describe('User', () => {
  const User = mongoose.model('User');

  it('Creates a new user', async() => {
    var user = await new User({
      name: 'testUser',
      email: 'user@test.com',
      password: 'testPassword'
    }).save()
    var users = User.find({}, (err, users) => {
      expect(users[0].name).to.equal(user.name)
    })
  })

  it('throws an error if an email is not unique', () => {
    expect(new User({
      email: 'user@test.com',
      password: 'testPassword'
    })).to.throw
  })

  it('throws an error if an email is not provided', () => {
    expect(new User({
      name: 'testUser',
      password: 'testPassword'
    })).to.throw
  })

  it('throws an error if a name is not provided', () => {
    expect(new User({
      email: 'user2@test.com',
      password: 'testPassword'
    })).to.throw
  })

  after( () => {
    User.findOneAndRemove({ name: 'testUser'}, (err, user) => {
      if (!err) { return user }
    });
  })
})
