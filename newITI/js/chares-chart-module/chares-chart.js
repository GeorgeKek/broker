$(document).ready(function()
{
	sharesChart.init();
});
var sharesChart = {
	// данные для графиков
	historyChartsData: [],
	// словарь месяцов
	months: {
		'01': 'Янв.',
		'02': 'Февр.',
		'03': 'Март',
		'04': 'Апр.',
		'05': 'Май',
		'06': 'Июнь',
		'07': 'Июль',
		'08': 'Авг.',
		'09': 'Сент.',
		'10': 'Окт.',
		'11': 'Ноя.',
		'12': 'Дек.'
	},
	// html шаблон графиков
	chartTemplate: '<div class="shares-chart-trigger">' +
		'<div class="shares-chart-trigger__action shares-chart-trigger__action_left" onclick="sharesChart.setActiveChart(this)">' +
		'<svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 13l-6 6h22V7l-5 5-3-3-6 6-2-2z" fill="#fff"/></svg>' +
		'</div>' +
		'<div class="shares-chart-trigger__action shares-chart-trigger__action_right" onclick="sharesChart.setActiveChart(this)">' +
		'<svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M17 0h-1v4h-2v6h2v3h1v-3h2V4h-2V0zm6 5h1v3h2v10h-2v5h-1v-5h-2V8h2V5zM10 7H9v3H7v8h2v3h1v-3h2v-8h-2V7zm-7 7H2v3H0v6h2v3h1v-3h2v-6H3v-3z" fill="#999"/></svg>' +
		'</div>' +
		'</div>'+
		'<div class="shares-content__chart">' +
			'<canvas id="myChartLine" class="share-chart share-chart__line" width="100%"></canvas>' +
			'<canvas id="myChartCandle" class="share-chart share-chart__candle" width="100%" ></canvas>' +
		'</div>',
	// данные для графиков
	chartsData: {},
	// контенеры для графиков
	containers: [],
	// категории вида дд.мм.гггг: 'Май - 19'
	categorys: {},
	// валюта для акций
	currency: 'руб.',
	// устанавливаем активный график
	setActiveChart: function (instance)
	{
		$(instance).parents('.shares-content__chart-wr').toggleClass('shares-content__chart-wr_active-candle');
	},
	// получение даты в формате дд.мм.гггг
	getDate: function (date)
	{
		var date = new Date(Number(date));
		var day = (date.getDate() < 10) ? '0' + date.getDate() : date.getDate();
		var month = ((date.getMonth() + 1) < 10) ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
		var year = date.getFullYear();
		return day + '.' + month + '.' + year;
	},
	// получение даты в форма "мес. - год" (Март - 06)
	getLabelDate: function (date)
	{
		return this.months[date.month] + ' —  ' + date.year.slice(2, 4)
	},
	// собираем html контейнеры для графиков
	getContainer: function ()
	{
		var htmlNodes = document.getElementsByClassName('shares-content__chart-wr');
		for (var i = 0; i < htmlNodes.length; i++) {
			var element = { ticker: htmlNodes[i].getAttribute('data-ticket').toUpperCase(), node: htmlNodes[i] };
			this.containers.push(element);
		}
	},
	// создаем контейнеры для графиков
	generateHtmlToContainers: function ()
	{
		for (var i = 0; i < this.containers.length; i++)
		{
			var element = this.containers[i];
			element.node.innerHTML = this.chartTemplate.replace(/#ticker#/g, element.ticker);
			this.containers[i].lineChart = element.node.getElementsByClassName('share-chart__line')[0];
			this.containers[i].candleChart = element.node.getElementsByClassName('share-chart__candle')[0];
		}
	},
	// получение данных о графиках по тикету
	getChartDataByTicker: function (ticker)
	{
		for (var i = 0; i < this.chartsData.length; i++)
		{
			if (this.chartsData[i].ticker == ticker)
			{
				return this.chartsData[i];
				break;
			}
		}
	},
	// заполнение объекта categorys элементами вида дд.мм.гггг: 'Май - 19'
	setCategorys: function (dates) {
		for (var i = 0; i < dates.length; i++)
		{
			var labelArray = dates[i].split(".");
			var nextLabelArray = (typeof dates[i + 1] != 'undefined') ? dates[i + 1].split('.') : String('00.00.0000').split('.');
			var text = null;

			if ((i == 0 && Number(labelArray[0]) < 18) || Number(labelArray[1]) < Number(nextLabelArray[1]))
			{
				this.categorys[dates[i]] = sharesChart.getLabelDate({ month: nextLabelArray[1], year: nextLabelArray[2] });
			}
		}
	},
	// подгатавливаем данные для графиков
	parseDataToChars: function ()
	{
		for (var i = 0; i < this.historyChartsData.length; i++)
		{
			try {
				var chartData = this.historyChartsData[i];
				var chartLineData = [];
				var chartCandleData = [];
				var dates = [];
				var lineLabels = [];

				for (var j = 0; j < chartData.data.length; j++)
				{
					var bar = chartData.data[j].bar;
					chartLineData.push(bar.close.toFixed(2));
					chartCandleData.push({
						t: Number(chartData.data[j].start_time),
						o: bar.open,
						c: bar.close,
						h: bar.high,
						l: bar.low,
					});
					dates.push(this.getDate(chartData.data[j].start_time));
					lineLabels.push(['Открытие: ' + bar.open.toFixed(2) + ' ' + this.currency, 'Закрытие: ' + bar.close.toFixed(2)  + ' ' + this.currency]);
				}

				this.chartsData[chartData.ticker] = {};
				this.chartsData[chartData.ticker]['line'] = chartLineData;
				this.chartsData[chartData.ticker]['lineLabels'] = lineLabels;
				this.chartsData[chartData.ticker]['candle'] = chartCandleData;
				this.chartsData[chartData.ticker]['dates'] = dates;
				this.setCategorys(dates);
			} catch (error) {
				console.log('alarm');
			}
		}
	},
	// цикл по контейнерам для создания графиков
	createCharts: function ()
	{
		for (var i = 0; i < this.containers.length; i++)
		{
			try {
				var container = this.containers[i];
				var chartsData = this.chartsData[container.ticker];
				this.drawLineChart(container, chartsData);
				this.drawCandleChart(container, chartsData);
			} catch (error) {
				console.log('ошибка при создании графика для ', this.containers[i].ticker);
				this.containers[i].node.parentNode.removeChild(this.containers[i].node);
			}
		}
	},
	// линейный график
	drawLineChart: function (container, data)
	{
		var LineCtx = container.lineChart.getContext('2d');

		var chart = new Chart(LineCtx,
		{
			data:
			{
				maintainAspectRatio: false,
				labels: data.dates,
				datasets:
				[
					{
						type: 'line',
						backgroundColor: 'rgba(240,247,254, 0.5)',
						borderColor: 'rgb(22,140,243, 0.5)',
						borderWidth: 2,
						data: data.line,
						pointRadius: 0,
						pointColor: 'rgb(22,140,243, 0.5)',
						pointBackgroundColor: 'rgb(22,140,243, 0.5)'
					}
				]
			},
			options:
			{
				legend:
				{
					display: false
				},
				elements:
				{
					line:
					{
						tension: 0.1
					}
				},
				plugins:
				{
					filler:
					{
						propagate: false
					}
				},
				layout:
				{
					padding:
					{
						right: 20,
						left: 20
					},
					mirror: true,
				},
				scales:
				{
					xAxes: [
						{
							display: false
						},
						{
							id: 'partGroup',
							type: 'category',
							mirror: true,
							drawTicks: false,
							fontSize: 22,
							gridLines:
							{
								display: false,
							},
							ticks:
							{
								maxRotation: 0,
								autoSkip: false,
								callback: function (label) {
									return sharesChart.categorys[label];
								}
							}
						}
					],
					yAxes: [
						{
							gridLines:
							{
								color: "rgba(12, 12, 12, 0.04)",
							},
							display: true,
						}
					]
				},
				tooltips:
				{
					position: 'nearest',
					mode: 'label',
					intersect: false,
					callbacks:
					{
						label: function ()
						{
							return false;
						},
						footer: function (tooltipItems)
						{
							return data.lineLabels[tooltipItems[0].index];
						}
					},
				}
			}
		});
	},
	// создание графика со свечами
	// в файле js/vendors/chart-financial-type.js находятся более детальные настройки
	drawCandleChart: function (container, data)
	{
		var CandleCtx = container.candleChart.getContext('2d');

		var chart = new Chart(CandleCtx,
		{
			type: 'candlestick',
			data:
			{
				labels: data.dates,
				datasets:
					[{
						data: data.candle,
						currency: this.currency,
						color:
						{
							up: '#87AF4F',
							down: '#f04f48',
							unchanged: '#999',
						},
						borderColor:
						{
							up: '#87AF4F',
							down: '#f04f48',
							unchanged: '#999',
						}
					}]
			},
			options:
			{
				legend:
				{
					display: false
				},
				layout:
				{
					padding:
					{
						left: 20
					},
					mirror: true,
				},
				scales:
				{
					xAxes: [
						{
							display: false
						}
					],
					yAxes: [
						{
							gridLines:
							{
								color: "rgba(12, 12, 12, 0.04)",
							},
							display: true,
						}
					]
				}
			}
		});
	},
	// запуск всех функций
	init: function ()
	{
		try {
			if (typeof window.historyChartsData != 'undefined')
			{
				this.historyChartsData = window.historyChartsData;
			}
			if(typeof window.chartCurrency != 'undefined')
				this.currency = window.chartCurrency;

			this.parseDataToChars();
			this.getContainer();
			this.generateHtmlToContainers();
			this.createCharts();
		} catch (error) {
			console.log('initialize error');

		}
	}
};