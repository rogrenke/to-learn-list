// const app = require('../app');
// const Browser = require('zombie');
// const chai = require('chai'),
//   assert = chai.assert,
//   expect = chai.expect;
// const helpers = require('./helpers');
// const mongoose = require('mongoose');
//
// const browser = new Browser();
// const User = mongoose.model('User');
// const List = mongoose.model('List');
//
// Browser.localhost('localhost', 7777);
//
//
// describe('User creates a new list', () => {
//
//   before( async () => {
//     await helpers.createUserAndSignOut("Ghetto Chris", "chris@mail.com", "gangsta", browser);
//     await helpers.createUser('Jebb', 'jebadiah@springfield.com', 'cromulent', browser)
//     await browser.clickLink('Create List', () => {
//       console.log('Create List link pressed')
//     });
//   });
//
//   it('visits the new list page', () => {
//     browser.assert.text('h1', 'Create List');
//     browser.assert.url({ pathname: '/lists/new' });
//   });
//
//   it('should display the form', () =>{
//     browser.assert.element('form');
//   });
//
//   it('should display the new list', () => {
//     browser.clickLink('Create List', ()=>{
//       browser
//         .fill('name', 'Reading List')
//         .fill('mentee', 'Ghetto Chris')
//         .pressButton('Create', () => {
//           console.log('Create Button Pressed')
//           browser.assert.text('h1', 'Reading List');
//         });
//     });
//   });
// });
