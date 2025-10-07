// 代码生成时间: 2025-10-08 02:06:20
// Import necessary modules and dependencies
const { test, expect } = require('@playwright/test');

// Define the test function
test.describe('Gatsby End-to-End Tests', () => {
  // Define the test cases
  test('Home Page Loads', async ({ page }) => {
    // Navigate to the home page
    await page.goto('/');

    // Check if the title is correct
    const title = await page.title();
    expect(title).toContain('Home');
  });

  test('About Page Loads', async ({ page }) => {
    // Navigate to the about page
    await page.goto('/about');

    // Check if the title is correct
    const title = await page.title();
    expect(title).toContain('About');
  });

  // Add more test cases as needed...
});
