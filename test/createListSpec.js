const Browser = require('zombie');
const chai = require('chai'),
  assert = chai.assert,
  expect = chai.expect;
var app = require('../app');

Browser.localhost('localhost', 7777);

describe('List creation page', () => {
  const browser = new Browser();

  before((done) => {
    browser.visit('/', done);
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
    })
  });
});

describe('List Creation form', () => {
  const browser = new Browser();
  
  before((done) => {
    browser.visit('/lists/new', done);
  });
  
  describe('User creates a new list', () =>{
    before((done) => {
      browser
        .fill('name', 'Reading List')
        .pressButton('Create', done);
    })
  
    it('should display the new list', () => {
      browser.assert.text('h3', 'Reading List')
    })
  })
})
