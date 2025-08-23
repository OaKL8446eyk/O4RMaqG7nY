// 代码生成时间: 2025-08-23 21:09:21
 * It includes error handling and is structured for easy maintenance and scalability.
 */

const axios = require('axios'); // Axios for making HTTP requests
const express = require('express'); // Express for creating the server

// Create an express application
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse urlencoded bodies
app.use(express.urlencoded({ extended: true }));

// Define a port to run the server on
const PORT = process.env.PORT || 8000;

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the Gatsby HTTP Request Handler!');
});

// HTTP request handler
app.post('/request', async (req, res) => {
  // Extract URL and method from the request body
  const { url, method } = req.body;

  // Validate inputs
  if (!url || !method) {
    return res.status(400).json({
      error: 'Invalid request, URL and method are required.'
    });
  }

  try {
    // Make the HTTP request using Axios
    const response = await axios({
      method: method,
      url: url,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Send the response back to the client
    res.status(200).json(response.data);
  } catch (error) {
    // Handle any errors that occur during the HTTP request
    console.error('Error making HTTP request:', error);
    res.status(500).json({
      error: 'An error occurred while making the HTTP request.'
    });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
