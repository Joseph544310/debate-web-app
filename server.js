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
        useUnifiedTopology: true,
        useFindAndModify: false
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

// frontend
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}

//routes
app.use('/api/auth', authRoutes);
app.use('/api/debates', debateRoutes);
app.use('/api/debates/:id/sides', sideRoutes);
app.use('/api/debates/:id/comments', commentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, 'localhost', () => {
    console.log(`listening on port ${PORT}`);
});