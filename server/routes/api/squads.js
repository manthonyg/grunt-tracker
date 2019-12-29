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
router.put('/:id/teams/add', (req, res) => {
  Squad.findByIdAndUpdate(req.params.id, {$push: {'teams.unplaced': req.body}})
    .then(squad => res.json({ msg: 'Squad added successfully' }))
    .catch(err => res.status(400).json({ error: 'Unable to add Squad' }));
});

router.put('/:id/teams/update', (req, res) => {
  Squad.findByIdAndUpdate(req.params.id, {$set: {'teams': req.body}})
    .then(squad => res.json({ msg: 'Squad updated successfully' }))
    .catch(err => res.status(400).json({ error: 'Unable to add Squad' }));
});


router.put('/:id/teams/unplaced', (req, res) => {
  Squad.findByIdAndUpdate(req.params.id, {$push: {'teams.unplaced': req.body}})
    .then(squad => res.json({ msg: 'Squad added successfully' }))
    .catch(err => res.status(400).json({ error: 'Unable to add Squad' }));
});

router.put('/:id/teams/team-one', (req, res) => {
  Squad.findByIdAndUpdate(req.params.id, {$push: {'teams.team_one': req.body}})
    .then(squad => res.json({ msg: 'Squad added successfully' }))
    .catch(err => res.status(400).json({ error: 'Unable to add Squad' }));
});

router.put('/:id/teams/team-two', (req, res) => {
  Squad.findByIdAndUpdate(req.params.id, {$push: {'teams.team_two': req.body}})
    .then(squad => res.json({ msg: 'Squad added successfully' }))
    .catch(err => res.status(400).json({ error: 'Unable to add Squad' }));
});

router.put('/:id/teams/team-three', (req, res) => {
  Squad.findByIdAndUpdate(req.params.id, {$push: {'teams.team_three': req.body}})
    .then(squad => res.json({ msg: 'Squad added successfully' }))
    .catch(err => res.status(400).json({ error: 'Unable to add Squad' }));
});

router.put('/:id/teams/team-hq', (req, res) => {
  Squad.findByIdAndUpdate(req.params.id, {$push: {'teams.team_hq': req.body}}, {options: {new: true, upsert: true}})
    .then(squad => res.json({ msg: 'Squad added successfully' }))
    .catch(err => res.status(400).json({ error: 'Unable to add Squad' }));
});

router.get('/:id/teams', (req, res) => {
  Squad.findById(req.params.id, {'teams': 1}, function(err, teams) {
    if (err) {
      res.status(500)
    }
    if (teams) {

    }
  })
  .then(team => res.json(team))
  .catch(err => res.status(400).json({ error: 'Unable to find team' }));
});

router.get('/:id/teams/team-one', (req, res) => {
  Squad.findById(req.params.id, {'teams.team_one.last': 1, 'team_one.id': 1})
    .then(team => res.json(team))
    .catch(err => res.status(400).json({ error: 'Unable to find team' }));
});

router.get('/:id/team-two', (req, res) => {
Squad.findById(req.params.id, {'teams.team_two.last': 1, 'team_two.id': 1})
    .then(team => res.json(team))
    .catch(err => res.status(400).json({ error: 'Unable to find team' }));
});
router.get('/:id/team-three', (req, res) => {
Squad.findById(req.params.id, {'teams.team_three.last': 1, 'team_three.id': 1})
    .then(team => res.json(team))
    .catch(err => res.status(400).json({ error: 'Unable to find team' }));
});
router.get('/:id/team-hq', (req, res) => {
Squad.findById(req.params.id, {'teams.team_hq.last': 1, 'team_hq.id': 1})
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
