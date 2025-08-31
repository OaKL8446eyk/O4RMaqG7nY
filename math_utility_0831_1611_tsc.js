// 代码生成时间: 2025-08-31 16:11:37
 * Features:
 * - Basic arithmetic operations: addition, subtraction, multiplication, division
 * - Error handling for invalid inputs
 * - Modular code structure for easy maintainability and extensibility
 */

class MathUtility {
  // Perform addition
  add(a, b) {
    try {
      return a + b;
    } catch (error) {
      console.error('Error in addition:', error);
      return null;
    }
  }

  // Perform subtraction
  subtract(a, b) {
    try {
      return a - b;
    } catch (error) {
      console.error('Error in subtraction:', error);
      return null;
    }
  }

  // Perform multiplication
  multiply(a, b) {
    try {
      return a * b;
    } catch (error) {
      console.error('Error in multiplication:', error);
      return null;
    }
  }

  // Perform division
  divide(a, b) {
    if (b === 0) {
      throw new Error('Division by zero is not allowed.');
    }
    try {
      return a / b;
    } catch (error) {
      console.error('Error in division:', error);
      return null;
    }
  }
}

// Example usage:
const mathUtility = new MathUtility();
console.log('Addition:', mathUtility.add(5, 3));
console.log('Subtraction:', mathUtility.subtract(5, 3));
console.log('Multiplication:', mathUtility.multiply(5, 3));
console.log('Division:', mathUtility.divide(5, 3));