const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const { series, watch } = require('gulp');

function compileSass() {
  return gulp.src(['src/scss/globals.scss'])
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
}

function serve() {
  browserSync.init({
    server: "./src"  
});

watch('src/scss/**/*.scss', {usePolling: true}, compileSass);
watch("src/*.html",{usePolling: true},).on('change', browserSync.reload);
}

exports.default = series(compileSass, serve);

// // Compile Sass & Inject Into Browser
// gulp.task('sass', function() {
//     return gulp.src(['src/scss/*.scss'])
//         .pipe(sass())
//         .pipe(autoprefixer({
//             browsers: ['last 2 versions'],
//             cascade: false
//         }))
//         .pipe(gulp.dest("src/css"))
//         .pipe(browserSync.stream());
// });

// // Watch Sass & Serve
// gulp.task('serve', ['sass'], function() {
//     browserSync.init({
//         server: "./src"  
//     });

//     gulp.watch(['src/scss/*.scss'], ['sass']);
//     gulp.watch("src/*.html").on('change', browserSync.reload);
// });

// // Default Task
// gulp.task('default', ['serve']);