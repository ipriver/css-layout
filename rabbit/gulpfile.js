const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');
const concatCss = require('gulp-concat-css');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const gulpsync = require('gulp-sync')(gulp);

gulp.task('hminify', function() {
    return gulp.src('src/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist'));
});

gulp.task('imgmin', () =>
gulp.src('src/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'))
);

gulp.task('concat', function () {
    return gulp.src('src/styles/*.css')
        .pipe(concatCss("style.css"))
        .pipe(gulp.dest('src/styles/bundle'));
});

 gulp.task('minandprefix', () =>
     gulp.src('src/styles/bundle/style.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('dist/styles'))
);

gulp.task('fonts', () =>
    gulp.src('src/fonts/*')
        .pipe(gulp.dest('dist/fonts'))
);

gulp.task('syncCss', gulpsync.sync(['concat', 'minandprefix']));

gulp.task('build', ['fonts', 'hminify', 'imgmin', 'syncCss']);