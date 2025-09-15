// 代码生成时间: 2025-09-15 19:26:10
 * It includes error handling and follows best practices for code maintainability and extensibility.
 */

// Import necessary modules
const express = require('express');
const cors = require('cors');

// Initialize the express app
const app = express();
const PORT = process.env.PORT || 8000;

// Enable CORS for all origins
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Database simulation (for demonstration purposes, in real scenarios use a proper database)
let dataStore = [];

// Helper function to generate unique ID
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// POST endpoint to create a new resource
app.post('/api/resource', (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Name is required.' });
    }
    const newResource = { id: generateId(), name };
    dataStore.push(newResource);
    res.status(201).json(newResource);
  } catch (error) {
    res.status(500).json({ error: 'Server error.' });
  }
});

// GET endpoint to read all resources
app.get('/api/resource', (req, res) => {
  res.json(dataStore);
});

// GET endpoint to read a single resource by ID
app.get('/api/resource/:id', (req, res) => {
  const { id } = req.params;
  const resource = dataStore.find(r => r.id === id);
  if (resource) {
    res.json(resource);
  } else {
    res.status(404).json({ error: 'Resource not found.' });
  }
});

// PUT endpoint to update a resource by ID
app.put('/api/resource/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Name is required.' });
  }
  const index = dataStore.findIndex(r => r.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Resource not found.' });
  }
  dataStore[index].name = name;
  res.json(dataStore[index]);
});

// DELETE endpoint to delete a resource by ID
app.delete('/api/resource/:id', (req, res) => {
  const { id } = req.params;
  const index = dataStore.findIndex(r => r.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Resource not found.' });
  }
  dataStore.splice(index, 1);
  res.status(204).end();
});

// Error handling middleware for 404 routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found.' });
});

// Error handling middleware for 500 errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something failed!' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});