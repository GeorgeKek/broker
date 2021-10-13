// объект создания масок input mask
OpenAcc.masks =
{
	data:
	{
		phone: window.getPhoneMask(),
		date:
		{
			class: '._date',
			params:
			{
				alias: "datetime",
				inputFormat: "dd.mm.yyyy",
				placeholder: '_',
			}
		},
		birthDate:
		{
			class: '._date-birtday',
			params:
			{
				alias: "datetime",
				inputFormat: "dd.mm.yyyy",
				placeholder: '_',
			}
		},
		passportNumber:
		{
			class: '._passport-num',
			params:
			{
				mask: '9999 999999',
				placeholder: ''
			}
		},
		docNumber:
		{
			class: '._pass_code',
			params:
			{
				mask: '999-999',
			}
		},
		index:
		{
			class: '._index',
			params:
			{
				mask: '9{5,6}',
			},
		},
		inn:
		{
			class: '._inn',
			params:
			{
				mask: '999999999999',
			}
		},
	},
	init: function(params)
	{
		this.create('phone');
		this.create('date');
		this.create('birthDate');
		this.create('passportNumber');
		this.create('docNumber');
		this.create('index');
		this.create('inn');
		this.customCodeMask();
	},
	create: function(name)
	{
		if(typeof this.data[name] == 'undefined')
			return false;

		var data = {
			showMaskOnHover: false,
		};

		$.each(this.data[name].params, function(indexParam, param)
		{
			data[indexParam] = param;
		});

		var a = $(this.data[name].class).inputmask(data);
	},
	customCodeMask: function()
	{
		var input = $('._code-mask');

		if(input.length == 0)
			return false;

		$(input).on('keypress, input', function(event)
		{
			var value = $(this).val();

			if(value.match(/[^\d]/g))
				$(this).val(value.replace(/[^\d]/g, ''));

			if($(this).val().length > 4)
			{
				$(this).val( $(this).val().slice(0, 4));
				event.preventDefault();
			}
		});
	},
};