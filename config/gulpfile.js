const gulp = require('gulp');
const sass = require('gulp-sass');
const gulpWait = require('gulp-wait');
const browserSync = require('browser-sync').create();
const cssnano = require('gulp-cssnano');
const autoprefixer = require('gulp-autoprefixer');
const sequence = require('run-sequence');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');
const uglify = require('gulp-uglify');
const paths = {
	src: '../src',
	build: '../build'
};

/**
*	SASS Compiling
*/
gulp.task('sass', () => {
	return gulp
		.src(`${paths.src}/scss/style.scss`)
			.pipe(gulpWait(200))
			.pipe(sass().on('error', sass.logError))
			.pipe(gulp.dest(`${paths.build}/assets/css`))
			.pipe(browserSync.stream());
});			

/**
*	Autoprefixer
*/
gulp.task('autoprefix', () => {
	gulp
		.src(`${paths.build}/assets/css/style.css`)
			.pipe(autoprefixer({
				browsers: ['last 2 versions'],
				cascade: false
			}))
			.pipe(gulp.dest(`${paths.build}/assets/css`));
});

/**
*	Webpack
*/
gulp.task('webpack', () => {
	return webpackStream(webpackConfig)
		.on('error', function() {
			this.emit('end');
		})
		.pipe(gulp.dest(`${paths.build}/assets/js/`));
});

/**
*	Watch Task
*/
gulp.task('watch', () => {
	sequence('sass', 'autoprefix', 'webpack');
	
	browserSync.init({
		server: {
			baseDir: `${paths.build}`,
			directory: true
		}
	});

	gulp.watch(`${paths.src}/scss/**/*.scss`, ['sass']);
	gulp.watch(`${paths.build}/assets/css/style.css`, ['autoprefix']);
	gulp
		.watch(`${paths.build}/*.html`)
			.on('change', browserSync.reload);
	gulp
		.watch(`${paths.src}/js/**/*.js`)
			.on('change', browserSync.reload);
	gulp.watch(`${paths.src}/js/**/*.js`, ['webpack']);
});

/**
*	Minifying Task`
*/
gulp.task('minify', () => {
	gulp
		.src(`${paths.build}/assets/css/style.css`)
			.pipe(cssnano())
			.pipe(gulp.dest(`${paths.build}/assets/css`));		
	gulp
		.src(`${paths.build}/assets/js/bundle.js`)
			.pipe(uglify())
			.pipe(gulp.dest(`${paths.build}/assets/js/`));

});

/**
*	Build Task`
*/
gulp.task('build', () => {
	sequence('sass', 'autoprefix', 'webpack');
});
