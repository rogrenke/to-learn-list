const Browser = require('zombie');
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
      browser.fill("email", "ghettochris@gmail.com")
      browser.fill("password", "gangsta")
      browser.fill("password-confirm", "gangsta")
      browser.pressButton("Sign Up", done)
    });

    it('should throw an error if name left blank', () => {
      browser.assert.text('p','Please supply a name!')
    });
  });
});


    // it('should sign up successfully', () => {
    //   browser.fill("name", "Ghetto Chris")
    //   browser.fill("email", "ghettochris@gmail.com")
    //   browser.fill("password", "gangsta")
    //   browser.fill("password-confirm", "gangsta")
    //   browser.pressButton("Sign Up")
    //   browser.assert.text('p','Welcome to Express')
    // });
