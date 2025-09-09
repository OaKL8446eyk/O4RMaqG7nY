// 代码生成时间: 2025-09-10 07:50:04
// Import necessary modules and libraries.
const axios = require('axios');

// This plugin will be used in Gatsby's node.js environment.
exports.onCreateNode = async ({
  node,
  actions,
  loadNodeContent,
}) => {
  // Check if the node is a file and has a URL.
  if (node.internal.type === 'File' && node.absolutePath) {
    // Extract the URL from the filename.
    // Expected format: 'url_<URL>.md'
    const urlMatch = node.absolutePath.match(/.*url_(.*)\.md$/);
    if (urlMatch) {
      const url = urlMatch[1];

      try {
        // Fetch the content from the URL.
        const response = await axios.get(url);

        // Create a new node with the fetched content.
        const contentNode = await loadNodeContent({
          node,
          // Pass the response data as the content.
          content: response.data,
        });

        // Add the new node to the Gatsby GraphQL schema.
        actions.createNodeField({
          node,
          name: 'content',
          value: contentNode.content,
        });
      } catch (error) {
        // Handle errors during the fetch process.
        console.error(`Error scraping content from ${url}: ${error.message}`);
      }
    }
  }
};
