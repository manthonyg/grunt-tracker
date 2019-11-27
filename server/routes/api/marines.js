// routes/api/books.js

const express = require('express');
const router = express.Router();

// Load model
const Marine = require('../../models/Marine');

// test
router.get('/test', (req, res) => res.send('marine route testing!'));

// Get all Marine documents
router.get('/', (req, res) => {
  Marine.find()
    .then(marines => res.json(marines))
    .catch(err => res.status(404).json({ nomarinesfound: 'No Marines found' }));
});

// Find by id
router.get('/:id', (req, res) => {
  Marine.findById(req.params.id)
    .then(marine => res.json(marine))
    .catch(err => res.status(404).json({ nomarinefound: 'No Marine found' }));
});


// @route GET api/marines
// @description add/save marine
// @access Public
router.post('/', (req, res) => {
  Marine.create(req.body)
    .then(marine => res.json({ msg: 'Marine added successfully' }))
    .catch(err => res.status(400).json({ error: 'Unable to add Marine' }));
});


// Update Marine document
router.put('/:id', (req, res) => {
  Marine.findByIdAndUpdate(req.params.id, req.body)
    .then(book => res.json({ msg: 'Updated successfully' }))
    .catch(err =>
      res.status(400).json({ error: 'Unable to update the Database' })
    );
});

// Delete Marine
router.delete('/:id', (req, res) => {
  Marine.findByIdAndRemove(req.params.id, req.body)
    .then(marine => res.json({ mgs: 'Marine entry deleted successfully' }))
    .catch(err => res.status(404).json({ error: 'No such Marine' }));
});

module.exports = router;
