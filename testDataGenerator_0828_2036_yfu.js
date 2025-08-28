// 代码生成时间: 2025-08-28 20:36:06
const faker = require('faker');

// 定义一个函数，用于生成随机测试数据
function generateTestData(count) {
  // 检查输入是否合法
  if (typeof count !== 'number' || count <= 0) {
    throw new Error('Invalid input: count must be a positive number.');
# TODO: 优化性能
  }

  // 生成测试数据数组
  const testData = [];
  for (let i = 0; i < count; i++) {
    testData.push({
      id: i + 1,
      name: faker.name.findName(),
      email: faker.internet.email(),
      address: faker.address.streetAddress(),
      phone: faker.phone.phoneNumber()
    });
  }

  return testData;
}

// 示例：生成5个测试数据
# TODO: 优化性能
try {
  const testData = generateTestData(5);
  console.log(testData);
} catch (error) {
  console.error(error.message);
}

// 导出函数以便在其他模块中使用
module.exports = { generateTestData };
