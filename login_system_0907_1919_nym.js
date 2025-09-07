// 代码生成时间: 2025-09-07 19:19:00
const bcrypt = require('bcryptjs'); // Hashing library
const jwt = require('jsonwebtoken'); // JWT library for creating tokens
const { User } = require('./models'); // Assuming a User model exists

// Function to verify user credentials
async function verifyUserCredentials(username, password) {
  // Find user by username
  const user = await User.findOne({ where: { username } });
  if (!user) {
    // User not found
    throw new Error('User not found');
  }
  // Check if the provided password matches the hashed password in the database
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    // Password does not match
    throw new Error('Password is incorrect');
  }
  // Create a token for the user
  const token = jwt.sign({
    id: user.id,
    username: user.username,
  }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return token;
}

// Function to handle login request
async function handleLoginRequest(req, res) {
  try {
    const { username, password } = req.body;
    // Validate input
    if (!username || !password) {
      throw new Error('Username and password are required');
    }
    // Verify user credentials
    const token = await verifyUserCredentials(username, password);
    // Send the JWT token back to the client
    res.status(200).json({ token });
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  handleLoginRequest,
};
