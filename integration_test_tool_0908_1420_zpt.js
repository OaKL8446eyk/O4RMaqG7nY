// 代码生成时间: 2025-09-08 14:20:45
const fs = require('fs');
const path = require('path');
const gatsby = require('gatsby');

// 此函数用于创建集成测试
async function createIntegrationTest(pagePath) {
  // 检查页面路径是否存在
  if (!fs.existsSync(pagePath)) {
    throw new Error(`页面路径 ${pagePath} 不存在`);
  }

  // 读取页面的HTML内容
  const pageContent = fs.readFileSync(pagePath, 'utf8');

  // 创建测试文件路径
  const testFilePath = path.join(__dirname, 'tests', `${path.basename(pagePath, '.html')}.test.js`);

  // 测试文件的内容
  const testFileContent = `
    describe('${path.basename(pagePath)}', () => {
      it('页面加载成功', async () => {
        expect(pageContent).toBeTruthy();
      });
    });
  `;

  // 将测试文件内容写入文件
  fs.writeFileSync(testFilePath, testFileContent);
  console.log(`测试文件 ${testFilePath} 创建成功`);
}

// 此函数用于运行集成测试
async function runIntegrationTests() {
  try {
    // 使用Gatsby CLI命令运行测试
    await gatsby.cli('test', ['--silent']);
    console.log('集成测试运行成功');
  } catch (error) {
    console.error('集成测试运行失败:', error);
  }
}

// 主函数，用于启动程序
async function main() {
  try {
    // 创建集成测试
    await createIntegrationTest('./src/pages/index.html');

    // 运行集成测试
    await runIntegrationTests();
  } catch (error) {
    console.error('程序运行失败:', error);
  }
}

// 程序入口
main();