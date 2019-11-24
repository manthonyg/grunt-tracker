// routes/api/books.js

const express = require('express');
const router = express.Router();

// Load model
const Marine = require('../../models/Marine');

// @route GET api/marines/test
// @description tests marines route
// @access Public
router.get('/test', (req, res) => res.send('marine route testing!'));

// @route GET api/marines
// @description Get all marines
// @access Public
router.get('/', (req, res) => {
  Marine.find()
    .then(marines => res.json(marines))
    .catch(err => res.status(404).json({ nomarinesfound: 'No Marines found' }));
});

// @route GET api/marines/:id
// @description Get single marine by id
// @access Public
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

// @route GET api/marines/:id
// @description Update marines
// @access Public
router.put('/:id', (req, res) => {
  Marine.findByIdAndUpdate(req.params.id, req.body)
    .then(marine => res.json({ msg: 'Updated successfully' }))
    .catch(err =>
      res.status(400).json({ error: 'Unable to update the Database' })
    );
});

// @route GET api/marines/:id
// @description Delete marine by id
// @access Public
router.delete('/:id', (req, res) => {
  Marine.findByIdAndRemove(req.params.id, req.body)
    .then(marine => res.json({ mgs: 'Marine entry deleted successfully' }))
    .catch(err => res.status(404).json({ error: 'No such Marine' }));
});

module.exports = router;
