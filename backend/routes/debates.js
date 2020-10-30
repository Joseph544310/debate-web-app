const express = require('express');
const router = express.Router({mergeParams: true});
const Debate = require('../models/debate');

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
        res.send("Success");
    }
    catch{
        res.status(400);
        res.send("Failure");
    }
});

module.exports = router;