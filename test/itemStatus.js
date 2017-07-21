const mongoose = require('mongoose')
const Browser = require('zombie');
const chai = require('chai'),
  assert = chai.assert,
  expect = chai.expect;

var app = require('../app');
const List = mongoose.model('List')
const Item = mongoose.model('Item')

Browser.localhost('localhost', 7777);

describe('Item status', () => {
  const browser = new Browser();

  before((done) => {
    browser.visit('/lists/new', done)
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

  after((done) =>  {
    mongoose.connection.collections.items.drop(() => {
      done();
    });
  });

  it('has a default status of incomplete', (done) => {
    Item.find({}, (err, items) => {
      expect(items[0].status).equal('incomplete')
      done();
    });
  });

})
