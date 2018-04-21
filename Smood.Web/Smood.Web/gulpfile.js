/// <binding BeforeBuild='index' />
"use strict";

var gulp = require("gulp"),
    rimraf = require("rimraf"),
    concat = require("gulp-concat"),
    cssmin = require("gulp-cssmin"),
    uglify = require("gulp-uglify"),
    series = require('stream-series'),
    angularFilesort = require('gulp-angular-filesort'),
    inject = require('gulp-inject'),
    sass = require('gulp-sass');

var paths = {
    webroot: "./wwwroot/"
};

paths.js = paths.webroot + "js/**/*.js";
paths.minJs = paths.webroot + "js/**/*.min.js";
paths.css = paths.webroot + "css/**/*.css";
paths.minCss = paths.webroot + "css/**/*.min.css";
paths.concatJsDest = paths.webroot + "js/site.min.js";
paths.concatCssDest = paths.webroot + "css/site.min.css";

gulp.task('index', function () {

    var target = gulp.src('./wwwroot/index.html');

    var jsVendors = gulp.src([
        './wwwroot/libs/kendo/jquery.min.js',
        './wwwroot/dependencies/angularjs/angular.min.js',
        './wwwroot/dependencies/**/*.js',
        './wwwroot/libs/kendo/kendo.all.min.js',
        './wwwroot/libs/**/*.js',
        '!./wwwroot/libs/kendo/cultures/kendo.culture.pt.min.js',
        '!./wwwroot/libs/kendo/cultures/kendo.culture.pt-PT.min.js',
        '!./wwwroot/libs/kendo/messages/kendo.messages.pt-PT.min.js',
    ], { read: false });

    var jsSources = gulp.src([
        './wwwroot/app-config/**/*.js',
        './wwwroot/controllers/**/*.js',
        './wwwroot/directives/**/*.js',
        './wwwroot/filters/**/*.js',
        './wwwroot/services/**/*.js'
    ]).pipe(angularFilesort());

    var cssVendors = gulp.src([
        './wwwroot/content/css/**/*.css',
        '!./wwwroot/content/css/site.css'
    ], { read: false });

    var cssSources = gulp.src('./wwwroot/content/css/site.css', { read: false });

    return target.pipe(inject(series(jsVendors, jsSources, cssVendors, cssSources), { relative: true }))
        .pipe(gulp.dest('./wwwroot/'));
});

gulp.task('sass', function () {
    return gulp.src([
            'wwwroot/content/css/*.scss'
            ])
            .pipe(sass().on('error', sass.logError))
            .pipe(gulp.dest(function(file){
                var split = file.path.split("/");
                var fileFolder = split.slice(0, split.length - 1).join("/");
                return fileFolder;
            }));
});

gulp.task('sass:watch', function () { 
    gulp.watch(['wwwroot/content/css/*.scss'], ['sass']);
});