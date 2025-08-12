// 代码生成时间: 2025-08-12 10:34:44
const Gatsby = require('gatsby');

// 用户权限管理类
class UserPermissionManager {
  // 构造函数
  constructor() {
    // 初始化权限配置
    this.permissions = {
      'admin': ['read', 'write', 'delete'],
      'editor': ['read', 'write'],
      'viewer': ['read']
    };
  }

  // 验证用户权限
  async checkPermission(userId, action) {
    try {
      // 模拟获取用户的角色
      const userRole = await this.getUserRole(userId);
      if (!userRole) {
        return { status: false, message: 'User role not found' };
      }

      // 检查用户角色是否具有指定的权限
      if (this.permissions[userRole] && this.permissions[userRole].includes(action)) {
        return { status: true, message: 'Permission granted' };
      } else {
        return { status: false, message: 'Permission denied' };
      }
    } catch (error) {
      // 错误处理
      console.error('Error checking permission:', error);
      return { status: false, message: 'Internal server error' };
    }
  }

  // 模拟获取用户角色
  async getUserRole(userId) {
    // 这里可以添加真实的数据库查询逻辑
    // 假设我们有一个用户ID到角色的映射
    const userRoles = {
      1: 'admin',
      2: 'editor',
      3: 'viewer'
    };
    return userRoles[userId] || null;
  }
}

// Gatsby节点API，创建或修改页面时调用
exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions;

  // 检查页面是否需要权限验证
  if (page.path === '/protected-page') {
    // 实例化用户权限管理类
    const permissionManager = new UserPermissionManager();

    // 假设当前用户ID为1
    const userId = 1;
    const action = 'read';

    // 检查用户是否有权限访问该页面
    const permissionResult = await permissionManager.checkPermission(userId, action);

    if (!permissionResult.status) {
      // 如果无权限，则重定向到登录页面
      page.context.redirect = '/login';
    }
  }

  // 继续创建页面
  createPage(page);
};
