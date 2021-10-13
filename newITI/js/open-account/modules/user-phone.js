// блок с изменением телефоа и повтороной отправки кода
OpenAcc.userPhone =
{
	inputInterval: null,
	// показать попап для изменения номера
	showChangePhonePopup: function()
	{
		$('.change-data-popup').addClass('showed');
		$('.change-data-popup').find('input').first().focus();
		this.inputInterval = setInterval(function ()
		{
			OpenAcc.formsValidation.checkFormState($('#user-change-phone'));
		}, 150);
	},
	// закрыть попап для измения номера
	closeChangePhonePopup: function(event)
	{
		event.preventDefault();
		$('.change-data-popup').removeClass('showed');
		clearInterval(this.inputInterval);
	},
	// изменения номера
	changeUserPhone: function(instance, event, type)
	{
		event.preventDefault();
		if($(instance).validate().checkForm())
		{
			var phoneInput = $(instance).find('#new-phone');
			var newUserPhone = phoneInput.val();
			var formatedUserPhone = newUserPhone.replace(/[^\d]/g, '');

			if (formatedUserPhone == OpenAcc.cookie.getCookie('userPhone'))
			{
				this.closeChangePhonePopup(event);
				return false;
			}

			var idClient = OpenAcc.cookie.getCookie('idClient');

			if (!idClient)
			{
				OpenAcc.cookie.setCookie('userPhone', formatedUserPhone, { expires: 3600 * 24, path: '/open-account/' });
				OpenAcc.userPhone.sendNewCode(type);
			}
			else
			{
				OpenAcc.signup.updateUserPhone(formatedUserPhone, idClient, type);
			}

			$('.user-phone-info__phone-text').text(newUserPhone);
			this.startTimer();
			this.closeChangePhonePopup(event);
			$(phoneInput).val('');
		}
		else
		{
			console.log('form not a valide');
		}
	},
	// запуск таймера
	startTimer: function (timerId)
	{
		$('.send-code').removeClass('send-code_timer-end');

		OpenAcc.timer.start('.send-code__last-time', function ()
		{
			$('.send-code').addClass('send-code_timer-end');
		}, timerId);
	},
	// функция для отправки кода
	sendNewCode: function(type)
	{
		var data = {};
		var timerId = type == 'add' ? 1 : 2;

		if (type == 'add')
		{
			var url = OpenAcc.api.baseUrl + 'SMS/add/';
			data = {
				phone: OpenAcc.cookie.getCookie('userPhone'),
				email: OpenAcc.cookie.getCookie('userEmail'),
			};
		}

		if (type == 'docs')
			var url = OpenAcc.api.baseUrl + 'SMS/docs/' + OpenAcc.cookie.getCookie('idClient') + '/';

		$('.send-code__new').addClass('send-code__new_sending');

		$.ajax({
			type        : "POST",
			cache       : false,
			url         : url,
			dataType    : "json",
			crossDomain : true,
			data        : data,
			headers     :
			{
				'Authorization': 'Bearer ' + OpenAcc.api.getHeader(),
			},
			success: function (data)
			{
				if (data.data.status == 'ok')
				{
					OpenAcc.cookie.setCookie('idSms', data.data.idsms, { expires: 3600 * 24, path: '/open-account/' });
					OpenAcc.cookie.setCookie('timer_start_1', '', { expires: -1, path: '/open-account/' });
					OpenAcc.cookie.setCookie('timer_start_2', '', { expires: -1, path: '/open-account/' });
					OpenAcc.userPhone.startTimer(timerId);
					$('.send-code__new').removeClass('send-code__new_sending');
					return;
				}
			}
		});
	}
};