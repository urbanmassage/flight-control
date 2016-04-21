var async = require('async');
var login = require('../lib/login');

module.exports = {
  controller: function(app) {
    app.all('/login', app.middleware.get(['formdata']), function(req, res) {
      var errorMessage = null;

      async.series([
        function(callback) {
          if(Object.keys(req.body).length === 0) {
            return callback();
          }

          login.authenticate(req.body, function(err, session) {
            if(err) {
              errorMessage = err.message || 'An error occured';
              return callback();
            }

            res.cookie('panel_login_token', session.token, { path: '/' });
            res.redirect('/');
          });
        },
        function() {
          res.render('login', {
            ErrorMessage: errorMessage,
          });
        },
      ]);
    });
  }
};
