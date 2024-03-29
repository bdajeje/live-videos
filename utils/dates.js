'use strict'

let Dates = {

  getCurrentUTC: function() {
    var now = new Date();
    return new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),  now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
  }

}

module.exports = Dates;
