exports.createUserAndSignOut = (name, email, password, browser, callback) => {
  browser.visit('/users/new', () => {
    browser
      .fill("name", name)
      .fill("email", email)
      .fill("password", password)
      .fill("password-confirm", password)
      .pressButton("Sign Up", () => {
        browser.clickLink('Sign Out', callback);
      });
  });
};

exports.createUser = (name, email, password, browser, callback) => {
  browser.visit('/users/new', () => {
    browser
      .fill("name", name)
      .fill("email", email)
      .fill("password", password)
      .fill("password-confirm", password)
      .pressButton("Sign Up", callback);
  });
};

exports.signIn = (email, password, browser, callback) => {
  browser.visit('/sessions/signin', () => {
    browser
      .fill("email", email)
      .fill("password", password)
      .pressButton("Sign In", callback);
  });
};
