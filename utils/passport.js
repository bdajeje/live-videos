'use strict'

let localStrategy = require('passport-local').Strategy,
    Security      = require('./security'),
    Routes        = require('./routes'),
    User          = require('../models/user'),
    bcrypt        = require('bcrypt-nodejs');

module.exports = function(passport, app) {

  // Used to serialize the user for the session
  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

  // Used to deserialize the user
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(error, user) {
      done(error, user);
    });
  });

  passport.use(new localStrategy({
      usernameField: 'name',
      passwordField: 'password',
      passReqToCallback: true
    },
    function(req, name, password, done) {
      User.findByName(name)
      .exec(function(error, user) {
        if(error)
          throw error;

        // Does a user exist with this name
        // Password correct?
        if(!user || !bcrypt.compareSync(password, user.password))
          return done(null, false, req.flash('error', 'Wrong authentication'));

        // Save last connection date
        user.lastConnectedOn = Date.now();
        user.save();

        return done(null, user);
      })
    })
  );
};
