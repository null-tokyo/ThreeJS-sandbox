//config
const config = require('../config').server;
//global
const gulp = require('gulp');
const browserSync = require('browser-sync');

const task = function(){
    browserSync.init(config);
}

gulp.task('server', () => task());