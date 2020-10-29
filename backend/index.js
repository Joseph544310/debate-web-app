const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const User = require('./models/user')
const bcrypt = require('bcryptjs');
const passport = require('passport');

app = express();

//env
require('dotenv').config();

//mongoose
mongoose.connect(
    process.env.MONGODB_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    () => console.log("mongoose connected")
    )

// middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))

app.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
}))
app.use(cookieParser("secret"))

app.use(passport.initialize());
app.use(passport.session());
require('./passportConfig')(passport);

//routes
app.get('/user', (req, res)=> {
    console.log(req.user)
    res.send(req.user);
})

app.post('/login', (req,res,next) => {
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

app.post('/register', (req, res) => {
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

app.delete('/logout', (req, res) => {
    req.logOut();
    res.send("logged out")
});

app.listen(5000, 'localhost', () => {
    console.log("listening on port 5000");
});