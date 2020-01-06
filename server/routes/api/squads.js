// routes/api/squads.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Load Squad model
const Squad = require('../../models/Squad');
const Marine = require('../../models/Marine');
// route GET api/squads/test description tests squads route
router.get('/test', (req, res) => res.send('squad route testing'));

// route GET api/squads description Get all squads
router.get('/', (req, res) => {
  Squad
    .find()
    .then(squads => res.json(squads))
    .catch(err => res.status(404).json({nosquadsfound: 'No Squads Found'}));
});

// route GET api/squads/id/marines 
//description Get all marines in the current squad BY REF

router.get('/:id/marines', (req, res) => {
  Squad
    .findById(req.params.id)
    .populate('marines')
    .then(team => res.json(team.marines))
    .catch(err => res.status(400).json({error: 'Unable to find team'}));
});

// route PUT api/squads/id/teams/ 
// description add/save team
router.post('/:id/teams/', (req, res) => {
  Squad
    .findByIdAndUpdate(req.params.id, {
    $set: {
      'teams': req.body
    }
  })
    .then(squad => res.json({msg: 'Squad added successfully'}))
    .catch(err => res.status(400).json({error: 'Unable to add Squad'}));
});

// route: PUT api/squads/id/teams/ 
//description: update the squad table of organization
router.put('/:id/teams/', (req, res) => {
  Squad
    .findByIdAndUpdate(req.params.id, {
    $set: {
      'teams': req.body
    }
  })
    .then(squad => res.json({msg: 'Squad updated successfully'}))
    .catch(err => res.status(400).json({error: 'Unable to add Squad'}));
});

// route PUT api/squads/id/teams/unplaced create a new marine and place into
// teams/unplaced
router.route('/:id/teams/add')
.post((req, res) => {
const id = mongoose.Types.ObjectId

  const newMarine = new Marine({
    id: id,
    ...req.body
  })
  newMarine.save(function(err){
    if(err){
         console.log('error in newMarine.save', err);
         return res.json({newMarine: newMarine})
    }})
  

  Squad.findByIdAndUpdate(req.params.id, {$push:
    {'teams.team_hq': newMarine.id,
    'marines': newMarine.id }}, {new: true})
    .then(function (team) {
      res.json(team)
    })
    .catch(function (err) {
      res.json(err)
    })
});


// route GET api/squads/id/teams
// description get teams array of current squad
router.get('/:id/teams', (req, res) => {
  Squad
    .findById(req.params.id)
    .populate(['teams.team_hq', 'teams.team_one', 'teams.team_two', 'teams.team_three'])
    .then(team => res.json(team))
    .catch(err => res.status(400).json({error: 'Unable to find team'}));
});

// route POST api/squads description create new squad
router
  .route('/')
  .post((req, res) => {
    const company = req.body.company
    const platoon = req.body.platoon
    const squad = req.body.squad
    const callsign = `${req.body.company}/${req.body.platoon}-${req.body.squad}`

    const newSquad = new Squad({
      company, 
      platoon, 
      squad, 
      callsign});
    newSquad.save()
      .then(marine => res.json({msg: 'Squad added successfully'}))
      .catch(err => res.status(400).json({error: 'Unable to add Squad'}));
  });

// route GET api/squads/:id description get squad by id
router.get('/:id', (req, res) => {
  Squad
    .findById(req.params.id)
    .then(squad => res.json(squad))
    .catch(err => res.status(404).json({error: 'No Squad found'}));
});

// route GET api/squads/:id description delete squad by id
router.delete('/:id', (req, res) => {
  Squad
    .findByIdAndRemove(req.params.id, req.body)
    .then(squad => res.json({mgs: 'Squad deleted successfully'}))
    .catch(err => res.status(404).json({error: 'No Squad Found'}));
});



module.exports = router;
