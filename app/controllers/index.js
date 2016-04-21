module.exports = {
  controller: function(app) {
    app.get('/', app.middleware.get(['session']), function(req, res) {
      res.redirect('/panel');
    });
  }
};
