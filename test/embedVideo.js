const mongoose = require('mongoose');
const Browser = require('zombie');
const chai = require('chai'),
  assert = chai.assert,
  expect = chai.expect;
var app = require('../app');
const List = mongoose.model('List');
const Item = mongoose.model('Item');

Browser.localhost('localhost', 7777);

describe('Add video item to list', () => {
  const browser = new Browser();

  before(done => {
    browser.visit('/users/new', done);
  });

  before(done => {
    browser
      .fill('name', 'Sandy Meats')
      .fill('email', 'sandymeats@gmail.com')
      .fill('password', 'gangsta')
      .fill('password-confirm', 'gangsta')
      .pressButton('Sign Up', done);
  });

  before(done => {
    browser.clickLink('Create List', done);
  });

  before(done => {
    browser.fill('name', 'Reading List').pressButton('Create', done);
  });

  after(done => {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });

  describe('Add video item to list', () => {
    before(done => {
      browser
        .fill('text', 'Refactoring')
        .fill('youtubeVideo', 'https://www.youtube.com/watch?v=8bZh5LMaSmE')
        .pressButton('Add Item', done);
    });

    it('Can enter video url in a new item', done => {
      Item.find({}, (err, items) => {
        expect(items[0].text).to.equal('Refactoring');
        expect(items[0].youtubeVideo).to.equal(
          'https://www.youtube.com/watch?v=8bZh5LMaSmE'
        );
        done();
      });
    });
  });
});
