const express = require('express');
const path = require('path');

const app = express();
const port = 3000;


app.use(express.static(path.join(__dirname, '../client')));


app.get('/manifest.json', (req, res) => {
  res.sendFile(path.join(__dirname, '../manifest.json'));
});


app.get('/assets/icons/:iconName', (req, res) => {
  const iconName = req.params.iconName;
  res.sendFile(path.join(__dirname, `../client/src/images/logo.png`));
});


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
