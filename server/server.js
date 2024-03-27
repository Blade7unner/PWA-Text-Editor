const express = require('express');
const path = require('path'); 

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.static(path.join(__dirname, '../client')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get('/me', (req, res) => {
  res.send('Hello, it seems like you accessed the "/me" route!');
});

require('./routes/htmlRoutes')(app);

app.listen(PORT, () => console.log(`Now listening on port: ${PORT}`));
