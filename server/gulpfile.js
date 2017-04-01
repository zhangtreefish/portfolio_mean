var gulp = require('gulp');
var mocha = require('gulp-mocha');
var gutil = require('gulp-util');

gulp.task('testdb', function() {
  var error = false;
  gulp.
    src('./test_db.js').
    pipe(mocha({reporter: 'nyan'})).
    on('error', gutil.log);
});

gulp.task('testapi', function() {
  var error = false;
  gulp.
    src('./test_api.js').
    pipe(mocha({reporter: 'nyan'})).
    on('error', gutil.log);
});

gulp.task('testauth', function() {
  var error = false;
  gulp.
    src('./test_auth.js').
    pipe(mocha({reporter: 'nyan'})).
    on('error', gutil.log);
});

gulp.task('watch', function() {
  gulp.watch(['./test_*.js', './interface.js', './api.js', './auth.js'], ['testdb', 'testapi', 'testauth']);
});
