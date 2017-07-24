const mongoose = require('mongoose');
const Browser = require('zombie');
const chai = require('chai'),
  assert = chai.assert,
  expect = chai.expect;
var app = require('../app');

Browser.localhost('localhost', 7777);

describe('List creation page', () => {
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
      .pressButton("Sign Up", done);
  });

  after((done) => {
    mongoose.connection.collections.lists.drop(() => {
      done();
    });
  });

  describe('User visits the create list page from the homepage', () => {

    before((done) => {
      browser.clickLink('Create List', done);
    });

    it('should get the new list page', () => {
      browser.assert.text('h1', 'Create List');
      browser.assert.url({ pathname: '/lists/new' });
    });

    it('should display the form', () =>{
      browser.assert.element('form');
    });
  });
});

describe('List Creation form', () => {
  const browser = new Browser();

  before((done) => {
    browser.visit('/users/new', done);
  });

  before((done) => {
    browser
      .fill("name", "G Chris")
      .fill("email", "gchris@gmail.com")
      .fill("password", "gangsta")
      .fill("password-confirm", "gangsta")
      .pressButton("Sign Up", done);
  });

  after((done) =>  {
    mongoose.connection.collections.lists.drop(() => {
      done();
    });
  });

  describe('User creates a new list', () => {
    before((done) => {
      browser.clickLink('Create List', done);
    });

    before((done) => {
      browser
        .fill('name', 'Reading List')
        .pressButton('Create', done);
    });

    it('should display the new list', () => {
      browser.assert.text('h1', 'Reading List');
    });
  });
});
