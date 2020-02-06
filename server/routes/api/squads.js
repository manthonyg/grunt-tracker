// routes/api/squads.js
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// load models
const Squad = require("../../models/Squad");
const Marine = require("../../models/Marine");

// route POST api/squads
// description create new squad
router.route("/").post((req, res) => {
  const company = req.body.company;
  const platoon = req.body.platoon;
  const squad = req.body.squad;
  const callsign = `${req.body.company}/${req.body.platoon}-${req.body.squad}`;

  const newSquad = new Squad({
    company,
    platoon,
    squad,
    callsign
  });
  newSquad
    .save()
    .then(marine => res.json({ msg: "Squad added successfully" }))
    .catch(err => res.status(400).json({ error: "Unable to add Squad" }));
});

// route GET api/squads
// description get all squads in collection
router.get("/", (req, res) => {
  Squad.find()
    .then(squads => res.json(squads))
    .catch(err => res.status(404).json({ nosquadsfound: "No Squads Found" }));
});

// route GET api/squads/:id
// description get squad by id
router.get("/:id", (req, res) => {
  Squad.findById(req.params.id)
    .populate([
      "teams.teamHq",
      "teams.teamOne",
      "teams.teamTwo",
      "teams.teamThree"
    ])
    .then(squad => res.json(squad))
    .catch(err => res.status(404).json({ error: "No Squad found" }));
});

// route GET api/squads/id/marines
// description Get all marines in the current squad BY REF
router.get("/:id/marines", (req, res) => {
  Squad.findById(req.params.id)
    .populate("marines")
    .then(team => res.json(team.marines))
    .catch(err => res.status(400).json({ error: "Unable to find team" }));
});

// route: PUT api/squads/id/teams/
// description: update teams
// services: squadServices/updateSquadById
router.put("/:id/teams/", (req, res) => {
  Squad.findByIdAndUpdate(req.params.id, req.body)
    .then(squad => res.json({ msg: "Squad added successfully" }))
    .catch(err => res.status(400).json({ error: "Unable to add Squad" }));
});

// route PUT id/teams/add
// description create a marine and assign id to teams/teamHq
router.route("/:id/teams/add").post((req, res) => {
  const id = mongoose.Types.ObjectId;

  const newMarine = new Marine({
    id: id,
    ...req.body
  });
  newMarine.save(function(err) {
    if (err) {
      console.log("error in newMarine.save", err);
      return res.json({ newMarine: newMarine });
    }
  });

  Squad.findByIdAndUpdate(
    req.params.id,
    { $push: { "teams.teamHq": newMarine.id, marines: newMarine.id } },
    { new: true }
  )
    .then(function(team) {
      res.json(team);
    })
    .catch(function(err) {
      res.json(err);
    });
});

// route GET api/squads/id/teams
// description populate all teams within the squad
router.get("/:id/teams", (req, res) => {
  Squad.findById(req.params.id)
    .populate([
      "teams.teamHq",
      "teams.teamOne",
      "teams.teamTwo",
      "teams.teamThree"
    ])
    .then(team => res.json(team))
    .catch(err => res.status(400).json({ error: "Unable to find team" }));
});

// route GET api/squads/:id
// description delete squad by id
router.delete("/:id", (req, res) => {
  Squad.findByIdAndRemove(req.params.id, function(err, res) {
    if (err) console.log(err);
    return console.log(res);
  })
    .then(squad => res.json({ mgs: "Squad deleted successfully" }))
    .catch(err =>
      res
        .status(404)
        .json({
          error: `Squad with req.params ${req.params} could not be deleted`
        })
    );
});

module.exports = router;
