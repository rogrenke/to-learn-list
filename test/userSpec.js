const app = require('../app');
const mongoose = require('mongoose');
const chai = require('chai'),
  assert = chai.assert,
  expect = chai.expect;

afterEach((done) => {
  dbCleaner.clean(mongoose.connection.db, () => {
    done()
  })
})

describe('User', () => {
  const User = mongoose.model('User');

  it('Creates a new user', async () => {
    var user = await new User({
      name: 'testUser',
      email: 'user@test.com',
      password: 'testPassword'
    }).save()
    var users = User.find({}, (err, users) => {
      expect(users[0].name).to.equal(user.name)
    })
  })

  it('throws an error if an email is not provided', () => {
    expect(new User({
      name: 'testUser',
      password: 'testPassword'
    })).to.throw
  })

  it('throws an error if a name is not provided', () => {
    expect(new User({
      email: 'user@test.com',
      password: 'testPassword'
    })).to.throw
  })
})
