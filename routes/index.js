// Routes.index
//Import express and call the Router method
const router = require('express').Router();
//require npm uuid to for a unique ID
const { v4: uuidv4 } = require('uuid');
//require utility file to get and addend onbjects from database
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');

// GET Route for retrieving notes
router.get('/notes', (req, res) => {
    console.info(`${req.method} request received for notes`);
    readFromFile('../db/db.json').then((data) => res.json(JSON.parse(data)));
  });

// POST Route for a new note
router.post('/notes', (req, res) => {
    console.info(`${req.method} request received to add a note`);
  
    const { title, text } = req.body;
  
    if (req.body) {
      const newNote = {
        title,
        text,
        note_id: uuidv4(),
      };
  
      readAndAppend(newNote, '../db/db.json');
      res.json(`Note added successfully`);
    } else {
      res.error('Error in adding note');
    }
  });

// TODO: Export app
module.exports = router;