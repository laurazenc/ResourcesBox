var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var nodemon = require('gulp-nodemon');
var browserSync = require('browser-sync');
var path = require('path');
var exec = require('child_process').exec;

var BROWSER_SYNC_RELOAD_DELAY = 500;

gulp.task('sass', function () {
  gulp.src('app/assets/style.scss')
  .pipe(plumber())
  .pipe(sass())
  .pipe(plumber.stop())
  .pipe(gulp.dest('app/assets'));
});

gulp.task('bs-reload', function () {
  browserSync.reload({stream: false});
});

gulp.task('watch', function () {
  gulp.watch('app/assets/**/*.scss', ['sass', 'bs-reload']);
  gulp.watch('app/**/*.html', ['bs-reload']);
  gulp.watch('app/**/*.js', ['bs-reload']);
  gulp.watch('app/*.js', ['bs-reload']);
  gulp.watch('app/index.html', ['bs-reload']);
});

gulp.task('styles', function () {
  return gulp.src('app/assets/**/*.scss').pipe(sass({
    style: 'expanded',
    loadPath: [path.join(__dirname, 'app/assets')]
  })).pipe(gulp.dest('app/assets'));
});

gulp.task('browser-sync', function () {
  browserSync.init({
    notify: false,
    // proxy: 'http://localhost:5000',
    port: 5000,
    server: {
      baseDir: "app"
    },
    browser: ['google chrome']
  });
});

gulp.task('default', ['run', 'browser-sync', 'sass', 'watch', 'styles']);

gulp.task('run', function (cb) {
  exec('firebase serve', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

gulp.task('deploy', function (cb) {
  exec('firebase deploy', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

gulp.task('standard', function (cb) {
  exec('standard', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});
