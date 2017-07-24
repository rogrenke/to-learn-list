const mongoose = require('mongoose');
const Browser = require('zombie');
const helpers = require('./helpers');
const chai = require('chai'),
  assert = chai.assert,
  expect = chai.expect;
var app = require('../app');

Browser.localhost('localhost', 7777);

describe('User creates list and is assigned as author', function() {
  const browser = new Browser();

  before((done) => {
    helpers.createUserAndSignOut("Ghetto Chris", "chris@mail.com", "gangsta", browser, done);
  });

  before((done) => {
    helpers.createUser("Jeff Jones", "jeff@mail.com", "password", browser, done);
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

  before((done)=> {
    browser
      .clickLink('Sign Out', done)
  });

  before((done)=> {
    helpers.signIn('chris@mail.com', 'gangsta', browser, done)
  })

  before((done)=> {
    browser.visit('/lists', done);
  });

  after((done) =>  {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });

  it('should display the new list and author', () => {
    browser.assert.text('.assigned_lists p.author', 'Author Jeff Jones');
  });
});
