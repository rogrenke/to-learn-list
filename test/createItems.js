const mongoose = require('mongoose')
const Browser = require('zombie');
const chai = require('chai'),
  assert = chai.assert,
  expect = chai.expect;
var app = require('../app');

Browser.localhost('localhost', 7777);

describe('Item creation page', () => {
  const browser = new Browser();

  before((done) => {
    browser.visit('/lists/new', done);
  });

  afterEach((done) => {
    dbCleaner.clean(mongoose.connection.db, () => {
      done();
    });
  });

  describe('User sees a form on the new items page', () => {

    before((done) => {
      browser
        .fill('name', 'Reading List')
        .pressButton('Create', done);
    });

    it('should get the new list page', () => {
      browser.assert.text('button', 'Create Item');
    });

    it('should display the items form', () => {
      browser.assert.element('form');
    });
  });

});
