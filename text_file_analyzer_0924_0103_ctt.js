// 代码生成时间: 2025-09-24 01:03:47
// Import necessary modules and Gatsby functions
const fs = require('fs');
const path = require('path');
const { graphql, getFilePath } = require('gatsby-source-filesystem');

// Function to analyze text file content
async function analyzeTextFile(filePath) {
  // Ensure the file path is valid
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }

  // Read the file content
  const fileContent = fs.readFileSync(filePath, 'utf8');

  // Perform analysis on the file content
  // This is a placeholder for actual analysis logic
  const analysisResult = analyzeContent(fileContent);

  // Return the analysis result
  return analysisResult;
}

// Function to perform analysis on the content
// Placeholder for actual analysis logic
function analyzeContent(content) {
  // Here you can implement your analysis logic, such as word counting, sentiment analysis, etc.
  // For demonstration, we'll just return the length of the content
  return {
    contentLength: content.length,
    message: 'Analysis complete.'
  };
}

// Gatsby API hook to run the analysis on a specific file
exports.onCreateNode = async ({
  node,
  actions: { createNode, createNodeField },
  getCache,
  createContentDigest,
}) => {
  // Check if the node is a file and if it's a text file
  if (node.internal.type === 'File' && node.internal.mediaType === 'text/plain') {
    // Attempt to analyze the file content
    try {
      const analysisResult = await analyzeTextFile(node.absolutePath);
      // Create a new node field to store the analysis result
      createNodeField({
        node,
        name: 'analysisResult',
        value: analysisResult,
      });
    } catch (error) {
      // Handle errors during file analysis
      console.error(`Error analyzing file ${node.absolutePath}: ${error.message}`);
    }
  }
};

// Function to create a GraphQL query for retrieving file paths
exports.createPages = async ({
  graphql,
  actions: { createPage },
}) => {
  const result = await graphql(
    `
     query {
       allFile(filter: {extension: {eq: "txt"}}) {
         edges {
           node {
             fields {
               slug
             filePath
             }
             internal {
               type
               mediaType
             }
           }
         }
       }
     }
    `
  );

  // Check for errors in the GraphQL query
  if (result.errors) {
    throw new Error('GraphQL query error: ', result.errors);
  }

  // Iterate over the file nodes and create pages for each text file
  result.data.allFile.edges.forEach(({ node }) => {
    // Create a page for the file
    createPage({
      path: node.fields.slug,
      component: path.resolve('./src/templates/TextFileTemplate.js'),
      context: {
        // Data passed to the page query
        filePath: node.fields.filePath,
      },
    });
  });
};