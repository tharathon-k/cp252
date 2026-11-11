const { test, expect } = require('@playwright/test');
const { HomePage } = require('./pages/HomePage');
const { CreateCategoryPage } = require('./pages/CreateCategoryPage');
const { CreateItemPage } = require('./pages/CreateItemPage');

test.describe('Category Management', () => {
  let createCategoryPage;

  test.beforeEach(async ({ page }) => {
    createCategoryPage = new CreateCategoryPage(page);
    await createCategoryPage.goto();
  });


  test('should successfully create an category and check at create item page', async ({ page }) => {
    const categoryName = `Lightnovel_${Date.now()}`;

    await createCategoryPage.createCategory({
      name: categoryName
    });

    // Submitting NOT redirects, so we have to manually click back to HomePage 
    await createCategoryPage.clickBack();
    await expect(page).toHaveURL('/');

    const homePage = new HomePage(page);
    await homePage.clickAddNewItem();

    // Verify if click 'Add New Item' redirects to '/items/new'
    await expect(page).toHaveURL('/items/new');

    const createItemPage = new CreateItemPage(page);
    const categoryEntry = await createItemPage.getCategoryOptions();
    await expect(categoryEntry).toContain(categoryName);
  });
  
  // This test will be ok if dont touch backend
  test('should not create duplicated category name and check at create item page', async ({ page }) => {
    const categoryName = `Fantasy_${Date.now()}`;

    // Create 1st time
    await createCategoryPage.createCategory({
      name: categoryName
    });

    // Submitting NOT redirects, so we have to manually click back to HomePage 
    await createCategoryPage.clickBack();
    await expect(page).toHaveURL('/');

    let homePage = new HomePage(page);
    await homePage.clickAddNewItem();

    // Verify if click 'Add New Item' redirects to '/items/new'
    await expect(page).toHaveURL('/items/new');

    let createItemPage = new CreateItemPage(page);
    let categoryEntry = await createItemPage.getCategoryOptions();

    // Verify if categories has been added
    const categoryLength = categoryEntry.length;
    await expect(categoryEntry).toContain(categoryName)
    await expect(new Set(categoryEntry).size).toBe(categoryEntry.length);

    // Return to Home Page
    await createItemPage.clickBack();
    await expect(page).toHaveURL('/');

    homePage = new HomePage(page);
    await homePage.clickAddCategory();

    //== Create duplicated
    await createCategoryPage.createCategory({
      name: categoryName
    });

    // Submitting NOT redirects, so we have to manually click back to HomePage 
    await createCategoryPage.clickBack();
    await expect(page).toHaveURL('/');

    homePage = new HomePage(page);
    await homePage.clickAddNewItem();

    // Verify if click 'Add New Item' redirects to '/items/new'
    await expect(page).toHaveURL('/items/new');

    createItemPage = new CreateItemPage(page);
    categoryEntry = await createItemPage.getCategoryOptions();

    // Verify if categories still the same / Not adding duplicated category name
    await expect(categoryEntry).toContain(categoryName)
    await expect(new Set(categoryEntry).size).toBe(categoryLength);
  });
});
