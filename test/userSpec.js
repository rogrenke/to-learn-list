var app = require('../app');
var mongoose = require('mongoose');
var chai = require('chai'),
  assert = chai.assert,
  expect = chai.expect;


describe('User', function() {
  var User = require('../models/user');

  describe('User creation', function() {
    it('creates user', function(done) {
      var testUser = new User({
        name: 'Testy',
        email: 'testy@test.com',
        password: 'testytest'
      });
      testUser.save(function() {
        User.find({ email: 'testy@test.com' }, function(err, users) {
          expect(users[0].name).to.equal('Testy');
          done();
        });
      });
    });

    after(function(done) {
      mongoose.connection.collections.users.drop(function() {
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

    after(function(done) {
      mongoose.connection.collections.users.drop(function() {
        done();
      });
    });
  });
});
