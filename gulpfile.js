'use strict';

var gulp        = require('gulp');
var browserSync = require('browser-sync');
var sass        = require('gulp-sass');
var prefix      = require('gulp-autoprefixer');
var plumber     = require('gulp-plumber');
var notify      = require('gulp-notify');

gulp.task('browser-sync', function () {

    var browserPath = '';
    if (process.env.COMPUTERNAME === 'PHILLAPTOP' || process.env.COMPUTERNAME === 'VENATOR') {
        browserPath = 'chrome.exe';
    } else {
        browserPath = 'google-chrome';
    }

  // for more browser-sync config options: http://www.browsersync.io/docs/options/
  browserSync({

    // informs browser-sync to proxy our expressjs app which would run at the following location
    // proxy: 'http://localhost:3000',

    // informs browser-sync to use the following port for the proxied app
    // notice that the default port is 3000, which would clash with our expressjs
    //port: 4000,

    // open the proxied app in chrome
    //browser: [browserPath]


    server: {
        baseDir: '.'
    }

  });
});

gulp.task('js',  function () {
  return gulp.src('**/*.js')
    // do stuff to JavaScript files
    //.pipe(uglify())
    //.pipe(gulp.dest('...'));
});

gulp.task('css', function () {
  // return gulp.src('**/*.css')
  //   .pipe(browserSync.reload({ stream: true }));
    return gulp.src('scss/main.scss')
        .pipe(plumber({
            errorHandler: function(error) {
                notify().write({
                    title: 'Gulp: SCSS',
                    message: error.message
                });
                console.log(error.message);
                browserSync.notify(error.message);
                this.emit('end');
            }
        }))
        .pipe(sass({
            includePaths: ['scss'],
            // outputStyle: 'compressed',
            onError: browserSync.notify
        }))
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(browserSync.reload({stream:true}))
        .pipe(gulp.dest('css'));
})

gulp.task('bs-reload', function () {
  browserSync.reload();
});

gulp.task('default', ['css', 'js', 'browser-sync'], function () {
  gulp.watch('**/*.js',   ['js', browserSync.reload]);
  gulp.watch('**/*.scss',  ['css']);
  gulp.watch('**/*.html', ['bs-reload']);
});
