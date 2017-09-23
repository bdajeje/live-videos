'use strict'

let mongoose = require('mongoose'),
    Schema   = mongoose.Schema,
    bcrypt   = require('bcrypt-nodejs');

let schema = new Schema({
  name           : {type: String, index: true, unique: true, required: true, trim: true},
  password       : {type: String, required: true},
  lastConnectedOn: {type: Date},
});

schema.methods.setPassword = function(clear_password) {
  this.password = bcrypt.hashSync(clear_password, null, null);
}

schema.statics.findByName = function(name) {
  return this.findOne({name: name});
}

let User = mongoose.model('User', schema);

module.exports = User;
