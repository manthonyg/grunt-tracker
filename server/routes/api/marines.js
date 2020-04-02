const express = require("express");
const router = express.Router();

// Load model
const Marine = require("../../models/Marine");
const Squad = require("../../models/Squad");

//handle data response and check for bad data returned
function validate(data, res) {
  if (data === null || data === undefined) {
    res.status(500).json({ error: "null or undefined data returned" });
  } else if (data.length === 0) {
    res.status(500).json({ error: "no data found" });
  } else {
    res.json(
      data.filter(
        pieceOfData => pieceOfData !== null && pieceOfData !== undefined
      )
    );
  }
}

// get all marine documents in marines collection
router.get("/", (req, res) => {
  Marine.find()
    .then(marines => validate(marines, res))
    .catch(err => console.log(err));
});

// search all marines in marines collection by last name
router.get(`/search/:marineSearch`, (req, res) => {
  console.log(req.params.marineSearch);
  Marine.find(
    {
      last: new RegExp(req.params.marineSearch, "i")
    },
    ["last", "rank"]
  )
    .then(marines => validate(marines, res))
    .catch(err => console.log(err));
});

// find marine by id
router.get("/:id", (req, res) => {
  Marine.findById(req.params.id)
    .then(marine => res.json(marine))
    .catch(err => res.status(404).json({ error: "no marine found" }));
});

// find marine by id and update accountability
router.put("/:id/update", (req, res) => {
  Marine.findByIdAndUpdate(req.params.id, {
    $set: { accountability: req.body }
  })
    .then(marine => res.json(marine))
    .catch(err => res.status(404).json({ error: "failed to update" }));
});

// find marine by id and update billet
router.put("/:id/updateBillet", (req, res) => {
  Marine.findByIdAndUpdate(req.params.id, req.body, { options: { new: true } })
    .then(marine => res.json(marine))
    .catch(err => res.status(404).json({ nomarinefound: "No Marine found" }));
});

// find marine by id and update edl
router.put("/:id/update/edl", (req, res) => {
  Marine.findByIdAndUpdate(req.params.id, {
    $set: {
      primary: req.body.primary,
      optics: req.body.optics,
      supplementary: req.body.supplementary
    }
  })
    .then(marine => res.json(marine))
    .catch(err => res.status(404).json({ err: "Failed to update" }));
});

// update marine appointments
router.post("/:id/appointments", (req, res) => {
  Marine.findByIdAndUpdate(
    req.params.id,
    {
      $push: {
        appointments: req.body
      }
    },
    {
      options: {
        new: true,
        upsert: true
      }
    }
  )
    .then(marine => res.json({ msg: "Updated successfully" }))
    .catch(err =>
      res.status(400).json({ error: "Unable to update the Database" })
    );
});

// update marine pft
router.put("/:id/body/pft", (req, res) => {
  Marine.findByIdAndUpdate(
    req.params.id,
    {
      $push: {
        "body.pft": req.body
      }
    },
    {
      options: {
        new: true,
        upsert: true
      }
    }
  )
    .then(marine => res.json({ msg: "Updated successfully" }))
    .catch(err =>
      res.status(400).json({ error: "Unable to update the Database" })
    );
});

// update marine cft
router.put("/:id/body/cft", (req, res) => {
  Marine.findByIdAndUpdate(
    req.params.id,
    {
      $push: {
        "body.cft": req.body
      }
    },
    {
      options: {
        new: true,
        upsert: true
      }
    }
  )
    .then(marine => res.json({ msg: "Updated successfully" }))
    .catch(err =>
      res.status(400).json({ error: "Unable to update the Database" })
    );
});

// update marine weapons
router.put("/:id/weapons", (req, res) => {
  Marine.findByIdAndUpdate(
    req.params.id,
    {
      $push: {
        weapons: req.body
      }
    },
    {
      options: {
        new: true,
        upsert: true
      }
    }
  )
    .then(marine => res.json({ msg: "Updated successfully" }))
    .catch(err =>
      res.status(400).json({ error: "Unable to update the Database" })
    );
});

// delete marine and all refs
router.delete("/:id/:squadId", (req, res) => {
  Marine.findByIdAndRemove(req.params.id, function(err, res) {
    if (err) console.log(err);
  });
  Squad.findByIdAndUpdate(req.params.squadId, {
    $pull: {
      "teams.teamOne": req.params.id,
      "teams.teamTwo": req.params.id,
      "teams.teamThree": req.params.id,
      "teams.teamHq": req.params.id,
      marines: req.params.id
    }
  })
    .then(marine =>
      res.json({ mgs: "Marine entry and refs deleted successfully" })
    )
    .catch(err => res.status(404).json({ error: "No such Marine" }));
});

module.exports = router;
