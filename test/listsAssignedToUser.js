// const mongoose = require('mongoose');
// const Browser = require('zombie');
// const helpers = require('./helpers');
// const User = mongoose.model('User');
// const chai = require('chai'),
//   assert = chai.assert,
//   expect = chai.expect;
// var app = require('../app');
//
// Browser.localhost('localhost', 7777);
//
// describe('Assign a list to a mentee', function() {
//   const browser = new Browser();
//
//   describe('Mentee Sign Up', () => {
//
//     before((done) => {
//       helpers.createUserAndSignOut("Ghetto Chris", "chris@mail.com", "gangsta", browser, done);
//     });
//
//     describe('Mentor Sign Up and create a new list', () => {
//
//       before((done) => {
//         helpers.createUser("Jeff Jones", "jeff@mail.com", "password", browser, done);
//       });
//
//       before((done) => {
//         browser
//           .clickLink('Create List', done);
//       });
//
//       before((done) => {
//         browser
//           .fill('name', 'Reading List')
//           .fill('mentee', 'Ghetto Chris')
//           .pressButton('Create', done);
//       });
//
//       before((done) => {
//         browser.visit('/lists', done);
//       });
//
//       it('Shows the list with the name of the mentee', () => {
//         browser.assert.text('.authored_lists p.author', 'Assigned to Ghetto Chris');
//       });
//     });
//   });
//
//
//   after((done) =>  {
//     mongoose.connection.db.dropDatabase(() => {
//       done();
//     });
//   });
// });
