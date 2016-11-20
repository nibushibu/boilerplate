var gulp = require('gulp');
var config = require('../config');
var $ = require('gulp-load-plugins')();
var fontName = 'symbols';

// Sketch
gulp.task('sketch', function () {
  return gulp.src(config.iconfont.sketch)
  .pipe($.sketch({
    'export': 'artboards',
    formats: 'svg'
  }))
  .pipe(gulp.dest('svg'));
});

// iconfont
gulp.task('iconfont', function() {
  return gulp.src('svg/*.svg')
  .pipe($.iconfont({
    fontName: fontName
  }))
  .on('glyphs', function (glyphs) {
    var option = {
      glyphs: glyphs.map(function (glyph) {
        return {
          name: glyph.name,
          codepoint: glyph.unicode[0].charCodeAt(0)
        };
      }),
      fontName: fontName,
      fontPath: '../fonts/',
      className: 's'
    };
    gulp.src('templates/symbols.scss')
    .pipe($.consolidate('lodash', option))
    .pipe($.rename({
      basename: fontName,
      prefix: '_',
      extname: '.scss'
    }))
    .pipe(gulp.dest('scss'));
  })
  .pipe(gulp.dest(config.appPath + 'fonts'));
});
