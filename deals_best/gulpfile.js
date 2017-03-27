const gulp = require('gulp');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const htmlmin = require('gulp-htmlmin');
 

gulp.task('minify', function() {
  return gulp.src('src/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'));
});

gulp.task('sass', function () {
  return gulp.src('src/styles/SASS/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('src/styles/'));
});

gulp.task('minify-css', ['css-prefix'], function() {
  return gulp.src('src/styles/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/styles/'));
});

gulp.task('css-prefix', () =>
    gulp.src('src/styles/style.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('src/styles/'))
        
);

gulp.task('prefmin', ['css-prefix'], function() {
	gulp.start('minify-css');
});

gulp.task('watch', function() {
  gulp.watch('src/styles/**/*.scss', ['sass']);
  gulp.watch('src/styles/**/*.css',  ['css-prefix', 'minify-css']);
});