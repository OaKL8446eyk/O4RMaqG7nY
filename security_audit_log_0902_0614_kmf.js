// 代码生成时间: 2025-09-02 06:14:53
const fs = require('fs');
const path = require('path');
const util = require('util');

// 使用 util.promisify 来处理异步文件操作
const { writeFile } = util.promisify(fs);

// 日志文件路径
const LOG_FILE_PATH = path.join(__dirname, 'security_audit.log');

/**
 * 安全审计日志函数
 * @param {string} action - 要记录的审计动作
 * @param {string} message - 与审计动作相关的消息
 * @returns {Promise<void>} - 一个表示文件写入操作的 Promise
 */
async function logSecurityAudit(action, message) {
  try {
    // 将日志条目格式化为字符串
    const logEntry = `[${new Date().toISOString()}] ${action}: ${message}
`;

    // 将日志条目追加到文件
    await writeFile(LOG_FILE_PATH, logEntry, { flag: 'a' });
  } catch (error) {
    // 错误处理，打印错误信息
    console.error('Failed to write to security audit log:', error);
  }
}

// 导出安全审计日志函数
module.exports = {
  logSecurityAudit,
  LOG_FILE_PATH,
};