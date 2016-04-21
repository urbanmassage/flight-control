var session = require('../lib/session');

module.exports = function(req, res, next) {
  session.get(req.cookies['panel_login_token'], function(err, session) {
    if(err) {
      return next(err);
    }

    if(!session) {
      return res.redirect('/login');
    }

    req.session = session.data;

    next();
  });
};
