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

    describe('fills the form with the information', () => {
      before(done => {
        browser
          .visit('/mentors/new')
          .fill('bio', 'I want to help people getting the most of their lives')
          .pressButton('Submit', done);
      });

      it('should display the new mentor in the list of mentors', () => {
        browser.assert.text('p', 'I want to help people getting the most of their lives')
      })
    });
  });
});
