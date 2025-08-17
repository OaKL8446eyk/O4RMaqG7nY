// 代码生成时间: 2025-08-18 02:53:28
// Import necessary Gatsby APIs and utility libraries
const { onCreateNode } = require('gatsby-node');

// Define a function to sanitize string data
const sanitizeString = (dirtyString) => {
  let cleanString = dirtyString.trim();
  // Implement other string sanitization logic here
  return cleanString;
};

// Define a function to parse JSON data
const parseJson = (jsonData) => {
  try {
    return JSON.parse(jsonData);
  } catch (error) {
    console.error('Error parsing JSON data:', error);
    throw error;
  }
};

// Define a function to preprocess data
const preprocessData = (data) => {
  // Implement your data preprocessing logic here
  let cleanedData = data.map(item => ({
    // Example: Sanitize string fields
    name: sanitizeString(item.name),
    // Add other preprocessing steps as needed
  }));
  return cleanedData;
};

// Export the onCreateNode function to be used by Gatsby
exports.onCreateNode = onCreateNode(async ({ node, actions, loadNodeContent, createNodeId }) => {
  // Check if the node is of type MarkdownRemark (or your data type)
  if (node.internal.type === `MarkdownRemark`) {
    // Load the node content
    const content = await loadNodeContent(node);

    // Parse the JSON data from the content
    const jsonData = parseJson(content);

    // Preprocess the data
    const cleanedData = preprocessData(jsonData);

    // Create new nodes or update fields as needed
    // Example: Creating a new node with the cleaned data
    cleanedData.forEach((item) => {
      actions.createNodeField({
        node,
        name: 'processedData',
        value: item,
      });
    });
  }

  // Add error handling for unsupported node types or other issues
  try {
    // Your main processing logic here
  } catch (error) {
    console.error('Error processing node:', error);
  }
});