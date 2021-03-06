const express = require('express');
const router = express.Router({mergeParams: true});
const Debate = require('../models/debate');

router.get('/', (req, res) => {
    try {
        Debate.find({}, (err, allDebates) => {
            if (err) throw err;
            else {
                res.json({debates: allDebates})
            }
        });
    }
    catch {
        res.status(400);
        res.send("Failure");
    }
});

router.post('/', async (req, res) => {
    
    try {
        newDebate = new Debate({
            title: req.body.title,
            author: {
                id: req.user._id,
                username: req.user.username
            },
            sides: [],
            comments: []
        });

        await newDebate.save();
        res.json({
            id: newDebate._id
        });
    }
    catch{
        res.status(400);
        res.send("Failure");
    }
});

router.get('/:id', (req, res) => {
    try {
        Debate.findById(req.params.id, (err, debate) => {
            if (err) throw err;
            else {
                res.json({debate: debate})
            }
        });
    }
    catch {
        res.status(400);
        res.send("Failure");
    }
})

module.exports = router;