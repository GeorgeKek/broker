if(typeof itiRqCallOptions != 'undefined' && typeof itiRqCallOptions == 'object') var itiSettings = itiRqCallOptions;
if(typeof fields != 'undefined' && typeof itiSettings == 'object') itiSettings.fields = fields;
// перезаписываем объект get site controls
var _gscq = {
	push: function(widget)
	{
		itiRqCall.showForm(widget[1]);
	}
};

try
{
	var itiRqCall =
	{
		// .rqc-form-body::-webkit-scrollbar{width:0;}
		// стили для окна
		styles: ".rqc-form-wr,.rqc-form-wr *{-webkit-box-sizing:border-box;box-sizing:border-box;font-family:inherit;font-size:inherit;font-weight:inherit;font-style:inherit;text-transform:inherit;text-decoration:inherit;white-space:normal}.rqc-form-wr{position:fixed;width:100%;height:100%;z-index: 9999999999;font-size:14px;-webkit-transition:.2s;-o-transition:.2s;transition:.2s;display:none;top:0;left:0;overflow-y:auto;}.rqc-form-wr.rqc-form-wr_opened .rqc-form-overlay{visibility:visible;opacity:1;}.rqc-form-wr.rqc-form-wr_opened .rqc-form-body{opacity:1;-webkit-transform:translateY(0);-ms-transform:translateY(0);transform:translateY(0);width:550px;}.rqc-form-overlay{position:fixed;width:100%;height:100%;top:0;left:0;background-color:rgba(0,0,0,0.42);z-index:-1;visibility:hidden;opacity:0;-webkit-transition:.3s;-o-transition:.3s;transition:.3s}.rqc-form-body-wr{position:absolute;height:100%;width:100%;top:0;left:0;bottom:0;right:0;margin:auto;display:-moz-flex;display:-ms-flex;display:-o-flex;display:-webkit-box;display:-ms-flexbox;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;-ms-align-items:center;-webkit-box-align:center;-ms-flex-align:center;-webkit-align-items:center;align-items:center;overflow-y:auto;padding-bottom:20px;padding-top:20px}.rqc-form-body-wrap_order{opacity:1}._order .rqc-form-body-wrap_order{opacity:1;-webkit-transform:translateY(0);-ms-transform:translateY(0);transform:translateY(0);-webkit-transition:.3s;-o-transition:.3s;transition:.3s}._confirm .rqc-form-body-wrap_order{opacity:0;-webkit-transform:translateY(-100%);-ms-transform:translateY(-100%);transform:translateY(-100%)}._confirm .rqc-form-body-wrap_confirm{-webkit-transform:translateY(-100%);-ms-transform:translateY(-100%);transform:translateY(-100%);-webkit-transition:.3s;-o-transition:.3s;transition:.3s;opacity:1}._sended .rqc-form-body-wrap_order{opacity:0;-webkit-transform:translateY(-100%);-ms-transform:translateY(-100%);transform:translateY(-100%)}._sended .rqc-form-body-wrap_confirm{opacity:0}._sended .rqc-form-body-wrap_sended{opacity:1;-webkit-transform:translateY(-200%);-ms-transform:translateY(-200%);transform:translateY(-200%);-webkit-transition:.3s;-o-transition:.3s;transition:.3s}.rqc-form-body{max-width:550px;min-width:370px;top:0;left:0;bottom:0;right:0;padding:20px 70px;padding-top:71px;padding-bottom:70px;background-color:#fff;-webkit-border-radius:10px;border-radius:10px;-webkit-box-shadow:0 12px 27.26px 1.74px rgba(0,0,0,0.4);box-shadow:0 12px 27.26px 1.74px rgba(0,0,0,0.4);overflow:hidden;-webkit-transition:.3s;-o-transition:.3s;transition:.3s;-webkit-transform:translateY(-20%);-ms-transform:translateY(-20%);transform:translateY(-20%);position:relative;opacity:0;margin:auto}.rqc-form-body_error,.rqc-form-body_sended{height:580px;}.rqc-form-body-top{position:relative}.rqc-form-body-top svg{display:block;margin-left:auto;margin-right:auto;margin-bottom:41px}.rqc-form-close{position:absolute;width:30px;height:30px;top:-55px;right:-53px;cursor:pointer;z-index:22;background-color:#A8A8A8;-webkit-border-radius:20px;border-radius:20px}.rqc-form-close:hover .rqc-form-close__icon{-webkit-transform:rotate(90deg);-ms-transform:rotate(90deg);transform:rotate(90deg);top:14px;right:15px;}.rqc-form-close__icon{-webkit-transition:.2s;-o-transition:.2s;transition:.2s;-webkit-transform-origin:center center;-ms-transform-origin:center center;transform-origin:center center;background-color:red;position:absolute;top:15px;right:16px}.rqc-form-close__icon:after,.rqc-form-close__icon:before{position:absolute;content:'';width:2px;height:14px;background-color:#fff;-webkit-transform-origin:center;-ms-transform-origin:center;transform-origin:center;top:0;left:0;right:0;bottom:0;margin:auto}.rqc-form-close__icon:before{-webkit-transform:rotate(45deg);-ms-transform:rotate(45deg);transform:rotate(45deg)}.rqc-form-close__icon:after{-webkit-transform:rotate(-45deg);-ms-transform:rotate(-45deg);transform:rotate(-45deg)}.rqc-form-radio{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;height:150px}.rqc-form-radio__container{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center}.rqc-form-radio__input{position:relative;min-height:100px;width:100px}.rqc-form-radio__input:last-child .rqc-form-radio__tile{border-right:none}.rqc-form-radio__button{opacity:0;position:absolute;top:0;left:0;height:100%;width:100%;margin:0;cursor:pointer}.rqc-form-radio__tile{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;width:100%;height:100%;border:1px solid transparent;border-right:1px solid #A8A8A8;padding:7px 5px;-webkit-transition:-webkit-transform 300ms ease;transition:-webkit-transform 300ms ease;-o-transition:transform 300ms ease;transition:transform 300ms ease;transition:transform 300ms ease,-webkit-transform 300ms ease}.rqc-form-radio__icon svg{fill:#A8A8A8}.rqc-form-radio__tile-label{text-align:center;font-size:14px;line-height:20px;font-weight:600;color:#333}.rqc-form-radio__tile-label span{color:gray;font-weight:400}.rqc-form-radio__button:checked + .rqc-form-radio__tile{border:1px solid #F04F48;-webkit-border-radius:5px;border-radius:5px;background-color:#fff;color:#fff;-webkit-transform:scale(1.1,1.1);-ms-transform:scale(1.1,1.1);transform:scale(1.1,1.1)}.rqc-form-radio__button:checked + .rqc-form-radio__tile .rqc-form-radio__icon svg{fill:#F04F48}.rqc-form-radio__button:checked + .rqc-form-radio__tile span{color:red}.rqc-form__title{margin-bottom:10px;font-size:16px;line-height:25px;text-align:center;color:gray}.rqc-form-field__input{width:100%;height:44px;padding:13px 28px;background:#FFF;border:1px solid #CCC;-webkit-border-radius:2px;border-radius:2px;text-align:center;font-size:18px;line-height:21px;color:#000;-webkit-transition:.3s;-o-transition:.3s;transition:.3s;outline:none;}.rqc-form-field__input::-webkit-input-placeholder{color:#CECECE;text-align:center}.rqc-form-field__input::-moz-placeholder{color:#CECECE;text-align:center}.rqc-form-field__input::-ms-input-placeholder{color:#CECECE;text-align:center}.rqc-form-field__input::placeholder{color:#CECECE;text-align:center}.rqc-form__phone{position:relative;display:block;margin-bottom:20px;cursor:auto}.rqc-form__phone.def-input-wr_error .rqc-form__input{background-color:#fff0ef}.rqc-form__phone.def-input-wr_error .rqc-form__item-error{bottom:-20px;z-index:1}.rqc-form__item-error{position:absolute;bottom:0;left:0;z-index:-1;color:red;font-size:12px;-webkit-transition:.2s;-o-transition:.2s;transition:.2s}.rqc-form-field__input._rqc-error{border-color:#f04f48}.rqc-btn{display:block;width:263px;margin:0 auto;height:40px;line-height:14px;background-color:#F04F48;-webkit-border-radius:62px;border-radius:62px;font-size:14px;letter-spacing:.5px;color:#fff;text-align:center;border:0;outline:none;}.rqc-btn span{letter-spacing:0}.rqc-form__header{font-size:36px;line-height:45px;text-align:center;font-weight:600;margin-bottom:25px}.rqc-form__text{font-size:14px;line-height:20px;text-align:center;-webkit-font-feature-settings:tnum on,lnum on,zero on;font-feature-settings:tnum on,lnum on,zero on;color:#333;margin-bottom:53px}.rqc-form__text-phone{font-family:inherit;font-weight:900}.rqc-form__sms{position:relative;display:block;margin-bottom:10px;cursor:auto}.rqc-form__sms.def-input-wr_error .rqc-form__input{background-color:#fff0ef}.rqc-form__sms.def-input-wr_error .rqc-form__item-error{bottom:-20px;z-index:1}.rqc-form__again{border:none;display:block;width:263px;margin:0 auto;height:44px;background-color:#fff;letter-spacing:.5px;color:#B3B3B3;text-align:center;border:0}.rqc-form__again:hover svg{-webkit-transform:rotate(360deg);-ms-transform:rotate(360deg);transform:rotate(360deg);-webkit-transition:.5s;-o-transition:.5s;transition:.5s}.rqc-form__again:hover span{border:none}.rqc-form__again span{letter-spacing:0;font-size:14px;line-height:14px;padding-bottom:1px;border-bottom:1px solid #6AA4DE}.rqc-form__again svg{margin-right:5px;vertical-align:middle}.rqc-form-close__back{position:absolute;left:-45px;color:#6AA4DE;top:-50px}.rqc-form__button{display:block;width:263px;margin:0 auto;height:44px;margin-bottom:83px;line-height:44px;background-color:#F04F48;-webkit-border-radius:62px;border-radius:62px;font-size:14px;letter-spacing:.5px;color:#fff;text-align:center;border:0}.rqc-form-message__text{margin-bottom:48px;font-size:14px;line-height:20px;text-align:center;-webkit-font-feature-settings:tnum on,lnum on,zero on;font-feature-settings:tnum on,lnum on,zero on;color:#333}.rqc-form-message{display:none;opacity:0;text-align:center}.rqc-form-message svg{margin-bottom:50px;}.rqc-form-body__sms{display:none;opacity:0;transition:1s}.rqc-form-body_confirm .rqc-form-body__sms{opacity:1;position:relative}.rqc-form-body__form{display:none;opacity:0;transition:1s}.rqc-form--active{display:block;opacity:1;transition:1s}@media (max-width: 768px){.rqc-form-radio{height: auto;}.rqc-form-wr.rqc-form-wr_opened .rqc-form-body{width:370px}.rqc-form-body{padding: 40px 40px}.rqc-form-close{right: -23px;top:-25px}.rqc-form-radio__tile{border-right: none}.rqc-form__header{font-size: 30px;line-height: 36px}.rqc-form-body{min-width:320px}.rqc-btn{width:240px}.rqc-form__again{width:240px}.rqc-form-field__input{padding:13px 13px;}.rqc-form-close__back{left:-25px;top:-25px;}}",
		//Обертка для окна
		widgetContainer: '<div class="rqc-form-wr _rqc-form-wr"><div class="rqc-form-overlay"></div></div>',
		// rqc-form-wr_opened
		// Содержимое виджета
		widgetBody: '<div class="rqc-form-body-wr _rqc-form-body-wr"><div class="rqc-form-body _rqc-form-body"><div class="rqc-form-body__form rqc-form--active"><div class="rqc-form-body-top"><div class="rqc-form__header"> #title#</div><div class="rqc-form-close" onclick="itiRqCall.hideForm()"><div class="rqc-form-close__icon"></div></div></div><form action="#" class="rqc-form" novalidate="" onsubmit="itiRqCall.submitForm(this, event)"><div class="rqc-enums-wr"> #enumsList#</div> #inputs#<div class="rqc-submit-wr"> <button class="rqc-btn" type="submit"><span class="rqc-btn__text">#btnText#</span></button></div></form></div>\
		\
		<div class="rqc-form-body__sms"><div class="rqc-form-body-top"><div class="rqc-form__header rqc-form__header_confirm">Введите код<br>из&nbsp;SMS</div><div class="rqc-form-close" onclick="itiRqCall.hideForm()"><div class="rqc-form-close__icon"></div></div><a href="" class="rqc-form-close__back" onclick="itiRqCall.againStep()">&larr; Вернуться</a></div><div class="rqc-form__text"> Вводя код, вы&nbsp;подтверждаете заказ звонка<br>на&nbsp;номер&nbsp;<span class="rqc-form__text-phone">+7 (912) 345-67-89</span><br><span class="rqc-form__text-time">завтра утром (9&ndash;12&nbsp;МСК)</span></div><form class="rqc-form"> <label class="rqc-form__sms"><div class="rqc-form__title">SMS-код</div> <input type="tel" id="phone" name="phone" placeholder="_ _ _ _" class="rqc-form-field__input def-input sign-up-input__input rqc-form-field__sms" im-insert="true" oninput="itiRqCall.getInput(this, event)"> <span class="rqc-form__item-error def-input__err-label">Заполните это поле</span> </label> <button type="button" class="rqc-form__again" onclick="itiRqCall.phoneCheck(this, event)"> <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" clip-rule="evenodd" d="M10.2364 1.7625C9.14822 0.675 7.65478 0 5.99625 0C2.67917 0 0 2.685 0 6C0 9.315 2.67917 12 5.99625 12C8.7955 12 11.1295 10.0875 11.7974 7.5H10.2364C9.62101 9.2475 7.95497 10.5 5.99625 10.5C3.51219 10.5 1.49343 8.4825 1.49343 6C1.49343 3.5175 3.51219 1.5 5.99625 1.5C7.24203 1.5 8.35272 2.0175 9.16323 2.835L6.74672 5.25H12V0L10.2364 1.7625Z" fill="#6AA4DE"/> </svg> <span>Выслать код еще раз</span> </button></form></div>\
		\
		<div class="rqc-form-message rqc-form-message_success"> <svg width="55" height="44" viewBox="0 0 55 44" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M3 25.9971L16.0022 39L52 3" stroke="#66B759" stroke-width="6"/> </svg><div class="rqc-form__header">#success-message#</div><div class="rqc-form-message__text">#success-text#</div><button class="rqc-form__button" onclick="itiRqCall.hideForm()">Ясно</button></div><div class="rqc-form-message rqc-form-message_error"><svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 3L35 35" stroke="#F04F48" stroke-width="6"/><path d="M35 3L3 35" stroke="#F04F48" stroke-width="6"/></svg><div class="rqc-form__header">#error-message#</div><div class="rqc-form-message__text">#error-text#</div><button class="rqc-form__button" onclick="itiRqCall.hideForm()">Ясно</button></div>',
		// вынесенный класс открытого окна т.к. много где повторяется
		openClass: 'rqc-form-wr_opened',
		// сохраняем html элемент окна в переменную
		rqPopup: null,
		// сохраняем html элемент оверлея в переменную
		rqOverlay: null,
		// базовый путь
		baseUrl: 'https://iticapital.ru/',
		//Переменная для временного хранения добавляемого виджета
		newWidget: '',
		//Объект со всеми виджетами
		widgets: {},
		//ID  открытого виджета
		openedWidgetID: null,
		settings: {},
		idInt: 0,
		dataSms:
		{
			id: '',
			phone: '',
			name: '',
		},
		userData: '',
		// инициализация окна при загрузке
		init: function()
		{
			if(itiSettings)
				this.settings = itiSettings;

			if(typeof ga == 'undefined')
				ga = function()
				{
				};
			if(typeof this.settings.debug != 'undefined' && this.settings.debug)
				this.baseUrl = 'https://pre-prod.iticapital.ru/';

			this.getWidgets();
			this.setWidgetContainer();
			this.setStyles();
			this.api.init();
			document.onclick = this.listClicks;
		},
		api:
		{

			baseUrl: 'https://iticapital.ru/apicrm-test/',
			// baseHeadersUrl: 'https://iticapital.ru/api-entrance/getkey/',
			baseHeadersUrl: 'https://pre-prod.iticapital.ru/api-entrance/getkey/',
			token: null,
			// инициализация методов для работы с api crm
			init: function()
			{
				var savedToken = itiRqCall.cookie.getCookie('it-checkstr');

				if(typeof savedToken == 'undefined')
					this.setHeaders();
				else
					this.token = savedToken;

				setInterval(function()
				{
					itiRqCall.api.setHeaders();
				}, 1000 * 3600);
			},
			// получение и установка токена
			setHeaders: function(callback)
			{
				itiRqCall.sendAjax({
					url: this.baseHeadersUrl,
					method: 'get',
					success: function(e)
					{
						var data = JSON.parse(e.srcElement.response);
						if(data.success == 'true')
						{
							itiRqCall.cookie.setCookie('it-checkstr', data.output['it-checkstr'], { expires: 3600 * 24, path: '/'});
							itiRqCall.cookie.setCookie('it-entry', data.output['it-entry'], { expires: 3600 * 24, path: '/'});
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
				var str = itiRqCall.cookie.getCookie('it-checkstr');
				var key = itiRqCall.cookie.getCookie('it-entry');
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
			if (itiRqCall.dataSms.phone === '')
				itiRqCall.dataSms.phone = itiRqCall.getData(form, this.openedWidgetID).phone;
			if (itiRqCall.dataSms.name === '')
				itiRqCall.dataSms.name = itiRqCall.getData(form, this.openedWidgetID).name;
			itiRqCall.sendAjax({
				url: 'https://iticapital.ru/apicrm-test/PhoneCheck/',
				method: 'post',
				data: {'phone': itiRqCall.dataSms.phone, 'send_sms': 1, 'name': itiRqCall.dataSms.name},
				headers:
				{
					'Authorization': 'Bearer ' + itiRqCall.api.getHeader()
				},
				success: function(e)
				{
					itiRqCall.dataSms.idclient = JSON.parse(e.target.response).data.idclient;
					itiRqCall.dataSms.idlead = JSON.parse(e.target.response).data.idlead;
					itiRqCall.dataSms.id = JSON.parse(e.target.response).data.idsms;
				},
				error: function(e)
				{
					console.log(e, '2');
				}
			});
			document.querySelector('.rqc-form__again').disabled = true;
			itiRqCall.countDown();
		},
		// Проверяет валидность номера
		phoneVerify: function(form, event)
		{
			var data = {code: document.querySelector('.rqc-form-field__sms').value, idsms: itiRqCall.dataSms.id};
			itiRqCall.sendAjax({
				url: 'https://iticapital.ru/apicrm-test/PhoneVerify/',
				method: 'post',
				data: data,
				headers:
				{
					'Authorization': 'Bearer ' + itiRqCall.api.getHeader(),
				},
				success: function(e)
				{
					if (JSON.parse(e.target.response).data.result == "wrong code")
					{
						document.querySelector('.rqc-form-field__sms').style.borderColor = 'red';
					}
					else
					{
						if (JSON.parse(e.target.response).data.status == "ok")
						{
							userData.idclient = itiRqCall.dataSms.idclient;
							userData.idlead   = itiRqCall.dataSms.idlead;
							itiRqCall.sendForm(userData, function()
							{
								itiRqCall.callEvent('submit', userData);
							});
							itiRqCall.removeClass(document.querySelector('.rqc-form-body__sms'), 'rqc-form--active');
							itiRqCall.addClass(document.querySelector('.rqc-form-message_success'), 'rqc-form--active');
						}
						else
						{
							itiRqCall.removeClass(document.querySelector('.rqc-form-body__sms'), 'rqc-form--active');
							itiRqCall.addClass(document.querySelector('.rqc-form-message_error'), 'rqc-form--active');
						}
					}
				},
				error: function(e)
				{
					console.log(e);
				}
			});
		},
		// вызов колбэкков
		callEvent: function(eventName, data)
		{
			try
			{
				var event = this.settings[eventName];
				var eventType = typeof this.settings[eventName];

				if(eventType != 'undefined' && eventType == 'function')
					this.settings[eventName](this.openedWidgetID, data);
			}
			catch(e)
			{

			}
		},
		getInput: function(form, event)
		{
			if (document.querySelector('.rqc-form-field__sms').value.length !== 4)
				return;
			itiRqCall.phoneVerify(form, event);
		},
		// получение всех виджетов
		getWidgets: function()
		{
			this.sendAjax({
				url: this.baseUrl + 'widget-constructor/getwidgets/',
				method: 'get',
				success: function(e)
				{
					itiRqCall.widgets = JSON.parse(e.currentTarget.response).result;
					itiRqCall.openByUrl();
				},
				error: function(e)
				{
					console.log('ошибка при получении виджетов', e);
				}
			});
		},

		// открытие виджета, если урл страницы совпадает с тем, что указан у одного из виджетов
		openByUrl: function()
		{
			var widgetsIds = Object.keys(itiRqCall.widgets);

			for(var i = 0; i < widgetsIds.length; i++)
			{
				var currentId = widgetsIds[i];
				if(itiRqCall.widgets[currentId].activeUrl && itiRqCall.widgets[currentId].activeUrl == window.location.pathname)
				{
					this.showForm(currentId);
					break;
				}
			}
		},

		//Вставка обертки для виджетов в  DOM
		setWidgetContainer: function()
		{
			var newContainer = document.createElement('div');
			newContainer.innerHTML = this.widgetContainer;
			document.body.appendChild(newContainer);
		},

		// очистка контейнера
		replaceWidgetContainer: function()
		{
			var widgetContainer  = document.querySelector('._rqc-form-wr');

			var newWidget = document.createElement('div');
			newWidget.classList.add('rqc-form-wr');
			newWidget.classList.add('_rqc-form-wr');
			newWidget.innerHTML = '<div class="rqc-form-overlay"></div>';

			var bodyHtml = widgetContainer.parentNode;

			bodyHtml.replaceChild(newWidget, widgetContainer);
		},

		// прослушиваем клилк в доме для вызова виджета через дата атрибут
		listClicks: function(event)
		{
			var widgetId = null;

			try
			{
				if(event.target.getAttribute('data-gsc-widget') != null)
				{
					widgetId = event.target.getAttribute('data-gsc-widget');
				}
				else if (event.target.parentNode.getAttribute('data-gsc-widget') != null)
				{
					widgetId = event.target.parentNode.getAttribute('data-gsc-widget');
				}

				if(widgetId != null)
					itiRqCall.showForm(widgetId);
			}
			catch (err)
			{
				console.log(err);
			}
		},

		// подключаем стили
		setStyles: function()
		{
			var css = this.styles,
				head = document.head || document.getElementsByTagName('head')[0],
				style = document.createElement('style');

			head.appendChild(style);

			style.type = 'text/css';
			if (style.styleSheet)
			{
				style.styleSheet.cssText = css;
			}
			else
			{
				style.appendChild(document.createTextNode(css));
			}
			this.styles = '';
			css = '';
		},

		// добавление класса элементу
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

		// показываем окно
		showForm: function(widgetId)
		{
			if(typeof this.widgets[widgetId] == 'undefined')
				return false;

			this.openedWidgetID = widgetId;

			this.setWidgetTexts();
			this.getHtmlNodes();
			this.initMask();
			this.validation.init();

			this.rqPopup.setAttribute("style", "display: block;");

			setTimeout(function()
			{
				bodyScrollLock.disableBodyScroll(itiRqCall.rqPopup, {reserveScrollBarGap: true});
				itiRqCall.addClass(itiRqCall.rqPopup, itiRqCall.openClass);
				itiRqCall.addClass(itiRqCall.rqOverlay, itiRqCall.openClass);
			}, 10);

			this.callEvent('show', {status: true});

			document.addEventListener('keyup', this.closeOnKeyUp);
		},

		//Перезаписывает дефолтные значения для нужного виджета по ID
		setWidgetTexts: function(widgetId)
		{
			var curWidget = this.widgets[this.openedWidgetID];

			this.newWidget = this.widgetBody.replace(/#title#/g, curWidget.title)
				.replace(/#description#/g, curWidget.description)
				.replace(/#btnText#/g, curWidget.buttonTxt)
				.replace(/#success-message#/g, curWidget.successHeader)
				.replace(/#success-text#/g, curWidget.successText)
				.replace(/#error-message#/g, curWidget.errorHeader)
				.replace(/#error-text#/g, curWidget.errorHeader);

			this.addInputs(this.openedWidgetID);
		},

		// добавление инпутов на виджет
		addInputs: function(widgetId)
		{
			var inputHTML = '<div class="rqc-form-field"> <label class="rqc-form__phone"><div class="rqc-form__title">#fieldLabel#</div> <input type="#fieldType#" name="#fieldName#" placeholder="#placeholder#" class="rqc-form-field__input #class-list#" onblur="ga(\'send\', \'event\', \'rqcall\', \'Виджет #fieldId#, клик в поле #fieldLabel#\');"></label></div>';
			var inputs = '';

			for (var i = 0; i < this.widgets[widgetId].fields.length; i++)
			{
				var field = this.widgets[widgetId].fields[i];
				field.classesList = this.getFieldClasses(field);

				if (field.type === 'enum')
				{
					itiRqCall.addEnumList(field);
					continue;
				};

				inputs += this.getInputHtmlString(inputHTML, field, widgetId);
			}
			this.newWidget = this.newWidget.replace(/#inputs#/g, inputs)
				.replace(/#enumsList#/g, '');
			this.setWidgetHtml();
		},

		// получение html строки инпута
		getInputHtmlString: function(input, field, widgetId)
		{
			return input.replace(/#fieldLabel#/g, field.label)
				.replace(/#fieldName#/g, field.fieldName)
				.replace(/#fieldType#/g, (field.type === 'phone' ? 'tel' : field.type))
				.replace(/#placeholder#/g, field.placeholder)
				.replace(/#class-list#/g, field.classesList.join(' '))
				.replace(/#fieldId#/g, widgetId)
				.replace(/#fieldLabel#/g, field.label);
		},

		// добавляем элементы перечисления
		addEnumList: function(field)
		{
			var enumsListWr = '<div class="rqc-form-radio #class-list#"><div class="rqc-form-radio__container">#enumsListItems#</div></div>';
			var inputEnumHtml = '<label class="rqc-form-radio__input" onclick="ga(\'send\', \'event\', \'rqcall\', \'time #enumLabel#\');"><input type="radio" class="rqc-form-radio__button" name="#fieldName#" #isChecked# value="#enumValue#"><div class="rqc-form-radio__tile"><div class="rqc-form-radio__icon">#enumIcon#</div> <label for="now" class="rqc-form-radio__tile-label">#enumLabel#<span><br>#enumTime#</span></label></div></label>';
			var allEnumsHtml = '';

			for ( var i = 0; i < field.enumItemsList.length; i++ )
			{
				var enumItem = field.enumItemsList[i];
				var isChecked = '';

				if(i == 0)
					isChecked = 'checked=""';
				var icon = '';
				if (!enumItem.icon)
					icon = '<svg width="30" height="29" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.1435 19.0081l-4.74 1.271.002.0029-8.55501-8.5549 1.271-4.73809L3.11148.977051.105469 3.98206l.038025.03796C1.18349 9.78502 3.91549 15.3051 8.37149 19.7581c4.44701 4.451 9.95901 7.1799 15.71301 8.2219l.063.0431 3.005-3.0041-6.009-6.0109zM25.106 13.022v-2.001l-5.587.0019 9.607-9.60695L27.713 0l-9.607 9.60797.001-5.58502h-1.999l-.002 8.99905h9z"/></svg>';
				else
					icon = enumItem.icon;

				var labelSpanValue = '';
				if (enumItem.label.match(/%(.*?)%/))
				{
					labelSpanValue = enumItem.label.match(/%(.*?)%/)[1];
					enumItem.label = enumItem.label.replace(/%(.*?)%/, '');
				}

				allEnumsHtml += inputEnumHtml.replace(/#fieldName#/g, field.fieldName)
					.replace(/#enumValue#/g, enumItem.value)
					.replace(/#enumLabel#/g, enumItem.label)
					.replace(/#enumIcon#/g, icon)
					.replace(/#enumTime#/, labelSpanValue)
					.replace(/#isChecked#/g, isChecked);
			}

			enumsListWr = enumsListWr.replace(/#enumsListItems#/g, allEnumsHtml)
				.replace(/#fieldLabel#/g, field.label)
				.replace(/#class-list#/g, field.classesList.join(' '));
			this.newWidget = this.newWidget.replace(/#enumsList#/g, enumsListWr);
		},

		//получение дополнительной информации для инпутов в зависимоти от типа
		getFieldClasses: function(field)
		{
			var classes = [];

			switch (field.type)
			{
			case 'email':
				classes.push('_rqc-email');
				break;
			case 'phone':
				classes.push('_rqc-phone-mask');
				break;
			}

			if(field.required)
			{
				classes.push('_rqc-required');

				if(field.type == 'enum')
					classes = ['_rqc-required-enum'];
			}


			return classes;
		},

		// получаем только что вставленные окно и оверлей
		getHtmlNodes: function()
		{
			this.rqPopup = document.querySelector('.rqc-form-wr');
			this.rqOverlay = document.querySelector('.rqc-form-overlay');
		},

		// инитима маску телефона
		initMask: function()
		{
			document.querySelector("._rqc-phone-mask").value = '+7 ';
			document.querySelector("._rqc-phone-mask").setAttribute('data-mask', '+7 (###) ### ## ##');
			Maska.create("._rqc-phone-mask");
		},

		// скрываем окно
		hideForm: function()
		{
			document.removeEventListener('keyup', this.closeOnKeyUp);
			this.removeClass(this.rqPopup, this.openClass);

			setTimeout(function()
			{
				itiRqCall.rqPopup.setAttribute("style", "display: none;");
				bodyScrollLock.clearAllBodyScrollLocks({reserveScrollBarGap: true});
				itiRqCall.clearHtmlNodes();
				itiRqCall.replaceWidgetContainer();
			}, 240);
			clearInterval(this.idInt);
			this.callEvent('close', {status: true});

			this.openedWidgetID = null;
		},

		// очистка контейнеров
		clearHtmlNodes: function()
		{
			this.rqPopup = null;
			this.rqOverlay = null;
		},

		// вставляем html открываемого виджета
		setWidgetHtml: function()
		{
			document.querySelector('.rqc-form-wr').innerHTML += this.newWidget;
		},
		againStep: function()
		{
			event.preventDefault();
			itiRqCall.addClass(document.querySelector('.rqc-form-body__form'), 'rqc-form--active');
			itiRqCall.removeClass(document.querySelector('.rqc-form-body__sms'), 'rqc-form--active');
			itiRqCall.rqPopup.querySelector('.rqc-btn').removeAttribute('disabled');
		},
		// отправляем данные с формы виджета
		submitForm: function(form, event)
		{
			event.preventDefault();
			userData = itiRqCall.getData(form, this.openedWidgetID);
			if (this.settings.fields)
			{
				for (var field in this.settings.fields)
					userData[field] = this.settings.fields[field];
			}
			if(this.validation.formIsValid(form))
			{
				itiRqCall.rqPopup.querySelector('.rqc-btn').setAttribute('disabled', true);
				document.querySelector('.rqc-form__text-phone').textContent = userData.phone;
				for (var field in itiRqCall.widgets[itiRqCall.openedWidgetID].fields)
				{

					if (itiRqCall.widgets[itiRqCall.openedWidgetID].fields[field].enumItemsList.length > 0)
						document.querySelector('.rqc-form__text-time').textContent = itiRqCall.widgets[itiRqCall.openedWidgetID].fields[field].enumItemsList[userData.time - 1].label;
				}
				itiRqCall.addClass(document.querySelector('.rqc-form-body__sms'), 'rqc-form--active');
				itiRqCall.removeClass(document.querySelector('.rqc-form-body__form'), 'rqc-form--active');
				itiRqCall.phoneCheck(form, event);
				itiRqCall.countDown();

				document.querySelector('.rqc-form__again').disabled = true;
			}
		},
		countDown: function() // функция обратного отсчета
		{
			var i = 60;
			clearInterval(this.idInt);
			this.idInt = setInterval(function()
			{
				document.querySelector('.rqc-form__again span').innerHTML = 'Выслать код еще раз (' + i + ')';
				if (i <= 0)
				{
					clearInterval(itiRqCall.idInt);
					document.querySelector('.rqc-form__again span').innerHTML = 'Выслать код еще раз';
					document.querySelector('.rqc-form__again').disabled = false;
				}
				i = i - 1;
			}, 1000);
		},
		// ajax запрос для отправки данных в обработчик
		sendForm: function(data, callback)
		{
			itiRqCall.sendAjax({
				url: itiRqCall.baseUrl + 'widget-constructor/handlewidget/',
				method: 'post',
				data: data,
				success: callback,
				error: function(e)
				{
					itiRqCall.callEvent('error', e);
					itiRqCall.addClass(document.querySelector('.rqc-form-body'), 'rqc-form-body_error');

				}
			});
		},

		// отправка формы не из виджета
		sendWidgetData: function(form, id, callback)
		{
			userData = itiRqCall.getData(form, id);
			itiRqCall.sendForm(userData, callback);
		},

		// закрытие по нажатию на escape
		closeOnKeyUp: function(event)
		{
			if (event.keyCode === 27)
				itiRqCall.hideForm();
		},

		// объект для валидации полей
		validation:
		{
			requiredFields: {},
			init: function()
			{
				this.initValidatedFields();
				this.initValidatedEnums();
			},

			initValidatedFields: function()
			{
				var requiredFields = itiRqCall.rqPopup.querySelectorAll('._rqc-required');

				for(var i = 0; i < requiredFields.length; i++)
				{
					var requiredElement = requiredFields[i];

					var rule = this.getValidationRule(requiredElement);
					var name = requiredElement.getAttribute('name');
					this.requiredFields[name] = {
						rule: rule,
						type: 'field',
						valid: false,
						element: requiredElement,
					};

					this.fieldWatchChanges(requiredElement, name);
				}
			},

			fieldWatchChanges: function(field, fieldName)
			{
				field.addEventListener('change', function()
				{
					itiRqCall.validation.validateInput(fieldName);
				});
			},

			initValidatedEnums: function()
			{
				var requiredEnums = itiRqCall.rqPopup.querySelectorAll('._rqc-required-enum');

				for(var i = 0; i < requiredEnums.length; i++)
				{
					var requiredEnum = requiredEnums[i];
					var name = requiredEnum.querySelector('input').getAttribute('name');
					requiredEnum.setAttribute('name', name);
					this.requiredFields[name] = {
						rule: 'enum',
						type: 'enum',
						valid: false,
						element: requiredEnums[0],
					};
				}
			},

			getValidationRule: function(field)
			{
				if(field.classList.contains('_rqc-phone-mask'))
					return 'phone';
				else if(field.classList.contains('_rqc-email'))
					return 'email';
				else
					return 'required';
			},
			rules: {
				email: function(field)
				{
					return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value) ? true : false;
				},

				// проверка телефона
				phone: function(field)
				{
					var phoneValue = field.value.replace(/[^0-9]+/g, '').slice(0, 13);
					var minLength = field.getAttribute('min-length');

					return phoneValue.length >= 11 && phoneValue.length < 14 ? true : false;
				},

				// проверка поля на заполненность
				required: function(field)
				{
					return field.value.trim() != '' ? true : false;
				},

				enum: function(element)
				{
					var inputs = element.querySelectorAll('input');
					for(var i = 0; i < inputs.length; i++)
						if(inputs[i].checked) return true;

					return false;
				}
			},
			// проверка email
			val: function(fieldName, element)
			{
				var field = this.requiredFields[fieldName];
				var result = this.rules[field.rule](field.element);
				this.requiredFields[fieldName].valid = result;
				return result;
			},

			removeError: function(fieldName)
			{
				itiRqCall.removeClass(this.requiredFields[fieldName].element, '_rqc-error');
			},

			setError: function(fieldName)
			{
				var element = this.requiredFields[fieldName].element;
				itiRqCall.addClass(element, '_rqc-error');
				itiRqCall.addClass(element, '_rqc-set-error');

				setTimeout(function()
				{
					itiRqCall.removeClass(element, '_rqc-set-error');
				}, 300);
			},

			// проверка всей формы
			validateInput: function(fieldName)
			{
				var result = this.val(fieldName);

				if(result)
					this.removeError(fieldName);
				else
					this.setError(fieldName);
			},
			validateAll: function()
			{
				var fields = Object.keys(this.requiredFields);
				for(var i = 0; i < fields.length; i++)
				{
					this.validateInput(fields[i]);
				}
			},
			formIsValid: function()
			{
				this.validateAll();

				var fields = Object.keys(this.requiredFields);

				for(var i = 0; i < fields.length; i++)
				{
					if(!this.requiredFields[fields[i]].valid)
						return false;
				}

				return true;
			}
		},

		// сереализуем форму
		serializeForm: function(form)
		{
			return Array.prototype.slice.call(form.querySelectorAll('input, select, textarea'))
				.filter(function (element)
				{
					return element.name;
				})
				.reduce(function(json, element)
				{
					if(element.type === 'radio' && element.checked)
						json[element.name] = element.value;
					else if(element.type != 'radio')
						json[element.name] = element.value;

					return json;
				}, {});
		},

		// собираем данные для отправки
		getData: function(form, id)
		{
			var data = this.serializeForm(form);

			if(typeof ga.getAll != 'undefined')
				data.gaId = ga.getAll()[0].get('clientId');

			data.link = window.location.href;
			if(typeof id != 'undefined')
				data.widgetId = id;
			else
				data.widgetId = this.openedWidgetID;

			return data;
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
	};

	itiRqCall.init();
}
catch (err)
{
	var simpleRqCall = function ()
	{
		var win = window.open(this.baseUrl + '/request-call-simple', '_blank');
		win.focus();
	};

	document.onclick = function (event)
	{
		if(event.target.getAttribute('data-gsc-widget') != null || event.target.parentNode.getAttribute('data-gsc-widget') != null)
			simpleRqCall();
	};

	var itiRqCall = {
		showForm: function()
		{
			simpleRqCall();
		}
	};
}