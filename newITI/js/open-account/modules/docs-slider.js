// слайдер документов
OpenAcc.docsSlider =
{
	// проверка наличия всех необходиммых данных
	init: function (docsArray)
	{
		if($('.docs-slider').length != 0)
		{
			this.slider();
		}
	},
	// инициализация слайдера
	slider: function ()
	{
		// this.setSliderWidth();
		$('.docs-slider').slick({
			slidesToShow: 4,
			slidesToScroll: 4,
			variableWidth: true,
			swipeToSlide: true,
			infinite: false,
			responsive:
			[
				{
					breakpoint: 767,
					settings:
					{
						slidesToScroll: 1,
						slidesToShow: 1
					}
				},
			]
		});
	},
	// изменяем ширину слайдера т.к. он выходит за контейнер
	// setSliderWidth: function()
	// {
	// 	if($('.docs-slider').length == 0)
	// 		$('.docs-slider').css({'width': $(window).width() - $('.docs-slider').offset().left});
	// }
};