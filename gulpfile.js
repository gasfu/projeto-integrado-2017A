const gulp = require("gulp");
const cssmin = require('gulp-cssmin');
const sourcemaps = require('gulp-sourcemaps');
const concatCss = require('gulp-concat-css');

gulp.task("default", ["style"], () => {
	gulp.watch("stylesheets/*.css", ["style"]);
});

gulp.task("style", () => {
	return gulp.src("stylesheets/*.css")
	.pipe(sourcemaps.init())
		.pipe(cssmin())
		.pipe(concatCss("bundle.min.css"))
	.pipe(sourcemaps.write())
	.pipe(gulp.dest('public/bundles'))
});