var sanitize = require('../lib/sanitize');

module.exports = {
	controller: function(app) {
		// stores a log entry
		app.post('/log', app.middleware.get(['json']), function(req, res) {
			var log = req.mongo.models.log(sanitize(req.body));

			log.save(function(err) {
				if(err) {
					console.log('Failed to store log', err);
					return res.status(500).send('ERR');
				}

				res.status(200).send('OK');
			});
		});
	}
};
