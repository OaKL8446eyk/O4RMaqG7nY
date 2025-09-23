// 代码生成时间: 2025-09-23 08:09:52
// Import necessary modules
const puppeteer = require('puppeteer');

// Define constants for the target page and selectors
const TARGET_URL = 'https://example.com';
const CONTENT_SELECTOR = 'article#content';

// Function to scrape the content from the webpage
async function scrapeWebContent() {
  try {
    // Launch the browser
    const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    // Create a new page
    const page = await browser.newPage();
    // Navigate to the target URL
    await page.goto(TARGET_URL, { waitUntil: 'networkidle0' });
    // Extract content from the page using the selector
    const content = await page.$eval(CONTENT_SELECTOR, el => el.innerHTML);
    // Log the extracted content
    console.log(content);
    // Close the browser
    await browser.close();
  } catch (error) {
    // Handle any errors that occur during the scraping process
    console.error('Error scraping web content:', error);
  }
}

// Export the scrapeWebContent function for use in Gatsby
module.exports = { scrapeWebContent };
