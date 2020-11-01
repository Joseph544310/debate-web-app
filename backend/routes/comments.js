const express = require("express");
const router  = express.Router({mergeParams: true});
const Comment = require('../models/comment');
const Debate = require('../models/debate');

// get comments
router.get('/', (req, res) => {
    try{
        Debate.findById(req.params.id, async (err, debate) => {
            if (err) {
                res.status(404);
                res.send("Debate not found");
            }

            const comments = []
            for (const [index, id] of debate.comments.entries()) {
                await Comment.findById(id, (err, comment) => {
                    if (err) throw err;
                    comments.push(comment)
                    
                    //when last callback is done, return
                    if (index === debate.comments.length - 1) {
                        res.json({
                            comments: comments
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

//create comment
router.post('/', (req, res) => {
    
    try {
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

            res.json({
                comment: newComment
            });
        })
    }
    catch {
        res.status(400);
        res.send("Failure");
    }

});

module.exports = router;