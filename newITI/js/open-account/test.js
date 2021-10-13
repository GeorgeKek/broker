$(document).ready(function()
{
	Testing.init();
});

var Testing =
{
	// тут тесты, вопросы и ответы, плюс параметры вопроса(мулти выбор, свой вариант ответа)
	questions: [],

	// текущий вопрос
	currentQuestionId: 0,

	// тимплейт варианта ответа
	answerTmp: '<div class="test-answers__item" data-id="#id#" data-question-id="#question-id#" onclick="Testing.selectAnswer(this, #id#)">' +
		'<span class="test-answers__item-status"></span><span class="test-answers__item-text">#answer#</span>'+
		'</div>',

	// тимплей поля для ввода пользовательского ответа
	anotherAnswerTmp: '',

		// ответы юзера
	userAnswers: [],

	// тип вопроса мультивыбор/не мультивыбор
	multiSelect: false,

	// наличие пользовательского варианта ответа
	anotherUserAnswer: false,

	// закончен ли тест
	testEnd: false,

	// инициализация тестирования
	init: function ()
	{
		this.questions = window.testQuestions;
		var userAnswersInStorage = localStorage.getItem('userAnswers');

		if(userAnswersInStorage != null)
		{
			userAnswersInStorage = JSON.parse(userAnswersInStorage);
			this.currentQuestionId = userAnswersInStorage.currentQuestionId;
			this.userAnswers = userAnswersInStorage.answers;
			this.changeTestActions();

			if(typeof userAnswersInStorage.testEnd != 'undefined' && userAnswersInStorage.testEnd)
				this.testEnd = true;
		}
		else
			this.generateAnswersArray();

		this.setTestEtap('start');
	},

	// создание словаря с ответами
	generateAnswersArray: function ()
	{
		for (var i = 0; i < this.questions.length; i++) {
			var answerObject = {
				id: i,
				question: this.questions[i].question,
				answers: [],
			}

			if(typeof this.questions[i].anotherAnswer != 'undefined' && this.questions[i].anotherAnswer)
				answerObject.anotherAnswer = '';

			this.userAnswers.push(answerObject)
		}
	},

	// отображаем поле для ввода своего варианта ответа
	setAnotherUserAnswer: function (question)
	{
		if(typeof question.anotherAnswer != 'undefined' && question.anotherAnswer)
		{
			this.anotherUserAnswer = true;
			$('.another-answer').fadeIn(300);
		}
		else
		{
			this.anotherUserAnswer = false;
			$('.another-answer').fadeOut(300);
		}
	},
	old: '',
	// анимированное добавление ответов
	animateAnswers: function(direction, answersHtml)
	{
		var listsBox = $('.test-answers-lists');
		var listwidth = $(listsBox).width();
		var newList = null;
		var oldList = $('.test-answers-list-wr');
		var list = '<div class="test-answers-list-wr">' + answersHtml +  '</div>';
		var vector = 1;

		$(listsBox).append(list);
		if(direction == 'back')
			vector = -1;

		if(typeof dataLayer != 'undefined')
			dataLayer.push({questionnaireId: this.currentQuestionId + 1});

		$('.test-answers-list-wr').first().css({'transform': 'translateX(' + 60 * (vector * -1) + '%)', 'opacity': 0});
		$('.test-answers-list-wr').eq(1).css({'transform': 'translateX(' + 120 * vector + '%)', 'opacity': 0});

		$('.test-actions__next').attr('data-question-id', this.currentQuestionId + 1);

		setTimeout(function() {
			$(oldList).remove();
			$('.test-answers-list-wr').css({'transform': 'translateX(0)', 'opacity': 1});
		}, 300);

	},

	// отображаем варианты ответа
	setTestAnswers: function (question, direction)
	{
		var answersHtml = '';

		for (var i = 0; i < question.answersList.length; i++) {
			var answerStr = question.answersList[i];

			if(typeof question.answerListSubValues != 'undefined' && typeof question.answerListSubValues[i] != 'undefined')
			{
				answerStr += ' <span class="test-answers__item-sub">' + question.answerListSubValues[i] + '</span>';
			}

			answersHtml += this.answerTmp.replace(/#id#/g, i)
									.replace(/#answer#/g, answerStr)
									.replace(/#question-id#/g, this.currentQuestionId + 1);
		}

		if(direction == 'start')
			$('.test-answers-list-wr').html(answersHtml);
		else
			this.animateAnswers(direction, answersHtml);

		this.setAnotherUserAnswer(question)

		if(typeof question.multi != 'undefined' && question.multi)
		{
			$('.test-answers-list-wr').addClass('test-answers-list-wr_multi');
			$('.test-question').addClass('test-question_tooltip-showed');
			this.multiSelect = true;
		}
		else
		{
			$('.test-answers-list-wr').removeClass('test-answers-list-wr_multi');
			$('.test-question').removeClass('test-question_tooltip-showed');
			this.multiSelect = false;
		}
	},

	// отобржаем выбранные ответы юзера
	setUserAnswers: function ()
	{
		var userAnswers = this.userAnswers[this.currentQuestionId];

		if(typeof userAnswers.anotherAnswer != 'undefined' && userAnswers.anotherAnswer)
			$('.another-answer__textarea').val(userAnswers.anotherAnswer);

		if(typeof userAnswers.answers[0] != 'undefined')
			for(var i = 0; i < userAnswers.answers.length; i++)
			{
				var answer = userAnswers.answers[i];
				$('.test-answers__item[data-id="' + answer.answerId + '"]').addClass('test-answers__item_selected');
			}
		this.changeTestActions();
	},

	// устанавливаем текущий вариант
	setTestEtap: function (direction)
	{
		if(this.testEnd)
			this.setTestEnd();
		else
		{
			var question = this.questions[this.currentQuestionId];
			$('.test-question').html(question.question);
			$('.test-header__current').html(this.currentQuestionId + 1);
			$('.test-header__all').html(this.questions.length);

			this.setTestAnswers(question, direction);
			this.setUserAnswers();
		}
	},

	// удаляем ответ из словаря
	removeAnswer: function (userAnswerId)
	{
		var userAnswer = this.userAnswers[this.currentQuestionId].answers;
		for(var i = 0; i < userAnswer.length; i++)
		{
			if(userAnswer[i].answerId == userAnswerId)
				userAnswer.splice(i, 1);
		}

		this.userAnswers[this.currentQuestionId].answers = userAnswer;
	},

	// проверяем находится ли ответ в списке ответов юзера
	answerIsSelected: function (answerId)
	{
		for (var i = 0; i < this.userAnswers[this.currentQuestionId].answers.length; i++)
		{
			var userAnswer = this.userAnswers[this.currentQuestionId].answers[i];
			if(userAnswer.answerId == answerId) return true;
		}

		return false;
	},

	// выбираем ответ или ответы
	selectAnswer: function (instance, id)
	{
		var question = this.questions[this.currentQuestionId];

		if(this.multiSelect)
		{
			if(this.answerIsSelected(id))
			{
				this.removeAnswer(id);
				this.userAnswers[this.currentQuestionId].answers;
				$(instance).removeClass('test-answers__item_selected');
			}
			else
			{
				this.userAnswers[this.currentQuestionId].answers.push({answerId: id, answer:question.answersList[id]});
				$(instance).addClass('test-answers__item_selected');
			}

			this.changeTestActions();
			return false;
		}

		if(this.answerIsSelected(id))
			return false;

		if(this.anotherUserAnswer)
		{
			this.userAnswers[this.currentQuestionId].anotherAnswer = '';
			$('.another-answer__textarea').val('');
			$(instance).parents('.another-answer').removeClass('another-answer_selected');
		}
		this.userAnswers[this.currentQuestionId].answers = [{answerId: id, answer:question.answersList[id]}];
		$(instance).addClass('test-answers__item_selected').siblings().removeClass('test-answers__item_selected');

		this.changeTestActions();
		this.updateUserAnswersInStorage();

		if(!this.anotherUserAnswer && !this.multiSelect)
		{
			Testing.nextQuestion();
			// setTimeout(function()
			// {
			// }, 150);
		}
	},

	// записываем вариант ответа юзера
	setAnotherAnswer: function (instance)
	{
		var anotherAnswer = $(instance).val().trim();
		this.userAnswers[this.currentQuestionId].anotherAnswer = anotherAnswer;

		if(!this.multiSelect)
		{
			this.userAnswers[this.currentQuestionId].answers = [];
			$('.test-answers__item_selected').removeClass('test-answers__item_selected');
		}
		if(anotherAnswer)
		{
			$(instance).parents('.another-answer').addClass('another-answer_selected');
		}
		else
		{
			$(instance).parents('.another-answer').removeClass('another-answer_selected');
		}

		this.changeTestActions();
		this.updateUserAnswersInStorage();
	},

	// изменение кнопок навигации по тесту
	changeTestActions: function ()
	{
		if(this.userAnswers[this.currentQuestionId].answers.length || this.anotherUserAnswer && this.userAnswers[this.currentQuestionId].anotherAnswer)
			$('.test-actions__next').prop('disabled', false);
		else
			$('.test-actions__next').prop('disabled', true);
	},

	// предыдущий вопрос
	prevQuestion: function (instance)
	{
		if(this.currentQuestionId == 0)
		{
			window.location = $(instance).attr('data-href');
			return false;
		}

		--this.currentQuestionId;
		this.setTestEtap('back');
		this.updateUserAnswersInStorage();
		this.changeTestActions();
	},

	// следующий вопрос
	nextQuestion: function (instance)
	{
		if(this.currentQuestionId + 1 >= this.questions.length)
		{
			this.endTest();
			return false;
		}

		++this.currentQuestionId;
		this.setTestEtap('next');
		this.updateUserAnswersInStorage();
		this.changeTestActions();
	},

	// запись ответов в куку
	updateUserAnswersInStorage: function ()
	{
		var userAnswersObject = {
			currentQuestionId: this.currentQuestionId,
			answers: this.userAnswers
		}
		localStorage.setItem('userAnswers', JSON.stringify(userAnswersObject));
		// this.cookie.setCookie('userAnswers', JSON.stringify(userAnswersObject), { expires: 36000, path: '/'})
	},

	// прячем вопросы и показываем финал без анимация
	setTestEnd: function ()
	{
		$('.test-content').hide();
		$('.test-success').show();
	},

	// последний шаг тестирование
	endTest: function ()
	{
		var userAnswersObject = {
			currentQuestionId: this.currentQuestionId,
			answers: this.userAnswers,
			testEnd: 'true',
		}

		this.testEnd = true;

		localStorage.setItem('userAnswers', JSON.stringify(userAnswersObject));

		$.ajax({
			type    : 'POST',
			cache   : false,
			url     : '/files/js/addUserTests.php',
			dataType: 'json',
			data    : userAnswersObject,
			success: function(data)
			{
				$('.test-content').fadeOut(300, function () {
					$('.test-success').fadeIn(300);
				});
			},
		});
	},
}