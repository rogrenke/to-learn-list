const mongoose = require('mongoose');
const User = require('../models/User')
const Browser = require('zombie');
const chai = require('chai'),
  assert = chai.assert,
  expect = chai.expect;
var app = require('../app');

Browser.localhost('localhost', 7777);

describe('----------------------', function() {
  const browser = new Browser();

  before((done) => {
    browser.visit('/users/new', done);
  });

  before((done) => {
    browser
      .fill("name", "Ghetto Chris")
      .fill("email", "ghettochris@gmail.com")
      .fill("password", "gangsta")
      .fill("password-confirm", "gangsta")
      .pressButton("Sign Up", () => {
        browser.clickLink('Sign Out', done);
      });
  });

  describe('Mentor Sign Up', () => {
    before((done) => {
      browser.visit('/users/new', done);
    });
    before((done) => {
      browser
        .fill("name", "Jeff Chris")
        .fill("email", "jeff@gmail.com")
        .fill("password", "gangsta")
        .fill("password-confirm", "gangsta")
        .pressButton("Sign Up", done);
    });

    before((done) => {
      browser
        .clickLink('Create List', done);
    });

    before((done) => {
      browser
        .fill('name', 'Reading List')
        .fill('mentee', 'Ghetto Chris')
        .pressButton('Create', done);
    });
    it('blah blah blah', () => {
      expect(1).equal(1);
    });
  });

  after((done) =>  {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });
});
