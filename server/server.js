const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Serve static files from the 'client' directory
app.use(express.static(path.join(__dirname, '../client')));

// Serve manifest.json from the root URL
app.get('/manifest.json', (req, res) => {
  res.sendFile(path.join(__dirname, '../manifest.json'));
});

// Serve icons from the '/assets/icons' directory
app.get('/assets/icons/:iconName', (req, res) => {
  const iconName = req.params.iconName;
  res.sendFile(path.join(__dirname, `../client/src/images/logo.png`));
});

// Serve other routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
