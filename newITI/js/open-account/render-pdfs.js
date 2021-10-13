$(window).load(function()
{
	PdfRender.init();

});
// объект для рендера pdf файлов при помощи библиотеки pdf.js
var PdfRender = {
	// статус установки минимальной высоты для контейнеров pdf файлов
	minHeightSeted: false,

	// список отрисованных документов
	renderedPdfs: [],

	// иницализация вспомогательных обработчиков + рендер первой пдфки
	init: function()
	{
		// var pdfContainers = $('.pdf-container');
		// $(document).on('scroll', function(e)
		// {
		// 	for (var i = 0; i < pdfContainers.length; i++)
		// 	{
		// 		var element = pdfContainers[i];

		// 		if(PdfRender.inViewport(element) || ($(element).offset().top + $(element).height() - 500) == $(document).scrollTop())
		// 		{
		// 			PdfRender.renderPdfs(i + 1);
		// 			break;
		// 		}
		// 	}
		// });

		// pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.2.2/pdf.worker.min.js';

		// this.renderFirstPdf();
	},

	// Функция рендера одного документа
	renderOnePdf: function(instance)
	{
		var pdfContainers = $('.pdf-container');
		pdfContainers.attr('id', $(instance).attr('data-doc')).attr('data-pdf-id', $(instance).attr('data-doc'));
		this.renderPdf($(instance).attr('data-doc'), function()
		{
			if(!PdfRender.minHeightSeted)
			{
				$('.pdf-container').css({'min-height': $('canvas').first().height() + 'px'});
				PdfRender.minHeightSeted = true;
			}
		});
		pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.2.2/pdf.worker.min.js';
	},

	// Функция рендера всех документов
	renderAllPdfs: function()
	{
		var pdfContainers = $('._all-docs-popup').find('.pdf-container');
		for (var i = 1; i <= pdfContainers.length; i++)
		{
			this.renderPdf(i, function()
			{
				if(!PdfRender.minHeightSeted)
				{
					$('.pdf-container').css({'min-height': $('canvas').first().height() + 'px'});
					PdfRender.minHeightSeted = true;
				}
			});
			pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.2.2/pdf.worker.min.js';
		};
		// $(document).on('load', function(e)
		// {
		// 	for (var i = 0; i < pdfContainers.length; i++)
		// 	{
		// 		var element = pdfContainers[i];

		// 		if(PdfRender.inViewport(element) || ($(element).offset().top + $(element).height() - 500) == $(document).scrollTop())
		// 		{
		// 			PdfRender.renderPdfs(i + 1);
		// 			break;
		// 		}
		// 	}
		// });
		// pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.2.2/pdf.worker.min.js';

		// this.renderFirstPdf();
	},

	// функция для рендера первого документа
	renderFirstPdf: function()
	{
		this.renderPdf(0, function()
		{
			if(!PdfRender.minHeightSeted)
			{
				$('.pdf-container').css({'min-height': $('canvas').first().height() + 'px'});
				PdfRender.minHeightSeted = true;
			}
		});
	},

	// проверка на вхождение страницы в видимую область экрана
	inViewport: function(item)
	{
		var elementTop = $(item).offset().top;
		var elementBottom = elementTop + $(item).outerHeight();
		var viewportTop = $(window).scrollTop();
		var viewportBottom = viewportTop + $(window).height();

		return elementBottom > viewportTop && elementTop < viewportBottom;
	},

	// получение и отрисовка функции
	renderPdf: function(pdfNumber, callback)
	{
		this.renderedPdfs.push(pdfNumber);
		// console.log(pdfNumber, window.pdfToRender.data.result.length);
		if(pdfNumber >= window.pdfToRender.data.result.length)
			return false;

		var pdfFileUrl = window.pdfToRender.data.result[pdfNumber].link_file;

		var loadingTask = pdfjsLib.getDocument(pdfFileUrl).promise.then(function (pdf)
		{
			var canvases = '';
			for(var i = 1; i < pdf._pdfInfo.numPages + 1; i++)
			{
				canvases += '<canvas id="canvas-' + pdfNumber + '-' + i +'" style="width: 100%;"></canvas>';
			}

			$('.pdf-container[data-pdf-id="' + pdfNumber + '"]').append(canvases);
			for (var i = 1; i < pdf._pdfInfo.numPages + 1; i++)
			{
				pdf.getPage(i).then(function(page)
				{
					var scale = 2.5;
					var viewport = page.getViewport({ scale: scale, });

					var canvas = document.getElementById('canvas-' + pdfNumber + '-' + (page.pageIndex + 1));
					var context = canvas.getContext('2d');
					canvas.height = viewport.height;
					canvas.width = viewport.width;

					var renderContext = {
						canvasContext: context,
						viewport: viewport,
					};
					var renderTask = page.render(renderContext);

					if(typeof callback != 'undefined')
						renderTask.promise.then(callback);
				});
			}
			OpenAcc.loadPdf();
		}).catch(function (error)
		{
			$('.pdf-container[data-pdf-id="' + pdfNumber + '"]').html('<div style="margin: 25px;"> Произошла ошибка при загрузке <a href="' + pdfFileUrl + '" target="_blank">pdf&nbsp;файла</a> </div>');
		});
	},
	// рендер страницы
	renderPdfs: function(pageToRender)
	{
		for (var i = 0; i < pageToRender; i++)
		{
			if(this.renderedPdfs.indexOf(i + 1) == -1)
			{
				this.renderPdf(i + 1);
			}
		}
	},
	// скролл до нужного документа
	scrollToDoc: function(id)
	{
		$('html, body').animate({
			scrollTop: $('.pdf-container[data-pdf-id="' + id + '"]').offset().top - $('.fixed-header').height(),
		}, 200);
	}
};