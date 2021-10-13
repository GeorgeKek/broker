// объект таймера
// minutes и seconds - содержат время от которого надо начать отсчет
OpenAcc.timer =
{
	minutes: 6,
	seconds: 0,
	timerWrapper: '',
	setTimeFromCooke: function (timerId)
	{
		if (!OpenAcc.cookie.getCookie('timer_start_' + timerId))
		{
			var dateNow = new Date();
			OpenAcc.cookie.setCookie('timer_start_' + timerId, dateNow.getTime(), { expires: 3600, path: '/open-account/' });
		}
		else
		{
			var timerStart = OpenAcc.cookie.getCookie('timer_start_' + timerId);
			var AllSecondsPass = Math.floor((new Date().getTime() - timerStart) / 1000);
			var minutesPass = Math.floor(AllSecondsPass / 60);
			var secondsPass = AllSecondsPass - (Math.floor(minutesPass * 60));
			this.minutes = (this.minutes - minutesPass) == this.minutes ? this.minutes - 1 : this.minutes - minutesPass;
			this.seconds = 60 - secondsPass;
		}
	},
	start: function(timerBlock, callback, timerId)
	{
		this.setTimeFromCooke(timerId);

		if(typeof inter != 'undefined')
		{
			clearInterval(inter);
			$(timerBlock).text('6:00');
			this.minutes = 6;
			this.seconds = 0;
		}
		window.inter = setInterval(function()
		{
			OpenAcc.timer.interval(timerBlock, callback);
		}, 1000);
	},
	// сам таймер
	interval: function(timerBlock, callback)
	{
		OpenAcc.timer.seconds--;
		if(OpenAcc.timer.seconds == -1)
		{
			OpenAcc.timer.seconds = 59;
			OpenAcc.timer.minutes = OpenAcc.timer.minutes - 1;
		}
		else
			OpenAcc.timer.minutes = OpenAcc.timer.minutes;

		if(OpenAcc.timer.seconds <= 9)
			OpenAcc.timer.seconds = "0" + OpenAcc.timer.seconds;

		time = OpenAcc.timer.minutes + ":" + OpenAcc.timer.seconds;

		$(timerBlock).text(time);

		if (OpenAcc.timer.minutes == '0' && OpenAcc.timer.seconds == '00' || OpenAcc.timer.minutes < 0 )
		{
			OpenAcc.timer.seconds="00";
			callback();
			clearInterval(inter);
		}
	}
};