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
  debug: console.log,
  autoStart: false,
  cors: true,
});

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

app.start();

app.use(function (req, res, next) {
  require('./app/client/server-render')(req, res, next);
});

app.use(function (error, req, res, next) {
  console.error(error);

  var output = JSON.parse(JSON.stringify(error));
  output.name = error.name;
  output.message = error.message;

  res.status(500).send(output);
});
