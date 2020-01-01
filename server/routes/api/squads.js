// routes/api/squads.js
const express = require('express');
const router = express.Router();

// Load Squad model
const Squad = require('../../models/Squad');

// route GET api/squads/test
// description tests squads route
router.get('/test', (req, res) => res.send('squad route testing'));

// route GET api/squads
// description Get all squads
router.get('/', (req, res) => {
  Squad.find()
    .then(squads => res.json(squads))
    .catch(err => res.status(404).json({ nosquadsfound: 'No Squads Found' }));
});

// route PUT api/squads/id/teams/
// description add/save team
router.post('/:id/teams/', (req, res) => {
  Squad.findByIdAndUpdate(req.params.id, {$set: {'teams': req.body}})
    .then(squad => res.json({ msg: 'Squad added successfully' }))
    .catch(err => res.status(400).json({ error: 'Unable to add Squad' }));
});

// route PUT api/squads/id/teams/update
// description add/save squad
router.put('/:id/teams/', (req, res) => {
  Squad.findByIdAndUpdate(req.params.id, {$set: {'teams': req.body}})
    .then(squad => res.json({ msg: 'Squad updated successfully' }))
    .catch(err => res.status(400).json({ error: 'Unable to add Squad' }));
});

// route PUT api/squads/id/teams/unplaced
// create a new marine and place into teams/unplaced
router.post('/:id/teams/unplaced', (req, res) => {
  Squad.findByIdAndUpdate(req.params.id, {$push: {'teams.unplaced': req.body}})
    .then(squad => res.json({ msg: 'Squad added successfully' }))
    .catch(err => res.status(400).json({ error: 'Unable to add Squad' }));
});

// router.put('/:id/teams/team-one', (req, res) => {
//   Squad.findByIdAndUpdate(req.params.id, {$push: {'teams.team_one': req.body}})
//     .then(squad => res.json({ msg: 'Squad added successfully' }))
//     .catch(err => res.status(400).json({ error: 'Unable to add Squad' }));
// });

// router.put('/:id/teams/team-two', (req, res) => {
//   Squad.findByIdAndUpdate(req.params.id, {$push: {'teams.team_two': req.body}})
//     .then(squad => res.json({ msg: 'Squad added successfully' }))
//     .catch(err => res.status(400).json({ error: 'Unable to add Squad' }));
// });

// router.put('/:id/teams/team-three', (req, res) => {
//   Squad.findByIdAndUpdate(req.params.id, {$push: {'teams.team_three': req.body}})
//     .then(squad => res.json({ msg: 'Squad added successfully' }))
//     .catch(err => res.status(400).json({ error: 'Unable to add Squad' }));
// });

// router.put('/:id/teams/team-hq', (req, res) => {
//   Squad.findByIdAndUpdate(req.params.id, {$push: {'teams.team_hq': req.body}}, {options: {new: true, upsert: true}})
//     .then(squad => res.json({ msg: 'Squad added successfully' }))
//     .catch(err => res.status(400).json({ error: 'Unable to add Squad' }));
// });

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


// route POST api/squads 
// description create new squad
router.post('/', (req, res) => {
  Squad.create(req.body)
    .then(marine => res.json({ msg: 'Squad added successfully' }))
    .catch(err => res.status(400).json({ error: 'Unable to add Squad' }));
});

// route GET api/squads/:id
// description get squad by id
router.get('/:id', (req, res) => {
  Squad.findById(req.params.id)
    .then(squad => res.json(squad))
    .catch(err => res.status(404).json({ error: 'No Squad found' }));
});

router.get('/show-marine/:id/', (req, res) => {
  Squad.findById(req.params.id, {}, {'teams' : 1}, function(err, res) {
    if (err) {
      res.status(400)
    }
    if (res) {
      res.map(r => r).flat()
    }
  })
    .then(marine => res.json(marine))
    .catch(err => res.status(404).json({ nomarinefound: 'No Marine found' }));
});

// route GET api/squads/:id
// description delete squad by id
router.delete('/:id', (req, res) => {
  Squad.findByIdAndRemove(req.params.id, req.body)
    .then(squad => res.json({ mgs: 'Squad deleted successfully' }))
    .catch(err => res.status(404).json({ error: 'No Squad Found' }));
});

module.exports = router;
