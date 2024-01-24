// Routes.index
//Import express and call the Router method
const router = require('express').Router();
//require npm uuid to for a unique ID
const { v4: uuidv4 } = require('uuid');
//require utility file to get and addend onbjects from database, and require fs for router.delete
const { readFromFile, writeToFile,readAndAppend } = require('../helpers/fsUtils');
const fs = require('fs');

// GET Route for retrieving notes
router.get('/notes', (req, res) => {
    console.info(`${req.method} request received for notes`);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
  });
// Delete Route to delete a note
router.delete('/notes/:id', (req,res) => {
  
  console.info(`${req.method} request received to delete a note`);
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      console.log(req.params.id);
      const index = parsedData.findIndex((item) => item.id === req.params.id);
      console.log(index);
      parsedData.splice(index, 1);
      writeToFile('./db/db.json', parsedData);
      res.send('Deleted');
    }
  });
 
})

// POST Route for a new note
router.post('/notes', (req, res) => {
    console.info(`${req.method} request received to add a note`);
  
    const { title, text } = req.body;
  
    if (req.body) {
      const newNote = {
        title,
        text,
        id: uuidv4(),
      };
  
      readAndAppend(newNote, './db/db.json');
      res.json(`Note added successfully`);
    } else {
      res.error('Error in adding note');
    }
  });

// Export
module.exports = router;