// 代码生成时间: 2025-09-16 11:34:08
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// User Authentication Service
class UserAuthentication {
  // Constructor
  constructor() {
    this.secretKey = process.env.JWT_SECRET_KEY;
  }

  // Hash user password
  async hashPassword(password) {
    try {
      const hashedPassword = await bcrypt.hash(password, 12);
      return hashedPassword;
    } catch (error) {
      throw new Error('Failed to hash password: ' + error.message);
    }
  }

  // Verify user password
  async verifyPassword(plainPassword, hashedPassword) {
    try {
      const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
      return isMatch;
    } catch (error) {
      throw new Error('Failed to verify password: ' + error.message);
    }
  }

  // Generate JWT token
  generateToken(payload) {
    return jwt.sign(payload, this.secretKey, { expiresIn: '24h' });
  }

  // Authenticate user
  async authenticateUser(username, password, user) {
    try {
      // Check if user exists
      if (!user) {
        throw new Error('User not found');
      }

      // Verify user password
      const isPasswordValid = await this.verifyPassword(password, user.password);
      if (!isPasswordValid) {
        throw new Error('Invalid password');
      }

      // Generate JWT token
      const token = this.generateToken({ username: user.username });
      return { user: user.username, token: token };
    } catch (error) {
      throw error;
    }
  }
}

// Export the UserAuthentication class
module.exports = UserAuthentication;