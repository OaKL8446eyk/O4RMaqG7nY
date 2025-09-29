// 代码生成时间: 2025-09-29 20:08:26
const express = require('express');
const { User } = require('./models'); // 假设有一个User模型
const router = express.Router();

/**
 * 检查用户是否登录
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {Function} next
 */
const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.userId) {
    return next();
  }
  res.status(401).json({ error: 'Unauthorized' });
};

/**
 * 检查用户是否具有管理员权限
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {Function} next
 */
const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.session.userId);
    if (user && user.isAdmin) {
      return next();
    }
    res.status(403).json({ error: 'Forbidden' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// 路由处理
router.get('/admin', isAuthenticated, isAdmin, (req, res) => {
  res.json({ message: 'Welcome to the admin panel!' });
});

// 导出router以在主程序中使用
module.exports = router;