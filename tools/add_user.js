#! /usr/bin/env node

'use strict'

if(process.argv.length < 3) {
  console.error('Not enough argument: missing user name');
  process.exit();
}

let User          = require('../models/user'),
    Configuration = require('../utils/configuration'),
    prompt        = require('prompt'),
    mongoose      = require('mongoose'),
    bcrypt        = require('bcrypt-nodejs');

console.log(Configuration['mongo']['host']);
console.log(Configuration['mongo']['collection']);
mongoose.connect(`mongodb://${Configuration['mongo']['host']}/${Configuration['mongo']['collection']}`);

const name = process.argv[2];

// Is that user already exists ?
let user = null;
User.findByName(name)
.exec(function(error, found_user) {
  if(error)
  {
    console.error('Error: ' + error);
    process.exit();
  }

  user = found_user;
});

// Ask for password
prompt.start();
prompt.get({
  properties: {
    password: {
      hidden: true,
      required: true
    },
    password_verif: {
      hidden: true,
      required: true
    }
  }
}, function(error, result) {
  const password       = result.password;
  const password_verif = result.password_verif;

  // Verify both passwords match
  if(password !== password_verif) {
    console.error('Both passwords don\'t match');
    process.exit();
  }

  // Create admin
  if(!user)
    user = new User({name: name});

  user.password = bcrypt.hashSync(password, null, null);

  user.save(function(error) {
    if(error)
      return console.error('Error: ' + error);

    console.log('Done');
    process.exit();
  });
});
