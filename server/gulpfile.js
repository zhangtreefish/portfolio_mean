var gulp = require('gulp');
var mocha = require('gulp-mocha');
var gutil = require('gulp-util');

gulp.task('test', function() {
  var error = false;
  gulp.
    src('./test.js').
    pipe(mocha({reporter: 'nyan'})).
    on('error', gutil.log);
});

gulp.task('watch', function() {
  gulp.watch(['./test.js', './interface.js'], ['test']);
});
