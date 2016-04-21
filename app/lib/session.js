var redis = require('./redis');
var uuid = require('uuid');

var client = redis.getClient();

var SESSION_KEY_PREFIX = 'session::';

module.exports = {
  create: function createSession(data, cb) {
    var token = uuid.v4();

    var session = {
      data: data,
      token: token,
    };

    client.set(SESSION_KEY_PREFIX + token, JSON.stringify(session), function(err) {
      if(err) {
        return cb(err);
      }

      cb(null, session);
    });
  },
  get: function getSession(token, cb) {
    client.get(SESSION_KEY_PREFIX + token, function(err, data) {
      if(err) {
        return cb(err);
      }

      if(data) {
        try {
          data = JSON.parse(data);
        }
        catch(err) {
          return cb(err);
        }
      }

      cb(null, data);
    });
  },
};
