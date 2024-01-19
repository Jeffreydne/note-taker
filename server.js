const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3011;

// require routes file
const api = require('./routes/index');

const app = express();

// Parse JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//get static assets from the public folder
app.use(express.static('public'));

// Send all requests that begin with /api to index.js in the routes folder
app.use('/api', api);

// GET route for the homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET route for the notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);