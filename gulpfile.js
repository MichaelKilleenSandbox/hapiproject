/* File: gulpfile.js */

// grab our packages
var gulp   = require('gulp');
var jshint = require('gulp-jshint');
var gutil = require('gulp-util');

// define the default task and add the watch task to it
gulp.task('default', ['watch']);

// configure the jshint task
gulp.task('jshint', function() {
    //return gulp.src('source/javascript/**/*.js')
    return gulp.src('*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

// configure which files to watch and what tasks to use on file changes
gulp.task('watch', function() {
    gulp.watch('**/*.js', ['jshint']);
});