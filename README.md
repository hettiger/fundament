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
| __gulp serve__    | Probably __the only command you'll ever need__. Starts a Browsersync HTTP server and opens a new browser tab with the correct development URL. Watches the filesystem for changes, executes the task `build` accordingly and live reloads all Browsersync instances.

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
└───src
│   │
│   └───scripts
│   │   │   main.js (entry file for your JavaScript bundle)
│   │   │   ... (further structure depends on you)
│   │
│   └───styles
│       │   main.scss (entry file for your CSS bundle)
│       │   ... (further structure depends on you)
```

The directories `./src/scripts/` and `./src/styles/` already include some additional files you don't see in the
above file structure. (modules, partials, mixins and variables) These just exist for demonstration / quick start
purposes.
