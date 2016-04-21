var url = require('url');
var redis = require('redis');
var log = require('debug')('app:lib:redis');

var clientCount = 0;

module.exports = {
  clientCount: clientCount,
  getClient: function getRedisClient() {
    var client;

    if (process.env.REDIS_URL) {
      var parsed = url.parse(process.env.REDIS_URL);

      var obj = {};
      if (parsed.auth) {
        var auth = parsed.auth.split(':');
        obj = {
          auth_pass: auth[1],
        };
      }

      client = redis.createClient(parsed.port, parsed.hostname, obj);
    } else {
      client = redis.createClient();
      client.select(3, function() { /* ... */ });
    }

    clientCount++;

    log('redis client count is now %d', clientCount);

    return client;
  },
};
