const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const DashboardPage = require('../pages/DashboardPage');
const PimPage = require('../pages/PimPage');

test.describe('OrangeHRM Full E2E Workflow Suite (Chromium Only)', () => {
  let loginPage;
  let dashboardPage;
  let pimPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    pimPage = new PimPage(page);

    await loginPage.navigate();
  });

  // 1. Positive Authentication Test
  test('E2E 01: Valid Login and Dashboard Header Verification', async () => {
    await loginPage.login('Admin', 'admin123');
    await expect(dashboardPage.dashboardHeading).toHaveText('Dashboard');
    await expect(dashboardPage.quickLaunchWidgets).toBeVisible();
  });

  // 2. Negative Authentication Test
  test('E2E 02: Negative - Invalid Password Credentials', async () => {
    await loginPage.login('Admin', 'WrongPassword123');
    await expect(loginPage.errorMessage).toHaveText('Invalid credentials');
  });

 // 3. Employee Creation Lifecycle Test
test('E2E 03: PIM Module - Create New Employee', async ({ page }) => {
  await loginPage.login('Admin', 'admin123');
  await dashboardPage.navigateToPIM();

  const firstName = 'Playwright';
  const lastName = 'Tester';
  await pimPage.addEmployee(firstName, lastName);

  // Added custom timeout to allow UI rendering to complete
  await expect(pimPage.personalDetailsHeader).toContainText(`${firstName} ${lastName}`, { timeout: 10000 });
});

  // 4. Employee Search and Delete Test
  test('E2E 04: PIM Module - Search and Delete Employee Record', async ({ page }) => {
    await loginPage.login('Admin', 'admin123');
    await dashboardPage.navigateToPIM();

    await pimPage.deleteEmployee('Playwright');
    await expect(page.locator('.oxd-toast-content')).toBeVisible();
  });

  // 5. Navigation & Logout Test
  test('E2E 05: Navigation & User Logout Workflow', async () => {
    await loginPage.login('Admin', 'admin123');
    await dashboardPage.navigateToAdmin();
    
    await loginPage.logout();
    await expect(loginPage.usernameInput).toBeVisible();
  });
});