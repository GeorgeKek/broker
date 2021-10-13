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
	rqPopup: null,
	idInt: 0,
	newsCount: 3,
	dataSms:
	{
		id: '',
		phone: '',
		name: '',
	},
	userData:
	{
		name: '',
		phone: '',
	},
	init()
	{
		this.api.init();
	},
	scrollTo(elementClass, offset = 72)
	{
		const $el = $(elementClass);

		if ($el[0])
		{
			$('body, html').animate({
				scrollTop: ($el.offset().top - offset)
			}, 700);
		}
	},
	popups:
	{
		show(instance, popup)
		{
			$('._overlay').addClass('_show');
			$('body').addClass('ow-hidden');
			$(popup).addClass('_show');
			o2.initMask();
			setTimeout(()=>
			{
				this.addClickOutside(popup);
			}, 10);
		},
		close(popup)
		{
			$('._overlay').removeClass('_show');
			$('body').removeClass('ow-hidden');
			$(popup).removeClass('_show');
			this.removeClickOutside();
		},
		remove(popup)
		{
			$(popup).remove();
		},
		removeClickOutside()
		{
			$(document).off('click');
		},
		addClickOutside(popup)
		{
			$(document).on('click',(e)=>
			{
				if ($(e.target).closest(popup).length) return;
				this.close(popup);
			});
		},
	},
	initMask: function()
	{
		document.querySelector("._call-popup__mask").value = '+7 ';
		document.querySelector("._call-popup__mask").setAttribute('data-mask', '+7 (###) ### ## ##');
		var mask = Maska.create("._call-popup__mask");
	},
	addClass: function(element, classToAdd)
	{
		var arr = element.className.split(" ");
		if (arr.indexOf(classToAdd) == -1)
			element.className += " " + classToAdd;
	},

	// удаление класса у элемента
	removeClass: function(element, classToRemove)
	{
		element.className = element.className.replace(classToRemove, '');
	},
	submitForm: function(form, event)
	{
		event.preventDefault();
		if(this.formIsValid(form))
		{
			document.querySelector('.call-popup__btn').setAttribute('disabled', true);
			document.querySelector('.call-popup__text-phone').textContent = document.querySelector('._call-popup__mask').value;
			document.querySelector('.call-popup__text-time').textContent = document.querySelector('.call-popup__radio-button:checked').value;
			o2.addClass(document.querySelector('.call-popup__body-sms'), 'call-popup__body--active');
			o2.removeClass(document.querySelector('.call-popup__body'), 'call-popup__body--active');
			o2.phoneCheck(form, event);
			o2.countDown();

			document.querySelector('.call-popup__again').disabled = true;
		}
	},
	countDown: function() // функция обратного отсчета
	{
		var i = 60;
		clearInterval(this.idInt);
		this.idInt = setInterval(function()
		{
			document.querySelector('.call-popup__again span').innerHTML = 'Выслать код еще раз (' + i + ')';
			if (i <= 0)
			{
				clearInterval(o2.idInt);
				document.querySelector('.call-popup__again span').innerHTML = 'Выслать код еще раз';
				document.querySelector('.call-popup__again').disabled = false;
			}
			i = i - 1;
		}, 1000);
	},
	formIsValid: function()
	{
		if ($('.call-popup__field-input--name').val() === '')
			this.addClass(document.querySelector('.call-popup__field-input--name'), '_call-popup__error');
		else
			this.removeClass(document.querySelector('.call-popup__field-input--name'), '_call-popup__error');

		if ($('._call-popup__mask').val().length != '18')
			this.addClass(document.querySelector('._call-popup__mask'), '_call-popup__error');
		else
			this.removeClass(document.querySelector('._call-popup__mask'), '_call-popup__error');

		if ($('._call-popup__error').length > 0)
			return false;
		else
			return true;
	},
	api:
	{

		baseUrl: 'https://iticapital.ru/apicrm/',
		// baseHeadersUrl: 'https://iticapital.ru/api-entrance/getkey/',
		baseHeadersUrl: 'https://iticapital.ru/api-entrance/getkey/',
		token: null,
		// инициализация методов для работы с api crm
		init: function()
		{
			var savedToken = o2.cookie.getCookie('it-checkstr');

			if(typeof savedToken == 'undefined')
				this.setHeaders();
			else
				this.token = savedToken;

			setInterval(function()
			{
				o2.api.setHeaders();
			}, 1000 * 3600);
		},
		// получение и установка токена
		setHeaders: function(callback)
		{
			o2.sendAjax({
				url: this.baseHeadersUrl,
				method: 'get',
				success: function(e)
				{
					var data = JSON.parse(e.srcElement.response);
					if(data.success == 'true')
					{
						o2.cookie.setCookie('it-checkstr', data.output['it-checkstr'], { expires: 3600 * 24, path: '/'});
						o2.cookie.setCookie('it-entry', data.output['it-entry'], { expires: 3600 * 24, path: '/'});
					}
				},
				error: function(e)
				{
					var data = JSON.parse(e.srcElement.response);
					if(data.status)
						$('body').addClass('api-error');
				}
			});
		},
		getHeader: function()
		{
			var str = o2.cookie.getCookie('it-checkstr');
			var key = o2.cookie.getCookie('it-entry');
			var token = '';

			try
			{
				token = str.split('q').filter(Boolean).map(function (s)
				{
					return String.fromCharCode(parseInt(s) ^ key);
				}).join('');
			}
			catch (error)
			{
				token = null;
			}
			return token;
		},
	},
	// Отправляет запрос на сервер
	phoneCheck: function(form, event)
	{
		o2.sendAjax({
			url: 'https://iticapital.ru/apicrm/PhoneCheck/',
			method: 'post',
			data: {'phone': $('._call-popup__mask').val(), 'send_sms': 1, 'name': $('.call-popup__field-input--name').val()},
			headers:
			{
				'Authorization': 'Bearer ' + o2.api.getHeader()
			},
			success: function(e)
			{
				o2.dataSms.idclient = JSON.parse(e.target.response).data.idclient;
				o2.dataSms.idlead = JSON.parse(e.target.response).data.idlead;
				o2.dataSms.id = JSON.parse(e.target.response).data.idsms;
			},
			error: function(e)
			{
				console.log(e, '2');
			}
		});
		document.querySelector('.call-popup__again').disabled = true;
		o2.countDown();
	},
	// Проверяет валидность номера
	phoneVerify: function(form, event)
	{
		var data = {code: document.querySelector('.call-popup__field-sms').value, idsms: o2.dataSms.id};
		o2.sendAjax({
			url: 'https://iticapital.ru/apicrm/PhoneVerify/',
			method: 'post',
			data: data,
			headers:
			{
				'Authorization': 'Bearer ' + o2.api.getHeader(),
			},
			success: function(e)
			{
				if (JSON.parse(e.target.response).data.result == "wrong code")
				{
					document.querySelector('.call-popup__field-sms').style.borderColor = 'red';
				}
				else
				{
					if (JSON.parse(e.target.response).data.status == "ok")
					{
						// o2.userData.name = $('.call-popup__field-input--name').val();
						// o2.userData.phone   = $('._call-popup__mask').val();
						// o2.sendForm(data, function()
						// {
						// 	o2.callEvent('submit', userData);
						// });
						// console.log(userData);
						o2.removeClass(document.querySelector('.call-popup__body-sms'), 'call-popup__body--active');
						o2.addClass(document.querySelector('.call-popup-success'), 'call-popup__body--active');
					}
					else
					{
						o2.removeClass(document.querySelector('.call-popup__body-sms'), 'call-popup__body--active');
						o2.addClass(document.querySelector('.call-popup-error'), 'call-popup__body--active');
					}
				}
			},
			error: function(e)
			{
				console.log(e);
			}
		});
	},
	// отправка ajax запроса
	sendAjax: function(properties)
	{
		var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
		var xhr = new XHR();

		xhr.open(properties.method, properties.url, true);

		if (properties.headers != 'undefined')
			for (var key in properties.headers)
				xhr.setRequestHeader(key, properties.headers[key]);

		xhr.onload = function(e)
		{
			if(typeof properties.success == 'function')
				properties.success(e);
		};
		xhr.onerror = function(e)
		{
			if(typeof properties.error == 'function')
				properties.error(e);
		};

		if(typeof properties.data != 'undefined')
			xhr.send(JSON.stringify(properties.data));
		else
			xhr.send();
	},
	// объект для работы с cookie
	cookie:
	{
		getCookie: function(name)
		{
			var matches = document.cookie.match(new RegExp(
				"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
			));
			return matches ? decodeURIComponent(matches[1]) : undefined;
		},
		setCookie: function(name, value, options)
		{
			selectionOptions = options || {};

			var expires = options.expires;

			if (typeof expires == "number" && expires)
			{
				var d = new Date();
				d.setTime(d.getTime() + expires * 1000);
				expires = options.expires = d;
			}
			if (expires && expires.toUTCString)
			{
				options.expires = expires.toUTCString();
			}

			value = encodeURIComponent(value);

			var updatedCookie = name + "=" + value;

			for (var propName in options)
			{
				updatedCookie += "; " + propName;
				var propValue = options[propName];
				if (propValue !== true)
				{
					updatedCookie += "=" + propValue;
				}
			}
			document.cookie = updatedCookie;
		}
	},
	getInput: function(form, event)
	{
		if (document.querySelector('.call-popup__field-sms').value.length !== 4)
			return;
		o2.phoneVerify(form, event);
	},
	againStep: function()
	{
		event.preventDefault();
		o2.addClass(document.querySelector('.call-popup__body'), 'call-popup__body--active');
		o2.removeClass(document.querySelector('.call-popup__body-sms'), 'call-popup__body--active');
		document.querySelector('.call-popup__btn').removeAttribute('disabled');
	},
	addNews: function(instance)
	{
		let url = '/assets/news/load-news.php';
		let data = {
			count: this.newsCount,
		};
		this.newsCount = this.newsCount + 3;
		async function inquiry(url,data)
		{
			const response = await fetch(url,{
				method:'POST',
				body: JSON.stringify(data)
			});
			return await response.json();
		}
		inquiry(url, data)
			.then((data) =>
			{
				$(instance).parent('.news__btn-block').siblings('.news__list').append(data.news);
				if (data.total === 0)
				{
					$(instance).hide();
				}
			});
	}
};