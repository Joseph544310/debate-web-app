const Comment = require('./models/comment');

// all the middleware goes here
const middlewareObj = {};

middlewareObj.checkCommentOwnership = function(req, res, next) {
 if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
           if(err){
               res.redirect("back");
           }  else {
               // does the user own the comment?
            if(foundComment.author.id.equals(req.user._id)) {
                next();
            } else {
                res.status(403);
                res.send("Unauthorized");
            }
           }
        });
    } else {
        res.status(403);
        res.send("Unauthorized");
    }
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    else {
        res.status(403);
        res.send("Unauthorized");
    }
}

module.exports = middlewareObj;