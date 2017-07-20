const Browser = require('zombie');
var mongoose = require('mongoose');
var app = require('../app');
var chai = require('chai'),
  assert = chai.assert,
  expect = chai.expect;

Browser.localhost('localhost', 7777);

describe('User signup', function() {

  const browser = new Browser();

  before((done) => {
    return browser.visit('/users/new', done);
  })

  describe('normal sign up', function() {
    it ('should have a sign up form', () => {
      browser.assert.element('form')
    });
  });

  describe('user leaves name blank', () => {
    before((done) => {
      browser
             .fill("email", "ghettochris@gmail.com")
             .fill("password", "gangsta")
             .fill("password-confirm", "gangsta")
             .pressButton("Sign Up", done)
    });

    it('should throw an error if name left blank', () => {
      browser.assert.text('p','Please supply a name!')
    });
  });

  describe('normal signup', () => {
    before((done) => {
      browser
             .fill("name", "Ghetto Chris")
             .fill("email", "ghettochris@gmail.com")
             .fill("password", "gangsta")
             .fill("password-confirm", "gangsta")
             .pressButton("Sign Up", done)
    });

    it('should redirect to index page after successfully signing up', () => {
      browser.assert.text('p','Welcome to Express')
    });

    after((done) =>  {
      mongoose.connection.collections.users.drop(() => {
        done();
      });
    });
  });

});
