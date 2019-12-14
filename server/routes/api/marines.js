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

// Get all Marine last names
router.get('/last', (req, res) => {
  Marine.find({}, {last: 1})
    .then(marines => res.json(marines))
    .catch(err => res.status(404).json({ nomarinesfound: 'No Marines found' }));
});

// Find by id
router.get('/:id', (req, res) => {
  Marine.findById(req.params.id)
    .then(marine => res.json(marine))
    .catch(err => res.status(404).json({ nomarinefound: 'No Marine found' }));
});


// Add a Marine or Group
router.post('/', (req, res) => {
  Marine.create(req.body)
    .then(marine => res.json({ msg: 'Marine added successfully' }))
    .catch(err => res.status(400).json({ error: 'Unable to add Marine' }));
});


// Update Marine appointments
router.put('/:id/appointments', (req, res) => {
  console.log(req)
  Marine.findByIdAndUpdate(req.params.id, {$push: {appointments: req.body}}, {options: {new: true, upsert: true}})
    .then(marine => res.json({ msg: 'Updated successfully' }))
    .catch(err =>
      res.status(400).json({ error: 'Unable to update the Database' })
    );
});

// Update Marine PFT
router.put('/:id/body/pft', (req, res) => {
  console.log(req)
  Marine.findByIdAndUpdate(req.params.id, {$push: {'body.pft': req.body}}, {options: {new: true, upsert: true}})
    .then(marine => res.json({ msg: 'Updated successfully' }))
    .catch(err =>
      res.status(400).json({ error: 'Unable to update the Database' })
    );
});

// Update Marine CFT
router.put('/:id/body/cft', (req, res) => {
  console.log(req)
  Marine.findByIdAndUpdate(req.params.id, {$push: {'body.cft': req.body}}, {options: {new: true, upsert: true}})
    .then(marine => res.json({ msg: 'Updated successfully' }))
    .catch(err =>
      res.status(400).json({ error: 'Unable to update the Database' })
    );
});


// Update Marine weapons
router.put('/:id/weapons', (req, res) => {
  console.log(req)
  Marine.findByIdAndUpdate(req.params.id, {$push: {weapons: req.body}}, {options: {new: true, upsert: true}})
    .then(marine => res.json({ msg: 'Updated successfully' }))
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
