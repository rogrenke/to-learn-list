// const mongoose = require('mongoose');
// const Browser = require('zombie');
// const helpers = require('./helpers');
// const chai = require('chai'),
//   assert = chai.assert,
//   expect = chai.expect;
// var app = require('../app');
// const List = mongoose.model('List');
// const Item = mongoose.model('Item');
//
// Browser.localhost('localhost', 7777);
//
// describe('Item status', () => {
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
//   before((done) => {
//     browser
//       .clickLink('Create List', done);
//   });
//
//   before((done) => {
//     browser
//       .fill('name', 'Reading List')
//       .fill('mentee', 'Ghetto Chris')
//       .pressButton('Create', done);
//   });
//
//   before((done) => {
//     browser
//       .fill('text', 'Item to be completed')
//       .pressButton('Add Item', done);
//   });
//
//   after((done) => {
//     mongoose.connection.db.dropDatabase(() => {
//       done();
//     });
//   });
//
//   it('has a default status of incomplete', (done) => {
//     Item.find({}, (err, items) => {
//       expect(items[0].status).equal('incomplete');
//       done();
//     });
//   });
//
//   describe('and can change to Complete', () => {
//
//     before((done) => {
//       browser.clickLink('Item to be completed', done);
//     });
//
//     it('has a status of complete', (done) => {
//       Item.find({}, (err, items) => {
//         expect(items[0].status).equal('complete');
//         done();
//       });
//     });
//   });
// });
