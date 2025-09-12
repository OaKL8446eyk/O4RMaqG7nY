// 代码生成时间: 2025-09-13 00:08:09
 * It follows best practices for JavaScript and includes error handling, documentation, and maintainability.
 *
 * @author Your Name
 * @date Today's Date
 */

// Import necessary Node.js modules
const crypto = require('crypto');

/**
 * Encrypts a plaintext password using AES-256-CBC encryption.
 *
 * @param {string} plaintext - The password to be encrypted.
 * @param {string} key - The encryption key.
 * @param {string} [iv] - The initialization vector for the encryption.
 * @returns {string} - The encrypted password as a base64 string.
 */
function encryptPassword(plaintext, key, iv = crypto.randomBytes(16)) {
  try {
    // Ensure key is 32 bytes long
    if (key.length !== 32) {
      throw new Error('Encryption key must be 32 bytes long.');
    }
    
    // Create cipher instance using AES-256-CBC
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
    
    // Update cipher with plaintext and finalise
    let encrypted = cipher.update(plaintext, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    
    // Return the encrypted password and the IV for later decryption
    return `${iv.toString('hex')}:${encrypted}`;
  } catch (error) {
    console.error('Encryption failed:', error.message);
    throw error;
  }
}

/**
 * Decrypts a base64 encrypted password using AES-256-CBC decryption.
 *
 * @param {string} encrypted - The encrypted password with the IV.
 * @param {string} key - The decryption key.
 * @returns {string} - The decrypted password.
 */
function decryptPassword(encrypted, key) {
  try {
    // Split the encrypted string into IV and cipher text
    const [ivHex, encryptedText] = encrypted.split(':');
    if (!ivHex || !encryptedText) {
      throw new Error('Invalid encrypted format.');
    }
    
    // Convert IV from hex to buffer and cipher text from base64 to buffer
    const iv = Buffer.from(ivHex, 'hex');
    const encryptedTextBuffer = Buffer.from(encryptedText, 'base64');
    
    // Ensure key is 32 bytes long
    if (key.length !== 32) {
      throw new Error('Decryption key must be 32 bytes long.');
    }
    
    // Create decipher instance using AES-256-CBC
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
    
    // Update decipher with encrypted text and finalise
    let decrypted = decipher.update(encryptedTextBuffer, 'base64', 'utf8');
    decrypted += decipher.final('utf8');
    
    // Return the decrypted password
    return decrypted;
  } catch (error) {
    console.error('Decryption failed:', error.message);
    throw error;
  }
}

// Example usage
const key = crypto.randomBytes(32).toString('hex');
const originalPassword = 'mySuperSecretPassword123';

const encryptedPassword = encryptPassword(originalPassword, key);
console.log('Encrypted:', encryptedPassword);

const decryptedPassword = decryptPassword(encryptedPassword, key);
console.log('Decrypted:', decryptedPassword);