const gulp = require('gulp');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');

gulp.task('minify-html', function() {
  return gulp.src('src/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'));
});

gulp.task('sass', function () {
  return gulp.src('src/styles/sass/*.sass')
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
 
gulp.task('img-compr', () =>
    gulp.src('src/images/*.png')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
);

gulp.task('watch', function() {
  gulp.watch('src/styles/**/*.sass', ['sass']);
  gulp.watch('src/styles/**/*.css',  ['css-prefix', 'minify-css']);
  gulp.watch('src/images/*', ['img-compr']);
  gulp.watch('src/*.html', ['minify-html']);
});