const Browser = require('zombie');
const mongoose = require('mongoose');
const app = require('../app');
const helpers = require('./helpers');
const chai = require('chai'),
  assert = chai.assert,
  expect = chai.expect;

Browser.localhost('localhost', 7777);

describe('Become a mentor', () => {
  const browser = new Browser();

  before(done => {
    helpers.createUser(
      'Jeff Jones',
      'jeff@mail.com',
      'password',
      browser,
      done
    );
  });

  describe('using the homepage', () => {
    it('should display a button to become a mentor', () => {
      browser.assert.text('a.become-a-mentor', 'Become a Mentor');
    });
  });
});
