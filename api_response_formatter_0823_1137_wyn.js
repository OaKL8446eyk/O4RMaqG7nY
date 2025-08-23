// 代码生成时间: 2025-08-23 11:37:55
const { formatError, formatSuccess } = require('./response_formatter_utils');

/*
 * Function to format API responses.
 * @param {Object} data - The API response data.
 * @param {Object} options - Additional options to customize the response formatting.
 * @returns {Object} - A formatted API response object.
 */
function formatApiResponse(data, options = {}) {
  try {
    // Check if the data is valid
    if (!data) {
      throw new Error('Invalid data provided for API response');
    }

    // Determine if the response is a success or an error
    const formattedResponse = data.success ? formatSuccess(data, options) : formatError(data, options);

    // Return the formatted response
    return formattedResponse;
  } catch (error) {
    // Handle any errors that occur during formatting
    console.error('Error formatting API response:', error);
    return formatError({ message: error.message }, options);
  }
}

/*
 * Export the formatApiResponse function so it can be used by other modules.
 */
module.exports = {
  formatApiResponse,
};
