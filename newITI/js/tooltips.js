var tooltip =
{
	init: function()
	{
		this.getTooltips();
		this.api.init();
		// this.findTerm();
		setTimeout(() =>
		{
			this.pretifyTerms();
			this.setTermsInText();
		}, 1000);
	},
	terms: {},
	newTerms: {},
	// базовый путь
	testUrl: 'https://pre-prod.iticapital.ru/',
	baseUrl: 'https://iticapital.ru/',
	openDescr: function()
	{
		tippy('._tooltip',
			{
				trigger: 'click',
			});
	},
	// отправка ajax запроса
	sendAjax: function(properties)
	{
		var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
		var xhr = new XHR();

		xhr.open(properties.method, properties.url, true);

		if (properties.headers != 'undefined')
		{
			for (var key in properties.headers)
				xhr.setRequestHeader(key, properties.headers[key]);
		}

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
	getTooltips: function()
	{
		this.sendAjax({
			// тестовый путь:
			// url: this.testUrl + 'widget-constructor/getallterm/',
			// продовский путь:
			url: this.baseUrl + 'widget-constructor/getallterm/',
			method: 'get',
			success: function(e)
			{
				tooltip.terms = JSON.parse(e.currentTarget.response).result;
				tooltip.openByUrl();
			},
			error: function(e)
			{
				console.log('ошибка при получении виджетов', e);
			}
		});
	},
	openByUrl: function()
	{
		var termsIds = Object.keys(tooltip.terms);

		for(var i = 0; i < termsIds.length; i++)
		{
			var currentId = termsIds[i];
			if(tooltip.terms[currentId].activeUrl && tooltip.terms[currentId].activeUrl == window.location.pathname)
			{
				this.showForm(currentId);
				break;
			}
		}
	},
	api:
	{
		baseUrl: 'https://iticapital.ru/apicrm-test/',
		baseHeadersUrl: 'https://iticapital.ru/api-entrance/getkey/',
		// baseHeadersUrl: 'https://pre-prod.iticapital.ru/api-entrance/getkey/',
		token: null,
		// инициализация методов для работы с api crm
		init: function()
		{
			var savedToken = tooltip.cookie.getCookie('it-checkstr');

			if(typeof savedToken == 'undefined')
				this.setHeaders();
			else
			{
				this.token = savedToken;
			}

			setInterval(function()
			{
				tooltip.api.setHeaders();
			}, 1000 * 3600);
		},
		// получение и установка токена
		setHeaders: function(callback)
		{
			tooltip.sendAjax({
				url: this.baseHeadersUrl,
				method: 'get',
				success: function(e)
				{
					var data = JSON.parse(e.srcElement.response);
					if(data.success == 'true')
					{
						tooltip.cookie.setCookie('it-checkstr', data.output['it-checkstr'], { expires: 3600 * 24, path: '/'});
						tooltip.cookie.setCookie('it-entry', data.output['it-entry'], { expires: 3600 * 24, path: '/'});
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
			var str = tooltip.cookie.getCookie('it-checkstr');
			var key = tooltip.cookie.getCookie('it-entry');
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
	pretifyTerms: function()
	{
		if (typeof tooltip.terms == 'undefined' || !Object.keys(tooltip.terms).length) return;

		let newTerms = {};

		Object.values(tooltip.terms).forEach(term =>
		{
			let settings = JSON.parse(term.settings);
			newTerms[settings.title] = {
				...term,
				...settings,
			};
		});
		tooltip.newTerms = newTerms;
	},
	setTermsInText: function()
	{
		for (let [termName, term] of Object.entries(tooltip.newTerms))
		{
			let context = document.querySelector('.visual-editor');
			let options = {};
			let termin = `${term.title}`;
			let descr = `${term.description}`;
			options =
			{
				"element": "span",
				"className": "term _tooltip",
				"separateWordSearch": false,
				"accuracy":
				{
					"value": "exactly",
					"limiters": [",", ".", ")", "("]
				},
				"each": function(element)
				{
					$(element).attr("data-tippy-content", descr);
				}
			};
			let instance = new Mark(context);
			instance.mark(termin, options);
		}
		tooltip.openDescr();
	},
};

tooltip.init();