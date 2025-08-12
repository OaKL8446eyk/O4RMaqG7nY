// 代码生成时间: 2025-08-13 00:42:48
 * @returns {Object} Generated test data.
 */

const faker = require('faker');

function generateTestData(options = {}) {
  // Create a new object to store generated data
  const testData = {};

  // Generate a random name
  testData.name = faker.name.findName();

  // Generate a random email address
  testData.email = faker.internet.email();

  // Generate a random address
  testData.address = faker.address.streetAddress();

  // Generate a random date of birth
  testData.dob = faker.date.past();

  // Check for any custom options and apply them
  if (options.includeUsername && options.includeUsername === true) {
    testData.username = faker.internet.userName();
  }

  if (options.includePhoneNumber && options.includePhoneNumber === true) {
    testData.phone = faker.phone.phoneNumber();
  }

  if (options.includeCompany && options.includeCompany === true) {
    testData.company = faker.company.companyName();
  }

  // Return the generated test data
  return testData;
}

// Example usage:
const testUserData = generateTestData({
  includeUsername: true,
  includePhoneNumber: true,
  includeCompany: true
});

// Log the generated test data to the console
console.log(testUserData);
