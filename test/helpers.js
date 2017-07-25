exports.createUserAndSignOut = (name, email, password, browser) => {
  browser.visit('/users/new', () => {
    browser
      .fill("name", name)
      .fill("email", email)
      .fill("password", password)
      .fill("password-confirm", password)
      .pressButton("Sign Up", () => {
        browser.clickLink('Sign Out');
      });
  });
};

exports.createUser = (name, email, password, browser) => {
  browser.visit('/users/new', () => {
    browser
      .fill("name", name)
      .fill("email", email)
      .fill("password", password)
      .fill("password-confirm", password)
      .pressButton("Sign Up");
  });
};

exports.signIn = (email, password, browser) => {
  browser.visit('/sessions/signin', () => {
    browser
      .fill("email", email)
      .fill("password", password)
      .pressButton("Sign In");
  });
};
