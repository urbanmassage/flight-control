module.exports = {
	controller: function(app) {
		app.post('/search/transaction', app.middleware.get(['json']), function(req, res) {
			var search = req.body || {};

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
					transactions: transactions
				});
			});
		})
	}
};