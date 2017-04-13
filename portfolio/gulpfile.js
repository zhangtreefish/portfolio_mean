var gulp = require('gulp'),
    browserify = require('gulp-browserify'),
    livereload = require('gulp-livereload');

gulp.task('browserify', function() {
  return gulp.
    src('./index.js').
    pipe(browserify()).
    pipe(gulp.dest('./bin')).
    pipe(livereload());
});

gulp.task('watch', function() {
  livereload.reload();
  livereload.listen();
  gulp.watch(['./*.js'], ['browserify']);
});

gulp.task('default', ['watch']);
