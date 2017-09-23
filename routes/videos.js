'use strict'

let Routes  = require('../utils/routes'),
    Connect = require('connect-ensure-login'),
    Dates   = require('../utils/dates'),
    Configuration = require('../utils/configuration'),
    fs = require('fs');

let listVideos = function(callback) {
  let videos_dir = Configuration["videos_dir"];
  let results = [];

  fs.readdir(videos_dir, function(err, files) {
    if(err)
      return callback(err);

    for(let i = 0; i < files.length; ++i)
      results.push({name: files[i]});

    return callback(null, results);
  });
}

module.exports = function(app) {

  // Verify all routes, only connected user scan access
  app.all(Routes.videos.all.route + '*', Connect.ensureLoggedIn(), function(req, res, next) {
    if(req.user)
      return next();
    else
      return res.redirect(routes.login.route);
  })

  app.get(Routes.videos.all.route, function(req, res) {
    listVideos(function(error, videos) {
      if(error)
        throw error;

      return res.render('videos.ejs', {
        videos: videos
      });
    });
  });

  app.get(Routes.videos.see.route, function(req, res) {
    let name = req.params.name;

    if(name.length == 0)
    {
      req.flash('error', 'Invalid name');
      return res.redirect(Routes.videos.all.route);
    }

    let video = {
      name: name
    }

    return res.render('video.ejs', {
      video: video
    });
  });

}
