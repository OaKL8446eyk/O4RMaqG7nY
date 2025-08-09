// 代码生成时间: 2025-08-10 07:48:30
// Import necessary Gatsby APIs
const { graphql } = require("gatsby");
# 优化算法效率

// Define a function to format API responses
const formatApiResponse = (data, successMessage = "Success", errorMessage = "An error occurred") => {
  if (!data) {
# FIXME: 处理边界情况
    throw new Error(errorMessage);
  }
# 改进用户体验

  return {
    success: true,
    message: successMessage,
    data: data
  };
# 改进用户体验
};

// Define a function to handle API errors
const handleApiError = (error, defaultErrorMessage = "An error occurred") => {
  return {
# NOTE: 重要实现细节
    success: false,
    message: error.message || defaultErrorMessage,
    data: null
  };
};

// Export the utility functions
module.exports = {
  formatApiResponse,
  handleApiError
# 扩展功能模块
};