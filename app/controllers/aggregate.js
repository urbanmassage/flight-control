module.exports = {
	controller: function(app) {
		app.get('/aggregate/types', function(req, res) {
			res.status(200).send({
				status: 'OK',
				types: ['transaction', 'log']
			});
		});

		app.get('/aggregate/:type/:field', function(req, res) {
			var model = req.mongo.models[req.params.type];

			if(typeof(model) === 'undefined') {
				return res.status(400).send({
					status: 'INVALID',
					message: 'The model type you specified was not found'
				});
			}

			model.find().group(req.params.field).only(req.params.field).exec(function(err, results) {
				if(err) {
					console.log('GET /aggregate/:type/:field error', err);
					return res.status(500).send({
						status: 'ERROR',
						error: err
					});
				}

				var options = [];

				for(var i=0; i<results.length; i++) {
					options.push(results[i][req.params.field]);
				}

				res.status(200).send({
					status: 'OK',
					options: options
				});
			});
		});
	}
};