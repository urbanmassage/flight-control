if (process.env.HOT) {
  process.env.BABEL_ENV = 'hot';
}

var path = require('path');
var webpack = require('webpack');
var Assets = require('assets-webpack-plugin');
var Clean = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

require('es6-promise').polyfill();

// definePlugin takes raw strings and inserts them, so you can put strings of JS if you want.
var definePlugin = new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
  },
  'requireEnsure': 'require.ensure',

  // Add other variables here and they will be replaced in all files. Remember to 'JSON.stringify'.
});

var entry = 'index';

var externals = {
};

// ---------------------------------------------------
// You shouldn't need to modify the rest of this file.
// ---------------------------------------------------

var plugins = [
  definePlugin,
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.NoErrorsPlugin(),
  new Clean(['public/client']),

  // Ignore moment's locale files
  new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en\-gb/),
];

var output = {
  path: path.join(__dirname, 'public/client'),
  publicPath: '/client/',
  filename: 'index.js',
};

var sassLoader = 'style-loader!css-loader!autoprefixer-loader?browsers=last 2 versions!sass-loader';
var devtool = 'source-map';

if (process.env.NODE_ENV === 'production') {
  plugins.push(new webpack.optimize.DedupePlugin());
  plugins.push(new webpack.optimize.UglifyJsPlugin({ minimize: true }));
}

if (process.env.NODE_ENV === 'development') {
  plugins.push(new Assets({ path: 'public/client', filename: 'manifest.json' }));

  if (process.env.HOT) {
    entry = ['webpack-hot-middleware/client', entry];
    plugins.unshift(new webpack.HotModuleReplacementPlugin());
  }
} else {
  // Cache buster
  output.filename = '[name]-[chunkhash].js';
  plugins.push(new Assets({ path: 'public/client', filename: 'manifest.json' }));

  // Extract css files
  plugins.push(new ExtractTextPlugin('[name]-[chunkhash].css'));
  sassLoader = ExtractTextPlugin.extract('style-loader', 'css-loader!autoprefixer-loader?browsers=last 2 versions!sass-loader');
}

// make handlebars an external. i.e. don't include it in bundle.
// externals['handlebars/runtime'] = {
//   root: 'Handlebars',
//   amd: 'handlebars/runtime',
//   commonjs2: 'handlebars/runtime',
//   commonjs: 'handlebars/runtime',
// };

module.exports = {
  devtool: devtool,
  target: 'web',
  cache: true,
  entry: entry,
  context: __dirname + '/app/client',
  externals: externals,
  resolve: {
    extensions: ['', '.jsx', '.js'],
    modulesDirectories: ['node_modules', 'app/client'],
  },
  output: output,
  plugins: plugins,
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
      }, {
        test: /\.(css|scss|sass)$/,
        loader: sassLoader,
      }, {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff',
      }, {
        test: /\.json$/,
        loader: 'json-loader',
      }, {
        test: /\.(ttf|eot|svg|gif)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
      }, {
        test: /\.(txt)$/,
        loader: 'copy',
      },
    ],
  },
};
