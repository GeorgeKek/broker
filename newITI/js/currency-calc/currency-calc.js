Vue.use(VueNumeric.default)

var app = new Vue({
	el: '#app',
	delimiters: ['{-{', '}-}'],
	components: {
		'vueSlider': window[ 'vue-slider-component' ],
	},
	data: function() {
		return {
			// параметры горизонтального слайдера
			sliderOptions:
			{
				height: 6,
				min: 1000,
				max: 100000,
				interval: 1000,
				tooltip: false,
				clickable: false,
				dotWidth: 20,
				dotHeight: 31,
				debug: false
			},
			// переключатель валют
			currencySwitch: false,
			loaded: false,
			// изначальные значения валют
			money: '1000',
			moneyNumber: 1000,
			// состояние селекта(по дефолту закрыт)
			dropDownOpen: false,
			// значок текущей валюты
			prefix: '$',
			// индекс выбранного объекта из селекта
			selectedType: 0,
			// выбранный объект из селекта
			selectedTypeObject: {},
			// объект селекта
			typesList: [],
			// объект с курсами валют
			curses: {},
			// объект с комиссиями
			commissions: {}
		}
	},
	computed:
	{
		// выбранная валюта
		valute: function()
		{
			if(this.currencySwitch)
				return {
					prefix: '€',
					str: 'EUR'
				}
			else
				return {
					prefix: '$',
					str: 'USD'
				}
		},
		// комиссия за вывод денег
		outputCommission: function()
		{
			var outputCommissions = Object.keys(this.commissions[this.valute.str]);
			var commission = this.commissions[this.valute.str][outputCommissions[0]];
			for(var i = 0; i < outputCommissions.length; i++)
			{
				if(this.moneyNumber < parseFloat(outputCommissions[i]))
				{
					commission = this.commissions[this.valute.str][outputCommissions[i-1]];
					break;
				}
				else if(this.moneyNumber > parseFloat(outputCommissions[outputCommissions.length - 1]))
				{
					commission = this.commissions[this.valute.str][outputCommissions[i]];
				}
			}
			return commission;
		},
		// коммия за сделку
		valuteCommission: function()
		{
			var selectedTypeName = this.selectedTypeObject.name;
			var valuteCommissions = Object.keys(this.commissions[selectedTypeName]);
			var contvertedMoney = parseFloat((this.moneyNumber * this.curses.exchange[this.valute.str]).toFixed(2));
			var commission = 0;

			for(var i = 0; i < valuteCommissions.length; i++)
			{
				if(contvertedMoney < parseFloat(valuteCommissions[i]))
				{
					commission = this.commissions[selectedTypeName][valuteCommissions[i-1]];
					break;
				}
				else if(contvertedMoney >= parseFloat(valuteCommissions[valuteCommissions.length - 1]))
				{
					commission = this.commissions[selectedTypeName][valuteCommissions[i]];
				}
			}

			return contvertedMoney * (commission / 100);
		},
		// объект расчетов
		// итого по банку, бирже
		// выгода от такой покупки
		calculated: function()
		{
			var money = this.moneyNumber;
			var bankTotal = this.curses.bank[this.valute.str] * money;
			var exchangeTotal = money * this.curses.exchange[this.valute.str] + this.outputCommission + this.valuteCommission;
			var profit = bankTotal - exchangeTotal;

			return {
				bankTotal: bankTotal,
				exchangeTotal: exchangeTotal,
				profit: profit
			};
		}
	},
	methods:
	{
		// закрываем выпадашку
		closeDropDown: function()
		{
			this.dropDownOpen = false;
		},

		// изменение вводимого числа
		// округляем до тысяч
		// сохрянем в виде чила
		// переводим в строку для вывода в инпут
		changeMoney: function(event)
		{
			this.money = Math.round(this.money / 1000) * 1000;
			this.moneyNumber = this.money;
			this.money = this.currency(this.money);
		},

		// приводим к денежному формату
		// 1000 -> 1 000
		currency: function(val)
		{
			val = parseFloat(val);
			return this.prefix + val.toFixed(0).replace(/./g, function(c, i, a) {
				return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? " " + c : c;
			});
		},

		// приводим денежный формат в обычное число
		// 1 000 -> 1000
		fromCurrency: function(val)
		{
			if(val == '' || isNaN(val.replace(/\s/g, '')))
				return parseFloat(this.oldValue.replace(/\s/g, ''));
			else
				return parseFloat(val.replace(/\s/g, ''));
		},

		// изменяем тип покупателя
		selectType: function(index)
		{
			this.selectedTypeObject = this.typesList[index];
			this.selectedType = index;
		},

		// собираем типы покупателей и создаем объект с ними
		parseDropDownItems: function()
		{
			var self = this;
			$('.currency-action-select__options-list .currency-action-select__option').each(function(index, element)
			{
				try {
					var name = element.attributes['data-name'].value;
					var label = $(element).find('.currency-action-select__label').html();
					var descr = $(element).find('.currency-action-select__descr').html();

					var type = {
						name: name,
						label: label,
						descr: descr
					};

					self.typesList.push(type);
					// удаляем старый html
					$(element).remove();
				} catch (err) {
					$(element).hide();
					console.log('Ошибка при заполнении данных для калькулятора');
					console.log($(element));
				}
			});
		}
	},
	// инициализация всех настроек
	created: function()
	{
		this.curses = window.curses;
		this.commissions = window.commissions;
		this.parseDropDownItems();
		this.selectedTypeObject = this.typesList[0];
		this.loaded = true;

		if(typeof window.min != 'undefined')
		{
			this.money = window.min;
			this.moneyNumber = window.min;
			this.sliderOptions.min = window.min;
		}

		if(typeof window.max != 'undefined')
			this.sliderOptions.max = window.max;
	},
	filters:
	{
		// фильтр для денежного формата
		// принимает количество знаком после запятой
		// по дефолту округляем до целых(0 знаков после запятой)
		moneyFormat: function(val, decemical)
		{
			val = parseFloat(val.toString().replace(/[$€\s]/g, ''));
			decemical = (typeof decemical != 'undefined') ? decemical : 0;
			return val.toFixed(decemical).replace(/./g, function(c, i, a) {
				if(c == '.')
					c = ','
				return i > 0 && c !== "," && (a.length - i) % 3 === 0 ? " " + c : c;
			});
		}
	},
	directives:
	{
		'click-outside':
		{
			bind: function(el, binding, vNode)
			{
				el.__vueClickOutside__ = function(event)
				{
					if (!el.contains(event.target))
					{
						vNode.context[binding.expression](event);
						event.stopPropagation();
					}
				}
				document.body.addEventListener('click', el.__vueClickOutside__);
			},
			unbind: function(el, binding, vNode)
			{
				document.removeEventListener('click', el.__vueClickOutside__);
				el.__vueClickOutside__ = null;
			}
		}
	}
})