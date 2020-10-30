const express = require("express");
const router  = express.Router({mergeParams: true});
const Comment = require('../models/comment');
const Debate = require('../models/debate');

//create comment
router.post('/', (req, res) => {
    
    // find debate
    Debate.findById(req.params.id, async (err, debate) => {
        if (err) {
            res.status(404);
            res.send("Debate not found");
        }

        // create comment
        const newComment = new Comment({
            content: req.body.content,
            author: {
                id: req.user._id,
                username: req.user.username
            }
        });
        await newComment.save();

        // add comment to debate
        debate.comments.push(newComment);
        debate.save();

        res.send("Success");
    })

});

module.exports = router;