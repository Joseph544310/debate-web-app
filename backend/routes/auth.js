const express = require("express");
const router  = express.Router({mergeParams: true});
const User = require('../models/user')
const bcrypt = require('bcryptjs');
const passport = require('passport');

//authentication routes 
router.get('/user', (req, res)=> {
    console.log(req.user)
    res.send(req.user);
})

router.post('/login', (req,res,next) => {
    passport.authenticate('local', (err, user, info) => {
        if(err) throw err;
        if (!user) {
            res.json({
                message: "Wrong Credentials"
            })
        }
        else {
            req.logIn(user, err => {
                if (err) throw err;
                res.json({
                    message: "Success"
                })
                console.log(req.user);
            })
        }
    })(req, res, next);
})

router.post('/register', (req, res) => {
    User.findOne({username: req.body.username}, async (err, doc) => {
        if (err) throw err;
        if (doc) {
            res.json({
                message: "Username already taken"
            })
        } 
        else {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const newUser = new User({
                username: req.body.username,
                password: hashedPassword
            })
            await newUser.save();
            res.json({
                message: "Success"
            })
        }
    })
})

router.delete('/logout', (req, res) => {
    req.logOut();
    res.send("logged out")
});

module.exports = router;