// 代码生成时间: 2025-08-26 00:41:31
// 引入fs模块用于文件操作
const fs = require('fs');
// 引入path模块用于路径操作
const path = require('path');

// 解析日志文件函数
const parseLog = (filePath) => {
  // 检查文件路径是否存在
  if (!fs.existsSync(filePath)) {
    throw new Error('文件不存在');
  }

  // 读取文件内容
  const rawData = fs.readFileSync(filePath, 'utf8');
  
  // 定义一个正则表达式来匹配日志条目
  // 假设日志格式为：[timestamp] [level] message
  const logPattern = /\[([0-9\-]+\s[0-9:]+)\]\s(\[ERROR\]\s)?(.*)/g;

  // 使用正则表达式来解析日志条目
  let match;
  const parsedLogs = [];
  while ((match = logPattern.exec(rawData)) !== null) {
    parsedLogs.push({
      timestamp: match[1],
      level: match[2] ? 'ERROR' : 'INFO',
      message: match[3]
    });
  }

  return parsedLogs;
};

// 错误处理函数
const handleError = (error) => {
  console.error('解析日志时发生错误:', error.message);
};

// 主函数，用于执行日志解析
const main = () => {
  try {
    // 假设日志文件位于项目根目录下的logs文件夹
    const logFilePath = path.join(__dirname, '../logs/gatsby.log');
    const parsedLogs = parseLog(logFilePath);
    console.log('解析后的日志:', parsedLogs);
  } catch (error) {
    handleError(error);
  }
};

// 执行主函数
main();