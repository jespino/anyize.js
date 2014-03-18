var gulp = require("gulp");
var coffee = require("gulp-coffee");
var uglify = require("gulp-uglify");
var coffeelint = require("gulp-coffeelint");
var gutil = require("gulp-util");
var concat = require("gulp-concat");

// define tasks here
gulp.task("default", ["coffee"]);

gulp.task("dist", function() {
    gulp.src(["src/anyize.coffee"])
        .pipe(coffee().on("error", gutil.log))
        .pipe(uglify())
        .pipe(concat('anyize.min.js'))
        .pipe(gulp.dest("dist/"));
});

gulp.task("coffee", function() {
    gulp.src(["src/anyize.coffee"])
        .pipe(coffee().on("error", gutil.log))
        .pipe(gulp.dest("dist/"));
});

gulp.task("lint", function() {
    gulp.src(["src/anyize.coffee"])
        .pipe(coffeelint("coffeelint.json"))
        .pipe(coffeelint.reporter())
});
