'use strict'

let SecurityTypes = require('./security_types');

let Routes = {

  login: {
    route: '/login'
  },

  logout: {
    route: '/logout'
  },

  videos: {
    all: {
      route: '/videos'
    },
    see: {
      route: '/videos/:name'
    }
  }

};

module.exports = Routes;
