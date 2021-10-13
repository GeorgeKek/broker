/**
 * запустить сборщик для работы с основынм сайтом "gulp"
 * запустить сборщик для работы со страницами открытия брокерского счета "gulp open-acc"
 */

var gulp 		 = require('gulp'),
	sass         = require('gulp-sass'),
	browserSync  = require('browser-sync'),
	concat       = require('gulp-concat'),
	uglify       = require('gulp-uglify'),
	cssnano      = require('gulp-cssnano'),
	rename       = require('gulp-rename'),
	del          = require('del'),
	image        = require('gulp-image'),
	pngquant     = require('imagemin-pngquant'),
	cache        = require('gulp-cache'),
	babel        = require('gulp-babel'),
	autoprefixer = require('gulp-autoprefixer'),
	fileinclude  = require('gulp-file-include'),
	polyfill  	 = require('@babel/polyfill');
// uglify 		 = require('gulp-uglify-es').default;

// таск для компиляции scss в css основного сайта
gulp.task('sass', function()
{
	return gulp.src('scss/style.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))
		.pipe(cssnano())
		.pipe(gulp.dest('css'))
		.pipe(browserSync.reload({stream: true}));
});

// таск для компиляции scss в css страниц открытие брокерского счета
gulp.task('sass-open-acc', function()
{
	return gulp.src('scss/open-account/style.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))
		.pipe(cssnano())
		.pipe(rename('open-account-styles.css'))
		.pipe(gulp.dest('css/'))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('minify-css', function()
{
	return gulp.src('css/style.css')
		.pipe(cssnano())
		.pipe(gulp.dest('css'));
});

// таск для компиляции стилей amp
gulp.task('amp-sass', function()
{
	return gulp.src('scss/components/amp-template.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))
		.pipe(cssnano())
		.pipe(gulp.dest('css'))
		.pipe(browserSync.reload({stream: true}));
});

// таск для сжатия и объединения js файлов
gulp.task('scripts', function()
{
	return gulp.src([ // Берем все необходимые библиотеки
		'js/vendors/jquery-2.2.2.min.js',
		'js/vendors/datalist.js',
		'js/vendors/jquery.formstyler.min.js',
		'js/vendors/input-mask.min.js',
		'js/vendors/body-scroll-lock.min.js',
		'js/vendors/jquery-nice-select.min.js',
		'js/vendors/no-ui-slider.min.js',
		'js/vendors/popper.min.js',
		'js/vendors/tippy-bundle.umd.js',
		'js/main.js',
		'js/vendors/mark.min.js',
		'js/vendors/slick.min.js',
	])
		// .pipe(babel())
		.pipe(concat('main.min.js')) // Собираем их в кучу в новом файле main.min.js
		.pipe(uglify()) // Сжимаем JS файл
		.pipe(gulp.dest('js')); // Выгружаем в папку
});

gulp.task('tarrifs-scripts', function()
{
	return gulp.src([ // Берем все необходимые библиотеки
		'js/vendors/vue.js',
		'js/vendors/accounting.js',
		'js/vendors/vue-slider.js',
		'js/vendors/vue-numeric.js',
		'js/tarrifs/tarrifs.js',
	])
		.pipe(concat('tarrifs.min.js')) // Собираем их в кучу в новом файле main.min.js
		.pipe(uglify()) // Сжимаем JS файл
		.pipe(gulp.dest('js/tarrifs')); // Выгружаем в папку
});

gulp.task('feedback-form-scripts', function()
{
	return gulp.src([ // Берем все необходимые библиотеки
		'js/feedback-form.js',
	])
		.pipe(concat('feedback-form.min.js')) // Собираем их в кучу в новом файле main.min.js
		.pipe(uglify()) // Сжимаем JS файл
		.pipe(gulp.dest('js')); // Выгружаем в папку
});
gulp.task('tooltips-scripts', function()
{
	return gulp.src([ // Берем все необходимые библиотеки
		'js/tooltips.js',
	])
		.pipe(concat('tooltips.min.js')) // Собираем их в кучу в новом файле main.min.js
		.pipe(uglify()) // Сжимаем JS файл
		.pipe(gulp.dest('js')); // Выгружаем в папку
});

gulp.task('currency-scripts', function()
{
	return gulp.src([ // Берем все необходимые библиотеки
		'js/vendors/vue-production.min.js',
		'js/vendors/accounting.js',
		'js/vendors/vue-slider.js',
		'js/vendors/vue-numeric.js',
		'js/currency-calc/currency-calc.js',
	])
		.pipe(concat('currency-calc.min.js')) // Собираем их в кучу в новом файле main.min.js
		.pipe(uglify()) // Сжимаем JS файл
		.pipe(gulp.dest('js/currency-calc')); // Выгружаем в папку
});

// таск для сжатия и объединения js файлов
gulp.task('open-acc-scripts', function()
{
	return gulp.src([ // Берем все необходимые библиотеки
		'js/vendors/jquery-2.2.2.min.js',
		'js/vendors/input-mask.min.js',
		'js/vendors/jquery-validation-plugin.min.js',
		'js/open-account/main.js',
		'js/open-account/modules/*.js',
	])
		.pipe(concat('main.min.js')) // Собираем их в кучу в новом файле libs.min.js
		.pipe(uglify()) // Сжимаем JS файл
		.pipe(gulp.dest('js/open-account')); // Выгружаем в папку app/js
});

// таск для сжатия и объединения js файлов
gulp.task('build-pdf-render', function()
{
	return gulp.src([ // Берем все необходимые библиотеки
		'js/open-account/render-pdfs.js',
	])
		.pipe(concat('render-pdfs.min.js')) // Собираем их в кучу в новом файле libs.min.js
		.pipe(uglify()) // Сжимаем JS файл
		.pipe(gulp.dest('js/open-account')); // Выгружаем в папку app/js
});

// таск для сжатия и объединения js файлов
gulp.task('chares-chart-scripts', function()
{
	return gulp.src([ // Берем все необходимые библиотеки
		'js/vendors/luxon.min.js',
		'js/vendors/chart.min.js',
		'js/vendors/chart-luxon-adapter.js',
		'js/vendors/chart-financial-type.js',
		'js/chares-chart-module/chares-chart.js',
	])
		.pipe(concat('chares-chart-module.min.js')) // Собираем их в кучу в новом файле libs.min.js
		.pipe(uglify()) // Сжимаем JS файл
		.pipe(gulp.dest('js/chares-chart-module')); // Выгружаем в папку app/js
});

// конфиг для создания спрайтов
// https://github.com/jkphl/gulp-svg-sprite#basic-example
var svgSpriteConfig = {
	dest : '.',
	mode : {
		css : {
			dest : '.',
			sprite : 'images/sprite.svg',
			render : {
				css : {dest : 'css/sprite.css'},
				scss : {
					dest : 'scss/sprite.scss'
				}
			},
		}
	}
};

// таск для создания спрайтов из png картинок
gulp.task('sprite', function ()
{
		var spriteData = gulp.src('images/icons/*.png').pipe(spritesmith({
			imgName: 'sprite.png',
			imgPath: '/images/sprite.png',
			cssName: 'sprite.scss',
			algorithm: 'diagonal',
			paddingg: 15
		}));
		spriteData.img.pipe(gulp.dest('images/'));
		spriteData.css.pipe(gulp.dest('scss/components/'));
});

// таск для создания спрайтов из svg картинок
gulp.task('svg:build', function ()
{
	return gulp.src('images/svg/*.svg')
		.pipe(svgSprite(svgSpriteConfig))
		.pipe(gulp.dest("."));
});

// fileinclude - простейший шабланизатор
gulp.task('fileinclude', function()
{
	gulp.src(['!src/open-account/**/*.html','!src/inc','src/**/*.html']) // откуда брать файлы
		.pipe(fileinclude({
			prefix: '@@',
			basepath: '@file'
		}))
		.pipe(gulp.dest("./")); // сюда кладется скомпилированные html файлы
});

// сбор html для страницы открытия брокерского счета
gulp.task('fileinclude-open-acc', function()
{
	gulp.src('src/open-account/*.html') // откуда брать файлы
		.pipe(fileinclude({
			prefix: '@@',
			basepath: '@file'
		}))
		.pipe(gulp.dest("./open-account-html")); // сюда кладется скомпилированные html файлы
});

// таск для обновления страницы
gulp.task('browser-sync', function()
{
	browserSync({
		startPath:'./newITI',
		server: {
			baseDir: '..',
		},
		notify: false
	});
});

// таск для обновления страницы
gulp.task('browser-sync-open-acc', function()
{
	browserSync({
		startPath:'./newITI/open-account-html/',
		server: {
			baseDir: '..',
		},
		notify: false
	});
});

// таск следит за изменениями файлов и вызывает другие таски
gulp.task('watch', function()
{
	gulp.watch(['!scss/open-account/**/*.scss', 'scss/**/*.scss'],gulp.series('sass'));
	gulp.watch(['!src/open-account/**/*.html', 'src/*.html','src/inc/**/*.html'],gulp.series('fileinclude'));
	gulp.watch(['js/vendors/*.js', 'js/main.js', 'js/modules/*.js'],gulp.series('scripts'));
	gulp.watch(['js/tarrifs/tarrifs.js'],gulp.series('tarrifs-scripts'));
	gulp.watch('inc/*.html', browserSync.reload);
	gulp.watch('**/*.html', browserSync.reload);
	gulp.watch('js/*.js', browserSync.reload);
});

// таск следит за изменениями файлов открытия брокерского счета
gulp.task('watch-open-acc', function()
{
	gulp.watch('scss/**/*.scss', gulp.parallel('sass-open-acc'));
	gulp.watch(['src/open-account/*.html','src/open-account/components/*.html'],gulp.parallel('fileinclude-open-acc'));
	gulp.watch(['js/vendors/*.js', 'js/open-account/main.js', 'js/modules/*.js'],gulp.parallel('open-acc-scripts'));
	gulp.watch(['js/open-account/render-pdfs.js'],gulp.series('build-pdf-render'));
	gulp.watch('components/*.html', browserSync.reload);
	gulp.watch('**/*.html', browserSync.reload);
	gulp.watch('js/**/*.js', browserSync.reload);
});

// основной таск, который запускает вспомогательные
gulp.task('default', gulp.parallel('browser-sync','watch', 'sass', 'fileinclude', 'scripts', 'tarrifs-scripts', 'tooltips-scripts', 'feedback-form-scripts'));
gulp.task('open-acc', gulp.parallel('browser-sync-open-acc','watch-open-acc', 'sass-open-acc', 'fileinclude-open-acc', 'open-acc-scripts'));