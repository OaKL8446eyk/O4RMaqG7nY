// 代码生成时间: 2025-08-29 06:48:31
const puppeteer = require('puppeteer');
const { spawn } = require('child_process');

// 配置Gatsby的测试环境
const gatsbyConfig = {
  url: 'http://localhost:8000',
  port: 8000,
  gatsbyPath: 'node_modules/.bin/gatsby',
};

// 启动Gatsby开发服务器
async function startGatsby() {
  return new Promise((resolve, reject) => {
    const gatsbyProcess = spawn(gatsbyConfig.gatsbyPath, ['develop'], {
      stdio: 'inherit',
      env: { ...process.env, NODE_ENV: 'development' },
    });

    gatsbyProcess.on('error', reject);
    gatsbyProcess.on('close', code => {
      if (code !== 0) {
        reject(new Error(`Gatsby process exited with code ${code}`));
      } else {
        resolve();
      }
    });
  });
}

// 运行Puppeteer集成测试
async function runIntegrationTests() {
  try {
    // 启动Gatsby服务器
    await startGatsby();

    // 启动Puppeteer浏览器
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    // 导航到Gatsby网站
    await page.goto(gatsbyConfig.url);

    // 添加测试逻辑
    // 例如，检查页面标题是否正确
    const title = await page.title();
    if (title !== 'Expected Title') {
      throw new Error(`Expected title to be 'Expected Title', but got '${title}'`);
    }

    // 其他测试可以在这里添加

    // 关闭浏览器
    await browser.close();

    console.log('Integration tests passed.');
  } catch (error) {
    console.error('Integration tests failed:', error);
  }
}

// 程序入口
runIntegrationTests();