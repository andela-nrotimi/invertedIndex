import gulp from 'gulp';
import babel from 'gulp-babel';
import nodemon from 'gulp-nodemon';
import jasmineBrowser from 'gulp-jasmine-browser';
import browserify from 'browserify';
import istanbulReport from 'gulp-istanbul-report';
// import babelify from 'babelify';



gulp.task('transpile', () => {
  return gulp.src(['src/**/*.js', './server.js', 'tests/inverted-index-test.spec.js'])
    .pipe(babel())
    .pipe(gulp.dest('dist'));
});

gulp.task('serve', () => {
  nodemon({ script: './dist/server.js' });
});

gulp.task('test', () => {
  // gulp.src(['dist/inverted-index', 'dist/inverted-index-test.spec.js'])
  gulp.src(['dist/inverted-index', './bundle.js'])
    .pipe(jasmineBrowser.specRunner())
    .pipe(jasmineBrowser.server({ port: 7070 }));
});

gulp.task('watch', () => {
  gulp.watch(['src/**/*.js', 'tests/inverted-index-test.spec.js'], ['transpile']);
});

const coverageFile = './coverage/coverage.json';
gulp.task('coverage', ['test'], () => {
  gulp.src(coverageFile)
    .pipe(istanbulReport({
      reporters: [
        'text-summary',
        {
          name: 'json',
          file: 'cov.json',
          dir: './coverage'
        }
      ]
    }));
});
// gulp.task('scripts', () => {
//   gulp.src(['dist/inverted-index', 'dist/inverted-index-test.spec.js'])
//    .pipe(browserify())
//    .pipe(rename('bundle.js'))
//    .pipe(gulp.dest('jasmine'));
// });

// browserify({ debug: true })
//   .transform(babelify)
//   .require("./script.js", { entry: true })
//   .bundle()
//   .on("error", function (err) { console.log("Error: " + err.message); })
//   .pipe(fs.createWriteStream("bundle.js"));

gulp.task('browserify', () =>
   browserify('tests/inverted-index-test.spec.js')
    .bundle()
    .pipe(source('index-test-spec1.js'))
    .pipe(gulp.dest('dist'))
);

gulp.task('default', ['transpile', 'serve', 'test', 'watch']);
