// 代码生成时间: 2025-09-12 11:43:58
 * Features:
 * - Validates form fields (e.g., name, email)
 * - Provides error messages for invalid fields
 * - Ensures data is in the correct format
 *
 * Usage:
 * - Import the `FormValidator` class and create an instance
 * - Use the `validate` method to validate form data
 */

class FormValidator {
  constructor() {
    // Initialize any necessary properties
  }

  /*
   * Validates a name field.
   * @param {string} name - The name to validate.
   * @returns {boolean} - True if valid, false otherwise.
   */
  validateName(name) {
    if (typeof name !== 'string') {
      throw new Error('Name must be a string.');
    }
    return name.trim().length > 0;
  }

  /*
   * Validates an email field.
   * @param {string} email - The email to validate.
   * @returns {boolean} - True if valid, false otherwise.
   */
  validateEmail(email) {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(email);
  }

  /*
   * Validates the form data.
   * @param {object} formData - An object containing form data.
   * @returns {object} - An object with validation results.
   */
  validate(formData) {
    const { name, email } = formData;
    const errors = {};
    let isValid = true;

    // Validate name
    if (!this.validateName(name)) {
      errors.name = 'Name is required.';
      isValid = false;
    }

    // Validate email
    if (!this.validateEmail(email)) {
      errors.email = 'Email is invalid.';
      isValid = false;
    }

    return { isValid, errors };
  }
}

// Example usage:
const formValidator = new FormValidator();
const formData = { name: 'John Doe', email: 'john.doe@example.com' };
const { isValid, errors } = formValidator.validate(formData);

if (isValid) {
  console.log('Form data is valid.');
} else {
  console.error('Form validation errors:', errors);
}