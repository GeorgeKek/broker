// регистрация
OpenAcc.signup =
{
	// при удачной отправке смс или проверке кода - обновляем доступный шаг
	setNextStep: function (step)
	{
		var currentStep = OpenAcc.cookie.getCookie('nextStep');

		if(typeof currentStep == 'undefined')
		{
			OpenAcc.cookie.setCookie('nextStep', 1, { expires: 3600 * 24, path: '/'});
			return false;
		}

		OpenAcc.cookie.setCookie('nextStep', step, { expires: 3600 * 24, path: '/'});
	},
	// сохранение лида
	signupStart: function(instance, event)
	{
		if(!$(instance).valid())
			return false;

		event.preventDefault();
		var userData = this.getLeadInfo(instance);

		this.writeSignupStartData(userData);

		this.sendSms(userData.phone, $(instance).attr('redirect-url'), instance, null, 2, userData);
		return false;
	},

	// получение инфы о заявке
	getLeadInfo: function(form)
	{
		var source_url = $(form).find('#source_url').val();
		var agent = $(form).find('#agent').val();
		var card_troyka = $(form).find('#card_troyka').val();

		return {
			phone: $(form).find('#phone').val().replace(/[^\d]/g, ''),
			email: $(form).find('#email').val(),
			source_url: (source_url) ? source_url : window.location.href,
			prod: $(form).find('#prod-name').val(),
			prod_id: $(form).find('#prod-id').val(),
			agent: agent ? agent : 10,
			google_id: this.getGoogleId(),
			card_troyka: card_troyka ? card_troyka.replace(/[^\d]/g, '') : '',
		};
	},

	// запись инфы о лиде в куки
	writeSignupStartData: function(userData)
	{
		OpenAcc.cookie.setCookie('userPhone', userData.phone, {expires: 3600 * 24, path: '/open-account/'});
		OpenAcc.cookie.setCookie('userEmail', userData.email, {expires: 3600 * 24, path: '/open-account/'});
		OpenAcc.cookie.setCookie('prod', userData.prod, {expires: 3600 * 24, path: '/open-account/'});
		OpenAcc.cookie.setCookie('prod_id', userData.prod_id, {expires: 3600 * 24, path: '/open-account/'});
		OpenAcc.cookie.setCookie('agent', userData.agent, {expires: 3600 * 24, path: '/open-account/'});
		OpenAcc.cookie.setCookie('source_url', userData.source_url, {expires: 3600 * 24, path: '/open-account/'});
		OpenAcc.cookie.setCookie('card_troyka', userData.card_troyka, {expires: 3600 * 24, path: '/open-account/'});
	},

	writeSuccessCookies: function(data)
	{
		OpenAcc.cookie.setCookie('idSms', data.idsms, { expires: 3600 * 24, path: '/open-account/' });

		if (typeof data.idclient != 'undefined')
			OpenAcc.cookie.setCookie('idClient', data.idclient, { expires: 3600 * 24, path: '/open-account/' });
	},

	changeStep: function(nextStep)
	{
		if (typeof nextStep != 'undefined' && nextStep)
			OpenAcc.signup.setNextStep(nextStep);
	},

	// отправка смс на регистрацию или
	sendSms: function (phone, redirectUrl, form, idClient, toNext, sendData)
	{
		var url = OpenAcc.api.baseUrl + 'SMS/add/';
		var sendToCrm = true;

		if(typeof idClient != 'undefined' && idClient != null)
		{
			url = OpenAcc.api.baseUrl + 'SMS/docs/' + idClient  + '/';
			sendToCrm = false;
		}

		if(typeof form != 'undefined' && form != null)
			OpenAcc.formSendStarted(form);

		$.ajax({
			type        : "POST",
			cache       : false,
			url         : url,
			dataType    : "json",
			crossDomain : true,
			data        : sendData,
			headers     :
			{
				'Authorization': 'Bearer ' + OpenAcc.api.getHeader(),
			},
			success: function(data)
			{
				if(typeof form != 'undefined')
					OpenAcc.formSendFinish(form);

				if(data.data.status == 'ok')
				{
					OpenAcc.signup.changeStep(toNext);
					OpenAcc.signup.writeSuccessCookies(data.data);

					if(sendToCrm)
						OpenAcc.sendToGaSignupStartEvent();

					window.location.href = redirectUrl;
				}

			},
			error: function (data)
			{
				OpenAcc.formSendFinish(form);
			}
		});
		return false;
	},
	// проверка кода из смс
	checkSmsCode: function(instance, event, toNext, sendEvent = false)
	{
		if(!$(instance).valid())
			return false;

		event.preventDefault();
		var codeInput = $(instance).find('#sms-code');
		var code = $(codeInput).val();
		var sendSmsId = OpenAcc.cookie.getCookie('idSms');
		var userPhone = OpenAcc.cookie.getCookie('userPhone');
		var url = OpenAcc.api.baseUrl + 'SMS/' + sendSmsId + '/?code=' + code;

		OpenAcc.formSendStarted(instance);

		$.ajax({
			type        : "GET",
			cache       : false,
			url         : url,
			dataType    : "json",
			crossDomain : true,
			headers     :
			{
				'Authorization': 'Bearer ' + OpenAcc.api.getHeader(),
			},
			success: function(data)
			{
				if(data.data.idsms == sendSmsId && data.data.result == 'true')
				{
					if(typeof toNext != 'undefined')
						OpenAcc.signup.setNextStep(toNext);

					OpenAcc.cookie.setCookie('timer_start_1', '', { expires: -1, path: '/open-account/' });
					OpenAcc.cookie.setCookie('timer_start_2', '', { expires: -1, path: '/open-account/' });

					if (sendEvent)
						OpenAcc.sendEventToGa({category: 'top_menu', action: 'open_account_click', label:'submit'});

					window.location.href = $(instance).attr('redirect-url');
				}
				else
				{
					OpenAcc.formSendFinish(instance);
					$(codeInput).focus();
					$(codeInput).addClass('error');
					$(codeInput).parent().addClass('def-input-wr_error');
					$(codeInput).siblings('.def-input__err-label').text('Неверный код');
					$(codeInput).parent().removeClass('def-input-wr_valid');
				}
			},
			error: function (data)
			{
				OpenAcc.formSendFinish(instance);
			}
		});
	},
	// собираем данные для регистрации
	parseSignupDate: function(form)
	{
		var userData = {};
		var excludeFields = ['passport-num', 'pass-code', 'pass-date', 'raion_reg-day', 'country-text'];
		var docSeriaParts = $('[name="passport-num"]').val().split(' ');

		$('[name="pass_seria"]').val(docSeriaParts[0]);
		$('[name="pass_number"]').val(docSeriaParts[1]);
		$('[name="pass_code"]').val($('[name="pass-code"]').val().replace('-', ''));
		$('[name="LastName"]').val($('[name="LastNameInput"]').val());
		$('[name="FirstName"]').val($('[name="FirstNameInput"]').val());
		$('[name="pass_date"]').val(OpenAcc.dateToPHPDate($('[name="pass-date"]').val()));
		$('[name="birth_day"]').val(OpenAcc.dateToPHPDate($('[name="birth-day"]').val()));
		$('[name="phone"]').val(OpenAcc.cookie.getCookie('userPhone'));
		$('[name="email"]').val(OpenAcc.cookie.getCookie('userEmail'));
		$('[name="prod"]').val(OpenAcc.cookie.getCookie('prod'));
		$('[name="prod_id"]').val(OpenAcc.cookie.getCookie('prod_id'));
		$('[name="agent"]').val(OpenAcc.cookie.getCookie('agent'));
		$('[name="source_url"]').val(OpenAcc.cookie.getCookie('source_url'));
		$('[name="google_id"]').val(this.getGoogleId());
		$('[name="card_troyka"]').val(OpenAcc.cookie.getCookie('card_troyka'));

		$(form).find('input, textarea').each(function(index, input)
		{
			var fieldName = $(input).attr('name');
			if(excludeFields.indexOf(fieldName) == -1)
			{
				userData[fieldName] = $(input).val();
			}
		});

		userData.idclient = OpenAcc.cookie.getCookie('idClient');

		return userData;
	},

	// id юзера в аналитике
	getGoogleId: function()
	{
		try
		{
			if(typeof ga != 'undefined' && ga.getAll()[0].get('clientId'))
				return ga.getAll()[0].get('clientId');
			else
				return "";
		}
		catch(error)
		{
			return "";
		}
	},

	// обновление инофрмации в crm + регистарция по паспорту
	createWithPassport: function(instance)
	{
		if(!$(instance).valid())
			return false;

		event.preventDefault();
		// this.createWithPassportTest(instance);
		var urlSingup = OpenAcc.api.baseUrl + $(instance).attr('action');
		var signupData = this.parseSignupDate(instance);
		// var idclient = OpenAcc.cookie.getCookie('idClient');
		var urlUpdateData = OpenAcc.api.baseUrl + 'EditClient/' + signupData.idclient + '/';
		// signupData.idclient = idclient;

		OpenAcc.formSendStarted(instance);

		$.ajax({
			type        : "POST",
			cache       : false,
			url         : urlUpdateData,
			data        : signupData,
			dataType    : "json",
			crossDomain : true,
			headers     : {
				'Authorization': 'Bearer ' + OpenAcc.api.getHeader(),
			},
		});

		$.ajax({
			type        : "POST",
			cache       : false,
			url         : urlSingup,
			data        : signupData,
			dataType    : "json",
			crossDomain : true,
			headers     : {
				'Authorization': 'Bearer ' + OpenAcc.api.getHeader(),
			},
			success: function(data, status, xhr)
			{
				if(data.data.status == 'ok')
				{
					OpenAcc.signup.setNextStep(4);
					OpenAcc.signup.sendSms(signupData.phone, $(instance).attr('redirect-url'), null, data.data.idclient);
					return;
				}

				OpenAcc.formSendFinish(instance);
			},
			error: function(data)
			{
				OpenAcc.formSendFinish(instance);
			}
		});
	},
	// изменение номера телефона
	updateUserPhone: function (formatedUserPhone, idClient, type)
	{
		var changePhoneUrl = OpenAcc.api.baseUrl + 'ChangeClient/';
		var userData =
		{
			phone: formatedUserPhone,
			idclient: idClient,
			agent: 10,
		};
		$.ajax({
			type: "POST",
			cache: false,
			url: changePhoneUrl,
			data: userData,
			dataType: "json",
			crossDomain: true,
			headers:
			{
				'Authorization': 'Bearer ' + OpenAcc.api.getHeader(),
			},
			success: function (data, status, xhr)
			{
				if (data.data.status == 'ok')
				{
					OpenAcc.cookie.setCookie('userPhone', formatedUserPhone, { expires: 3600 * 24, path: '/open-account/' });
					OpenAcc.userPhone.sendNewCode(type);
				}
			}
		});
	},
};