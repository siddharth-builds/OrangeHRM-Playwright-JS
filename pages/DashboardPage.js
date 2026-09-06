class DashboardPage {
  constructor(page) {
    this.page = page;
    this.dashboardHeading = page.locator('.oxd-topbar-header-breadcrumb-module');
    this.pimMenu = page.locator('a[href*="viewPimModule"]');
    this.adminMenu = page.locator('a[href*="viewAdminModule"]');
    this.quickLaunchWidgets = page.locator('.orangehrm-quick-launch');
  }

  async navigateToPIM() {
    await this.pimMenu.click();
  }

  async navigateToAdmin() {
    await this.adminMenu.click();
  }
}

module.exports = DashboardPage;