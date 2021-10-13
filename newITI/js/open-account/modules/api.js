// базовая работа с апи
OpenAcc.api =
{
	baseUrl: 'https://iticapital.ru/apicrm-test/',
	// baseHeadersUrl: 'https://iticapital.ru/api-entrance/getkey/',
	baseHeadersUrl: 'https://pre-prod.iticapital.ru/api-entrance/getkey/',
	token: null,
	// инициализация методов для работы с api crm
	init()
	{
		var savedToken = OpenAcc.cookie.getCookie('it-checkstr');

		if(typeof savedToken == 'undefined')
			this.setHeaders();
		else
			this.token = savedToken;

		setInterval(function()
		{
			OpenAcc.api.setHeaders();
		}, 1000 * 3600);
	},
	// получение и установка токена
	setHeaders: function(callback)
	{
		$.ajax({
			type    : "get",
			cache   : false,
			url     : this.baseHeadersUrl,
			dataType: "json",
			crossDomain: true,
			success: function(data, textStatus, request)
			{
				if(data.success == 'true')
				{
					OpenAcc.cookie.setCookie('it-checkstr', data.output['it-checkstr'], { expires: 3600 * 24, path: '/'});
					OpenAcc.cookie.setCookie('it-entry', data.output['it-entry'], { expires: 3600 * 24, path: '/'});
				}
			},
			error: function(data)
			{
				if(data.status)
					$('body').addClass('api-error');
			}
		});
	},
	getHeader: function()
	{
		var str = OpenAcc.cookie.getCookie('it-checkstr');
		var key = OpenAcc.cookie.getCookie('it-entry');
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
};