// 代码生成时间: 2025-09-11 13:21:26
// Import necessary modules
const { graphql, Link } = require('gatsby');
const path = require('path');

// Define a component for the data analysis page
const DataAnalysisPage = ({ pageContext }) => {
  // Extract data from context
  const { data, error } = pageContext;

  // Handle errors
  if (error) {
    return <div>Error loading data: {error.message}</div>;
  }

  // Render the data analysis page
  return (
    <div>
      <h1>Data Analysis</h1>
      {data && <div>{JSON.stringify(data)}</div>}
    </div>
  );
};

// Define the GraphQL query to fetch data
const query = graphql`
  query DataAnalysisQuery {
    allData {
      nodes {
        id
        value
        // Add any other fields you want to analyze
      }
    }
  }
`;

// Create a Gatsby page that uses the data analysis component
exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;
  const pageTemplate = path.resolve('src/templates/dataAnalysisTemplate.js');
  const result = await graphql(query);

  // Check for errors in the query
  if (result.errors) {
    throw result.errors;
  }

  const data = result.data.allData.nodes;

  // Create a new page for each data item
  data.forEach((item, index) => {
    createPage({
      path: `/data-analysis/${index + 1}`,
      component: pageTemplate,
      context: {
        id: item.id,
        data: item,
      },
    });
  });
};

// Export the page component
module.exports = DataAnalysisPage;

// Export the page template
const dataAnalysisTemplate = (props) => {
  // Destructure props
  const { data } = props.pageContext;

  // Render the template with data
  return (
    <div>
      <h1>Data Analysis for {data.id}</h1>
      <div>{JSON.stringify(data)}</div>
    </div>
  );
};

// Export the template
module.exports = dataAnalysisTemplate;