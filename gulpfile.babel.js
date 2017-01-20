'use strict';

import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import rollup from 'rollup-stream';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import buble from 'rollup-plugin-buble';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import browserSync from 'browser-sync';

let plugins = gulpLoadPlugins();
let reload = browserSync.reload;
let proxy = plugins.util.env.proxy || 'localhost';
let path = plugins.util.env.path || false;
let css_path = plugins.util.env.css_path || path;
let js_path = plugins.util.env.js_path || false;

gulp.task('eslint', () => gulp.src('src/scripts/**/*.js')
  .pipe(plugins.eslint())
  .pipe(plugins.eslint.format())
  .pipe(plugins.eslint.failOnError())
  .on('error', plugins.notify.onError('ESLint Error!'))
);

gulp.task('scripts', ['eslint'], () => {
  return rollup({
    entry: 'src/scripts/main.js',
    format: 'es',
    sourceMap: true,
    plugins: [
        nodeResolve({ jsnext: true, main: true }),
        commonjs(),
        buble()
    ]
  })
  .pipe(source('main.js', 'src/scripts'))
  .pipe(buffer())
  .pipe(plugins.sourcemaps.init({ loadMaps: true }))
  .pipe(plugins.uglify({ preserveComments: 'some' }))
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
  .pipe(plugins.if('*.css', plugins.cssnano()))
  .pipe(plugins.sourcemaps.write('./'))
  .pipe(gulp.dest('dist/styles'))
  .pipe(plugins.filter('dist/styles/**/*.css'))
  .pipe(plugins.if(browserSync.active, reload({ stream: true })))
);

gulp.task('watch', () => {
  gulp.watch(['src/styles/**/*.scss'], ['styles']);
  gulp.watch(['src/scripts/**/*.js'], ['scripts', reload]);
  gulp.watch(['./index.html', './src/**/*.html'], reload);
  gulp.watch(['./index.php', './src/**/*.php'], reload);
});

gulp.task('init-html-server', () => {
  browserSync({
    notify: false,
    logPrefix: 'FUNDAMENT',
    https: false,
    server: ['./'],
    port: 3000
  });
});

gulp.task('init-php-server', () => {
  plugins.connectPhp.server({
      port: 8080,
      hostname: '127.0.0.1',
      base: './', // path to the folder that should be served
      open: false, // it shouldn't be opened automatically (that's BrowserSync's task)
      // router: './router.php', // provide a router script to emulate mod_rewrite for example
      bin: 'php', // useful to force a specific php version for example
      stdio: 'ignore' // disable php server logging
    },

    () => browserSync({
      notify: false,
      logPrefix: 'FUNDAMENT',
      https: false,
      proxy: '127.0.0.1:8080', // use the php server
      port: 3000
    })
  );
});

gulp.task('init-local-proxy', () => {
  browserSync({
    notify: false,
    logPrefix: 'FUNDAMENT',
    proxy,
    port: 3000
  });
});

gulp.task('init-remote-proxy', () => {
  let rewriteRules = [];
  let additionalCode = '';

  if (css_path) {
    rewriteRules.push({
      // match the path and any leading host ignoring get parameters or hashes
      match: new RegExp(
        `("|')[^"']*(?=${css_path})${css_path}(?:\\?[^="']+=[^&#"']+(?:&[^="']+=[^&#"']+)?)?(?:#[\\w-]+)?("|')`
      ),
      replace: '$1/styles/main.css$2'
    });
  } else {
    additionalCode += '<link rel="stylesheet" type="text/css" href="/styles/main.css">';
  }

  if (js_path) {
    rewriteRules.push({
      // match the path and any leading host ignoring get parameters or hashes
      match: new RegExp(
        `("|')[^"']*(?=${js_path})${js_path}(?:\\?[^="']+=[^&#"']+(?:&[^="']+=[^&#"']+)?)?(?:#[\\w-]+)?("|')`
      ),
      replace: '$1/scripts/main.js$2'
    });
  } else {
    additionalCode += `
      <script>
        // Inject the script main.js on the window load event.
        // Because main.js may depend on the window load event fire it again at the right time.
        (function (target, type, listener) {
          target.addEventListener(type, function fn (event) {
              target.removeEventListener(type, fn);
              listener(event);
          });
        })(window, 'load', function() { 
          var script = document.createElement("script");
          
          script.defer = "defer"; 
          script.src = "/scripts/main.js";
          script.addEventListener('load', function() {
            var event = document.createEvent('Event');  
            event.initEvent('load', false, false);  
            window.dispatchEvent(event); 
          });
          
          document.body.appendChild(script); 
        });
      </script>
    `;
  }

  browserSync({
    notify: false,
    logPrefix: 'FUNDAMENT',
    proxy,
    serveStatic: ['dist'],
    rewriteRules,
    snippetOptions: {
      rule: {
        match: /<\/body>/i,
        fn: function (snippet, match) {
          return additionalCode + snippet + match;
        }
      }
    }
  });
});

gulp.task('help', () => {
  plugins.util.log('Welcome to Fundament the straight forward frontend starter kit.');
  plugins.util.log('Please check the file "README.md" to see a list of all available commands.');
});

gulp.task('build', ['scripts', 'styles']);
gulp.task('serve', ['build', 'init-html-server', 'watch']);
gulp.task('php-serve', ['build', 'init-php-server', 'watch']);
gulp.task('local-proxy', ['build', 'init-local-proxy', 'watch']);
gulp.task('remote-proxy', ['build', 'init-remote-proxy', 'watch']);
gulp.task('default', ['help']);
