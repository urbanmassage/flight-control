var async = require('async');
var hata = require('hata');

var desanitize = require('../../lib/desanitize');

module.exports = {
  controller: function (app) {
    app.get('/api/transaction/:id', app.middleware.get(['session', 'json']), function (req, res, next) {
      req.mongo.models.transaction.findOne({id: req.params.id}, function (err, transaction) {
        if (err) {
          return next(err);
        }
        if (!transaction) {
          return next(hata(404));
        }

        res.send({ transaction: desanitize(transaction) });
      });
    });
    app.get('/api/transaction/:id/children', app.middleware.get(['session', 'json']), function (req, res, next) {
      req.mongo.models.transaction.findOne({id: req.params.id}, function (err, transaction) {
        if (err) {
          return next(err);
        }
        if (!transaction) {
          return next(hata(404));
        }

        async.parallel({
          transactions: function (cb) {
            req.mongo.models.transaction.find({
              parent: transaction.id,
            }).sort('-timestamp').exec(cb);
          },
          logs: function (cb) {
            req.mongo.models.log.find({
              transaction: transaction.id,
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
            children: desanitize(children),
          });
        })
      });
    });
  },
};
