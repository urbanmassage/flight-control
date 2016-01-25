var async = require('async');
var hata = require('hata');

module.exports = {
  controller: function (app) {
    app.get('/api/transaction/:id', app.middleware.get(['json']), function (req, res, next) {
      req.mongo.models.transaction.findById(req.params.id, function (err, transaction) {
        if (err) {
          return next(err);
        }
        if (!transaction) {
          return next(hata(404));
        }

        res.send({ transaction: transaction });
      });
    });
    app.get('/api/transaction/:id/children', app.middleware.get(['json']), function (req, res, next) {
      async.parallel({
        transactions: function (cb) {
          req.mongo.models.transaction.find({
            parent: req.params.transaction
          }).sort('-timestamp').exec(cb);
        },
        logs: function (cb) {
          req.mongo.models.log.find({
            transaction: req.params.transaction
          }).sort('-timestamp').exec(cb);
        }
      }, function (err, results) {
        if (err) {
          return next(err);
        }

        var children = [];

        for (var i = 0; i < results.transactions.length; i++) {
          children.push({
            type: 'transaction',
            _id: results.transactions[i]._id,
            timestamp: results.transactions[i].timestamp,
            data: results.transactions[i]
          });
        }
        for (var i = 0; i < results.logs.length; i++) {
          children.push({
            type: 'log',
            _id: results.logs[i]._id,
            timestamp: results.logs[i].timestamp,
            data: results.logs[i]
          });
        }

        children.sort(function (a, b) {
          return a.timestamp - b.timestamp;
        });

        res.send({
          children: children,
        });
      })
    });
  },
};
