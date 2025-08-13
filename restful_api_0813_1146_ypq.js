// 代码生成时间: 2025-08-13 11:46:57
const express = require('express');
const cors = require('cors');
const app = express();

// Enable CORS
app.use(cors());

// Enable JSON body parsing
app.use(express.json());

// Define a port for the server to listen on
const PORT = process.env.PORT || 3000;

// Mock data for demonstration purposes
let users = [{
  id: 1,
  name: 'John Doe',
  email: 'john@example.com'
}, {
  id: 2,
  name: 'Jane Doe',
  email: 'jane@example.com'
}];

// GET endpoint to fetch all users
app.get('/api/users', (req, res) => {
  try {
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// GET endpoint to fetch a single user by ID
app.get('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// POST endpoint to create a new user
app.post('/api/users', (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    email: req.body.email
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT endpoint to update an existing user
app.put('/api/users/:id', (req, res) => {
  const index = users.findIndex(u => u.id === parseInt(req.params.id));
  if (index >= 0) {
    users[index] = {
      id: parseInt(req.params.id),
      name: req.body.name,
      email: req.body.email
    };
    res.status(200).json(users[index]);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// DELETE endpoint to delete a user
app.delete('/api/users/:id', (req, res) => {
  const index = users.findIndex(u => u.id === parseInt(req.params.id));
  if (index >= 0) {
    users.splice(index, 1);
    res.status(200).json({ message: 'User deleted' });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(500).json({ message: 'An unexpected error occurred' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
