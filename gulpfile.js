"use strict";
const gulp = require("gulp");
const gulpWatch = require("gulp-watch");
const runSequence = require("run-sequence");
const del = require("del");
const exec = require("child_process").exec;


gulp.task("clean", function () {
    return del(["build"]);
});

gulp.task("copySources", ["clean"], function () {
    return gulp.src(["src/**"])
        .pipe(gulp.dest("build"));
});

gulp.task("build", ["copySources"], function (callback) {
    exec("static-i18n -l en -i en -i de src -o build --fileFormat yaml", function (err, stdout, stderr) {
        if (stdout) console.log(stdout);
        if (stderr) console.log(stderr);
        callback(err);
    })
});

gulp.task("watch", ["clean"], function () {
    return gulpWatch(["src/**/*", "locales/**/*"], {ignoreInitial: false}, function () {
        runSequence("build");
    });
});

module.exports = gulp;
