const { src, dest, watch, series} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browsersync = require('browser-sync').create();

//sass Task
function scssTask() {
    return src('app/scss/style.scss', {sourcemaps:true})
    .pipe(sass())
    .pipe(dest('app/css',{sourcemaps:'.'}));
}

//Browwer sync Tasks
function browsersyncServer(callback) {
    browsersync.init({
        server: {
            baseDir: '.'
        }
    });
    callback();
}

function browsersyncReload(callback) {
    browsersync.reload();
    callback();
}

//Watch Task
function watchTask() {
    watch('*.html', browsersyncReload);
    watch(['app/scss/**/*.scss','app/js/**/*.js'], series(scssTask,browsersyncReload))
}

//Default Gulp task
exports.default = series(
    scssTask,
    browsersyncServer,
    watchTask
)