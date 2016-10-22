# Fundament

Fundament is a straight forward frontend starter kit. It supports many goodies that help you make better websites
or maybe even hybrid apps. Fundament get's out of your way providing you only the basic tooling. Need some more?
You can always drop in some additional npm modules for example.

## Features

* ES2015 / ES6 compiler
* JavaScript module bundler
* ESLint with desktop error notifications
* SCSS with autoprefixer and desktop error notifications
* JavaScript and CSS Sourcemaps
* Browsersync (Live reload + HTTP server for usage across multiple devices)
* PHP Support

## Installation

`npm install`

## Usage

Fundament is utilizing [Gulp](http://gulpjs.com/) and provides multiple cli commands:

| Command           | Description
|---                |---
| gulp              | Executes the default task which points to `gulp help`
| gulp help         | Just suggests to check this file to see a list of all available commands.
| gulp eslint       | Lints all JavaScript located in the directory `./src/scripts/`
| gulp scripts      | Lints, bundles and transforms your JavaScript using the entry point `./src/scripts/main.js`
| gulp styles       | Lints, bundles and transforms your SCSS using the entry point `./src/styles/main.scss`
| gulp build        | Executes the tasks `scripts` and `styles`
| __gulp serve__    | Starts a Browsersync HTTP server and opens a new browser tab with the correct development URL. Watches the filesystem for changes, executes the task `build` accordingly and live reloads all Browsersync instances.
| gulp php-serve    | Actually the same as `gulp serve` but with PHP support. Using `./index.php` instead of `./index.html` as entry point.

## File Structure

Following file structure describes the most important parts of the project. If you find that any files are missing
please draft an issue.

```
Fundament
│   .babelrc (Babel configuration only used by the build tool)
│   .editorconfig
│   .eslintrc.yml
│   .gitignore
│   gulpfile.babel.js
│   index.html (a first HTML file that you can modify to suit your needs)
│   index.php (a first PHP file that you can modify to suit your needs)
│   LICENSE
│   package.json
│   README.md
│
└───dist
│   │
│   └───scripts
│   │   │   main.js (JavaScript bundle to use for production)
│   │   │   main.js.map (JavaScript sourcemap)
│   │
│   └───styles
│       │   main.css (CSS bundle to use for production)
│       │   main.css.map (CSS sourcemap)
│   
└───src (add any additional HTML or PHP files beneath this directory)
│   │
│   └───scripts (add any additional JavaScript files beneath this directory)
│   │   │   main.js (entry file for your JavaScript bundle)
│   │   │   ... (further structure depends on you)
│   │
│   └───styles (add any additional SCSS files beneath this directory)
│       │   main.scss (entry file for your CSS bundle)
│       │   ... (further structure depends on you)
```

The directories `./src/scripts/` and `./src/styles/` already include some additional files you don't see in the
above file structure. (modules, partials, mixins and variables) These just exist for demonstration / quick start
purposes.

## Configuration

If you want to use this for a CMS theme for example you'll probably need to modify some configuration and/or paths.
This can be accomplished by editing the file `gulpfile.babel.js`. You may even provide a `router.php` file to
emulate your CMS's mod_rewrite behaviour. (check out the task `php-serve`)

[This is what a `router.php` file might look like.](https://processwire.com/talk/topic/13445-using-phps-built-in-webserver-with-processwire/)

Since such needs are very individual please understand that i cannot provide any assistance when it comes to
altering the base configuration. I suggest you look at Gulp's documentation or the specific node module's one.
