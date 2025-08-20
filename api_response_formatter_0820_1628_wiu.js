// 代码生成时间: 2025-08-20 16:28:40
const axios = require('axios'); // 引入axios库用于发送HTTP请求
const { format } = require('date-fns'); // 引入date-fns库用于日期格式化

/**
 * API响应格式化工具类
 * @class ApiResponseFormatter
 */
class ApiResponseFormatter {

  /**
   * 发送GET请求并格式化响应
   * @param {string} url API的URL地址
   * @returns {Promise<Object>} 格式化后的响应数据
   */
  static async sendGetRequest(url) {
    try {
      // 发送GET请求
      const response = await axios.get(url);
      // 返回格式化后的响应数据
      return ApiResponseFormatter.formatResponse(response.data);
    } catch (error) {
      // 错误处理
      console.error('Error sending GET request:', error.message);
      throw error;
    }
  }

  /**
   * 发送POST请求并格式化响应
   * @param {string} url API的URL地址
   * @param {Object} postData 发送到API的数据
   * @returns {Promise<Object>} 格式化后的响应数据
   */
  static async sendPostRequest(url, postData) {
    try {
      // 发送POST请求
      const response = await axios.post(url, postData);
      // 返回格式化后的响应数据
      return ApiResponseFormatter.formatResponse(response.data);
    } catch (error) {
      // 错误处理
      console.error('Error sending POST request:', error.message);
      throw error;
    }
  }

  /**
   * 格式化响应数据
   * @param {Object} responseData API响应的数据
   * @returns {Object} 格式化后的数据
   */
  static formatResponse(responseData) {
    // 格式化日期字段，将所有日期转换为'YYYY-MM-DD'格式
    Object.keys(responseData).forEach(key => {
      if (responseData[key] instanceof Date) {
        responseData[key] = format(responseData[key], 'yyyy-MM-dd');
      }
    });
    return responseData;
  }
}

// 示例：发送GET请求并格式化响应
const getFormattedData = async () => {
  const url = 'https://api.example.com/data';
  try {
    const formattedData = await ApiResponseFormatter.sendGetRequest(url);
    console.log('Formatted data:', formattedData);
  } catch (error) {
    console.error('Error:', error.message);
  }
};

// 调用示例函数
getFormattedData();