const Browser = require('zombie');
var app = require('../app');
var assert = require('assert');

Browser.localhost('localhost', 7777);

  describe('User visits index page', function() {

  const browser = new Browser();

  before(function() {
    return browser.visit('/');
  })

  describe('checks content on index', function() {

    it('should see the index page', function() {
      browser.assert.text('p','Welcome to Express')
    });

  })
})
