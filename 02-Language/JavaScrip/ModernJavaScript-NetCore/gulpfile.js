var gulp = require("gulp");
var concat = require("gulp-concat");
var cssmin = require("gulp-cssmin");
var uglify = require("gulp-uglify");
var sass = require("gulp-sass");
var babel = require("gulp-babel");
var sourcemaps = require("gulp-sourcemaps");
var cache = require("gulp-cached");
var merge = require("gulp-merge");

var paths = {
  webroot: "./wwwroot/",
  scriptSource: "./wwwroot/demos/*.js",
  scriptDest: "./wwwroot/js/",
  demos: "./wwwroot/demos/",
  scss: "./wwwroot/sass/**/*.scss",
  scssDest: "./wwwroot/css/"
};

gulp.task("compile-sass", function() {
  return gulp
    .src(paths.scss)
    .pipe(sass())
    .pipe(gulp.dest(paths.scssDest));
});

gulp.task("minjs", function() {
  return gulp
    .src([paths.scriptSource])
    .pipe(concat(paths.scriptDest + "min/site.min.js"))
    .pipe(uglify())
    .pipe(gulp.dest("."));
});

gulp.task("copyjs", function() {
  return gulp.src([paths.scriptSource]).pipe(gulp.dest(paths.scriptDest));
});

gulp.task("babel", () => {
  return gulp
    .src([paths.demos + "es6*.js"])
    .pipe(sourcemaps.init())
    .pipe(
      babel({
        presets: ["es2015"]
      })
    )
    .pipe(concat("es5bundle.js"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(paths.demos));
});

//Copy from node_modules to wwwroot

gulp.task("copy-node", function() {
  try {
    gulp
      .src("node_modules/**")
      .pipe(cache("node_modules"))
      .pipe(gulp.dest("wwwroot/node_modules"));
  } catch (e) {
    return -1;
  }
  return 0;
});

//Better way to copy from node_modules to wwwroot

var deps = {
  jquery: {
    "dist/*": ""
  },
  systemjs: {
    "dist/system.js": ""
  },
  lodash: {
    "underscore-min.js": ""
  }
};

gulp.task("copy-nodev2", function() {
  var streams = [];

  for (var prop in deps) {
    console.log("Prepping Scripts for: " + prop);
    for (var itemProp in deps[prop]) {
      streams.push(
        gulp
          .src(`node_modules/${prop}/${itemProp}`)
          .pipe(gulp.dest(`wwwroot/lib/${prop}/${deps[prop][itemProp]}`))
      );
    }
  }

  return merge(streams);
});
