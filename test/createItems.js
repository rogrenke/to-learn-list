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

describe('Item creation page', () => {
  const browser = new Browser();

  before((done) => {
    helpers.createUserAndSignOut("Chris", "e@email.com", "1", browser, done);
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
      .fill('mentee', 'Chris')
      .pressButton('Create', done);
  });

  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
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
      browser.assert.text('a.incomplete', 'First Item');
    });
  });

  describe('User can only see items associated with that list', () => {

  //   // TODO: The following test is not really working. Refactoring needed. Kind regards, Ghetto Chris & Rappin' Roland
  //   before((done) => {
  //     const seedList = new List({name: 'Seed List', mentee: ''}).save();
  //     const seedItem = new Item({text: 'Seed text', list: seedList._id}).save();
  //     done();
  //   });
  //
  //   before((done) => {
  //     browser.visit('/lists/new', done);
  //   });
  //
  //   before((done) => {
  //     browser
  //       .fill('name', 'Reading List 2')
  //       .fill('mentee', 'Ghetto Chris')
  //       .pressButton('Create', done);
  //   });
  //
  //   it('should display the item on the list', () => {
  //     expect(browser.html('h2')).to.not.be;
  //   });
  // });
  //
  // describe('User can visit the item details page', () => {
  //
  //   before((done) => {
  //     browser
  //       .fill('text', 'doing gangsta stuff')
  //       .pressButton('Add Item', done);
  //   })
  //
  //   before((done) => {
  //     browser.clickLink('(Show details)', done);
  //   })
  //
  //   it('should get the new list page', () => {
  //     browser.assert.text('h1', 'doing gangsta stuff');
  //   });
  });
});
