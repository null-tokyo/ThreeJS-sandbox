//config
const config = require('../config').copy;
//global
const gulp = require('gulp');

const task = function(){
    gulp.src(config.src,{ base: config.base })
        .pipe(gulp.dest(config.dist));
}

gulp.task('copy', () => task());
