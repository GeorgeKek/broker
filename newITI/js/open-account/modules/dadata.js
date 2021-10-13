// подсказки для заполнения форм
OpenAcc.dadata =
{
	token: 'de5d7935de9a90b23663a28ed11b656ba7618e4b',
	init: function()
	{
		if(typeof window.token != 'undefined')
			this.token = window.token;

		this.dadataName();
		this.dadataAddress();
		this.dadataUfms();
	},
	// задаем основные настройки для инициализации подсказок
	getSettingsDadata: function(input)
	{
		try
		{
			var inputAttrs = input.attributes;
			var part = inputAttrs['hint-part'].value;
			var type = inputAttrs['dadata-type'].value.toUpperCase();

			if(type == '')
				return false;

			var dadataSettings = {
				token: OpenAcc.dadata.token,
				type: type,
				count: 5,
				constraints: {locations: { country: "*" }},
				triggerSelectOnBlur: false,
				mobileWidth: 0,
				hint: false
			};
			if(type == 'ADDRESS' && typeof part)
				dadataSettings.bounds = part;

			if(type == 'NAME' && typeof part)
				dadataSettings.params = {parts: [part.toUpperCase()]};

			return dadataSettings;
		}
		catch(error)
		{
			console.log(error);
			return false;
		}
	},
	// поля ФИО
	dadataName: function()
	{
		$('.dadata-input-name').each(function(index, input)
		{
			var settings = OpenAcc.dadata.getSettingsDadata(input);
			$(input).suggestions(settings);
		});
	},
	// поля адреса
	dadataAddress: function()
	{
		$('.dadata-input-address-gran').each(function(index, input)
		{
			var settings = OpenAcc.dadata.getSettingsDadata(input);

			if($(input).attr('contrains-type'))
			{
				settings.constraints = $('.dadata-input-address-gran[hint-part="' + $(input).attr('contrains-type') + '"]');
			}

			settings.onSelect = function(suggestion, index, lastValue, selectionOptions)
			{
				$('.dadata-input-address-gran').each(function(index, input)
				{
					$(input).val(suggestion.data[$(input).attr('hint-part')]);

					if(!$(input).hasClass('_index') && !$(input).hasClass('_country'))
					{
						$(input).suggestions().setSuggestion(suggestion);
						if($(input).val())
							$(input).valid();
					}
					else if($(input).hasClass('_country'))
					{
						$(input).valid('_country');
					}
				});

				if(suggestion.data['kladr_id'])
					$('[name="kladr_reg"]').val(suggestion.data['kladr_id']);
			};
			settings.formatSelected = function(suggestion, e)
			{
				if(suggestion.data.postal_code == null || typeof suggestion.data.postal_code == 'undefined')
				{
					suggestion.data.postal_code = $('._index').val();
					$('._index').valid();
				}
			};
			$(input).suggestions(settings);
		});
	},
	// кем выдан по коду подразделения
	dadataUfms: function()
	{
		$('.dadata-input-ufms-code').suggestions({
			token: this.token,
			type: 'fms_unit',
			triggerSelectOnBlur: false,
			mobileWidth: 0,
			hint: false,
			count: 5,
			formatResult: function(value, currentValue, suggestion)
			{
				suggestion.value = suggestion.data.code;
				return suggestion.data.code + ' — ' + suggestion.data.name;
			},
			onSelect: function(suggestion)
			{
				$('.dadata-input-ufms-name').val(suggestion.data.name);
				$('.dadata-input-ufms-code').valid();
				$('.dadata-input-ufms-name').valid();
			},
			onSelectNothing: function()
			{
				$('.dadata-input-ufms-name').val('');
				$('.dadata-input-ufms-code').valid();
			}
		});
	},
};