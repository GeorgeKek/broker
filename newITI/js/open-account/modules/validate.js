OpenAcc.formsValidation =
{
	// инициализация валидации и всего сопутствующего
	init: function()
	{
		this.signupValidation();
		this.signupDocInfoValidation();
		this.smsCodeValidation();
		this.userPhoneChangeValidation();
		this.addNewRules();
	},
	maxDocDate: new Date(new Date().setFullYear(new Date().getFullYear())),
	maxBirtDay: new Date(new Date().setFullYear(new Date().getFullYear() - 18)),
	minDate: new Date(new Date().setFullYear(new Date().getFullYear() - 118)),
	// парсим дату из инпутов 22.02.2010 -> Date format
	parseDate: function(dateStr)
	{
		var dates = dateStr.split(".");
		var parsedDate = new Date(dates[2], dates[1] - 1, dates[0]);

		if(parsedDate.toString().length > 38)
			return parsedDate;
		else
			return false;
	},
	// добавление кастомных методов валидации
	addNewRules: function()
	{
		// добавляем правило для обязательных полей
		$('._required').each(function()
		{
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
		});

		$.validator.messages.required = 'Заполните это поле';

		// проверка документа на дату выдачи не позже сегоднешнего числа
		$.validator.addMethod('date', function (value, element)
		{
			var formatedDate = OpenAcc.formsValidation.parseDate(value);

			if(formatedDate)
				if(formatedDate.getTime() > OpenAcc.formsValidation.maxDocDate.getTime())
					return false;
				else
					return true;
		});

		// input mask валидация
		$.validator.addMethod('inputmask', function (value, element)
		{
			return $(element).inputmask("isComplete");
		}, 'Неверный формат');

		// валидации даты рождения
		$.validator.addMethod('birtdate', function (value, element)
		{
			var formatedDate = OpenAcc.formsValidation.parseDate(value);

			if(formatedDate)
				if(formatedDate.getTime() > OpenAcc.formsValidation.maxBirtDay.getTime())
					return false;
				else
					return true;
		});

		// валидация минимальной даты чтобы не было 12.02.1111
		$.validator.addMethod('minMaxDate', function (value, element)
		{
			var formatedDate = OpenAcc.formsValidation.parseDate(value);

			if(formatedDate)
				if(formatedDate.getTime() < OpenAcc.formsValidation.minDate.getTime() || formatedDate.getTime() > new Date().getTime())
					return false;
				else
					return true;
		});
	},
	rules:
	{
		email:
		{
			required: true,
			email: true
		},
		phone:
		{
			required: true,
			inputmask: true
		},
		password:
		{
			required: true,
			minlength: 8
		},
		'pass-date':
		{
			required: true,
			inputmask: true,
			date: true,
			minMaxDate: true,
		},
		'birth-day':
		{
			required: true,
			inputmask: true,
			minMaxDate: true,
			birtdate: true,
		},
		'passport-num':
		{
			required: true,
			inputmask: true
		},
		'pass-code':
		{
			required: true,
			inputmask: true
		},
		'ind_reg':
		{
			required: true,
			inputmask: true
		},
		'sms-code':
		{
			required: true,
			minlength: 4,
			maxlength: 4,
		},
		inn:
		{
			required: true,
			inputmask: true
		},
	},
	messages:
	{
		email:
		{
			required: 'Заполните это поле',
			email: 'Неверный формат'
		},
		phone:
		{
			required: 'Заполните это поле',
		},
		password:
		{
			required: 'Заполните это поле',
			minlength: 'Минимальная длина 8 символов'
		},
		'pass-date':
		{
			date: 'Проверьте год выдачи',
			inputmask: 'Неверный формат даты (дд.мм.гггг)',
			minMaxDate: 'Проверьте год выдачи'
		},
		'birth-day':
		{
			birtdate: 'Открыть счёт можно с 18 лет',
			inputmask: 'Неверный формат даты (дд.мм.гггг)',
			minMaxDate: 'Проверьте дату'
		},
		'sms-code':
		{
			minlength: "Неверный длинна",
		}
	},
	// валидация формы ввода номера и email-a
	signupValidation: function()
	{
		$('#reg_form').validate({
			errorPlacement: function(error, element)
			{
				$(element).parent().addClass('def-input-wr_error');
				$(element).siblings('.def-input__err-label').text(error.text());
				$(element).parent().removeClass('def-input-wr_valid');
				return false;
			},
			unhighlight: function(element)
			{
				$(element).removeClass('error');
				$(element).parent().removeClass('def-input-wr_error');
				$(element).parent().addClass('def-input-wr_valid');
			},
			onfocusout: function(element)
			{
				this.element(element);
			},
			onkeyup: false,
			ignoreTitle  : true,
			errorElement : 'none',
			rules        : this.rules,
			messages     : this.messages,
		});
	},
	// валидация формы регистрации по паспорту
	signupDocInfoValidation: function ()
	{
		$('#sign-up-doc-info').validate({
			errorPlacement: function(error, element)
			{
				$(element).parent().addClass('def-input-wr_error');
				$(element).siblings('.def-input__err-label').text(error.text());
				$(element).parent().removeClass('def-input-wr_valid');
				$(element).siblings('.doc-input-check').removeClass('doc-input-check_active');
				return false;
			},
			unhighlight: function(element)
			{
				$(element).removeClass('error');
				$(element).parent().removeClass('def-input-wr_error');
				$(element).siblings('.doc-input-check').addClass('doc-input-check_active');
				OpenAcc.formsValidation.checkFormState('#sign-up-doc-info');


				if($(element).val() != '')
				{
					$(this).siblings('.doc-input__clear').fadeIn(300);
					$(element).parent().addClass('def-input-wr_valid');
					$(element).siblings('.doc-input-check').addClass('doc-input-check_active');
					OpenAcc.formsValidation.checkFormState('#sign-up-doc-info');
				}
				else
				{
					$(this).siblings('.doc-input__clear').fadeOut(300);
					$(element).parent().removeClass('def-input-wr_valid');
					$(element).siblings('.doc-input-check').removeClass('doc-input-check_active');
				}
			},
			onfocusout: function(element)
			{
				if($.isEmptyObject($(element).rules()))
					return false;

				var formInputs = $(element).parents('form').find('._required');

				$(formInputs).each(function(index, item)
				{
					$(item).valid();

					if(element == item)
						return false;
				});
			},
			onkeyup      : false,
			ignoreTitle  : true,
			errorElement : 'none',
			rules        : this.rules,
			messages     : this.messages,
		});

		this.inputOnlyCyrillic();
		this.changeSubmitBtnState('#sign-up-doc-info');
	},

	inputOnlyCyrillic: function()
	{
		$('.doc-input-wr input, .doc-input-wr textarea').bind('input change', function(event)
		{
			var regexp = /[^0-9а-яА-ЯёЁ\s\'\"\-\,\.\;\—\_]/g;

			if($(this).val().match(regexp))
			{
				$(this).val( $(this).val().replace(regexp, '') );
				event.preventDefault();
			}
		});
	},

	// валидация смс-кода
	smsCodeValidation: function ()
	{
		$('#confirm-form').validate({
			errorPlacement: function(error, element)
			{
				$(element).parent().addClass('def-input-wr_error');
				$(element).siblings('.def-input__err-label').text(error.text());
				return false;
			},
			unhighlight: function(element)
			{
				$(element).removeClass('error');
				$(element).parent().removeClass('def-input-wr_error');
			},
			onkeyup      : false,
			ignoreTitle  : true,
			errorElement : 'none',
			rules        : this.rules,
			messages     : this.messages,
		});
		this.changeSubmitBtnState('#confirm-form');
	},
	// валидация номера телефона
	userPhoneChangeValidation: function ()
	{
		$('#user-change-phone').validate({
			errorPlacement: function(error, element)
			{
				$(element).removeClass('error');
				return false;
			},
			onfocusout: function(element)
			{
				this.element(element);
			},
			onkeyup: false,
			ignoreTitle  : false,
			errorElement : 'none',
			rules        : this.rules,
			messages     : this.messages,
		});

		this.changeSubmitBtnState('#user-change-phone');
	},
	// проверяем состояние формы для изменения состояния кнопки отправки
	checkFormState: function(form)
	{
		var submitBtn = $(form).find('button[type="submit"]');
		var switchBtn = $(form).find('.btn-send-doc-switch');
		if($(form).validate().checkForm())
		{
			$(submitBtn).removeClass('btn-submit_disabled');
			$(switchBtn).removeClass('btn-submit_disabled');
			$('.doc-submit-descr').toggleClass('doc-submit-descr_hidden');
			$('.doc-info-input-wr_submit').find('.doc-submit-descr:first-child').addClass('doc-submit-descr_hidden');
			$('.doc-info-input-wr_submit').find('.doc-submit-descr:last-child').removeClass('doc-submit-descr_hidden');
		}
		else
		{
			$(submitBtn).addClass('btn-submit_disabled');
			$(switchBtn).addClass('btn-submit_disabled');
			$('.doc-info-input-wr_submit').find('.doc-submit-descr:first-child').removeClass('doc-submit-descr_hidden');
			$('.doc-info-input-wr_submit').find('.doc-submit-descr:last-child').addClass('doc-submit-descr_hidden');
		}
	},
	// изменяем состояние кнопки взависимости от валидности формы
	changeSubmitBtnState: function(formId)
	{
		$(formId).on('blur keyup change', 'input', function(event)
		{
			var self = this;
			setTimeout(function ()
			{
				OpenAcc.formsValidation.checkFormState($(self).parents('form'));
			});
		});
	}
};