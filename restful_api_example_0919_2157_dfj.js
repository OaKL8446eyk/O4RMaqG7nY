// 代码生成时间: 2025-09-19 21:57:01
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// 创建一个Express应用
const app = express();
const port = 3000;

// 允许跨域请求
app.use(cors());

// 解析JSON和URL编码格式的请求体
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 定义一个模拟数据库
let users = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Doe', email: 'jane@example.com' },
];

// 获取所有用户列表
app.get('/api/users', (req, res) => {
  try {
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// 获取单个用户
app.get('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const user = users.find(user => user.id.toString() === id);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// 创建新用户
app.post('/api/users', (req, res) => {
  const newUser = req.body;
  users.push(newUser);
  res.status(201).json(newUser);
});

// 更新现有用户
app.put('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const user = users.find(user => user.id.toString() === id);
  if (user) {
    Object.assign(user, req.body);
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// 删除用户
app.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const userIndex = users.findIndex(user => user.id.toString() === id);
  if (userIndex > -1) {
    users.splice(userIndex, 1);
    res.status(200).json({ message: 'User deleted' });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// 错误处理中间件
app.use((req, res, next) => {
  res.status(404).json({ message: 'Endpoint not found' });
});

// 启动服务器
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// 代码注释：
// 这个文件是一个简单的RESTful API服务器，使用Express框架实现。
// 它提供了基本的CRUD操作（创建、读取、更新、删除），
// 并有适当的错误处理和跨域资源共享（CORS）支持。
// 代码结构清晰，易于理解和维护，符合JS最佳实践。