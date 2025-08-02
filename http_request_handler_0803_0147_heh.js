// 代码生成时间: 2025-08-03 01:47:40
const express = require('express');
const http = require('http');

// 创建 Express 应用
const app = express();

// 定义 HTTP 请求处理器
app.use((req, res, next) => {
  // 检查请求方法和路径
  if (req.method === 'GET' && req.path === '/') {
    res.status(200).send('Hello, World!');
  } else {
    // 如果请求不匹配，则发送 404 错误
    res.status(404).send('Not Found');
  }
});

// 错误处理中间件
app.use((err, req, res, next) => {
  // 打印错误信息到控制台
  console.error(err);
  // 发送 500 错误响应
  res.status(500).send('Internal Server Error');
});

// 创建 HTTP 服务器
const server = http.createServer(app);

// 监听 3000 端口
server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

// 导出 HTTP 服务器
module.exports = server;