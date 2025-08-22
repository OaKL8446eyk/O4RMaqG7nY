// 代码生成时间: 2025-08-23 06:58:29
const gatsby = require('gatsby');

// 创建一个单元测试框架
class UnitTestFramework {
  // 存储测试用例
  constructor() {
    this.tests = [];
  }

  // 添加测试用例
  addTest(testName, testFunction) {
    if (typeof testFunction !== 'function') {
      throw new Error(`Test function for '${testName}' must be a function`);
    }
    this.tests.push({ testName, testFunction });
  }

  // 运行所有测试用例
  runTests() {
    this.tests.forEach(({ testName, testFunction }) => {
      try {
        testFunction();
        console.log(`✓ ${testName}`);
      } catch (error) {
        console.error(`✗ ${testName}
  Error: ${error.message}`);
      }
    });
  }
}

// 使用单元测试框架
const unitTestFramework = new UnitTestFramework();

// 定义一个测试用例
unitTestFramework.addTest('测试加法', () => {
  const sum = (a, b) => a + b;
  expect(sum(1, 2)).toBe(3);
});

// 定义另一个测试用例
unitTestFramework.addTest('测试字符串长度', () => {
  const getStringLength = (str) => str.length;
  expect(getStringLength('Hello')).toBe(5);
});

// 运行所有测试用例
unitTestFramework.runTests();

// 导出单元测试框架
module.exports = UnitTestFramework;
