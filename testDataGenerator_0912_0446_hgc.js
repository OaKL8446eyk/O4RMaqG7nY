// 代码生成时间: 2025-09-12 04:46:18
constfaker = require('@faker-js/faker');
const fs = require('fs');
const path = require('path');

// Function to generate a set of test data
function generateTestData(count) {
  const data = [];
  for (let index = 0; index < count; index++) {
    const record = {
      name: faker.name.findName(),
      email: faker.internet.email(),
      address: faker.address.streetAddress(),
    };
    data.push(record);
  }
  return data;
}

// Function to write test data to a JSON file
function writeTestDataToFile(data, filePath) {
  try {
    const jsonString = JSON.stringify(data, null, 2);
    fs.writeFileSync(filePath, jsonString, 'utf8');
  } catch (error) {
    console.error('Error writing test data to file:', error);
  }
}

// Gatsby Node API function to generate and write test data
exports.onCreateNode = async ({
  actions,
  getNode,
  createNodeId,
  createContentDigest,
  reporter,
}) => {
  // Check if the test data generation is enabled
  const testMode = process.env.NODE_ENV === 'test';
  if (!testMode) return;

  const testDataCount = 100; // Define the number of test data records
  const testData = generateTestData(testDataCount);

  const testDir = path.join(__dirname, 'src', 'data');
  const testFilePath = path.join(testDir, 'testData.json');

  if (!fs.existsSync(testDir)) {
    fs.mkdirSync(testDir, { recursive: true });
  }

  writeTestDataToFile(testData, testFilePath);

  const nodeId = createNodeId(`test-data-json`);
  const nodeContent = JSON.stringify(testData);
  const nodeContentDigest = createContentDigest(testData);

  await actions.createNode({
    ...testData,
    id: nodeId,
    parent: null,
    children: [],
    internal: {
      type: 'TestDataJson',
      content: nodeContent,
      contentDigest: nodeContentDigest,
    },
  });

  // Log a message to the terminal
  reporter.info(`Test data generated and saved to ${testFilePath}`);
};