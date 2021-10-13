"use strict";

/**
 * инициализация всех инициализаций
 */
$(document).ready(function()
{
	o2.init();
});

window.addEventListener('load', function ()
{
	var app = new Vue
	({
		el: '#app',
		delimiters: ['{-{', '}-}'],
		data: function()
		{
			return {
				loaded: true,
				productData: ''
			};
		},
		created: function()
		{
			this.productData = Object.assign(this.productData, window.productData);
		},
		computed:
		{
			revenue()
			{
				try
				{
					return this.productData['main_title'];
				}
				catch (error)
				{
					return undefined;
				}
			},
			percent()
			{
				try
				{
					return this.productData['product_cart'];
				}
				catch (error)
				{
					return undefined;
				}
			},
		},
		mounted: function()
		{
		},
	});
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
		this.stickHeaderCall();
	},

	stickHeader: function(instance)
	{
		if($(instance).scrollTop() != 0 && $('._header').hasClass('header--fixed'))
			return;

		if($(instance).scrollTop() != 0)
			$('._header').addClass('header--fixed');
		else
			$('._header').removeClass('header--fixed');
	},

	stickHeaderCall: function()
	{
		o2.stickHeader(window);

		$(window).scroll(function()
		{
			o2.stickHeader(this);
		});
	},

	subscribe(instance, event)
	{
		event.preventDefault();
		var emailEl = $(instance).find('._user-email:visible');
		var emailValid = this.validateEmail(emailEl);
		var statusValid = 'true';

		if(emailEl && statusValid)
		{
			$(instance).find('button[type="submit"]').addClass('btn_loader').attr('disabled', 'true');

			var data = {
				email: $(instance).find('input[name="email"]').val(),
				status: 'true',
				list_id: $(instance).find('input[name="list_id"]').val(),
			};
			$.ajax(
				{
					method      : 'post',
					cache       : false,
					url         : '/qualified-subscribe/',
					dataType    : 'json',
					crossDomain : true,
					data        : JSON.stringify(data),
					success     : function(res)
					{
						if(res.status == 'true')
						{
							$('.subscription__form').addClass('subscription__form--hidden');
							$('.subscription__success').fadeIn(300);
						}
					}
				});
		}
	},
	validateEmail(input)
	{
		var emailRegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,12}$/;

		if($(input).val().match(emailRegExp))
		{
			$(input).removeClass('input_error');
			return true;
		}
		else
		{
			$(input).addClass('input_error');
			return false;
		}
	},
};