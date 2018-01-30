var sanitize = require('../lib/sanitize');
var hidePasswords = require('../lib/hidePasswords');

var passwordPaths = [
  ['data', 'input', 'password']
];

module.exports = {
	controller: function(app) {
		// stores a log entry
		app.post('/log', app.middleware.get(['json']), function(req, res) {
			var logPayload = hidePasswords(
				sanitize(req.body),
				passwordPaths
			);

			var log = req.mongo.models.log(logPayload);

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
