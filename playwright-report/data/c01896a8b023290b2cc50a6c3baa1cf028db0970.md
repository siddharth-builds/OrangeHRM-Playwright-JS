# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: orangehrm-e2e.spec.js >> OrangeHRM Full E2E Workflow Suite (Chromium Only) >> E2E 02: Negative - Invalid Password Credentials
- Location: specs\orangehrm-e2e.spec.js:27:3

# Error details

```
Test timeout of 45000ms exceeded while running "beforeEach" hook.
```

```
Error: page.goto: Test timeout of 45000ms exceeded.
Call log:
  - navigating to "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login", waiting until "load"

```

# Test source

```ts
  1  | class LoginPage {
  2  |   constructor(page) {
  3  |     this.page = page;
  4  |     this.usernameInput = page.locator('input[name="username"]');
  5  |     this.passwordInput = page.locator('input[name="password"]');
  6  |     this.loginButton = page.locator('button[type="submit"]');
  7  |     this.errorMessage = page.locator('.oxd-alert-content-text');
  8  |     this.userDropdown = page.locator('.oxd-userdropdown-tab');
  9  |     this.logoutLink = page.locator('a:has-text("Logout")');
  10 |   }
  11 | 
  12 |   async navigate() {
> 13 |     await this.page.goto('/web/index.php/auth/login');
     |                     ^ Error: page.goto: Test timeout of 45000ms exceeded.
  14 |   }
  15 | 
  16 |   async login(username, password) {
  17 |     await this.usernameInput.fill(username);
  18 |     await this.passwordInput.fill(password);
  19 |     await this.loginButton.click();
  20 |   }
  21 | 
  22 |   async logout() {
  23 |     await this.userDropdown.click();
  24 |     await this.logoutLink.click();
  25 |   }
  26 | }
  27 | 
  28 | module.exports = LoginPage;
```