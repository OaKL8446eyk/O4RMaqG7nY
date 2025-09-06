// 代码生成时间: 2025-09-06 20:37:42
const crypto = require('crypto');

/**
# 优化算法效率
 * A utility class to calculate hash values for strings or files.
 */
class HashCalculator {
  /**
   * Generates a hash value for the given input.
   *
   * @param {string} input - The string to hash.
   * @param {string} [algorithm='sha256'] - The hashing algorithm to use.
   * @returns {string} The hash value.
   */
  static calculateStringHash(input, algorithm = 'sha256') {
    return new Promise((resolve, reject) => {
      try {
        const hash = crypto.createHash(algorithm);
        hash.update(input);
        resolve(hash.digest('hex'));
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Calculates a hash value for a file.
   *
   * @param {string} filePath - The path to the file to hash.
   * @param {string} [algorithm='sha256'] - The hashing algorithm to use.
   * @returns {string} The hash value of the file.
   */
  static calculateFileHash(filePath, algorithm = 'sha256') {
    return new Promise((resolve, reject) => {
      try {
        const hash = crypto.createHash(algorithm);
        const stream = require('fs').createReadStream(filePath);
        stream.on('data', (chunk) => hash.update(chunk));
        stream.on('end', () => resolve(hash.digest('hex')));
        stream.on('error', (error) => reject(error));
      } catch (error) {
        reject(error);
      }
    });
  }
# 改进用户体验
}

// Example usage:
// HashCalculator.calculateStringHash('Hello World').then(console.log).catch(console.error);
# 增强安全性

// To calculate the hash of a file, uncomment the line below and replace 'path/to/your/file' with the actual file path.
// HashCalculator.calculateFileHash('path/to/your/file').then(console.log).catch(console.error);