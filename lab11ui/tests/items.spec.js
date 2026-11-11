
const { test, expect } = require('@playwright/test');
const { CreateItemPage } = require('./pages/CreateItemPage');

test.describe('Item Management', () => {
  let createItemPage;
  
  test.beforeEach(async ({ page }) => {
    createItemPage = new CreateItemPage(page);
    await createItemPage.goto();
  });
  
  test('should display empty state when there are no items', async ({ page }) => {
    // This test assumes the database has been cleared.
    await page.goto('/');

    await expect(page.locator('.empty-state')).toBeVisible();
    await expect(page.locator('.empty-state')).toContainText('No items found.');
    await expect(page.locator('.inventory-table')).not.toBeVisible();
  });
  
  test('should display the Add Item and Add Category links', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('link', { name: '+ Add Item' }))
      .toHaveAttribute('href', '/items/new');

    await expect(page.getByRole('link', { name: '+ Add Category' }))
      .toHaveAttribute('href', '/categories/new');
  });
  
  test('should successfully create an item with all fields and redirect to home page', async ({ page }) => {
    const itemName = `Laptop_${Date.now()}`;
    const category = 'Electronics';
    const detail = 'High-end developer laptop with 32GB RAM';

    await createItemPage.createItem({
      name: itemName,
      category,
      detail,
    });

    // Submitting redirects to the homepage
    await expect(page).toHaveURL('/');

    // Verify the item appears in the inventory table
    const itemRow = page.locator('.inventory-table tbody tr').filter({
      has: page.locator('.item-link', { hasText: itemName }),
    });

    await expect(itemRow).toBeVisible();
    await expect(itemRow.locator('td').nth(0)).toContainText(itemName);
    await expect(itemRow.locator('td').nth(1)).toHaveText(category);
    await expect(itemRow.locator('td').nth(2)).toHaveText('0');
  });

  test('should create an item with missing detail fields and redirect to home page', async ({ page }) => {
    const itemName = `Tablet_${Date.now()}`;
    const category = 'Electronics';

    await createItemPage.createItem({
      name: itemName,
      category,
      detail: '',
    });

    await expect(page).toHaveURL('/');

    const itemRow = page.locator('.inventory-table tbody tr').filter({
      has: page.locator('.item-link', { hasText: itemName }),
    });

    await expect(itemRow).toBeVisible();
    await expect(itemRow.locator('td').nth(0)).toContainText(itemName);
    await expect(itemRow.locator('td').nth(1)).toHaveText(category);
    await expect(itemRow.locator('td').nth(2)).toHaveText('0');
  });

  test('should return 404 when navigating to a non-existent item id', async ({ page }) => {
    const response = await page.goto('/items/999999');

    expect(response.status()).toBe(404);

    await expect(page.locator('body')).toContainText('Item not found');
  });
});
