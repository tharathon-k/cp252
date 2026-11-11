class CreateCategoryPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.heading = page.locator('h1');
    this.nameInput = page.locator('input[name="name"]');
    this.submitButton = page.getByRole('button', { name: 'Add Category' });
    this.backLink = page.getByRole('link', { name: 'Back to Items' });
  }

  async goto() {
    await this.page.goto('/categories/new');
  }

  async fillForm({ name }) {
    if (name !== undefined) {
      await this.nameInput.fill(name);
    }
  }

  async submit() {
    await this.submitButton.click();
  }

  async createCategory({ name }) {
    await this.fillForm({ name });
    await this.submit();
  }

  async clickBack() {
    await this.backLink.click();
  }
}

module.exports = { CreateCategoryPage };
