// 代码生成时间: 2025-08-04 13:46:21
// Import necessary dependencies
const { GraphQLClient } = require('graphql-request');

// Initialize GraphQL client
const client = new GraphQLClient('https://your-graphql-endpoint.com', {
  headers: { authorization: `Bearer ${process.env.GATSBY_API_TOKEN}`}
});

// Define user roles
const roles = {
  ADMIN: 'ADMIN',
  EDITOR: 'EDITOR',
  USER: 'USER',
};

// Define permissions for each role
const permissions = {
  [roles.ADMIN]: ['create', 'read', 'update', 'delete'],
  [roles.EDITOR]: ['read', 'update'],
  [roles.USER]: ['read'],
};

// Function to check if a user has a specific permission
async function hasPermission(userId, permission) {
  try {
    // Fetch user data from GraphQL
    const userData = await client.request(`
      query($userId: ID!) {
        user(id: $userId) {
          id
          role
        }
      }
    `, { userId });

    // Check if user data exists
    if (!userData.user) {
      throw new Error('User not found');
    }

    // Get user role and permissions
    const { role } = userData.user;
    const userPermissions = permissions[role];

    // Check if user has the required permission
    if (userPermissions.includes(permission)) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    // Handle errors
    console.error('Error checking permission:', error);
    throw error;
  }
}

// Function to update user role
async function updateUserRole(userId, newRole) {
  try {
    // Validate new role
    if (!roles[newRole]) {
      throw new Error('Invalid role');
    }

    // Update user role in GraphQL
    await client.request(`
      mutation($userId: ID!, $role: String!) {
        updateUser(id: $userId, role: $role) {
          id
          role
        }
      }
    `, { userId, role: newRole });

    console.log('User role updated successfully');
  } catch (error) {
    // Handle errors
    console.error('Error updating user role:', error);
    throw error;
  }
}

// Export module functions
module.exports = {
  hasPermission,
  updateUserRole,
  roles,
};