exports.createUserAndSignOut = (name, email, password, browser) => {
  browser.visit('/users/new', () => {
    console.log('In helpermethod')
    browser
      .fill("name", name)
      .fill("email", email)
      .fill("password", password)
      .fill("password-confirm", password)
      .pressButton("Sign Up", () => {
        browser.clickLink('Sign Out', () => {
          console.log('Signed Out')
        });
      });
  });
};

exports.createUser = (name, email, password, browser) => {
  browser.visit('/users/new', () => {
    browser
      .fill('name', name)
      .fill('email', email)
      .fill('password', password)
      .pressButton('Sign Up', () => {
        console.log('Sign Up Button Pressed')
      })
  })
}
//
// exports.createUser = async(name, email, password, browser) => {
//   await browser.visit('/users/new')
//   await browser
//     .fill("name", name)
//     .fill("email", email)
//     .fill("password", password)
//     .fill("password-confirm", password)
//   browser.pressButton("Sign Up");
// };

exports.signIn = (email, password, browser) => {
  browser.visit('/sessions/signin', () => {
    browser
      .fill("email", email)
      .fill("password", password)
      .pressButton("Sign In", () => {
        console.log('Sign In Button Pressed')

      });
  });
};
