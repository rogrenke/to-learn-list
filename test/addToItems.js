const mongoose = require('mongoose');
const Browser = require('zombie');
const helpers = require('./helpers');
const chai = require('chai'),
  assert = chai.assert,
  expect = chai.expect;
var app = require('../app');
const List = mongoose.model('List');
const Item = mongoose.model('Item');

Browser.localhost('localhost', 7777);

describe('Add items to list', () => {
  const browser = new Browser();

  before((done) => {
    helpers.createUserAndSignOut("Sandy Meats", "sandymeats@gmail.com", "gangsta", browser, done);
  });

  before((done) => {
    helpers.createUser("Sandwich Eatz", "eatzsandwich@gmail.com", 'gangsta', browser, done);
  });

  before((done) => {
    browser.clickLink('Create List', done);
  });

  before((done) => {
    browser
      .fill('name', 'Reading List')
      .fill('mentee', 'Sandy Meats')
      .pressButton('Create', done);
  });

  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });

  describe('Add item types to list', () => {
    before((done) => {
      browser
        .fill('text', 'Refactoring')
        .fill('description', 'Sandi Metz tackles the infamous Gilded Rose kata')
        .fill('youtubeVideo', 'https://www.youtube.com/watch?v=8bZh5LMaSmE')
        .pressButton('Add Item', done);
    });

    it('Can enter video url in a new item', (done) => {
      Item.find({}, (err, items) => {
        expect(items[0].text).to.equal('Refactoring');
        expect(items[0].youtubeVideo).to.equal(
          'https://www.youtube.com/watch?v=8bZh5LMaSmE'
        );
        done();
      });

    });

    it('Add description to list', (done) => {
      Item.find({}, (err, items) => {
        expect(items[0].description).to.equal(
          'Sandi Metz tackles the infamous Gilded Rose kata'
        );
        done();
      });
    });
  });
});
