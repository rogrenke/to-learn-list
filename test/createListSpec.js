const Browser = require('zombie');
const chai = require('chai'),
  assert = chai.assert,
  expect = chai.expect;
var app = require('../app');

Browser.localhost('localhost', 7777);

describe('List creation page', () => {
  const browser = new Browser();

  before(() => {
    return browser.visit('/');
  });

  describe('User visits the create list page from the homepage', () => {
    before(() => {
      browser.clickLink('Create List');
    });

    it('should get the new list page', () => {
      browser.assert.text('h1', 'Create List');
      browser.assert.url({ pathname: '/lists/new' });
    });
  });
});
