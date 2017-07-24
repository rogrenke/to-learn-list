const mongoose = require('mongoose');
const Browser = require('zombie');
const chai = require('chai'),
  assert = chai.assert,
  expect = chai.expect;
var app = require('../app');
const List = mongoose.model('List');
const Item = mongoose.model('Item');

Browser.localhost('localhost', 7777);

describe('Item status', () => {
  const browser = new Browser();

  before((done) => {
    browser.visit('/users/new', done);
  });

  before((done) => {
    browser
      .fill("name", "Test User")
      .fill("email", "testuser@gmail.com")
      .fill("password", "gangsta")
      .fill("password-confirm", "gangsta")
      .pressButton("Sign Up", () => {
        browser.visit('/lists/new', done);
      });
  });

  before((done) => {
    browser
      .fill('name', 'Reading List')
      .pressButton('Create', done);
  });

  before((done) => {
    browser
      .fill('text', 'Item to be completed')
      .pressButton('Add Item', done);
  });

  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });

  it('has a default status of incomplete', (done) => {
    Item.find({}, (err, items) => {
      expect(items[0].status).equal('incomplete');
      done();
    });
  });

  describe('and can change to Complete', () => {

    before((done) => {
      browser.clickLink('Item to be completed', done);
    });

    it('has a status of complete', (done) => {
      Item.find({}, (err, items) => {
        expect(items[0].status).equal('complete');
        done();
      });
    });
  });
});
