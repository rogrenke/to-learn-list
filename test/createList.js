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

describe('List', () => {

  it( 'creates a list', async() => {
    const mentor = await new User({
      name: 'Mentor',
      email: 'mentor@test.com'
    }).save()
    const mentee = await new User({
      name: 'Mentee',
      email: 'mentee@test.com'
    }).save()
    const list = await new List({
      name: 'New List',
      mentor: mentor._id,
      mentee: mentee._id
    }).save()
    var lists = List.find({}, (err, lists) => {
      if (err) {
        console.log('Error in finding lists', err);
      } else {
        expect(lists[0].name).to.equal('New List')
      }
    })
  })

  // it('creates a list', () => {
  //   var lists = List.find({}, (err, lists) => {
  //     if (err) {
  //       console.log('Error in finding lists', err);
  //     } else {
  //       expect(lists[0].name).to.equal('New List')
  //     }
  //   })

})

describe('Testing', () => {
  it('passed', () => {
    assert.true
  })
})

//
//   describe('User visits the create list page from the homepage', () => {
//
//     before((done) => {
//       browser.clickLink('Create List', done);
//     });
//
//     it('should get the new list page', () => {
//       browser.assert.text('h1', 'Create List');
//       browser.assert.url({ pathname: '/lists/new' });
//     });
//
//     it('should display the form', () =>{
//       browser.assert.element('form');
//     });
//   });
// });
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
