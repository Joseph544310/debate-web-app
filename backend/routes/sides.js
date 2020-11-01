const express = require("express");
const router  = express.Router({mergeParams: true});
const Side = require('../models/side');
const Debate = require('../models/debate');


// get sides
router.get('/', (req, res) => {
    try{
        Debate.findById(req.params.id, async (err, debate) => {
            if (err) {
                res.status(404);
                res.send("Debate not found");
            }

            const sides = []
            for (const [index, id] of debate.sides.entries()) {
                await Side.findById(id, (err, side) => {
                    if (err) throw err;
                    sides.push(side)
                    
                    //when last callback is done, return
                    if (index === debate.sides.length - 1) {
                        res.json({
                            sides: sides
                        })
                    }
                }
                );
            }        
        })
    }
    catch {
        res.status(400);
        res.send("Failure")
    }
})
// create side
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

// add vote
router.post('/:side_id/vote', (req, res) => {
    try {
        // find debate
        Debate.findById(req.params.id, async (err, debate) => {
            if (err) {
                res.status(404);
                res.send("Debate not found");
            }

            // remove user vote from every side of the debate
            for( const side_id of debate.sides) {
                await Side.findByIdAndUpdate(side_id, {$pull: {votes: req.user._id}},
                     (err, res) => {
                        if (err) throw err;
                    })            
            }

            // add user vote to requested side
            Side.findById(req.params.side_id, (err, side) => {
                if (err) throw err;
                side.votes.push(req.user._id);
                side.save();
            })

            res.send("Success");
        })
    }
    catch{
        res.status(400);
        res.send("Failure");
    }
})

module.exports = router;