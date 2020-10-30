const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const passport = require('passport');

//requiring routes
const authRoutes = require('./routes/auth');
const sideRoutes = require('./routes/sides');
const commentRoutes = require('./routes/comments');
const debateRoutes = require('./routes/debates');

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
app.use('/auth', authRoutes);
app.use('debates/', debateRoutes);
app.use('debates/:id/sides', sideRoutes);
app.use('debates/:id/comments', commentRoutes);

app.listen(5000, 'localhost', () => {
    console.log("listening on port 5000");
});