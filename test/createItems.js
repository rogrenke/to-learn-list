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
    browser.visit('/users/new', done);
  });

  before((done) => {
    browser
           .fill("name", "Jelly Chris")
           .fill("email", "welljell@gmail.com")
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
      .pressButton('Create', done);
  });

  after((done) =>  {
    mongoose.connection.collections.items.drop(() => {
      done();
    });
  });

  describe('User sees a form on the new items page', () => {

    it('should get the new list page', () => {
      browser.assert.text('button', 'Add Item');
    });

    it('should display the items form', () => {
      browser.assert.element('form');
    });

    it('should have an input field for new items', () => {
      browser.assert.element('form input[name=text]');
      browser.assert.element('form button');
    });
  });

  describe('User can create a new Item', () => {

    before((done) => {
      browser
        .fill('text', 'First Item')
        .pressButton('Add Item', done);
    });


    it('should display the items form', () => {
      browser.assert.element('form');
      browser.assert.element('form input[name=text]');
      browser.assert.element('form button');
    });

    it('should display the item on the list', () => {
      browser.assert.text('h2', 'First Item');
    });
  });

});
