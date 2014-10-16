var gulp = require('gulp');
var browserify = require('browserify');

var watchify = require('watchify');
var source = require('vinyl-source-stream');
var glob = require('glob');
var open = require('gulp-open');
var path = require('path');
var gutil = require('gulp-util');

//App bundle variables
var appBundleEntries = [__dirname + '/client/client.js'];
var appBundleDestPath = __dirname + '/static/js/app_bundle.js';

//Registration bunlde variables
var registrationBundleEntries = [__dirname + '/client/registration.js'];
var registrationBundleDestPath = __dirname +
'/static/js/registration_bundle.js';

//Adding Browserify releated gulp tasks
gulp.task('bundle:app', bundleJSWith(browserify, appBundleEntries,
  appBundleDestPath));
gulp.task('bundle:app:watch', bundleJSWith(watchify, appBundleEntries,
  appBundleDestPath, {debug: true}));

gulp.task('bundle:registration', bundleJSWith(browserify,
  registrationBundleEntries, registrationBundleDestPath));
gulp.task('bundle:registration:watch', bundleJSWith(watchify,
  registrationBundleEntries, registrationBundleDestPath, {debug: true}));

// Browserify configuration functions
function bundleJSWith(bundlerFn, entries, destPath, bundleOpts) {
  return function() {
    return bundle(
      bundlerFn,
      entries,
      destPath,
      bundleOpts
    );
  };
};

function bundle(bundlerFn, entries, outFile, bundleOpts) {
  var bundler = bundlerFn({
    entries: entries,
    extensions: ['.js', '.hbs']
  });

  bundler.on('update', rebundle);
  bundler.on('log', gutil.log);

  function rebundle () {
    return bundler.bundle(bundleOpts || {})
      .on('error', function(err) {
        gutil.log('ERROR: ' + err.message);
        gutil.beep();
      })
      .pipe(source(path.basename(outFile)))
      .pipe(gulp.dest(path.dirname(outFile)));
  }

  return rebundle();
};
