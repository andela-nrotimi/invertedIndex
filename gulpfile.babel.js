import gulp from 'gulp';
import babel from 'gulp-babel';
import nodemon from 'gulp-nodemon';
import jasmineBrowser from 'gulp-jasmine-browser';
// import rename from 'gulp-rename';
import browserify from 'browserify';
import source from 'vinyl-source-stream';



gulp.task('transpile', () => {
  return gulp.src(['src/**/*.js', './server.js', 'tests/inverted-index-test.spec.js'])
    .pipe(babel())
    .pipe(gulp.dest('dist'));
});

gulp.task('serve', () => {
  nodemon({ script: './dist/server.js' });
});

gulp.task('test', () => {
  gulp.src(['dist/inverted-index', 'dist/inverted-index-test.spec.js'])
    .pipe(jasmineBrowser.specRunner())
    .pipe(jasmineBrowser.server({ port: 7070 }));
});

gulp.task('watch', () => {
  gulp.watch(['src/**/*.js', 'tests/inverted-index-test.spec.js'], ['transpile']);
});

// gulp.task('scripts', () => {
//   gulp.src(['dist/inverted-index', 'dist/inverted-index-test.spec.js'])
//    .pipe(browserify())
//    .pipe(rename('bundle.js'))
//    .pipe(gulp.dest('jasmine'));
// });

gulp.task('browserify', () =>
   browserify('tests/inverted-index-test.spec.js')
    .bundle()
    .pipe(source('index-test-spec1.js'))
    .pipe(gulp.dest('dist'))
);

gulp.task('default', ['transpile', 'serve', 'test', 'watch']);
