// routes/api/books.js

const express = require('express');
const router = express.Router();

// Load Book model
const Squad = require('../../models/Squad');

// @route GET api/books/test
// @description tests books route
// @access Public
router.get('/test', (req, res) => res.send('squad route testing'));

// @route GET api/books
// @description Get all books
// @access Public
router.get('/', (req, res) => {
  Squad.find()
    .then(squads => res.json(squads))
    .catch(err => res.status(404).json({ nosquadsfound: 'No Squads Found' }));
});

// @route GET api/books
// @description add/save book
// @access Public
router.post('/', (req, res) => {
  Squad.create(req.body)
    .then(squad => res.json({ msg: 'Squad added successfully' }))
    .catch(err => res.status(400).json({ error: 'Unable to add Squad' }));
});

// @route GET api/books/:id
// @description Get single book by id
// @access Public
router.get('/:id', (req, res) => {
  Squad.findById(req.params.id)
    .then(squad => res.json(squad))
    .catch(err => res.status(404).json({ nobookfound: 'No Book found' }));
});


// @route GET api/books/:id
// @description Delete book by id
// @access Public
router.delete('/:id', (req, res) => {
  Squad.findByIdAndRemove(req.params.id, req.body)
    .then(squad => res.json({ mgs: 'Squad deleted successfully' }))
    .catch(err => res.status(404).json({ error: 'No Squad Found' }));
});

module.exports = router;
