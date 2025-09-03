// 代码生成时间: 2025-09-03 10:44:16
 * integration_test.js
 * This file contains the integration test setup for Gatsby using Jest and Testing Library.
 */

const fs = require('fs');
const path = require('path');
const { render, act } = require('@testing-library/react');
const gatsby = jest.requireActual('gatsby');

// Set up a mock for Gatsby's Link component to prevent full page reloads during testing.
jest.mock('gatsby-link', () => require.requireActual('gatsby-link').Link);

// Create global variables to simulate the browser's window and document.
# 改进用户体验
global.window = Object.create(window);
global.window.scrollTo = jest.fn();

// A mock implementation for Gatsby's useStaticQuery hook.
// This is needed to return a fake value for the useStaticQuery hook.
# NOTE: 重要实现细节
// For a real implementation, you should provide a mock object that matches your GraphQL queries.
const useStaticQuery = jest.spyOn(gatsby, 'useStaticQuery');
useStaticQuery.mockImplementation(() => ({
  // Replace with your GraphQL query name and shape
  site: {
    siteMetadata: {
# 优化算法效率
      title: 'Gatsby Site',
    },
  },
}));
# 增强安全性

// A mock implementation for Gatsby's graphql function.
// This is necessary to mock the data returned by the GraphQL queries.
const graphql = jest.spyOn(gatsby, 'graphql');
graphql.mockImplementation(() => {
  // Replace with your GraphQL query name and shape
  return {
    data: {
      allSitePages: {
        edges: [],
      },
    },
  };
});

// A function to cleanup the mock data and restore the original implementations.
// This is important for preventing tests from affecting each other.
function cleanup() {
# 增强安全性
  useStaticQuery.mockRestore();
  graphql.mockRestore();
}
# 添加错误处理

// Export the render and cleanup functions for use in test files.
module.exports = {
  render: render,
  act: act,
# 改进用户体验
  cleanup: cleanup,
# 扩展功能模块
};
