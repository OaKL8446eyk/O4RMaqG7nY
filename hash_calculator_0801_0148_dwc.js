// 代码生成时间: 2025-08-01 01:48:47
const crypto = require('crypto');

/**
 * 哈希值计算工具
 *
 * @param {string} input - 待计算哈希值的输入字符串
 * @param {string} algorithm - 哈希算法 (默认为 'sha256')
 * @returns {string} - 哈希值字符串
 */
function calculateHash(input, algorithm = 'sha256') {
  // 使用crypto模块计算哈希值
  return crypto.createHash(algorithm).update(input, 'utf8').digest('hex');
}

/**
 * 验证输入是否为空
 *
 * @param {string} input - 输入字符串
 * @returns {boolean} - 输入是否为空
 */
function isValidInput(input) {
  return input.trim().length > 0;
}

/**
 * 哈希值计算工具的封装函数，包含错误处理
 *
 * @param {string} input - 待计算哈希值的输入字符串
 * @param {string} [algorithm='sha256'] - 哈希算法
 * @returns {Promise<string>} - 包含哈希值的Promise对象
 */
async function hashCalculator(input, algorithm = 'sha256') {
  if (!isValidInput(input)) {
    throw new Error('输入不能为空');
  }

  // 计算哈希值并返回结果
  return calculateHash(input, algorithm);
}

// 导出函数
module.exports = {
  hashCalculator,
  calculateHash,
  isValidInput
};