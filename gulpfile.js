//config
const config = require('./gulp/config');
const $ = require('./gulp/plugins');
//global
const requireDir = require('require-dir');

requireDir('./gulp/tasks', {recurse: true});

$.gulp.task('build', ['script', 'css', 'ejs', 'copy']);
$.gulp.task('production', ['script', 'css', 'ejs', 'copy']);

$.gulp.task('watch', () => {
    $.gulp.watch(config.script.watch, ['script']);
    $.gulp.watch(config.css.src, ['css']);
    $.gulp.watch([config.ejs.watch, './data.json'], ['ejs']).on('change', () => {
        $.browserSync.reload();
    });
    $.gulp.watch(config.ejs.copy, ['copy']).on('change', () => {
        $.browserSync.reload();
    });
});

$.gulp.task('default', ['build', 'watch', 'server']); 