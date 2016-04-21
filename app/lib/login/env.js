var session = require('../session');

var LOGIN_USERNAME = process.env.LOGIN_USERNAME || 'admin';
var LOGIN_PASSWORD = process.env.LOGIN_PASSWORD || 'changeme';

module.exports = {
  authenticate: function(credentials, cb) {
    if(!credentials.username) {
      return cb(new Error('You must provide a username'));
    }
    if(!credentials.password) {
      return cb(new Error('You must provide a password'));
    }

    if(credentials.username !== LOGIN_USERNAME || credentials.password !== LOGIN_PASSWORD) {
      return cb(new Error('Your login details were not recognised'));
    }

    session.create({
      username: credentials.username,
    }, cb);
  },
};
