process.env.HOT = '1';

var server = require('./server');

var debounce = require('debounce');
var chokidar = require('chokidar');
var webpack = require('webpack');
var config = require('./webpack.config');
var compiler = webpack(config);

// Serve hot-reloading bundle to client
server.app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
}));
server.app.use(require('webpack-hot-middleware')(compiler));

// Do "hot-reloading" of react stuff on the server
// Throw away the cached client modules and let them be re-required next time
compiler.plugin('done', function() {
  debounce('clear-client-cache', 1000, function () {
    console.log("Clearing client module cache");
    Object.keys(require.cache).forEach(function(id) {
      if (/\/client\//.test(id)) delete require.cache[id];
    });
  });
});

// Do "hot-reloading" of express stuff on the server
// Throw away cached modules and re-require next time
// Ensure there's no important state in there!
var watcher = chokidar.watch('./app/server');
watcher.on('ready', function() {
  watcher.on('all', function() {
    debounce('clear-server-cache', 1000, function () {
      console.log("Clearing server module cache");
      Object.keys(require.cache).forEach(function(id) {
        if (/\/server\//.test(id)) delete require.cache[id];
      });
    });
  });
});

server.setup();
