// получение инн по паспортным данным
OpenAcc.innApi =
{
	inputs: '',
	validator: '',
	params:
	{
		doctype: '21'
	},
	// инициализация методов для работы с api fns
	init: function ()
	{
		this.inputs = $('._input-for-inn');
		if($(this.inputs).length == 0)
			return false;

		this.validator = $('._input-for-inn').parents('form').data('validator');

		$(this.inputs).on('change, keyup, blur', this.checkInputs.bind(this));
	},

	// проверка полей необходимых для получения ИНН
	checkInputs: function(input)
	{
		var validDocData = false;
		var self = this;

		$(this.inputs).each(function(index, input)
		{
			if(!self.validator.check(input))
			{
				validDocData = false;
				return false;
			}
			self.params[$(input).attr('get-inn-param')] = $(input).val().replace(/\s/g, '');
			validDocData = true;
		});

		if(validDocData)
			this.getInn();
	},

	// получение и вставка инн
	getInn: function()
	{
		var params = $.param(this.params);

		if(!this.validator.check($('._inn')))
		{
			$.ajax({
				type    : "GET",
				cache   : false,
				url     : 'https://iticapital.ru/fnsapi/?' + params,
				dataType: "json",
				success: function(data)
				{
					if(typeof data.error == 'undefined')
					{
						var inn = data.items[0]['ИНН'];
						$('._inn').val(inn).trigger('change');
						$('._inn').valid();
					}
				},
			});
		}
	},
};