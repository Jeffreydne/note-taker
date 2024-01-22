//Import express and call the Router method
const router = require('express').Router();
// GET Route for retrieving notes
router.get('/notes', (req, res) => {
    console.info(`${req.method} request received for notes`);
    readFromFile('../db/db.json').then((data) => res.json(JSON.parse(data)));
  });
// TODO: POST Route for a new UX/UI tip
// POST Route for a new UX/UI tip
router.post('/notes', (req, res) => {
    console.info(`${req.method} request received to add a note`);
  
    const { username, topic, tip } = req.body;
  
    if (req.body) {
      const newNote = {
        username,
        tip,
        topic,
        tip_id: uuid(),
      };
  
      readAndAppend(newTip, '../db/db.json');
      res.json(`Note added successfully`);
    } else {
      res.error('Error in adding note');
    }
  });

// TODO: Export app
module.exports = router;