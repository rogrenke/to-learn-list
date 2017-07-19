var app = require('../app');
var mongoose = require('mongoose');
var chai = require('chai'),
  assert = chai.assert,
  expect = chai.expect;


describe('User', () => {
  var User = require('../models/user');

  before((done) => {
    var existingUser = new User({
      name: 'user',
      email: 'test@test.com',
      password: 'whatever'
    });
    existingUser.save(done);
  });

  describe('User creation', () => {
    it('creates user', (done) => {
      User.find({}, (err, users) => {
        expect(users[0].name).to.equal('user');
        done();
      });
    });
  });

  describe('User validation', () => {

    it('throws an error if an email is not provided', (done) => {
      var testUser = new User({ name: 'testing', password: 'test_password' });
      testUser.validate((err) => {
        expect(err.errors.email).to.exist;
        expect(err.errors.email.properties.message).to.equal('Please provide an email address')
        done();
      });
    });

    it('throws an error if a name is not provided', (done) => {
      var testUser = new User({ email: 'testy@test.com', password: 'test_password' });
      testUser.validate((err) => {
        expect(err.errors.name).to.exist;
        expect(err.errors.name.properties.message).to.equal('Please provide a name')
        done();
      });
    });

    it('does not create a user if email is not unique', (done) => {
      var newUser = new User({
      name: 'newuser',
      email: 'test@test.com',
      password: 'somethingelse'
      });
      newUser.validate((err) => {
        expect(err.errors).to.exist;
        done();
      });
    });

    after((done) =>  {
      mongoose.connection.collections.users.drop(() => {
        done();
      });
    });
  });
});
