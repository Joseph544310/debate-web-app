const express = require("express");
const router  = express.Router({mergeParams: true});
const Side = require('../models/side');
const Debate = require('../models/debate');

//create side
router.post('/', (req, res) => {
    
    try {
    // find debate
        Debate.findById(req.params.id, async (err, debate) => {
            if (err) {
                res.status(404);
                res.send("Debate not found");
            }

            // create side
            const newSide = new Side({
                name: req.body.name,
                votes: []
            });
            await newSide.save();

            // add side to debate
            debate.sides.push(newSide);
            debate.save();

            res.send("Success");
        })
    }
    catch{
        res.status(400);
        res.send("Failure");
    }

});

module.exports = router;