// 代码生成时间: 2025-09-08 07:01:53
const { onPostBootstrap } = require('gatsby');

// This function will be called after every page Gatsby server-side renders
function reportMemoryUsage() {
  if (process.env.NODE_ENV === 'production') {
    const { performance } = require('perf_hooks');
    const memoryUsage = performance.memory;

    // Log the current memory usage
    console.log('Memory usage report:', memoryUsage);
  } else {
# NOTE: 重要实现细节
    console.log('Memory usage report is disabled in non-production environments.');
  }
}
# NOTE: 重要实现细节

// Export the reportMemoryUsage function as a Gatsby plugin
module.exports = {
  onPostBootstrap: reportMemoryUsage,
};
# FIXME: 处理边界情况

/*
 * Usage:
 * This plugin should be used in a Gatsby project.
 * Include it in your gatsby-browser.js or gatsby-ssr.js to
 * automatically report memory usage after all pages have been bootstrapped.
 *
# 改进用户体验
 * Example of usage in gatsby-ssr.js:
 *
 * exports.onPostBootstrap = require('./memory_usage_analysis.js').onPostBootstrap;
 *
 * It's important to note that this plugin will only log the memory usage
 * when the environment is set to 'production' to avoid performance hits
 * during development.
 */