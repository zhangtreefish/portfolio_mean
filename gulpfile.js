var gulp = require('gulp');
var mocha = require('gulp-mocha');
var gutil = require('gulp-util');

gulp.task('testdb', function() {
  var error = false;
  gulp.
    src('./server/test_db.js').
    pipe(mocha({reporter: 'nyan'})).
    on('error', gutil.log);
});

gulp.task('testapi', function() {
  var error = false;
  gulp.
    src('./server/test_api.js').
    pipe(mocha({reporter: 'nyan'})).
    on('error', gutil.log);
});

gulp.task('testauth', function() {
  var error = false;
  gulp.
    src('./server/test_auth.js').
    pipe(mocha({reporter: 'nyan'})).
    on('error', gutil.log);
});

gulp.task('watch', function() {
  gulp.watch(['./server/test_*.js', './server/interface.js', './server/api.js', './server/auth.js'], ['testdb', 'testapi', 'testauth']);
});
