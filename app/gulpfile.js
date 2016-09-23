'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    concatCss = require('gulp-concat-css'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    del = require('del'),
    babel = require('gulp-babel');

var paths = {
  scripts: ['client/js/*.js'],
  styles: ['client/scss/*.scss']
};

// Styles
gulp.task('styles', function() {
  return gulp.src(paths.styles)
    .pipe(sass({ style: 'compressed', sourceMaps: 'map', errLogToConsole: true }))
    .pipe(autoprefixer('last 2 version'))
    .pipe(concatCss('./client/dist/bundle.css'), {rebaseUrls: false})
    .pipe(gulp.dest('.'))
    .pipe(minifycss({processImport: false}))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('.'))
    .pipe(notify({ message: 'Styles task complete' }));
});

// Scripts
gulp.task('scripts', function() {
  return gulp.src(paths.scripts)
    .pipe(babel({ presets: ['es2015'] }))
    .pipe(concat('./client/dist/bundle.js'))
    .pipe(gulp.dest('.'))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('.'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

// Default task
gulp.task('default', ['clean'], function() {

});

// Watch
gulp.task('watch', function() {

  // Watch .scss files
  gulp.watch(paths.styles, ['styles']);

  // Watch .js files
  gulp.watch(paths.scripts, ['scripts']);

});