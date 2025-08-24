// 代码生成时间: 2025-08-25 04:40:40
const fs = require('fs');
const os = require('os');

// Gatsby API for creating a node.
exports.onCreateNode = ({node, actions}) => {
  // Your code here
};

// Gatsby API for creating pages dynamically.
exports.createPages = async ({graphql, actions}) => {
  // Your code here
};

// Gatsby Node API for sourcing nodes.
exports.sourceNodes = async (
  {actions, createContentDigest},
  configOptions
) => {
  try {
    // Collect system performance metrics.
    const {cpus, freemem, totalmem, uptime} = os;

    // Create a new node.
    const performanceMetricNode = {
      id: createContentDigest(JSON.stringify({cpus, freemem, totalmem, uptime})),
      parent: null,
      children: [],
      internal: {
        type: 'PerformanceMetric',
        contentDigest: createContentDigest(JSON.stringify({cpus, freemem, totalmem, uptime})),
      },
      performance: {
        cpus: cpus().length,
        freeMemory: freemem(),
        totalMemory: totalmem(),
        uptime: uptime(),
      },
    };

    // Add the node to Gatsby's GraphQL.
    await actions.createNode(performanceMetricNode);
  } catch (error) {
    // Handle errors.
    console.error('Error fetching system performance metrics:', error);
  }
};

// Description of the PerformanceMetric node type.
exports.onCreateDevServer = ({app}) => {
  // Add a route to handle requests for system performance data.
  app.get('/system-performance', (req, res) => {
    try {
      const {cpus, freemem, totalmem, uptime} = os;
      res.json({
        cpus: cpus().length,
        freeMemory: freemem(),
        totalMemory: totalmem(),
        uptime: uptime(),
      });
    } catch (error) {
      console.error('Error sending system performance data:', error);
      res.status(500).send('Internal Server Error');
    }
  });
};