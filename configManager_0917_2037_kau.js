// 代码生成时间: 2025-09-17 20:37:55
const fs = require('fs');
const path = require('path');

/**
 * 配置文件管理器类
 * @class ConfigManager
 */
class ConfigManager {
  constructor(configPath) {
    // 检查配置文件路径
    if (!fs.existsSync(configPath)) {
      throw new Error('Configuration file path does not exist.');
    }
    this.configPath = configPath;
  }

  /**
   * 读取配置文件
   * @returns {Promise<Object>} - 配置文件的内容
   */
  async readConfig() {
    try {
      // 读取配置文件内容
      const rawConfig = await fs.promises.readFile(this.configPath, 'utf8');
      // 尝试解析配置文件
      return JSON.parse(rawConfig);
    } catch (error) {
      throw new Error('Failed to read configuration file: ' + error.message);
    }
  }

  /**
   * 更新配置文件
   * @param {Object} newConfig - 新的配置对象
   * @returns {Promise<boolean>} - 更新是否成功
   */
  async updateConfig(newConfig) {
    try {
      // 将新配置对象转换为JSON字符串
      const configString = JSON.stringify(newConfig, null, 2);
      // 写入配置文件
      await fs.promises.writeFile(this.configPath, configString);
      return true;
    } catch (error) {
      throw new Error('Failed to update configuration file: ' + error.message);
    }
  }
}

// 导出ConfigManager类
module.exports = ConfigManager;