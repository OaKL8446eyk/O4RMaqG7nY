// 代码生成时间: 2025-09-06 08:29:20
const fs = require('fs');
const path = require('path');
const { gatsbyNode } = require('./gatsby-node'); // 假设有一个自定义的gatsby-node.js文件

/**
 * 这是一个自动化测试套件，用于测试Gatsby站点的功能。
 * 它将扫描站点中的页面，并对每个页面执行基本的测试。
 */
class AutomatedTestSuite {

  /**
   * 构造函数，接收站点的构建文件夹路径
   * @param {string} buildPath - 站点的构建文件夹路径
   */
  constructor(buildPath) {
    this.buildPath = buildPath;
  }

  /**
   * 测试站点中的所有页面
   * @returns {Promise<void>} - 测试完成后的Promise
   */
  async testAllPages() {
    try {
      const pages = await this.getPages();
      for (const page of pages) {
        await this.testPage(page);
      }
    } catch (error) {
      console.error('Test suite encountered an error:', error);
    }
  }

  /**
   * 获取站点中的所有页面
   * @returns {Promise<string[]>} - 页面路径数组
   */
  async getPages() {
    const pagesDir = path.join(this.buildPath, 'public', 'pages');
    return new Promise((resolve, reject) => {
      fs.readdir(pagesDir, { withFileTypes: true }, (err, files) => {
        if (err) {
          reject(err);
        } else {
          resolve(files
            .filter(file => file.isFile())
            .map(file => path.join('pages', path.basename(file.name, path.extname(file.name)))));
        }
        }
      });
    });
  }

  /**
   * 测试单个页面
   * @param {string} pagePath - 页面的相对路径
   * @returns {Promise<void>} - 测试单个页面完成后的Promise
   */
  async testPage(pagePath) {
    try {
      const pageHtml = await this.getPageHtml(pagePath);
      // 这里可以添加更多的测试逻辑，例如检查页面是否包含特定的元素等
      console.log(`Page ${pagePath} tested successfully. HTML content retrieved.`);
    } catch (error) {
      console.error(`Error testing page ${pagePath}:`, error);
    }
  }

  /**
   * 获取页面的HTML内容
   * @param {string} pagePath - 页面的相对路径
   * @returns {Promise<string>} - 页面的HTML内容
   */
  async getPageHtml(pagePath) {
    const htmlFilePath = path.join(this.buildPath, 'public', 'pages', `${pagePath}.html`);
    return new Promise((resolve, reject) => {
      fs.readFile(htmlFilePath, 'utf8', (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
}

// 使用示例
const testSuite = new AutomatedTestSuite(path.join(__dirname, 'build'));
testSuite.testAllPages();