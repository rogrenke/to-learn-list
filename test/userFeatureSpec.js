const Browser = require('zombie');
var app = require('../app');
var chai = require('chai'),
  assert = chai.assert,
  expect = chai.expect;

Browser.localhost('localhost', 7777);

describe('User signup', function() {

  const browser = new Browser();

  before(function() {
    return browser.visit('/users/new');
  })

  describe('normal sign up', function() {
    it ('should have a sign up form', () => {
      browser.assert.element('form')
    })

    it('should sign up successfully', () => {

    });

  })
  })
