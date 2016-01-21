var del = require('del');
var path = require('path');
var gulp = require('gulp');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var webpack = require('webpack-stream');
var spawn = require('child_process').spawn;

gulp.task('clean-babel', function () {
  del.sync('app/client/**/*.js');
  del.sync('app/client/**/*.js.map');
});

gulp.task('babel', function () {
  return gulp.src('app/client/**/*.jsx', { base: __dirname })
    .pipe(sourcemaps.init({
      loadMaps: true,
    }))
    .pipe(babel({}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./'));
});

gulp.task('webpack', function () {
  var base = __dirname;
  var config = require('./webpack.config');
  var entry = config.entry;

  var src = entry[entry.length - 1] + '.jsx';

  return gulp.src(src, { base: base })
    .pipe(sourcemaps.init({
      loadMaps: true,
    }))
    .pipe(webpack(config))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/client/'));
});

gulp.task('server', ['clean-babel', 'start-server'], function () {
  gulp.watch(['server.js', 'server-dev.js', 'webpack.config.js'], ['start-server']);
});

var node;
function stopNode() {
  if (node) {
    gutil.log('Stopping node');
    node.kill();
    return new Promise(function (resolve) {
      node.on('close', resolve);
    });
  }
}
function startNode() {
  if (!node) {
    gutil.log('starting node');
    node = spawn('node', ['server-dev'], { stdio: 'inherit' });
    node.on('close', function (code) {
      if (code === 8) {
        gutil.log('Error detected, please restart your server...');
      } else {
        gutil.log('Node exited with code %d', code);
      }
      node = null;
    });
  }
}
gulp.task('stop-server', stopNode);
gulp.task('start-server', ['babel', 'stop-server'], startNode);
// clean up if an error goes unhandled.
process.on('exit', stopNode);

gulp.task('default', ['clean-babel', 'babel', 'webpack']);
