/**
 * запустить сборщик для работы с основынм сайтом "gulp"
 * запустить сборщик для работы со страницами открытия брокерского счета "gulp open-acc"
 */

var gulp 		 = require('gulp'),
	browserSync  = require('browser-sync'),
	concat       = require('gulp-concat'),
	uglify       = require('gulp-uglify'),
	rename       = require('gulp-rename'),
	del          = require('del');


// таск для сжатия и объединения js файлов формы заказа звонка
gulp.task('request-call-scripts', function() {
	return gulp.src([ // Берем все необходимые библиотеки
			'js/vendors/body-scroll-lock.min.js',
			'js/vendors/maska.js',
			'js/modules/request-call.js',
		])
		.pipe(concat('request-call.min.js')) // Собираем их в кучу в новом файле libs.min.js
		.pipe(uglify()) // Сжимаем JS файл
		.pipe(gulp.dest('js/')); // Выгружаем в папку app/js
});

// таск для обновления страницы
gulp.task('browser-sync', function() {
	browserSync({
		startPath:'./request-call-widgets',
		port: 3030,
		server: {
			baseDir: '..',
		},
		notify: false
	})
});

// таск следит за изменениями файлов и вызывает другие таски
gulp.task('watch', function() {
	gulp.watch(['js/vendors/*.js', 'js/modules/main.js'], gulp.parallel('request-call-scripts'));
	gulp.watch(['js/vendors/*.js', 'js/modules/request-call.js'],gulp.parallel('request-call-scripts'));
	gulp.watch('**/*.html', browserSync.reload);
	gulp.watch('styles/*.css', browserSync.reload);
	gulp.watch('js/*.js', browserSync.reload);
});

// основной таск, который запускает вспомогательные
gulp.task('default', gulp.parallel('browser-sync', 'watch', 'request-call-scripts'));