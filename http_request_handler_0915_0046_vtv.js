// 代码生成时间: 2025-09-15 00:46:08
const express = require('express'); // 引入express库
const app = express(); // 创建express应用
const port = 8000; // 设置端口号

// 处理GET请求
app.get('/api/data', (req, res) => {
  // 响应发送数据
  res.json({ message: 'Hello, this is a GET request!' });
});

// 处理POST请求
app.post('/api/data', (req, res) => {
  // 获取请求体中的数据
  const { data } = req.body;

  // 检查数据是否有效
  if (!data) {
    return res.status(400).json({ error: 'Data is required' });
  }

  // 响应发送数据
  res.json({ message: 'Data received', data });
});

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// 启动服务器
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});