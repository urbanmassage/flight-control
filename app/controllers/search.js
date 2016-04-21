var desanitize = require('../lib/desanitize');

module.exports = {
	controller: function(app) {
		app.post('/search/transaction', app.middleware.get(['session', 'json']), function(req, res) {
			var search = req.body || {};

			if(typeof(search.relativeTime) !== 'undefined') {
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

				if(multiplier > 0) {
					var time = Math.round(new Date().getTime() / 1000) - (multiplier * amount);

					search.timestamp = {
						$gte: new Date(time * 1000)
					};
				}

				delete search.relativeTime;
			}

			console.log(search);

			req.mongo.models.transaction.find(search).sort('-timestamp').exec(function(err, transactions) {
				if(err) {
					return res.status(500).send({
						status: 'ERROR',
						error: err
					});
				}

				res.status(200).send({
					status: 'OK',
					transactions: desanitize(transactions),
				});
			});
		})
	}
};
