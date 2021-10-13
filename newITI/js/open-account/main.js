'use strict';

/**
 * инициализация всех инициализаций
 */
$(document).ready(function()
{
	OpenAcc.init();
});
$(window).resize(function()
{
	OpenAcc.fixingHeader();
	OpenAcc.fixingSecurityFooter();
	// OpenAcc.docsSlider.setSliderWidth();
});
// устанавливаем маску в зависимости от ширины экрана
var getPhoneMask = function()
{
	var phoneMask = {
		class: '._phone-mask',
		params:
		{
			mask: "+7 999 999 99 99",
			placeholder: "",
			greedy: false,
			showMaskOnHover: false,
			showMaskOnFocus: false
		}
	};

	return phoneMask;
};
/**
 * основной объект
 * @type {object}
 */
var OpenAcc =
{
	/**
	 * вызов функций, которые должны запускаться при загрузке страницы
	 */
	init: function()
	{
		this.masks.init();
		this.fixingHeader();
		this.fixingSecurityFooter();
		this.formsValidation.init();
		this.api.init();
		this.innApi.init();
		this.tooltipLazyLoad();
		this.docsSlider.init();
		this.checkboxValid();
		this.clearInput();
		if(typeof this.cookie.getCookie('nextStep') == 'undefined')
			this.cookie.setCookie('nextStep', 1, { expires: 3600 * 24, path: '/'});
	},
	// смена формата даты с человечкского на php формат yyyy.mm.dd
	dateToPHPDate: function(date)
	{
		try
		{
			var dateParts = date.match(/(\d{1,2}).(\d{1,2}).(\d{4})/);
			return dateParts[3] + '-' + dateParts[2] + '-' + dateParts[1];
		}
		catch (err)
		{
			return 'not date';
		}
	},
	// отправка события в га
	sendToGaSignupStartEvent: function(params)
	{
		try
		{
			ga('send', 'event', 'new_reg_form', 'submit_open_account', 'Открытие_счета_1');
			yaCounter49819861.reachGoal('poprobui_first_step');
		}
		catch (error)
		{
			console.log('какая-то ошибка', error);
		}
	},
	sendEventToGa: function (eData)
	{
		try
		{
			if (eData.label)
				ga('send', 'event', eData.category, eData.action, eData.label);
			else
				ga('send', 'event', eData.category, eData.action);

		}
		catch (error)
		{
			console.log('какая-то ошибка', error);
		}
	},
	// объект табов
	tabs:
	{
		open: function(instance, tabId)
		{
			$('.tab-nav.active').removeClass('active');
			$('.tab.active').removeClass('active');
			$(instance).addClass('active');
			$('.tab[data-tab-id="' + tabId + '"]').addClass('active');
		}
	},
	switchForm: function()
	{
		$('.doc-info-sections-wr').toggleClass('doc-info-sections-wr_hidden');
		$('.doc-info-sections-wr').toggleClass('doc-info-sections-wr_visible');
		$('.content-back').toggleClass('content-back_button');
		$('.btn-send-doc-switch').removeClass('btn-submit_disabled');
		$('.doc-submit-descr').toggleClass('doc-submit-descr_hidden');
		window.scrollTo(0, 0);
	},
	clearInput: function()
	{
		$('.doc-input').on('input', function()
		{
			if ($(this).val() != '')
				$(this).siblings('.doc-input__clear').fadeIn(300);
			else
				$(this).siblings('.doc-input__clear').fadeOut(300);
		});
		$('.doc-input__clear').on('click', function()
		{
			$(this).fadeOut(300);
			$(this).siblings('.doc-input').val('');
			$(this).siblings('.doc-input-check').removeClass('doc-input-check_active');
		});
	},
	checkboxValid: function()
	{
		$('.def-input_checkbox').on('change', function()
		{
			if ($(this).is(':checked'))
			{
				$(this).parent('.doc-input__label').siblings('.doc-input-wr').find('.doc-input-check').addClass('doc-input-check_active');
				$(this).parent('.doc-input__label').siblings('.doc-input-wr').find('.def-input').removeClass('_required');
				$(this).parent('.doc-input__label').siblings('.doc-input-wr').find('.def-input').removeClass('error');
				$(this).parent('.doc-input__label').siblings('.doc-input-wr').find('.def-input').val('');
				$(this).parent('.doc-input__label').siblings('.doc-input-wr').find('.def-input').attr('disabled', true);
				$(this).parent('.doc-input__label').siblings('.doc-input-wr').find('.def-input').addClass('def-input_gray');
				$(this).parent('.doc-input__label').siblings('.doc-input-wr').find('.doc-input__clear').fadeOut(300);
			}
			else
			{
				$(this).parent('.doc-input__label').siblings('.doc-input-wr').find('.doc-input-check').removeClass('doc-input-check_active');
				$(this).parent('.doc-input__label').siblings('.doc-input-wr').find('.def-input').addClass('_required');
				$(this).parent('.doc-input__label').siblings('.doc-input-wr').find('.def-input').attr('disabled', false);
				$(this).parent('.doc-input__label').siblings('.doc-input-wr').find('.def-input').removeClass('def-input_gray');
			}
		});
	},
	// форма отправляется
	formSendStarted: function(form)
	{
		$(form).find('button.btn-submit').addClass('btn-submit_loader').prop('disabled', true);
	},
	// отправка формы завершена
	formSendFinish: function(form)
	{
		$(form).find('button.btn-submit').removeClass('btn-submit_loader').prop('disabled', false);
	},
	loadPdf: function()
	{
		if ($('._docs-popup').find('.pdf-container'))
		{
			$('.docs-popup').removeClass('docs-popup_load');
			$('.docs-popup-loader').fadeOut(500);
		}
	},
	removePdf: function()
	{
		setTimeout( function()
		{
			$('.pdf-container').find('canvas').remove();
			$('.docs-popup').addClass('docs-popup_load');
			$('.docs-popup-loader').fadeIn();
			console.log('this');
		}, 500);
	},
	// отобржаем/скрываем список вопросов на мобильных
	faq:
	{
		toggleShow: function(instance)
		{
			$(instance).toggleClass('faq-list-btn_opened');
			$('.sign-up-faq-list__items').slideToggle(300);
		}
	},
	// стики хэдер для пк
	fixingHeader: function()
	{
		if ($('.header-wr').length == 0 || $('.header-wr').hasClass('_no-sticky'))
			return;

		if ($(window).width() > 768)
		{
			$('body').css({'padding-top': $('.header-wr').innerHeight() + 'px'});
			$('.header-wr').addClass('fixed-header');
		}
		else
		{
			$('body').css({'padding-top': 0});
			$('.header-wr').removeClass('fixed-header');
		}
	},
	// фиксированный футер
	fixingSecurityFooter: function()
	{
		if($('.security-footer-wr').length == 0)
			return false;

		if($('.security-footer-wr').offset().top + 30 < $(window).height())
		{
			$('.security-footer-wr').addClass('security-footer-wr_fixed');
			$('body').css({'padding-bottom': $('.security-footer-wr').outerHeight() + 'px'});
		}
	},
	// выбираем тип регистрации
	selectDocsType: function(instance, event)
	{
		if(event.target.tagName != 'A')
		{
			window.location.href = $(instance).attr('data-href');
		}
	},
	// загрузка изображений документов после основной загрузки
	tooltipLazyLoad: function()
	{
		setTimeout(function()
		{
			$('.doc-tooltip__img').each(function(index, img)
			{
				$(img).attr('src', $(img).attr('data-img-src'));
			});
		}, 150);
	},
	// показываем попап с документом на телефонах
	showMobTooltip: function(instance)
	{
		if($(window).width() < 768)
			$(instance).addClass('showed');
	},
	// скрываем попап на телефонах
	closeMobTooltip: function(event)
	{
		$('.doc-tooltip').removeClass('showed');
		event.stopPropagation();
	},
};