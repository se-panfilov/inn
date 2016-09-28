'use strict';

const gulp = require('gulp');

const config = require('../config');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const babel = require('gulp-babel');
const eslint = require('gulp-eslint');

gulp.task('js', () => {

    return gulp.src(config.js.src)
        .pipe(plumber({
            errorHandler: notify.onError(err => {
                return {
                    title: 'Build JS',
                    message: err.message
                };
            })
        }))
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(concat(config.projectName + '.js'))
        .pipe(eslint({
            fix: true
        }))
        .pipe(eslint.format())
        .pipe(gulp.dest(config.dest))
        .pipe(uglify())
        .pipe(rename({ basename: config.projectName + '.min' }))
        .pipe(gulp.dest(config.dest))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.dest))
        ;

});

