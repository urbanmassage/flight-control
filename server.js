process.title = 'node flight-control';

var easyServer = require('easy-server');

if (process.env.NODE_ENV === 'development') {
  easyServer = require('easy-server-dev');
}

var hata = require('hata');

var app = easyServer({
  port: process.env.PORT || 1984,
  controllers: './app/controllers',
  middleware: './app/middleware',
  debug: require('debug')('server'),
  autoStart: false,
  cors: true,
});

var cyan = require('chalk').cyan;

app.set('view engine', 'ejs');
app.set('views', 'app/views');

if (process.env.HOT) {
  var debounce = require('js-debounce');
  var webpack = require('webpack');
  var config = require('./webpack.config');
  var compiler = webpack(config);

  // Serve hot-reloading bundle to client
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
  }));
  app.use(require('webpack-hot-middleware')(compiler));

  // Do "hot-reloading" of react stuff on the server
  // Throw away the cached client modules and let them be re-required next time
  compiler.plugin('done', function () {
    debounce('clear-client-cache', 1000, function () {
      console.log("Clearing client module cache");
      Object.keys(require.cache).forEach(function(id) {
        if (/\/client\//.test(id)) delete require.cache[id];
      });
    });
  });
}

app.use(require('serve-static')('./public'));
app.use('/client/*', function (req, res, next) { next(hata(404)); });
app.get('/favicon.ico', function (req, res) { res.end(); });

app.use(require('cookie-parser')());

app.use(require('./app/lib/mongo').express);

var server = app.start();

app.use(function (req, res, next) {
  require('./app/client/server-render')(req, res, next);
});

// Protect everything else
app.use(app.middleware.get('session'));
app.use(function (error, req, res, next) {
  console.error(error);

  var output = JSON.parse(JSON.stringify(error));
  output.name = error.name;
  output.message = error.message;

  res.status(500).send(output);
});

if (process.env.NODE_ENV === 'development') {
  console.log(
    'FlightControl server is listening on ' +
    cyan('http://127.0.0.1:' + server.address().port)
  );
}
