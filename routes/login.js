'use strict'

let Routes = require('../utils/routes');

module.exports = function(app, passport) {

  app.get(Routes.login.route, function(req, res) {
    if(req.user)
      return res.redirect(Routes.videos.all.route);

    return res.render('login.ejs', {title: ''});
  });

  app.post(Routes.login.route, passport.authenticate('local', {
    successReturnToOrRedirect: Routes.videos.all.route,
    failureRedirect: Routes.login.route,
    failureFlash: true
  }));

}
