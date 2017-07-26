const app = require('../app');
const Browser = require('zombie');
const chai = require('chai'),
  assert = chai.assert,
  expect = chai.expect;
const helpers = require('./helpers');
const mongoose = require('mongoose');

const browser = new Browser();
const User = mongoose.model('User');
const List = mongoose.model('List');

Browser.localhost('localhost', 7777);


describe('User creates list', () => {

  before( async () => {
    await browser.visit('/users/new');
    await browser.clickLink('Create List');
  });

  it('visits the new list page', () => {
    browser.assert.text('h1', 'Create List');
    browser.assert.url({ pathname: '/lists/new' });
  });

  it('should display the form', () =>{
    browser.assert.element('form');
  });
});

//
// describe('List Creation form', () => {
//   const browser = new Browser();
//
//   before((done) => {
//     helpers.createUserAndSignOut("Ghetto Chris", "chris@mail.com", "gangsta", browser, done);
//   });
//
//   before((done) => {
//     helpers.createUser("Jeff Jones", "jeff@mail.com", "password", browser, done);
//   });
//
//   after((done) =>  {
//     mongoose.connection.db.dropDatabase(() => {
//       done();
//     });
//   });
//
//   describe('User creates a new list', () => {
//     before((done) => {
//       browser.clickLink('Create List', done);
//     });
//
//     before((done) => {
//       browser
//         .fill('name', 'Reading List')
//         .fill('mentee', 'Ghetto Chris')
//         .pressButton('Create', done);
//     });
//
//     it('should display the new list', () => {
//       browser.assert.text('h1', 'Reading List');
//     });
//   });
// });
