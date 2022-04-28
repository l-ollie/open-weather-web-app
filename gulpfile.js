// prettier-ignore

const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass')(require('sass'));
const uglifycss = require('gulp-uglifycss');
const sourcemaps = require('gulp-sourcemaps');

// prettier-ignore
gulp.task('compileStyles',  function(cd) {
	gulp.src('src/assets/scss/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(uglifycss({
            "maxLineLen": 80,
            "uglyComments": true
        }))
        .pipe(gulp.dest('src/assets/css'));
    cd();
});

gulp.task('default', function() {
	gulp.watch('src/assets/scss/*.scss', gulp.series('compileStyles'));
});
