process.title = 'node flight-control';

var Server = require('easy-server');
var hata = require('hata');

var server = new Server({
  port: process.env.PORT || 1984,
  controllers: './app/controllers',
  middleware: './app/middleware',
  debug: console.log,
  autoStart: false
});

server.server.set('view engine', 'ejs');
server.server.set('views', 'app/views');

server.use(require('serve-static')('./public'));
server.use('/client/*', function(req, res, next) { next(hata(404)); });
server.get('/favicon.ico', function(req, res) { res.end(); });

server.use(function(req, res, next) {
  res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.header('Pragma', 'no-cache');
  res.header('Expires', 0);
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', req.header('Access-Control-Request-Headers'));
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.send(200);
  }

  console.log(req.method, req.path);

  next();
});

server.use(require('./app/lib/mongo').express);

server.start();

server.use(function (req, res, next) {
  require('./app/client/server-render')(req, res, next);
});

module.exports = server;
