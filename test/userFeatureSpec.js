const app = require('../app');
const Browser = require('zombie');
const chai = require('chai'),
  assert = chai.assert,
  expect = chai.expect;
const helpers = require('./helpers');
const mongoose = require('mongoose');
const User = mongoose.model('User');

const browser = new Browser();

Browser.localhost('localhost', 7777);

describe('User signup', () => {

  beforeEach( async () => {
    await browser.visit('/users/new');
  });

  it ('should have a sign up form', () => {
    browser.assert.element('form');
  });

  it('allows sign up', async() => {
    await browser
      .fill("name", 'featureTestUser')
      .fill("email", 'featureTest@user.com')
      .fill("password", 'featureTestPassword')
      .fill("password-confirm", 'featureTestPassword')
    await browser.pressButton("Sign Up")
    await browser.assert.success();
    browser.assert.text('h1','Welcome to Ductu');
  })
})

describe('User signout', () => {
  before( async() => {
    await browser.visit('/');
    await browser.clickLink("Sign Out");
  })

  it('should redirect to the sign-in page', () => {
    browser.assert.text('p.flash__text','You signed out successfully')
  })
})

describe('User signin', () => {

  before( async() => {
    await browser.clickLink("Sign In")
  })

  it('allows sign in', async() => {
    await browser
      .fill("email", 'featureTest@user.com')
      .fill("password", 'featureTestPassword')
    await browser.pressButton("Sign In")
    await browser.assert.success();
    browser.assert.text('p.flash__text','Signed in!')
  })

})

describe('User signup edge-cases', () => {

  before( async() => {
    await browser.visit('/users/new')
    await browser.assert.success();
  })

  it('should throw an error if name left blank', async() => {
    await browser
      .fill("email", 'featureTest2@user.com')
      .fill("password", 'featureTestPassword')
      .fill("password-confirm", 'featureTestPassword')
      .pressButton("Sign Up")
    browser.assert.text('p.flash__text','Please supply a name!');
  })
})
