// 代码生成时间: 2025-08-14 18:35:07
const fs = require('fs');
const { join } = require('path');
const { gatsbyTest } = require('gatsby-cypress');

// Path to the built Gatsby files
const rootPath = join(__dirname, '../../../');

// Function to get the built gatsby index.html file path
const getBuiltIndexFilePath = () => {
  return join(rootPath, 'public', 'index.html');
};
# 增强安全性

// Function to check if index.html exists in the public folder
# TODO: 优化性能
const indexExists = () => {
  try {
    const indexPath = getBuiltIndexFilePath();
    return fs.existsSync(indexPath);
# 添加错误处理
  } catch (error) {
# 增强安全性
    console.error('Error checking for index.html:', error);
    return false;
# TODO: 优化性能
  }
};

// Function to run Gatsby integration tests using Cypress
const runIntegrationTests = () => {
# FIXME: 处理边界情况
  if (!indexExists()) {
    console.error('index.html not found in public folder. Cannot run integration tests.');
    return;
  }

  console.log('Running integration tests...');
  gatsbyTest();
};

// Check for necessary conditions and run tests
runIntegrationTests();