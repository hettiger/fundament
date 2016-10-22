'use strict';

import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import rollup from 'rollup-stream';
import buble from 'rollup-plugin-buble';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import browserSync from 'browser-sync';

let plugins = gulpLoadPlugins();
let reload = browserSync.reload;

gulp.task('eslint', () => gulp.src('src/scripts/**/*.js')
  .pipe(plugins.eslint())
  .pipe(plugins.eslint.format())
  .pipe(plugins.eslint.failOnError())
  .on('error', plugins.notify.onError('ESLint Error!'))
);

gulp.task('scripts', ['eslint'], () => {
  return rollup({
    entry: 'src/scripts/main.js',
    sourceMap: true,
    plugins: [buble()]
  })
  .pipe(source('main.js', 'src/scripts'))
  .pipe(buffer())
  .pipe(plugins.sourcemaps.init({ loadMaps: true }))
  .pipe(plugins.sourcemaps.write('.'))
  .pipe(gulp.dest('dist/scripts'));
});

gulp.task('styles', () => gulp.src('src/styles/main.scss')
  .pipe(plugins.sourcemaps.init())
  .pipe(
    plugins.sass({ precision: 10 })
      .on('error', plugins.sass.logError)
      .on('error', plugins.notify.onError('SCSS Error!'))
  )
  .pipe(plugins.autoprefixer([
    'ie >= 10',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10'
  ]))
  .pipe(gulp.dest('dist/styles'))
  .pipe(plugins.sourcemaps.write('./'))
  .pipe(gulp.dest('dist/styles'))
);

gulp.task('build', ['scripts', 'styles']);

gulp.task('serve', ['build'], () => {
  browserSync({
    notify: false,
    logPrefix: 'FUNDAMENT',
    https: false,
    server: ['./'],
    port: 3000
  });

  gulp.watch(['src/styles/**/*.scss'], ['styles', reload]);
  gulp.watch(['src/scripts/**/*.js'], ['scripts', reload]);
  gulp.watch(['./*.html'], reload);
});

gulp.task('help', () => {
  process.stdout.write('\r\n\tWelcome to Fundament the straight forward frontend starter kit.\r\n');
  process.stdout.write('\tPlease check the file "README.md" to see a list of all available commands.\r\n\r\n');
});

gulp.task('default', ['help']);
