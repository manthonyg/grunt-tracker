const express = require('express');
const router = express.Router();

// Load model
const Marine = require('../../models/Marine');

// Get all Marine documents
router.get('/', (req, res) => {
  Marine
    .find()
    .then(marines => res.json(marines))
    .catch(err => res.status(404).json({nomarinesfound: 'No Marines found'}));
});

// search marines by last name
router.get(`/search/:marineSearch`, (req, res) => {
  console.log(req.params.marineSearch)
  Marine.find({
    last: new RegExp(req.params.marineSearch, 'i')
  }, ['last', 'rank']).then(marines => {
    if (marines === null || marines === undefined) {
      res
        .status(500)
        .json({"error": "bad data returned"})
    } else if (marines.length === 0) {
      res
        .status(404)
        .json({"error": "no marines found"})
    } else {
      res.json(marines.filter(x => x !== null && x !== undefined))
    }
  }).catch(err => console.log(err))
});

// find by id
router.get('/:id', (req, res) => {
  Marine
    .findById(req.params.id)
    .then(marine => res.json(marine))
    .catch(err => res.status(404).json({nomarinefound: 'No Marine found'}));
});

// create a new marine
router
  .route('/')
  .post((req, res) => {
    const first = req.body.first
    const last = req.body.last
    const birthdate = Date.parse(req.body.birth_date)
    const rank = req.body.rank
    const squad = req.body.squad
    const edipi = req.body.edipi

    const newMarine = new Marine({
      first,
      last,
      birthdate,
      rank,
      squad,
      edipi
    })
    newMarine
      .save()
      .then(marine => res.json({msg: 'Marine added successfully'}))
      .catch(err => res.status(400).json({error: 'Unable to add Marine'}));
  });

// update marine appointments
router.put('/:id/appointments', (req, res) => {
  Marine.findByIdAndUpdate(req.params.id, {
    $push: {
      appointments: req.body
    }
  }, {
      options: {
        new: true,
        upsert: true
      }
    })
    .then(marine => res.json({msg: 'Updated successfully'}))
    .catch(err => res.status(400).json({error: 'Unable to update the Database'}));
});

// update marine pft
router.put('/:id/body/pft', (req, res) => {
  Marine.findByIdAndUpdate(req.params.id, {
    $push: {
      'body.pft': req.body
    }
  }, {
      options: {
        new: true,
        upsert: true
      }
    })
    .then(marine => res.json({msg: 'Updated successfully'}))
    .catch(err => res.status(400).json({error: 'Unable to update the Database'}));
});

// update marine cft
router.put('/:id/body/cft', (req, res) => {
  Marine.findByIdAndUpdate(req.params.id, {
    $push: {
      'body.cft': req.body
    }
  }, {
      options: {
        new: true,
        upsert: true
      }
    })
    .then(marine => res.json({msg: 'Updated successfully'}))
    .catch(err => res.status(400).json({error: 'Unable to update the Database'}));
});

// update marine weapons
router.put('/:id/weapons', (req, res) => {
  Marine.findByIdAndUpdate(req.params.id, {
    $push: {
      weapons: req.body
    }
  }, {
      options: {
        new: true,
        upsert: true
      }
    })
    .then(marine => res.json({msg: 'Updated successfully'}))
    .catch(err => res.status(400).json({error: 'Unable to update the Database'}));
});

// delete marine and all refs
router.delete('/:id/:squadId', (req, res) => {
  Marine
    .findByIdAndRemove(req.params.id, function(err, res) {
      if (err) console.log(err)
    })
  Squad
    .findByIdAndUpdate(req.params.squadId, 
      { $pull: {'teams.teamOne': req.params.id,
                'teams.teamTwo': req.params.id,
                'teams.teamThree': req.params.id,
                'teams.teamHq': req.params.id,
                'marines': req.params.id}})
    .then(marine => res.json({mgs: 'Marine entry and refs deleted successfully'}))
    .catch(err => res.status(404).json({error: 'No such Marine'}));
});

module.exports = router;
