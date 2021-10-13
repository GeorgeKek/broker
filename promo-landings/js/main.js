"use strict";

/**
 * инициализация всех инициализаций
 */
$(document).ready(function()
{
	o2.init();
});

/**
 * основной объект
 * @type {object}
 */
var o2 =
{
	/**
	 * вызов функций, которые должны запускаться при загрузке страницы
	 */
	init()
	{
		this.makePhoneMask();
		this.accordion();
		this.setFocus();
		this.validate();
		this.checkInput();
		this.clearInput();
		this.tooltip();
	},

	makePhoneMask: function()
	{
		$('._form-number').inputmask({"mask": "+7 999 999 99 99", showMaskOnHover: false});
	},
	changeProdId: function(instance, prodId)
	{
		if ($('#checkbox').is(':checked'))
			$('#prod-id').attr('value', prodId);
		else
			$('#prod-id').attr('value', '18');
	},
	popups:
	{
		showPopup: function(popup)
		{
			$('._overlay').addClass('visible');
			$(popup).addClass('visible');
			$('body').css('overflow', 'hidden');
		},

		closePopup: function()
		{
			$('._overlay').removeClass('visible');
			$('._popup').removeClass('visible');
			$('body').css('overflow', 'visible');
		},
	},

	accordion: function()
	{
		$("._accordionTrigger").on("click", function()
		{
			if($(this).hasClass("active"))
			{
				$(this).removeClass("active");
				$(this).next().slideUp(200);
			}
			else
			{
				$('._accordionTrigger').removeClass("active");
				$(this).addClass("active");
				$("._accordionContent").slideUp(200);
				$(this).next().slideDown(200);
			}
		});
	},

	validate: function()
	{
		var format =
		{
			number: /\+7\(\d{3}\)\d{3}-\d{2}-\d{2}/,
			email: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
		};

		$('.request-form__item').each(function()
		{
			if($('input', this).val() == '')
			{
				$(this).addClass('error');
				$('.request-form__item-error', this).text('Заполните это поле');
			}
			else
			{
				$(this).removeClass('error');
				$('.request-form__item-error', this).text('');
			}
		});
	},
	checkInput: function()
	{
		var emailRegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,12}$/;
		// if ($('.request-form__item-input').val() != '')
		// {
		// 	$('.request-form__item-input').siblings('.request-form__item-clear').fadeIn(300);
		// 	if (($('.request-form__item-input').val()[$('.request-form__item-input').val().length-1] != '_' && $('.request-form__item-input').hasClass('_phone-mask')) || ($('.request-form__item-input').val().match(emailRegExp) && !($('.request-form__item-input').hasClass('_phone-mask'))))
		// 		$('.request-form__item-input').siblings('.request-form__item-check').addClass('request-form__item-check--active');
		// 	else
		// 		$('.request-form__item-input').siblings('.request-form__item-check').removeClass('request-form__item-check--active');
		// }
		// if ($('.request-form__item-check--active').length > 1)
		// {
		// 	$('.request-form__warn').slideUp(250);
		// 	$('.request-form__submit').addClass('request-form__submit--active');
		// }
		// else
		// {
		// 	$('.request-form__warn').slideDown(250);
		// 	$('.request-form__submit').removeClass('request-form__submit--active');
		// }
		$('.request-form__item-input').each(function()
		{
			if ($(this).val() != '')
			{
				$(this).siblings('.request-form__item-clear').fadeIn(300);
				if (($(this).val()[$(this).val().length-1] != '_' && $(this).hasClass('_phone-mask')) || ($(this).val().match(emailRegExp) && !($(this).hasClass('_phone-mask'))))
					$(this).siblings('.request-form__item-check').addClass('request-form__item-check--active');
				else
					$(this).siblings('.request-form__item-check').removeClass('request-form__item-check--active');
			}
			if ($('.request-form__item-check--active').length > 1)
			{
				$('.request-form__warn').slideUp(250);
				$('.request-form__submit').addClass('request-form__submit--active');
			}
			else
			{
				$('.request-form__warn').slideDown(250);
				$('.request-form__submit').removeClass('request-form__submit--active');
			}
		});
		$('.request-form__item-input').on('input', function()
		{
			if ($(this).val() != '')
			{
				$(this).siblings('.request-form__item-clear').fadeIn(300);
				if (($(this).val()[$(this).val().length-1] != '_' && $(this).hasClass('_phone-mask')) || ($(this).val().match(emailRegExp) && !($(this).hasClass('_phone-mask'))))
					$(this).siblings('.request-form__item-check').addClass('request-form__item-check--active');
				else
					$(this).siblings('.request-form__item-check').removeClass('request-form__item-check--active');
			}
			else
				$(this).siblings('.request-form__item-clear').fadeOut(300);
			if ($('.request-form__item-check--active').length > 1)
			{
				$('.request-form__warn').slideUp(250);
				$('.request-form__submit').addClass('request-form__submit--active');
			}
			else
			{
				$('.request-form__warn').slideDown(250);
				$('.request-form__submit').removeClass('request-form__submit--active');
			}
		});
	},
	clearInput: function()
	{
		$('.request-form__item-clear').on('click', function()
		{
			$(this).siblings('.request-form__item-input').val('');
			$(this).siblings('.request-form__item-check').removeClass('request-form__item-check--active');
		});
	},
	setFocus: function()
	{
		document.getElementById("phone").focus();
	},
	tooltip: function()
	{
		const template = document.getElementById('template');
		tippy('#tooltip', {
			content: template.innerHTML,
			allowHTML: true,
			interactive: true,
			interactiveBorder: 15,
			maxWidth: 420,
			placement: 'top-end',
			theme: 'blue',
		});
	}
};