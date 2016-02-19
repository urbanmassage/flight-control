var async = require('async');
var debug = require('debug')('transaction');
var sanitize = require('../lib/sanitize');

module.exports = {
	controller: function(app) {
		// stores a transaction trace
		app.post('/transaction', app.middleware.get(['json']), function(req, res) {
			var transaction = req.mongo.models.transaction(sanitize(req.body));

			transaction.save(function(err) {
				if(err) {
					debug('Failed to store transaction', err);
					return res.status(500).send('ERR');
				}

				res.status(200).send('OK');
			});
		});

		app.get('/transaction/:transaction/children', function(req, res) {
			async.parallel({
				transactions: function(cb) {
					req.mongo.models.transaction.find({
						parent: req.params.transaction
					}).sort('-timestamp').exec(cb);
				},
				logs: function(cb) {
					req.mongo.models.log.find({
						transaction: req.params.transaction
					}).sort('-timestamp').exec(cb);
				}
			}, function(err, results) {
				if(err) {
					return res.status(500).send({
						status: 'ERROR',
						error: err
					});
				}

				console.log(results);

				var out = [];

				for(var i=0; i<results.transactions.length; i++) {
					out.push({
						type: 'transaction',
						_id: results.transactions[i]._id,
						timestamp: results.transactions[i].timestamp,
						data: results.transactions[i]
					});
				}
				for(var i=0; i<results.logs.length; i++) {
					out.push({
						type: 'log',
						_id: results.logs[i]._id,
						timestamp: results.logs[i].timestamp,
						data: results.logs[i]
					});
				}

				out.sort(function(a,b) {
					return a.timestamp > b.timestamp;
				});

				res.status(200).send({
					status: 'OK',
					children: out
				});
			})
		});
	}
};
