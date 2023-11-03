const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          // passwords match! log user in
          return done(null, user);
        } else {
          // passwords do not match!
          return done(null, false, { message: 'Incorrect password' });
        }
      });
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

// Registration handling
router.post('/register', (req, res) => {
  bcrypt.hash(req.body.password, 10, (err, hashedPass) => {
    if (err) { /* handle error */ }
    const newUser = new User({
      username: req.body.username,
      password: hashedPass
    });

    newUser.save(err => {
      if (err) { /* handle error */ }
      res.redirect('/shop');
    });
  });
});

// Login handling
router.post('/login',
  passport.authenticate('local', { successRedirect: '/shop', failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  }
);

// Logout handling
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
