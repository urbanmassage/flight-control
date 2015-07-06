module.exports = {
	controller: function(app) {
		app.get('/panel', function(req, res) {
			res.render('panel/index');
		});
	}
};