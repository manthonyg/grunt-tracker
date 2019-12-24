// routes/api/squads.js

const express = require('express');
const router = express.Router();

// Load Squad model
const Squad = require('../../models/Squad');

// @route GET api/squads/test
// @description tests squads route
// @access Public
router.get('/test', (req, res) => res.send('squad route testing'));

// @route GET api/squads
// @description Get all squads
// @access Public
router.get('/', (req, res) => {
  Squad.find()
    .then(squads => res.json(squads))
    .catch(err => res.status(404).json({ nosquadsfound: 'No Squads Found' }));
});

// @route GET api/squads
// @description add/save squad
// @access Public
router.put('/:id/team-one', (req, res) => {
  Squad.findByIdAndUpdate(req.params.id, {$set: {'team_one': req.body}})
    .then(squad => res.json({ msg: 'Squad added successfully' }))
    .catch(err => res.status(400).json({ error: 'Unable to add Squad' }));
});

router.put('/:id/team-two', (req, res) => {
  Squad.findByIdAndUpdate(req.params.id, {$set: {'team_two': req.body}})
    .then(squad => res.json({ msg: 'Squad added successfully' }))
    .catch(err => res.status(400).json({ error: 'Unable to add Squad' }));
});

router.get('/:id/team-one', (req, res) => {
  Squad.findById(req.params.id, {'team_one.last': 1, '_id': 0})
    .then(team => res.json(team))
    .catch(err => res.status(400).json({ error: 'Unable to find team' }));
});

router.get('/:id/team-two', (req, res) => {
  Squad.findById(req.params.id, {'team_two.last': 1, '_id' : 0})
    .then(team => res.json(team))
    .catch(err => res.status(400).json({ error: 'Unable to find team' }));
});





// Add a Squad or Group
router.post('/', (req, res) => {
  Squad.create(req.body)
    .then(marine => res.json({ msg: 'Squad added successfully' }))
    .catch(err => res.status(400).json({ error: 'Unable to add Squad' }));
});

// @route GET api/squads/:id
// @description get squad by id
// @access Public
router.get('/:id', (req, res) => {
  Squad.findById(req.params.id)
    .then(squad => res.json(squad))
    .catch(err => res.status(404).json({ error: 'No Squad found' }));
});


// @route GET api/squads/:id
// @description delete squad by id
// @access Public
router.delete('/:id', (req, res) => {
  Squad.findByIdAndRemove(req.params.id, req.body)
    .then(squad => res.json({ mgs: 'Squad deleted successfully' }))
    .catch(err => res.status(404).json({ error: 'No Squad Found' }));
});

module.exports = router;
