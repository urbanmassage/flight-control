var session = require('../lib/session');
var NO_AUTH = process.env.NO_AUTH;

var sessionMiddleware;

if (NO_AUTH) {
  sessionMiddleware = function(req, res, next) {
    next();
  }
} else {
  sessionMiddleware = function(req, res, next) {
    session.get(req.cookies['panel_login_token'], function(err, session) {
      if (err) {
        return next(err);
      }

      if (!session) {
        return res.redirect('/login');
      }

      req.session = session.data;

      next();
    });
  };
}

module.exports = sessionMiddleware;
