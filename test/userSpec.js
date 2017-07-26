const app = require('../app');
const chai = require('chai'),
  assert = chai.assert,
  expect = chai.expect;
const mongoose = require('mongoose');

describe('User', () => {
  const User = mongoose.model('User');

  it('Creates a new user', async() => {
    const user = await new User({
      name: 'testUser',
      email: 'user@test.com'
    }).save()

    User.find({}, (err, users) => {
      if (err) {
        console.log('Error in finding users', err);
      } else {
        expect(users[0].name).to.equal('testUser')
      }
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

})
