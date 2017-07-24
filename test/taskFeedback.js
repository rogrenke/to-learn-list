const Browser = require('zombie');
var mongoose = require('mongoose');
const chai = require('chai'),
  assert = chai.assert,
  expect = chai.expect;
var app = require('../app');
const List = mongoose.model('List');
const User = mongoose.model('User');
const Item = mongoose.model('Item');

describe('providing task feedback', () => {
  const browser = new Browser();

  before((done) => {
    browser.visit('/users/new', done);
  });

  before((done) => {
    browser
      .fill("name", "Mentee")
      .fill("email", "mentee@gmail.com")
      .fill("password", "mentee")
      .fill("password-confirm", "mentee")
      .pressButton("Sign Up", done);
  });

  before((done) => {
    browser.clickLink("Sign Out", done);
  })

  before((done) => {
    browser.visit('/users/new', done);
  });

  before((done) => {
    browser
      .fill("name", "Mentor")
      .fill("email", "mentor@gmail.com")
      .fill("password", "mentor")
      .fill("password-confirm", "mentor")
      .pressButton("Sign Up", () => {
        browser.visit('/lists/new', done);
      });
  });

// TODO: As soon as mentee assignment works, we should add the mentee here
  before((done) => {
    browser
      .fill('name', 'List for mentee')
      .pressButton('Create', done);
  });

  before((done) => {
    browser
      .fill('text', 'Item to be completed by mentee')
      .pressButton('Add Item', done);
  });

  before((done) => {
    browser.clickLink("Sign Out", done);
  })

  before((done) => {
    browser.clickLink("Sign In", done);
  })

  before((done) => {
    browser
      .fill("email", "mentee@gmail.com")
      .fill("password", "mentee")
      .pressButton("Sign In", done);
  });

  before((done) => {
    browser.clickLink("List for mentee", done);
  })

  it('should pass because there is nothing in it', () => {
    console.log(browser.dump());
  });



  after((done) =>  {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });
});
