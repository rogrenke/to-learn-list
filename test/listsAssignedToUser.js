const mongoose = require('mongoose');
const User = require('../models/User');
const Browser = require('zombie');
const chai = require('chai'),
  assert = chai.assert,
  expect = chai.expect;
var app = require('../app');

Browser.localhost('localhost', 7777);

describe('Assign a list to a mentee', function() {
  const browser = new Browser();

  describe('Mentee Sign Up', () => {

    before((done) => {
      browser.visit('/users/new', done);
    });

    before((done) => {
      browser
        .fill("name", "Ghetto Chris")
        .fill("email", "ghettochris@gmail.com")
        .fill("password", "gangsta")
        .fill("password-confirm", "gangsta")
        .pressButton("Sign Up", () => {
          browser.clickLink('Sign Out', done);
        });
    });

    describe('Mentor Sign Up and create a new list', () => {

      before((done) => {
        browser.visit('/users/new', done);
      });

      before((done) => {
        browser
          .fill("name", "Jeff Chris")
          .fill("email", "jeff@gmail.com")
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
          .fill('mentee', 'Ghetto Chris')
          .pressButton('Create', done);
      });

      before((done) => {
        browser.visit('/lists', done);
      })

      it('Shows the list with the name of the mentee', () => {
        browser.assert.text('.atuhored_list > p.card-header-title.author', 'Ghetto Chris');
      });
    });
  });


  after((done) =>  {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });
});
