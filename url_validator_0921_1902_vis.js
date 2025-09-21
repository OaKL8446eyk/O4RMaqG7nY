// 代码生成时间: 2025-09-21 19:02:20
 * Usage:
 * - Provide a URL to the 'validateUrl' function.
 * - The function will return 'valid' if the URL is valid and accessible, 'invalid' otherwise.
 */

const axios = require('axios'); // Axios library to make HTTP requests.

/**
 * Validates a URL by checking if it is valid and accessible.
 * @param {string} url - The URL to validate.
 * @returns {Promise<string>} - A promise that resolves to 'valid' or 'invalid' based on URL status.
 */
async function validateUrl(url) {
  // Check if the URL is a non-empty string.
  if (typeof url !== 'string' || url.trim() === '') {
    throw new Error('Invalid input: URL must be a non-empty string.');
  }

  try {
    // Use Axios to make a HEAD request to the URL.
    const response = await axios.head(url, { timeout: 5000 });
    // If the URL is accessible, return 'valid'.
    if (response.status >= 200 && response.status < 300) {
      return 'valid';
    } else {
      return 'invalid';
    }
  } catch (error) {
    // If any error occurs during the request, return 'invalid'.
    console.error('Error validating URL:', error.message);
    return 'invalid';
  }
}

// Example usage:
// validateUrl('https://www.example.com').then(status => {
//   console.log(status); // Output: 'valid' or 'invalid'
// });