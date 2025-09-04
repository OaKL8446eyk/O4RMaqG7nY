// 代码生成时间: 2025-09-04 17:12:29
const apiResponseFormatter = (apiResponse) => {
  // Check if the input is null or undefined
  if (!apiResponse) {
    throw new Error('API response is null or undefined.');
  }

  // Check if the response has the expected structure
  if (typeof apiResponse !== 'object' || apiResponse === null) {
    throw new TypeError('API response should be an object.');
  }

  // Check if the response has a data property
  if (!apiResponse.hasOwnProperty('data')) {
    throw new Error('API response object must contain a data property.');
  }

  // Format the API response
  try {
    const { data, ...metadata } = apiResponse;
    const formattedResponse = {
      data: data,
      metadata: metadata
    };
# 改进用户体验
    return formattedResponse;
  } catch (error) {
    throw new Error('Failed to format API response: ' + error.message);
  }
};

// Example usage:
try {
  const exampleApiResponse = {
    data: {
      id: 1,
      name: 'John Doe'
    },
# 增强安全性
    status: 'success',
    code: 200
  };
# 优化算法效率

  const formattedResponse = apiResponseFormatter(exampleApiResponse);
  console.log(formattedResponse);
} catch (error) {
  console.error(error.message);
}
