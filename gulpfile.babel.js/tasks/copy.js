const gulp = require('gulp');
const pump = require('pump');
const config = require('../config');
const $ = require('gulp-load-plugins')();
const runSequence = require('run-sequence');

// Copy fonts
gulp.task('copyFont', () => {
  return gulp.src([
    'node_modules/slick-carousel/slick/fonts/*'
  ])
  .pipe(gulp.dest(config.appPath + 'css/fonts'));
});

// Copy Images
gulp.task('copyImg', () =>{
  return gulp.src([
    'node_modules/slick-carousel/slick/ajax-loader.gif'
  ])
  .pipe(gulp.dest(config.appPath + 'css'))
})

// Concat JS
gulp.task('concatJs', () => {
  return gulp.src(config.js)
  .pipe($.concat('vendors.js'))
  .pipe(gulp.dest(config.appPath + 'js'));
});

// Uglify vendors.js
gulp.task('uglifyJs', cb => {
  pump(
    [
      gulp.src(config.appPath + 'js/vendors.js'),
      $.uglify({
        mangle: false,
        output: {
          comments: 'some'
        }
      }),
      gulp.dest(config.appPath + 'js')
    ],
    cb
  )
})

// Command
gulp.task('copy', callback => {
  return runSequence(
    [
      'copyFont',
      'copyImg',
      'concatJs'
    ],
    // 'uglifyJs',
    callback
  );
});
