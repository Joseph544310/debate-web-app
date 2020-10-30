const express = require("express");
const router  = express.Router({mergeParams: true});
const Side = require('../models/side');

//create side and send back its id
router.post('/create', async (req, res) => {
    try {
        const newSide = new Side({
            name: req.body.name,
            votes: []
        });
        await newSide.save();
        res.json({
            id: newSide._id
        });
    }
    catch{
        res.status(400);
        res.send("Failed");
    }
});

module.exports = router;