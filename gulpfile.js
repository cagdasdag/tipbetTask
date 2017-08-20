var gulp = require('gulp');

// Libraries
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var runSequence  = require('run-sequence');
var concat = require('gulp-concat');
var minCss = require('gulp-minify-css');
var minify = require('gulp-minify');
var rename = require('gulp-rename');

// Directories
var folders = {
    css : "assets/css/",
    scss : "assets/css/scss/",
    js : "assets/js/"
}; 

// Scss Files To CSS File
gulp.task('styles', function() {
    gulp.src(folders['scss'] + '*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('style'))
        .pipe(minCss())
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest(folders['css']))
        .pipe(browserSync.reload({
          stream: true
        }));
});

gulp.task('jsMinify', function() {
    gulp.src(folders['js'] + '*/*.js')
        .pipe(concat('script.js'))
        .pipe(minify())
        .pipe(gulp.dest(folders['js']))
        .pipe(browserSync.reload({
            stream: true
        }));
});

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

// Watchers
gulp.task('watch', function() {
  gulp.watch(folders['scss'] + '*.scss', ['styles']);
  gulp.watch(folders['js'] + '*/*.js', ['jsMinify']);
  gulp.watch('*.html', browserSync.reload);
})

//Watch task
gulp.task('default',function(callback) {
    runSequence(['styles', 'jsMinify', 'browser-sync'], 'watch',
        callback
    )
});