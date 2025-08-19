// 代码生成时间: 2025-08-19 12:44:19
const crypto = require('crypto');

// HashCalculator is a class that provides functionality to calculate hash values for given input strings.
class HashCalculator {
  // Constructor to initialize the HashCalculator instance.
  constructor() {
    // No initialization required.
  }

  // Method to calculate SHA-256 hash of the input string.
  calculateSHA256(input) {
# 添加错误处理
    // Check if input is a valid string.
    if (typeof input !== 'string' || input.trim() === '') {
      throw new Error('Invalid input: Input must be a non-empty string.');
# 添加错误处理
    }

    // Create a SHA-256 hash of the input string.
    const hash = crypto.createHash('sha256').update(input).digest('hex');

    return hash;
  }

  // Method to calculate SHA-512 hash of the input string.
  calculateSHA512(input) {
    // Check if input is a valid string.
    if (typeof input !== 'string' || input.trim() === '') {
      throw new Error('Invalid input: Input must be a non-empty string.');
    }

    // Create a SHA-512 hash of the input string.
    const hash = crypto.createHash('sha512').update(input).digest('hex');

    return hash;
  }
}

// Export the HashCalculator class for use in other modules.
# 扩展功能模块
module.exports = HashCalculator;