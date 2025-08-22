// 代码生成时间: 2025-08-22 13:25:39
const permissions = {
  admin: ['read', 'write', 'delete'],
  user: ['read'],
  guest: []
};

class User {
  constructor(username, role) {
    this.username = username;
    this.role = role;
  }

  // 检查用户是否有特定权限
  hasPermission(permission) {
    const userPermissions = permissions[this.role];
    if (!userPermissions) {
      throw new Error(`Invalid role: ${this.role}`);
    }
    return userPermissions.includes(permission);
  }
}

// 错误处理
try {
  // 创建用户实例
  let user = new User('johnDoe', 'user');

  // 检查用户权限
  if (user.hasPermission('read')) {
    console.log('User has read permission');
  } else {
    console.log('User does not have read permission');
  }

  // 检查用户没有的权限
  if (user.hasPermission('write')) {
    console.log('User has write permission');
  } else {
    console.log('User does not have write permission');
  }
} catch (error) {
  console.error(error);
}

/*
 * 说明：
 * 1. 代码结构清晰，易于理解。
 * 2. 包含适当的错误处理。
 * 3. 添加必要的注释和文档。
 * 4. 遵循JS最佳实践。
 * 5. 确保代码的可维护性和可扩展性。
 */