// 代码生成时间: 2025-09-22 15:34:23
// Import necessary modules
const { sanitize } = require('dompurify');

// Function to sanitize user input to prevent XSS attacks
function sanitizeInput(input) {
  // Check if input is a string
  if (typeof input !== 'string') {
    throw new Error('Input must be a string');
  }

  // Sanitize the input to prevent XSS attacks
  try {
    const sanitizedInput = sanitize(input, {
      ALLOWED_TAGS: [],
      ALLOWED_ATTR: []
    });
    return sanitizedInput;
  } catch (error) {
    // Handle errors during sanitization
    console.error('Error sanitizing input:', error);
    throw error;
  }
}

// Export the sanitizeInput function for use in Gatsby applications
module.exports = sanitizeInput;