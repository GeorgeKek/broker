"use strict";
/**
 * инициализация всех инициализаций
 */
$(document).ready(function()
{
	feedbackForm.init();
});
/**
 * основной объект
 * @type {object}
 */
var feedbackForm =
{
	/**
	 * вызов функций, которые должны запускаться при загрузке страницы
	 */
	init: function()
	{
		this.formsValidation.init();
		$('.feedback-form-select').niceSelect();
		this.initRequiredSelects();
		this.dadata.init();
		this.contractInput();
		this.indexInput();
		this.onlyLetters();
		this.uploadDocs.init();
	},
	// привязываемся к изменению скрытых селектов
	initRequiredSelects: function()
	{
		$('.feedback-form-select_required').on('change', function()
		{
			$(this).valid();
		});
	},
	// маска номера договора
	contractInput: function()
	{
		$('._contract').inputmask({"mask": "BP 9{4,5}", defaultValue: 'BP ', showMaskOnHover: false, placeholder: ''});
	},
	// маска для индекса
	indexInput: function()
	{
		$('._index').inputmask({"mask": "9{5,6}", showMaskOnHover: false, placeholder: ''});
	},
	// разрешаем только ввод букв. никаких цифр
	onlyLetters: function()
	{
		$("._only-letters").on('input', function(event)
		{
			var regexp = /[^a-zA-Zа-яА-ЯёЁ\—\–\−\-\s]/g;
			if($(this).val().match(regexp))
			{
				$(this).val( $(this).val().replace(regexp,'') );
			}
		});
	},
	// показывать адрес
	toogleAddress: function(instance)
	{
		if($(instance).prop('checked'))
		{
			$('.feedback-address-wr').slideDown(300, function()
			{
				feedbackForm.formsValidation.checkFormState('#feedback-form');
			});
		}
		else
		{
			$('.feedback-address-wr').slideUp(300, function()
			{
				feedbackForm.formsValidation.checkFormState('#feedback-form');
			});
		}
	},
	// отправка формы обратной связи
	sendForm: function(instance, event)
	{
		event.preventDefault();
		if(!$(instance).valid())
			return false;

		$(instance).find('button[type="submit"]').addClass('btn_loader');
		$(instance).parents('.feedback-form-box').addClass('feedback-form-box_sendeding');

		var form = $(instance)[0];
		var data = new FormData(form);

		$.ajax({
			type: 'POST',
			url: '',
			data: data,
			enctype: 'multipart/form-data',
			processData: false,
			contentType: false,
			cache: false,
			success: function(response)
			{
				$('.feedback-form-box_sendeding').removeClass('feedback-form-box_sendeding').addClass('feedback-form-box_sended');
				$('.feedback-succees-wr').slideDown(200, function()
				{
					$('html, body').animate({
						scrollTop: $('.feedback-success__header').offset().top + $('.feedback-succees-wr').height() / 2 - $(window).height() / 2
					}, 200);
				});
				$('.btn_loader').removeClass('btn_loader');
			},
		});
	},
	// добавление документов
	uploadDocs:
	{
		init: function()
		{
			// отключаем открытие файла в браузере, если юзер промазал
			$('.feedback-form-wr').on('drag dragstart dragend dragover dragenter dragleave drop', function(e)
			{
				e.preventDefault();
				e.stopPropagation();
			});
			// при отмене дропа - убираем вспомогательные классы для подсветки
			$('.feedback-form-wr').on('dragleave dragend drop', function(e)
			{
				if(!$('.feedback-drop-wr').hasClass('feedback-drop-wr_hover'))
					return false;
				$('.feedback-drop-wr').removeClass('feedback-drop-wr_hover');
				$('.feedback-drop-label').removeClass('feedback-drop-label_hover');
			});
			// при начале дропа подсвечиваем область при помощи вспомогательных классов
			$('.feedback-form-wr').on('dragover dragenter', function(e)
			{
				if($('.feedback-drop-wr').hasClass('feedback-drop-wr_hover'))
					return false;
				$('.feedback-drop-wr').addClass('feedback-drop-wr_hover');
				$('.feedback-drop-label').addClass('feedback-drop-label_hover');
			});
			// событие дропа файлов
			// собираем файлы если они есть и это не папки
			// записываем их в инпут и передаем в фунециюю upload
			$('.feedback-drop-wr, .feedback-drop-label').on(
				'drop',
				function(e)
				{
					if(e.originalEvent.dataTransfer)
					{
						if(e.originalEvent.dataTransfer.files.length)
						{
							var filesList = [];

							for(var i = 0; i < e.originalEvent.dataTransfer.files.length; i++)
							{
								if(e.originalEvent.dataTransfer.files[i].type)
									filesList.push(e.originalEvent.dataTransfer.files[i]);
							}

							if(filesList.length)
							{
								$('.feedback-files')[0].files = filesList;
								feedbackForm.uploadDocs.upload(filesList);
							}
						}
					}
				}
			);
		},
		// склонение чисел -> 1 файл 2 файла и т.д.
		num2str: function(n, text_forms)
		{
			n = Math.abs(n) % 100;
			var n1 = n % 10;
			if (n > 10 && n < 20)
			{
				return text_forms[2];
			}
			if (n1 > 1 && n1 < 5)
			{
				return text_forms[1];
			}
			if (n1 == 1)
			{
				return text_forms[0];
			}

			return text_forms[2];
		},
		// проверка на максимальный размер файлы
		// если файл слишком большой, то выводим уведомление и очищаем инпут
		checkFileSize: function(files)
		{
			var filesSize = 0;

			for(var i = 0; i < files.length; i++)
			{
				filesSize += files[i].size;
			}

			if(filesSize / 1024 >= 20480)
			{
				$('.feedback-added-wr').addClass('large-file');
				$('.feedback-added-name').text('Размер файлов больше 20 МБ');
				$('.feedback-drop-tooltip').addClass('feedback-drop-tooltip_left').html('Попробуйте архивировать или используйте облачное хранилище и&nbsp;прикрепите ссылку');
				$('.feedback-file__tooltip').text('Размер файлов больше 20 МБ');
				$('.feedback-files').val('');
				$('.feedback-file__tooltip_mobile').addClass('feedback-file__tooltip_error');
				$('.feedback-file__error-descr').slideDown(200);
				return false;
			}

			$('.feedback-drop-tooltip').html('Размер файлов — не больше 20 МБ. Формат любой');
			$('.feedback-file__tooltip').html('Размер файлов — не больше 20 МБ. <br /> Формат любой');
			$('.feedback-added-wr').removeClass('large-file');
			$('.feedback-file__tooltip_mobile').removeClass('feedback-file__tooltip_error');
			$('.feedback-file__error-descr').slideUp(200);
			return true;
		},
		checkFileSizeNewFile: function(files)
		{
			var filesSize = 0;

			for(var i = 0; i < files.length; i++)
			{
				filesSize += files[i].size;
			}

			if(filesSize / 1024 >= 5120)
			{
				$('.feedback-form-group__item--file').find('.feedback-added-wr').addClass('large-file');
				$('.feedback-form-group__item--file').find('.feedback-added-name').text('Размер файлов больше 5 МБ');
				$('.feedback-form-group__item--file').find('.feedback-drop-tooltip').addClass('feedback-drop-tooltip_left').html('Попробуйте архивировать или используйте облачное хранилище и&nbsp;прикрепите ссылку');
				$('.feedback-form-group__item--file').find('.feedback-file__tooltip').hide();
				$('.feedback-form-group__item--file').find('.feedback-files').val('');
				$('.feedback-form-group__item--file').find('.feedback-file__tooltip_mobile').addClass('feedback-file__tooltip_error');
				$('.feedback-form-group__item--file').find('.feedback-file__error-descr').slideDown(200);
				return false;
			}

			$('.feedback-form-group__item--file').find('.feedback-added-wr').removeClass('large-file');
			$('.feedback-form-group__item--file').find('.feedback-file__tooltip').hide();
			$('.feedback-form-group__item--file').find('.feedback-file__tooltip_mobile').removeClass('feedback-file__tooltip_error');
			$('.feedback-form-group__item--file').find('.feedback-file__error-descr').slideUp(200);
			return true;
		},
		checkFileSizeNewResume: function(files)
		{
			var filesSize = 0;

			for(var i = 0; i < files.length; i++)
			{
				filesSize += files[i].size;
			}

			if(filesSize / 1024 >= 5120)
			{
				$('.feedback-form-group__item--resume').find('.feedback-added-wr').addClass('large-file');
				$('.feedback-form-group__item--resume').find('.feedback-added-name').text('Размер файлов больше 5 МБ');
				$('.feedback-form-group__item--resume').find('.feedback-drop-tooltip').addClass('feedback-drop-tooltip_left').html('Попробуйте архивировать или используйте облачное хранилище и&nbsp;прикрепите ссылку');
				$('.feedback-form-group__item--resume').find('.feedback-file__tooltip').hide();
				$('.feedback-form-group__item--resume').find('.feedback-files').val('');
				$('.feedback-form-group__item--resume').find('.feedback-file__tooltip_mobile').addClass('feedback-file__tooltip_error');
				$('.feedback-form-group__item--resume').find('.feedback-file__error-descr').slideDown(200);
				return false;
			}

			$('.feedback-form-group__item--resume').find('.feedback-added-wr').removeClass('large-file');
			$('.feedback-form-group__item--resume').find('.feedback-file__tooltip').hide();
			$('.feedback-form-group__item--resume').find('.feedback-file__tooltip_mobile').removeClass('feedback-file__tooltip_error');
			$('.feedback-form-group__item--resume').find('.feedback-file__error-descr').slideUp(200);
			return true;
		},
		setFileName: function(files)
		{
			if(!files.length)
				return false;

			var fileName = files[0].name;

			if(files.length > 1)
			{
				fileName = 'Прикреплено ' + files.length + ' ' + this.num2str(files.length, ['файл', 'файла', 'файлов']);
				$('.feedback-added-name').text(fileName);
				return false;
			}

			if(fileName.length >= 35)
			{
				var fileExt = '...' + fileName.split('.').pop();
				fileName = fileName.substr(0, 30) + fileExt;
			}
			$('.feedback-added-name').text(fileName);

		},
		setFileNameNewResume: function(files)
		{
			if(!files.length)
				return false;

			var fileName = files[0].name;

			if(files.length > 1)
			{
				fileName = 'Прикреплено ' + files.length + ' ' + this.num2str(files.length, ['файл', 'файла', 'файлов']);
				$('.feedback-form-group__item--file').find('.feedback-added-name').text(fileName);
				return false;
			}

			if(fileName.length >= 35)
			{
				var fileExt = '...' + fileName.split('.').pop();
				fileName = fileName.substr(0, 30) + fileExt;
			}
			$('.feedback-form-group__item--resume').find('.feedback-added-name').text(fileName);

		},
		setFileNameNewFile: function(files)
		{
			if(!files.length)
				return false;

			var fileName = files[0].name;

			if(files.length > 1)
			{
				fileName = 'Прикреплено ' + files.length + ' ' + this.num2str(files.length, ['файл', 'файла', 'файлов']);
				$('.feedback-form-group__item--file').find('.feedback-added-name').text(fileName);
				return false;
			}

			if(fileName.length >= 35)
			{
				var fileExt = '...' + fileName.split('.').pop();
				fileName = fileName.substr(0, 30) + fileExt;
			}
			$('.feedback-form-group__item--file').find('.feedback-added-name').text(fileName);

		},
		// событие загрузки через драгон дроп и при помощи кнопки
		upload: function(files)
		{
			// обрабатываем файлы из инпута
			if(typeof $(files)[0].files != 'undefined')
				var files = $(files)[0].files;

			if(!files.length)
				return false;

			if(this.checkFileSize(files))
				this.setFileName(files);

			$('.feedback-drop-label').hide();
			$('.feedback-added-wr').css("display", "flex").fadeIn(200);
		},
		uploadNewFile: function(files)
		{
			// обрабатываем файлы из инпута
			if(typeof $(files)[0].files != 'undefined')
				var files = $(files)[0].files;

			if(files.length != 1)
				return false;

			if(this.checkFileSizeNewFile(files))
				this.setFileNameNewFile(files);

			$('.feedback-form-group__item--file').find('.feedback-added-wr').css("display", "flex").fadeIn(200);
		},
		uploadNewResume: function(files)
		{
			// обрабатываем файлы из инпута
			if(typeof $(files)[0].files != 'undefined')
				var files = $(files)[0].files;

			if(files.length != 1)
				return false;

			if(this.checkFileSizeNewResume(files))
				this.setFileNameNewResume(files);

			$('.feedback-form-group__item--resume').find('.feedback-added-wr').css("display", "flex").fadeIn(200);
		},

		// очищение области для дропа и инпута с файлами
		clearFiles: function()
		{
			$('.feedback-drop-label').css("display", "flex").fadeIn(200);
			$('.feedback-added-wr').hide();
			$('.feedback-drop-tooltip').html('Размер файлов — не больше 20 МБ. Формат любой');
			$('.feedback-added-wr').removeClass('large-file');
			$('input.feedback-files').val('');
		},
		clearFilesNewResume: function()
		{
			$('.feedback-form-group__item--resume').find('.feedback-added-wr').hide();
			$('.feedback-form-group__item--resume').find('.feedback-file__tooltip').show();
			$('.feedback-form-group__item--resume').find('.feedback-added-wr').removeClass('large-file');
			$('.feedback-form-group__item--resume').find('input.feedback-files').val('');
		},
		clearFilesNewFile: function()
		{
			$('.feedback-form-group__item--file').find('.feedback-added-wr').hide();
			$('.feedback-form-group__item--file').find('.feedback-file__tooltip').show();
			$('.feedback-form-group__item--file').find('.feedback-added-wr').removeClass('large-file');
			$('.feedback-form-group__item--file').find('input.feedback-files').val('');
		}
	},
	// валидация формы и все, что с ней связано
	formsValidation:
	{
		init: function()
		{
			this.feedbackFomrValidation();
			this.addNewRules();
		},
		// добавление кастомных методов валидации
		addNewRules: function()
		{
			$('._required').each(function()
			{
				// if (!($(this).hasClass('feedback-files')))
				// {
				// 	console.log($(this));
					$(this).rules('add',
						{
							required: true,
							normalizer: function(value)
							{
								return $.trim( value );
							},
							messages:
							{
								required: 'Заполните это поле',
							}
						});
				// }
				// else
				// {
				// 			console.log('d');
				// 	$(this).rules('add',
				// 		{
				// 				required: true,
				// 		});
				// }
			});
			// $('._requiredFile').on('change', function()
			// {
			// 	console.log('1');
			// 	$(this).rules('add',
			// 		{
			// 			required: true,
			// 			normalizer: function(value)
			// 			{
			// 				return $.trim( value );
			// 			},
			// 			messages:
			// 			{
			// 				required: 'Заполните это поле',
			// 			}
			// 		});
			// });
			$.validator.messages.required = 'Заполните это поле';

			// input mask валидация
			$.validator.addMethod('inputmask', function (value, element)
			{
				return $(element).inputmask("isComplete");
			}, 'Неверный формат');
		},
		rules:
		{
			email:
			{
				required: true,
				email: true
			},
			contract:
			{
				required: true,
				inputmask: true,
			},
			index:
			{
				required: true,
				inputmask: true,
			},
			checkbox:
			{
				required: true,
			},
			'address-subject':
			{
				required: true,
			}
		},
		messages:
		{
			email:
			{
				required: 'Заполните это поле',
				email: 'Неверный формат'
			},
			contract:
			{
				required: 'Заполните это поле',
				inputmask: 'Неверный формат'
			},
			checkbox:
			{
				required: 'Заполните это поле',
			},
			'address-subject':
			{
				required: 'Выберите тему обращения'
			}
		},

		// валидация формы
		feedbackFomrValidation: function()
		{
			this.changeSubmitBtnState('#feedback-form');
			$('#feedback-form').validate({
				errorPlacement: function(error, element)
				{
					$(element).parent().addClass('input-wr_error');
					$(element).siblings('.input__err-label').text(error.text());
					$(element).parent().removeClass('input-wr_valid');
					return false;
				},
				unhighlight: function(element)
				{
					$(element).removeClass('error');
					$(element).parent().removeClass('input-wr_error');

					if($(element).val())
						$(element).parent().addClass('input-wr_valid');
					else
						$(element).parent().removeClass('input-wr_valid');
				},
				onfocusout: function(element)
				{
					var formInputs = $(element).parents('form').find('input, textarea, select');

					$(formInputs).each(function(index, item)
					{
						$(item).valid();

						if(element == item)
							return false;
					});
				},
				onkeyup       : false,
				ignoreTitle  : 'true',
				ignore       : ':hidden:not(.feedback-form-select_required)',
				errorElement : 'none',
				rules        : this.rules,
				messages     : this.messages,
			});
		},

		// проверяем валидность формы
		checkFormState: function(form)
		{
			var submitBtn = $(form).find('button[type="submit"]');

			if($(form).validate().checkForm())
				$(submitBtn).removeClass('btn-submit_disabled');
			else
				$(submitBtn).addClass('btn-submit_disabled');
		},
		// изменяем состояние кнопки взависимости от валидности формы
		changeSubmitBtnState: function(formId)
		{
			$(formId).on('blur keyup change', 'input, textarea', function(event)
			{
				feedbackForm.formsValidation.checkFormState($(this).parents('form'));
			});
		}
	},

	// подсказки для заполнения форм
	dadata:
	{
		token: 'de5d7935de9a90b23663a28ed11b656ba7618e4b',
		init: function()
		{
			if(typeof window.token != 'undefined')
				this.token = window.token;

			this.dadataName();
			this.dadataAddress();
		},
		// задаем основные настройки для инициализации подсказок
		getSettingsDadata: function(input)
		{
			try
			{
				var inputAttrs = input.attributes;
				var part = inputAttrs['hint-part'].value;
				var type = inputAttrs['dadata-type'].value.toUpperCase();

				if(type == '')
					return false;

				var dadataSettings = {
					token: feedbackForm.dadata.token,
					type: type,
					count: 5,
					constraints: {locations: { country: "*" }},
					triggerSelectOnBlur: false,
					mobileWidth: 0,
					hint: false
				};
				if(type == 'ADDRESS' && part)
					dadataSettings.bounds = part;

				if(type == 'NAME' && part)
					dadataSettings.params = {parts: [part.toUpperCase()]};

				return dadataSettings;
				$('input[type="checked"').each(function(index, input)
				{
					if(!$(input).val())
						return false;
				});
			}
			catch(error)
			{
				return false;
			}
		},
		// поля ФИО
		dadataName: function()
		{
			$('.dadata-input-name').each(function(index, input)
			{
				var settings = feedbackForm.dadata.getSettingsDadata(input);
				$(input).suggestions(settings);
			});
		},
		// поля адреса
		dadataAddress: function()
		{
			$('.dadata-input-address-gran').each(function(index, input)
			{
				var settings = feedbackForm.dadata.getSettingsDadata(input);

				if($(input).attr('contrains-type'))
				{
					settings.constraints = $('.dadata-input-address-gran[hint-part="' + $(input).attr('contrains-type') + '"]');
				}

				settings.onSelect = function(suggestion, index, lastValue, selectionOptions)
				{
					$('.dadata-input-address-gran').each(function(index, input)
					{
						if(suggestion.data.postal_code != null)
							$(input).val(suggestion.data[$(input).attr('hint-part')]);

						if(!$(input).hasClass('_index') && !$(input).hasClass('_country'))
						{
							$(input).suggestions().setSuggestion(suggestion);

							if($(input).val())
								$(input).valid();
						}
					});
				};
				settings.formatSelected = function(suggestion, e)
				{
					// console.log(suggestion.data.postal_code);
					if(suggestion.data.postal_code == null || typeof suggestion.data.postal_code == 'undefined')
						suggestion.data.postal_code = $('._index').val();

					$('._index').valid();
				};
				$(input).suggestions(settings);
			});
		}
	}
};