module.exports = {
	controller: function(app) {
		app.get('/panel', app.middleware.get(['session']), function(req, res) {
			res.render('panel/index', {
				Session: req.session,
			});
		});
	}
};
