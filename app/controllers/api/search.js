var desanitize = require('../../lib/desanitize');

module.exports = {
  controller: function(app) {
    app.post('/api/search/transaction', app.middleware.get(['json']), function(req, res, next) {
      var search = req.body || {};

      if (typeof(search.relativeTime) !== 'undefined') {
        var multiplier = 0;

        var amount = Math.abs(search.relativeTime.substr(0, search.relativeTime.length - 1));
        var unit = search.relativeTime.substr(-1);
        if(unit == 's') {
          multiplier = 1;
        }
        else if(unit == 'm') {
          multiplier = 60;
        }
        else if(unit == 'h') {
          multiplier = 3600;
        }
        else if(unit == 'd') {
          multiplier = 86400;
        }

        if (multiplier > 0) {
          var time = Math.round(new Date().getTime() / 1000) - (multiplier * amount);

          search.timestamp = {
            $gte: new Date(time * 1000)
          };
        }

        delete search.relativeTime;
      }

      req.mongo.models.transaction.find(search).limit(100).sort('-timestamp').exec(function(err, transactions) {
        if (err) {
          return next(err);
        }

        res.send({
          status: 'OK',
          transactions: desanitize(transactions),
        });
      });
    })
  }
};
