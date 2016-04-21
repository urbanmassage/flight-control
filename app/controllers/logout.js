module.exports = {
  controller: function(app) {
    app.get('/logout', function(req, res) {
      res.cookie('panel_login_token', '', { path: '/' });
      res.redirect('/');
    });
  }
};
