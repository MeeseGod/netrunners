const express = require("express");
const app = express();
const bcrypt = require("bcryptjs");
const cookieParser = require('cookie-parser');
const dotenv = require("dotenv").config();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const logger = require('morgan');
const mongoose = require("mongoose");
const port = process.env.PORT;
const session = require("express-session");
const User = require("./models/user");
const userRouter = require("./routes/users");
const missionRouter = require("./routes/missions");

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// connect to db
mongoose.connect(process.env.MONGO)
    .then(() => {
        // listen for requests after connecting
        app.listen(port, ()=>{console.log(`Listening on port: ${port}`)});
    })
    .catch((error => {
        console.log(error);
    }));

passport.use(new LocalStrategy((username, password, done) => {
  User.findOne({ userName: username }, (err, user) => {
    if (err) return done(err);
    if (!user) return done(null, false, { message: "Incorrect username" });
    bcrypt.compare(password, user.password, (err, res) => {
      if (err) return done(err);
      // Passwords match, log user in!
      if (res) return done(null, user);
      // Passwords do not match!
      else return done(null, false, { message: "Incorrect password" });
    });
  });
}));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});
  
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
      done(err, user);
  });
});

app.use(session({ secret: process.env.SECRET, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    next();
});

// Allows usage of userRouter routes.
app.use("/api/users", userRouter);

// Allows usage of missionRouter routes
app.use("/api/missions", missionRouter);

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});