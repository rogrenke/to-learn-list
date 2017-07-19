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
});
