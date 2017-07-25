const app = require('../app');
const mongoose = require('mongoose');
const chai = require('chai'),
  assert = chai.assert,
  expect = chai.expect;

describe('User', () => {
  const User = mongoose.model('User');

  it('Creates a new user', async () => {
    const user = await new User({
      name: 'test_user',
      email: 'user@test.com',
      password: 'testPassword'
    }).save()
    const users = User.find({}, (err, users) => {
      expect(users[0].name).to.equal(user)
    })
  })
})

describe('Testing', () => {
  it('passed', () => {
    assert.true
  })
})

after((done) => {
  dbCleaner.clean(mongoose.connection.db, () => {
    done()
  })
})
//
//
//
// describe('User', () => {
//   const User = mongoose.model('User');
//
//   before((done) => {
//     var existingUser = new User({
//       name: 'user',
//       email: 'test@test.com',
//       password: 'whatever'
//     });
//     existingUser.save(done);
//   });
//
//   describe('User creation', () => {
//     it('creates user', (done) => {
//       User.find({}, (err, users) => {
//         expect(users[0].name).to.equal('user');
//         done();
//       });
//     });
//   });
//
//   describe('User validation', () => {
//
//     it('throws an error if an email is not provided', (done) => {
//       var testUser = new User({ name: 'testing', password: 'test_password' });
//       testUser.validate((err) => {
//         expect(err.errors.email).to.exist;
//         expect(err.errors.email.properties.message).to.equal('Please provide an email address');
//         done();
//       });
//     });
//
//     it('throws an error if a name is not provided', (done) => {
//       var testUser = new User({ email: 'testy@test.com', password: 'test_password' });
//       testUser.validate((err) => {
//         expect(err.errors.name).to.exist;
//         expect(err.errors.name.properties.message).to.equal('Please provide a name');
//         done();
//       });
//     });
//
//     it('does not create a user if email is not unique', (done) => {
//       var newUser = new User({
//         name: 'newuser',
//         email: 'test@test.com',
//         password: 'somethingelse'
//       });
//       newUser.validate((err) => {
//         expect(err.errors).to.exist;
//         done();
//       });
//     });
//
//     after((done) =>  {
//       mongoose.connection.db.dropDatabase(() => {
//         done();
//       });
//     });
//   });
// });
