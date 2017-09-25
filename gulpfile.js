'use strict';
const gulp = require('gulp');
const connect = require('gulp-connect');
const livereload = require('gulp-livereload');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer')
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const clean = require('gulp-clean');
const sourcemaps = require('gulp-sourcemaps');
const ghPages = require('gulp-gh-pages');

const dirs = { src: 'src', dest: 'dist' };
const stylesPaths = { src: dirs.src + '/css/*.scss', dest: dirs.dest + '/css' };
const scriptsPaths = { src: dirs.src + '/js/*.js', dest: dirs.dest + '/js' };
const imagesPaths = { src: dirs.src + '/images/**/*.*', dest: dirs.dest + '/images' };

// Clean Task
gulp.task('clean', function () {
    return gulp.src(
        [stylesPaths.dest + '/**/*.*'], { read: false }
    )
        .pipe(clean());
});

// html
gulp.task('html', function () {
    return gulp.src(dirs.src + '/*.html')
        .pipe(gulp.dest(dirs.dest));
});

// Styles Task		
gulp.task('styles', function () {
    return gulp.src(stylesPaths.src)
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(concat("./main.css"))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(stylesPaths.dest));
});

// Scripts Task
gulp.task('scripts', function () {
    return gulp.src([scriptsPaths.src])
        .pipe(debug({title: 'unicorn:'}))
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(concat('all.min.js'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(scriptsPaths.dest));
});

// Images Task
gulp.task('images', function () {
    return gulp.src(imagesPaths.src)
        .pipe(imagemin())
        .pipe(gulp.dest(imagesPaths.dest));
});

// Server Task
gulp.task('server', function() {
    connect.server({
        root: ["dist"],
        livereload: true,
        port: 8080
    });
});

// Watch Task
gulp.task('watch', function () {
    gulp.watch('src/*.html', ['html']);
    gulp.watch(stylesPaths.src, ['styles']);
    gulp.watch(scriptsPaths.src, ['scripts']);
    gulp.watch(imagesPaths.src, ['images']);

    // Watch any files in dist/, reload on change
    livereload.listen();
    gulp.watch(['dist/**']).on('change', livereload.changed);
});

//Deploy to ghPages Task
gulp.task('ghpages', ['build'], function () {
    return gulp.src(dirs.dest + '/**/*')
        .pipe(ghPages());
});

// Tasks
gulp.task('default', ['clean', 'html', 'styles', 'scripts', 'images', 'server', 'watch']);
gulp.task('build', ['clean', 'html', 'scripts', 'styles', 'images']);
gulp.task('deploy', ['ghpages']);