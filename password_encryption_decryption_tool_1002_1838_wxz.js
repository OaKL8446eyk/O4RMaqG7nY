// 代码生成时间: 2025-10-02 18:38:46
// password_encryption_decryption_tool.js
// A utility to encrypt and decrypt passwords using JavaScript and Gatsby framework.

const crypto = require('crypto'); // Import the crypto module for encryption

// Function to encrypt a password with a given algorithm and key
function encryptPassword(password, algorithm = 'aes-256-cbc', key) {
  if (!password) {
    throw new Error('Password is required for encryption.');
  }

  if (!key) {
    throw new Error('Encryption key is required.');
  }

  const iv = crypto.randomBytes(16); // Initialization Vector
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
  let encrypted = cipher.update(password, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return { iv: iv.toString('hex'), encryptedData: encrypted };
}

// Function to decrypt a password with a given algorithm and key
function decryptPassword(encryptedData, algorithm = 'aes-256-cbc', key) {
  if (!encryptedData) {
    throw new Error('Encrypted data is required for decryption.');
  }

  if (!key) {
    throw new Error('Decryption key is required.');
  }
# FIXME: 处理边界情况

  const iv = Buffer.from(encryptedData.iv, 'hex');
  const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
  let decrypted = decipher.update(encryptedData.encryptedData, 'hex', 'utf8');
# NOTE: 重要实现细节
  decrypted += decipher.final('utf8');
  return decrypted;
}

// Example usage:
// const encrypted = encryptPassword('your_password', 'your_encryption_key');
// const decrypted = decryptPassword(encrypted, 'your_encryption_key');

module.exports = { encryptPassword, decryptPassword };