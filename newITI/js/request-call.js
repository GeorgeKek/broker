// перезаписываем объект get site controls
var _gscq = {
	push: function(widget)
	{
		itiRqCall.showForm(widget[1]);
	}
}
try
{
	var itiRqCall =
	{
		// стили для окна
		styles: ".rqc-form-wr,.rqc-form-wr *{box-sizing:border-box;font-family:inherit;font-size:inherit;font-weight:inherit;font-style:inherit;text-transform:inherit;text-decoration:inherit;white-space:normal}.rqc-form-wr{position:fixed;width:100%;height:100%;z-index:9999999999;overflow-y:auto;font-size:14px;-webkit-transition:.2s;-o-transition:.2s;transition:.2s;display:none;top:0;left:0}.rqc-form-wr.rqc-form-wr_opened .rqc-form-overlay{visibility:visible;opacity:1}.rqc-form-wr.rqc-form-wr_opened .rqc-form-body{opacity:1;-webkit-transform:translateY(0);-ms-transform:translateY(0);-o-transform:translateY(0);transform:translateY(0)}.rqc-form-overlay{position:fixed;width:100%;height:100%;top:0;left:0;background-color:rgba(0,0,0,.42);z-index:-1;visibility:hidden;opacity:0;-webkit-transition:.3s;-o-transition:.3s;transition:.3s}.rqc-form-body-wr{position:absolute;height:100%;width:100%;top:0;left:0;bottom:0;right:0;margin:auto;display:-webkit-flex;display:-moz-flex;display:-ms-flex;display:-o-flex;display:flex;justify-content:space-between;-ms-align-items:center;align-items:center;overflow-y:auto;padding-bottom:20px;padding-top:20px}.rqc-form-body{margin-bottom:20px;max-width:410px;min-width:370px;top:0;left:0;bottom:0;right:0;margin-left:auto;margin-right:auto;background-color:#fff;padding:20px;border-radius:4px;box-shadow:0 12px 27.26px 1.74px rgba(0,0,0,.4);overflow:hidden;margin-top:auto;margin-bottom:auto;-webkit-transition:.3s;-o-transition:.3s;transition:.3s;-webkit-transform:translateY(-20%);-ms-transform:translateY(-20%);-o-transform:translateY(-20%);transform:translateY(-20%);opacity:0}.rqc-form-body_error .rqc-form-message_error,.rqc-form-body_sended .rqc-form-message_success{-webkit-transform:translateY(-100%);-ms-transform:translateY(-100%);-o-transform:translateY(-100%);transform:translateY(-100%)}.rqc-form-body-top{position:relative}.rqc-form__header{font-size:18px;font-weight:700;margin-bottom:16px;line-height:1.2}.rqc-form-close{position:absolute;width:44px;height:44px;top:-20px;right:-20px;padding-top:24px;padding-right:24px;cursor:pointer;z-index:22}.rqc-form-close:hover .rqc-form-close__icon{-webkit-transform:rotate(90deg);-ms-transform:rotate(90deg);-o-transform:rotate(90deg);transform:rotate(90deg)}.rqc-form-close__icon{-webkit-transition:.2s;-o-transition:.2s;transition:.2s;-webkit-transform-origin:center center;-moz-transform-origin:center center;-ms-transform-origin:center center;-o-transform-origin:center center;transform-origin:center center;background-color:red;position:absolute;top:20px;right:20px}.rqc-form-close__icon:after,.rqc-form-close__icon:before{position:absolute;content:'';width:2px;height:14px;background-color:#d8d8d8;top:0;left:0;-webkit-transform-origin:center;-moz-transform-origin:center;-ms-transform-origin:center;-o-transform-origin:center;transform-origin:center;top:0;left:0;right:0;bottom:0;margin:auto}.rqc-form-close__icon:before{-webkit-transform:rotate(45deg);-ms-transform:rotate(45deg);-o-transform:rotate(45deg);transform:rotate(45deg)}.rqc-form-close__icon:after{-webkit-transform:rotate(-45deg);-ms-transform:rotate(-45deg);-o-transform:rotate(-45deg);transform:rotate(-45deg)}.rqc-form-field{margin-bottom:15px}.rqc-form-field__group{padding-top:10px}.rqc-form-field__group-delimeter{color:rgba(0,0,0,.7);font-size:12px;margin-bottom:15px}.rqc-form-field__label{color:#333;font-size:14px;line-height:1.15;display:block;margin-bottom:4px}.rqc-form-field__input{display:block;height:40px;line-height:40px;width:100%;border:solid 1px #f0f0f0;border-radius:3px;outline:0 none!important;background-color:#fff!important;font-size:inherit!important;padding:0 8px!important;color:#333!important}.rqc-form-field__input.error{border-color:#f04f48}.rqc-radio-wr{display:block;cursor:pointer;line-height:1.2;display:block;position:relative;min-height:14px;border-radius:2px;padding:10px;overflow:hidden;background:#f5f5f5;transition:background-color .2s ease-out!important;margin-bottom:4px;border-radius:2px}.rqc-radio-wr:hover{background-color:#e8e8e8}.rqc-radio{position:absolute;visibility:hidden;opacity:0;top:0;left:0;width:1px;height:1px}.rqc-radio:checked~.rqc-radio-box:after{position:absolute;content:'';width:8px;height:8px;left:3px;top:50%;margin-top:-4px;background-color:#000;border-radius:100%}.rqc-radio-wr:last-child{margin-bottom:0}.rqc-radio-box{padding-left:23px;position:relative}.rqc-radio-box:before{position:absolute;content:'';width:14px;height:14px;background-color:#fff;border-radius:100%;left:0;top:50%;margin-top:-7px}.rqc-agreement{margin-top:15px;opacity:.5;font-size:12px;line-height:16px}.rqc-agreement a{color:inherit;text-decoration:underline}.rqc-submit-wr{margin-top:34px}.rqc-btn,.rqc-btn:active,.rqc-btn:hover{background:#f04f48;color:#fff}.rqc-btn{width:100%;display:block;font-size:14px;padding:5px 26px;text-align:center;border-radius:2px;vertical-align:middle;height:auto;border:0}.rqc-btn__text{font-size:14px;font-weight:700;vertical-align:middle;line-height:32px;word-wrap:normal;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;display:inline-block;max-width:100%}.rqc-form-message{position:absolute;top:100%;left:0;width:100%;height:100%;background-color:#fff;display:-webkit-flex;display:-moz-flex;display:-ms-flex;display:-o-flex;display:flex;-webkit-flex-direction:column;-moz-flex-direction:column;-ms-flex-direction:column;-o-flex-direction:column;flex-direction:column;justify-content:center;-ms-align-items:center;align-items:center;-webkit-transition:.25s;-o-transition:.25s;transition:.25s}",
		//Обертка для окна
		widgetContainer: '<div class="rqc-form-wr _rqc-form-wr"><div class="rqc-form-overlay"></div></div>',
		// Содержимое виджета
		widgetBody: '<div class="rqc-form-body-wr _rqc-form-body-wr"><div class="rqc-form-body _rqc-form-body"><div class="rqc-form-body__form"><div class="rqc-form-body-top"><div class="rqc-form__header">#title#</div><div class="rqc-form-close" onclick="itiRqCall.hideForm()"><div class="rqc-form-close__icon"></div></div></div><form action="#" class="rqc-form" novalidate="" onsubmit="itiRqCall.submitForm(this, event)">#inputs# <div class="rqc-enums-wr">#enumsList#</div><div class="rqc-agreement">#description#</div><div class="rqc-submit-wr"><button class="rqc-btn" type="submit"><span class="rqc-btn__text">#btnText#</span></button></div></form></div><div class="rqc-form-message rqc-form-message_success"><div class="rqc-form__header">#success-message#</div><div class="rqc-form-message__text">#success-text#</div></div><div class="rqc-form-message rqc-form-message_error"><div class="rqc-form__header">#error-message#</div><div class="rqc-form-message__header">#error-text#</div></div></div></div>',
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

		// инициализация окна при загрузке
		init: function()
		{
			if(typeof ga == 'undefined')
				ga = function() {};

			if(window.location.host != 'iticapital.ru')
				this.baseUrl = 'https://pre-prod.iticapital.ru/';
			this.getWidgets();

			this.setWidgetContainer();
			this.setStyles();
			document.onclick = this.listClicks;
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
			var widgetsIds = Object.keys(itiRqCall.widgets)

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
			if (style.styleSheet){
				style.styleSheet.cssText = css;
			} else {
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
			this.val.init();

			this.rqPopup.setAttribute("style", "display: block;");

			setTimeout(function()
			{
				bodyScrollLock.disableBodyScroll(itiRqCall.rqPopup, {reserveScrollBarGap: true});
				itiRqCall.addClass(itiRqCall.rqPopup, itiRqCall.openClass);
				itiRqCall.addClass(itiRqCall.rqOverlay, itiRqCall.openClass);
			}, 10);

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
			var inputHTML = '<div class="rqc-form-field"><label class="rqc-form-field__label">#fieldLabel#</label><input type="#fieldType#" name="#fieldName#" placeholder="#placeholder#" class="rqc-form-field__input #class-list#" onblur="ga(\'send\', \'event\', \'rqcall\', \'Виджет #fieldId#, клик в поле #fieldLabel#\');"></div>';
			var inputs = '';

			for (var i = 0; i < this.widgets[widgetId].fields.length; i++)
			{
				var field = this.widgets[widgetId].fields[i];
				var fieldSettings = this.getFieldClasses(field.type);

				if (field.type === 'enum') {
					itiRqCall.addEnumList(field);
					continue;
				};

				field.classesList = fieldSettings.classes;

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
				.replace(/#fieldLabel#/g, field.label)
		},

		// добавляем элементы перечисления
		addEnumList: function(field) {
			var enumsListWr = '<div class="rqc-time-list"><div class="rqc-form-field__label">#fieldLabel#:</div><div class="rqc-time-list-items">#enumsListItems#</div></div>';
			var inputEnumHtml = '<label class="rqc-radio-wr" onclick="ga(\'send\', \'event\', \'rqcall\', \'time #enumLabel#\');"><input type="radio" class="rqc-radio" name="#fieldName#" #isChecked# value="#enumValue#"><span class="rqc-radio-box"><span class="rqc-radio-box__text">#enumLabel#</span></span></label>';
			var allEnumsHtml = '';

			for ( var i = 0; i < field.enumItemsList.length; i++ )
			{
				var enumItem = field.enumItemsList[i];
				var isChecked = '';

				if(i == 0)
					isChecked = 'checked=""';

				allEnumsHtml += inputEnumHtml.replace(/#fieldName#/g, field.fieldName)
				.replace(/#enumValue#/g, enumItem.value)
				.replace(/#enumLabel#/g, enumItem.label)
				.replace(/#isChecked#/g, isChecked);
			}

			enumsListWr = enumsListWr.replace(/#enumsListItems#/g, allEnumsHtml).replace(/#fieldLabel#/g, field.label);
			this.newWidget = this.newWidget.replace(/#enumsList#/g, enumsListWr);
		},

		//получение дополнительной информации для инпутов в зависимоти от типа
		getFieldClasses: function(fieldType)
		{
			switch(fieldType)
			{
				case 'email':	return { classes: ['_rqc-email', '_rqc-required'] };
				case 'phone':	return { classes: ['_rqc-phone-mask', '_rqc-required'] };
				default:		return { classes: [] };
			}
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
			var phoneInput = document.querySelectorAll('._rqc-phone-mask');
			// console.log(phoneInput.length);
			if (phoneInput.length)
			{
				VMasker(phoneInput[0]).maskPattern('+9 (999) 999-99-99');
			}
			else
			{
				return false;
			}
		},

		// скрываем окно
		hideForm: function()
		{
			document.removeEventListener('keyup', this.closeOnKeyUp);
			this.removeClass(this.rqPopup, this.openClass);

			setTimeout(function()
			{
				console.log(itiRqCall.rqPopup);
				itiRqCall.rqPopup.setAttribute("style", "display: none;");
				bodyScrollLock.clearAllBodyScrollLocks({reserveScrollBarGap: true});
				itiRqCall.clearHtmlNodes();
				itiRqCall.replaceWidgetContainer();
			}, 240);

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
			document.querySelector('.rqc-form-wr').innerHTML += this.newWidget
		},

		// отправляем данные с формы виджета
		submitForm: function(form, event)
		{
			event.preventDefault();
			var userData = itiRqCall.getData(form, this.openedWidgetID);

			if(this.val.validate(form))
			{
				itiRqCall.sendForm(userData, function()
				{
					itiRqCall.addClass(document.querySelector('.rqc-form-body'), 'rqc-form-body_sended');
				});
			}
		},

		// ajax запрос для отправки данных в обработчик
		sendForm: function(data, callback)
		{
			itiRqCall.sendAjax({
				url: itiRqCall.baseUrl + 'widget-constructor/handlewidget/',
				method: 'post',
				data: data,
				success: callback,
				error: function() {
					itiRqCall.addClass(document.querySelector('.rqc-form-body'), 'rqc-form-body_error');
					ga('send', 'event', 'rqcall', 'ERROR form not sended');
				}
			});
		},

		// отправка формы не из виджета
		sendWidgetData: function(form, id, callback)
		{
			var userData = itiRqCall.getData(form, id);
			itiRqCall.sendForm(userData, callback);
		},

		// закрытие по нажатию на escape
		closeOnKeyUp: function(event)
		{
			if (event.keyCode === 27)
				itiRqCall.hideForm();
		},

		// объект для валидации полей
		val:
		{
			emailEl: '',
			phoneEl: '',
			init: function()
			{
				this.emailEl = document.querySelectorAll('.rqc-form')[0].querySelectorAll('._rqc-email')[0];
				this.phoneEl = document.querySelectorAll('.rqc-form')[0].querySelectorAll('._rqc-phone-mask')[0];

				if (this.emailEl)
					this.emailEl.addEventListener('input', this.checkEmail);

				if (this.phoneEl)
					this.phoneEl.addEventListener('input', this.checkPhone);
			},

			// проверка email
			checkEmail: function()
			{
				if (!itiRqCall.val.emailEl) return true;

				if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(itiRqCall.val.emailEl.value))
				{
					itiRqCall.removeClass(itiRqCall.val.emailEl, 'error');
					return true;
				}
				else
				{
					itiRqCall.addClass(itiRqCall.val.emailEl, 'error');
					return false;
				}
			},

			// проверка телефона
			checkPhone: function()
			{
				if (!itiRqCall.val.phoneEl) return true;

				if(VMasker.toNumber(itiRqCall.val.phoneEl.value).length == 11)
				{
					itiRqCall.removeClass(itiRqCall.val.phoneEl, 'error');
					return true;
				}
				else
				{
					itiRqCall.addClass(itiRqCall.val.phoneEl, 'error');
					return false;
				}
			},

			// проверка всей формы
			validate: function(form)
			{

				if(this.checkEmail() || this.checkPhone())
					return true;
				else
					return false;
			},
		},

		// сереализуем форму
		serializeForm: function(form) {
			return Array.from(form.querySelectorAll('input, select, textarea'))
			.filter(function (element) { return element.name })
			.reduce(function(json, element) {
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

			xhr.onload = function(e)
			{
				if(typeof properties.success == 'function')
					properties.success(e);
			}
			xhr.onerror = function(e)
			{
				if(typeof properties.error == 'function')
					properties.error(e);
			}

			if(typeof properties.data != 'undefined')
				xhr.send(JSON.stringify(properties.data));
			else
				xhr.send();
		}
	}

	itiRqCall.init();
}
catch (err)
{
	console.log(err);
	// при какой-либо ошибке открываем форме без js
	var simpleRqCall = function ()
	{
		var win = window.open(this.baseUrl + '/request-call-simple', '_blank');
		win.focus();
	}

	document.onclick = function (event)
	{
		if(event.target.getAttribute('data-gsc-widget') != null || event.target.parentNode.getAttribute('data-gsc-widget') != null)
			simpleRqCall();
	}

	var itiRqCall = {
		showForm: function() {
			simpleRqCall();
		}
	}
}