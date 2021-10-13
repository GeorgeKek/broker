Vue.use(VueNumeric.default)

var app = new Vue({
	el: '#app',
	delimiters: ['{-{', '}-}'],
	components: {
	'vueSlider': window[ 'vue-slider-component' ],
  },
	data: function() {
		return {
			days: 11,
			excchangeComission: 0.51,
			price: 0,
			money: 1000,
			stocksMoney: 0,
			futuresMoney: 0,
			valuteMoney: 0,

			stocksComissons:
			{
				'1000000': 0.0267,
				'5000000': 0.0207,
				'10000000': 0.0147,
				'25000000': 0.0117,
				'50000000': 0.0097,
				'max': 0.0087,
			},
			futuresComissons:
			{
				'2000': 100	,
				'5000': 80,
				'10000': 60,
				'30000': 40,
				'max': 20,
			},
			valuteComissons:
			{
				'1000000': 0.013,
				'3000000': 0.011,
				'5000000': 0.009,
				'10000000': 0.008,
				'25000000': 0.006,
				'50000000': 0.0045,
				'max': 0.004,
			},

			options:
			{
				eventType: 'auto',
				width: 'auto',
				height: 6,
				dotSize: 16,
				min: 1,
				max: 22,
				interval: 1,
				show: true,
				speed: 0.5,
				enableCross: true,
				tooltip: false,
				clickable: false,
			},
		}
	},
	computed:
	{
		stocksCommision:function()
		{
			var objLenght = Object.keys(this.stocksComissons).length,
				percent = 0;

			for(var i = 0; i < objLenght; i++)
			{
				if(this.returnNumber(this.stocksMoney) < parseInt(Object.keys(this.stocksComissons)[0]))
				{
					percent = (this.returnNumber(this.stocksMoney) / 100) * this.stocksComissons[Object.keys(this.stocksComissons)[0]]
					return {
						percent: percent.toFixed(2),
						monthPercent: (percent*this.days).toFixed(),
						comission: this.stocksComissons[Object.keys(this.stocksComissons)[0]],
						range: 'до ' + Object.keys(this.stocksComissons)[0]/1000000
					}
				}

				else if(this.returnNumber(this.stocksMoney) >= parseInt(Object.keys(this.stocksComissons)[objLenght - 2]))
				{
					percent = (this.returnNumber(this.stocksMoney) / 100) * this.stocksComissons[Object.keys(this.stocksComissons)[objLenght - 1]]
					return {
						percent: percent.toFixed(2),
						monthPercent: (percent*this.days).toFixed(),
						comission: this.stocksComissons[Object.keys(this.stocksComissons)[objLenght - 1]],
						range: 'от ' + Object.keys(this.stocksComissons)[objLenght - 2]/1000000
					}
				}
				else if(this.returnNumber(this.stocksMoney) >= parseInt(Object.keys(this.stocksComissons)[i-1]) && this.returnNumber(this.stocksMoney) < parseInt(Object.keys(this.stocksComissons)[i]))
				{
					percent = (this.returnNumber(this.stocksMoney) / 100) * this.stocksComissons[Object.keys(this.stocksComissons)[i]]
					return {
						percent: percent.toFixed(2),
						monthPercent: (percent*this.days).toFixed(),
						comission: this.stocksComissons[Object.keys(this.stocksComissons)[i]],
						range: 'от ' + Object.keys(this.stocksComissons)[i-1]/1000000 + ' до ' + Object.keys(this.stocksComissons)[i]/1000000
					}
				}
			}
		},
		futuresCommision:function()
		{
			var objLenght = Object.keys(this.futuresComissons).length,
				percent = 0;

			for(var i = 0; i < objLenght; i++)
			{

				if(this.futuresMoney < parseInt(Object.keys(this.futuresComissons)[0]))
				{
					percent = (this.futuresMoney * this.excchangeComission) / 100 * this.futuresComissons[Object.keys(this.futuresComissons)[0]]
					return {
						percent: percent.toFixed(2),
						monthPercent: (percent*this.days).toFixed(),
						comission: this.futuresComissons[Object.keys(this.futuresComissons)[0]],
						range: 'до ' + Object.keys(this.futuresComissons)[0]/1000
					}
				}

				else if(this.futuresMoney >= parseInt(Object.keys(this.futuresComissons)[objLenght - 2]))
				{
					percent = (this.futuresMoney * this.excchangeComission) / 100 * this.futuresComissons[Object.keys(this.futuresComissons)[objLenght - 1]]
					return {
						percent: percent.toFixed(2),
						monthPercent: (percent*this.days).toFixed(),
						comission: this.futuresComissons[Object.keys(this.futuresComissons)[objLenght - 1]],
						range: 'от ' + Object.keys(this.futuresComissons)[objLenght - 2]/1000
					}
				}
				else if(this.futuresMoney >= parseInt(Object.keys(this.futuresComissons)[i-1]) && this.futuresMoney < parseInt(Object.keys(this.futuresComissons)[i]))
				{
					percent = (this.futuresMoney * this.excchangeComission) / 100 * this.futuresComissons[Object.keys(this.futuresComissons)[i]]
					return {
						percent: percent.toFixed(2),
						monthPercent: (percent*this.days).toFixed(),
						comission: this.futuresComissons[Object.keys(this.futuresComissons)[i]],
						range: 'от ' + Object.keys(this.futuresComissons)[i-1]/1000 + ' до ' + Object.keys(this.futuresComissons)[i]/1000
					}
				}
			}
		},
		valutesCommision:function()
		{
			var objLenght = Object.keys(this.valuteComissons).length,
				percent = 0;

			for(var i = 0; i < objLenght; i++)
			{
				if(this.valuteMoney < parseInt(Object.keys(this.valuteComissons)[0]))
				{
					percent = (this.valuteMoney / 100) * this.valuteComissons[Object.keys(this.valuteComissons)[0]]
					return {
						percent: percent.toFixed(2),
						monthPercent: (percent*this.days).toFixed(),
						comission: this.valuteComissons[Object.keys(this.valuteComissons)[0]],
						range: 'до ' + Object.keys(this.valuteComissons)[0]/1000000
					}
				}

				else if(this.valuteMoney >= parseInt(Object.keys(this.valuteComissons)[objLenght - 2]))
				{
					percent = (this.valuteMoney / 100) * this.valuteComissons[Object.keys(this.valuteComissons)[objLenght - 1]]
					return {
						percent: percent.toFixed(2),
						monthPercent: (percent*this.days).toFixed(),
						comission: this.valuteComissons[Object.keys(this.valuteComissons)[objLenght - 1]],
						range: 'от ' + Object.keys(this.valuteComissons)[objLenght - 2]/1000000
					}
				}
				else if(this.valuteMoney >= parseInt(Object.keys(this.valuteComissons)[i-1]) && this.valuteMoney < parseInt(Object.keys(this.valuteComissons)[i]))
				{
					percent = (this.valuteMoney / 100) * this.valuteComissons[Object.keys(this.valuteComissons)[i]]
					return {
						percent: percent.toFixed(2),
						monthPercent: (percent*this.days).toFixed(),
						comission: this.valuteComissons[Object.keys(this.valuteComissons)[i]],
						range: 'от ' + Object.keys(this.valuteComissons)[i-1]/1000000 + ' до ' + Object.keys(this.valuteComissons)[i]/1000000
					}
				}
			}
		},
		returnSumm: function()
		{
			if(this.stocksCommision.percent || this.futuresCommision.percent || this.valutesCommision.percent)
			{
				var summ = parseFloat(this.stocksCommision.percent) + parseFloat(this.futuresCommision.percent) + parseFloat(this.valutesCommision.percent),
					monthSumm = summ * this.days
				return {day: summ.toFixed(), month: monthSumm.toFixed()}
			}
			else
				return 0
		},
	},
	methods:
	{
		returnWord: function(numberVar)
		{
			var last = numberVar % 100,
			mod        = last % 10;

			if(last != 11 && mod == 1)
				return 'день';
			else if(mod >= 2 && mod <= 4 && (last < 10 || last > 20))
				return 'дня';
			else
				return 'дней';
		},
		cancelValue: function(money)
		{
			this[money] = 0;
		},

		setMoneyFormatBalance: function(money)
		{
			money = money.toString().split('');


			var priceFormatValue = '',
				counter          = 0,
				dotValue = ''

			if(money.indexOf('.') != -1)
			{
				for(var i = money.length-1; i >= 0;  i--)
				{
					dotValue = money[i] + dotValue
					if(money[i] == '.')
						break
				}


				for(var i = money.length - 1 - dotValue.length; i >= 0;  i--)
				{

					priceFormatValue = money[i] + priceFormatValue

					if((priceFormatValue.length + counter) % 3 != 0 || i == 0)
						continue;

					priceFormatValue = ' ' + priceFormatValue
					counter--
				}
				if(dotValue != '.00')
					priceFormatValue = priceFormatValue + dotValue
			}

			else
			{
				for(var i = money.length-1; i >= 0;  i--)
				{

					priceFormatValue = money[i] + priceFormatValue

					if((priceFormatValue.length + counter) % 3 != 0 || i == 0)
						continue;

					priceFormatValue = ' ' + priceFormatValue
					counter--
				}
			}


			return priceFormatValue
		},

		setValWithSpacesOnInput: function(inputValue, input)
		{
			var self = this
			if(inputValue == 0)
				return false

			inputValue = this.setMoneyFormatBalance(inputValue)
			setTimeout(function(){
				$(input).val(inputValue)
			},10)
		},

		setValWithSpacesOnFocus: function(inputValue ,input)
		{
			inputValue = this.returnNumber(inputValue)
			this.setValWithSpacesOnInput(inputValue, input);
		},

		returnNumber: function(val)
		{
			if(Number.isInteger(val))
				return val
			var result = val.replace( /[^0-9]/g, "" )
			return + result
		},
	},
	mounted: function()
	{

	}
})