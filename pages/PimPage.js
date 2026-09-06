class PimPage {
  constructor(page) {
    this.page = page;
    this.addEmployeeBtn = page.locator('button:has-text("Add")');
    this.firstNameInput = page.locator('input[name="firstName"]');
    this.lastNameInput = page.locator('input[name="lastName"]');
    this.saveBtn = page.locator('button[type="submit"]');
    
    // Updated locator to target the header heading text directly
    this.personalDetailsHeader = page.locator('.orangehrm-edit-employee-name h6');
    
    this.employeeListTab = page.locator('a:has-text("Employee List")');
    this.employeeNameSearch = page.locator('.oxd-form input').first();
    this.searchBtn = page.locator('button[type="submit"]');
    this.deleteIcon = page.locator('.bi-trash').first();
    this.confirmDeleteBtn = page.locator('button:has-text("Yes, Delete")');
  }

  async addEmployee(firstName, lastName) {
    await this.addEmployeeBtn.click();
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.saveBtn.click();
    
    // Wait for redirect to Personal Details page
    await this.page.waitForURL('**/viewPersonalDetails/**');
  }

  async deleteEmployee(firstName) {
    await this.employeeListTab.click();
    await this.employeeNameSearch.fill(firstName);
    await this.searchBtn.click();
    await this.page.waitForTimeout(2000);
    await this.deleteIcon.click();
    await this.confirmDeleteBtn.click();
  }
}

module.exports = PimPage;