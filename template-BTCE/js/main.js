"use strict"

/**
 * инициализация всех инициализаций
 */
$(document).ready(function()
{
	o2.init();
});

/**
 * основной объект
 * @type {object}
 */
var o2 =
{
	/**
	 * вызов функций, которые должны запускаться при загрузке страницы
	 */
	init()
	{
		this.toggleQuestion();
		this.slickLogos();
		this.slickQuote();
	},

	toggleQuestion: function()
	{
		$('.faq__item').click( function() {
			$(this).find('.faq__answer').toggleClass('faq__answer--open');
			$(this).children('.faq__img').toggleClass('faq__img--active');
		});
		$('.faq__group').click( function() {
			$(this).siblings('.faq__items-list').toggleClass('faq__items-list--open');
			$(this).siblings('.faq__img').toggleClass('faq__img--active');
		});
	},
	slickLogos: function()
	{
 		$('.header__slider').slick({
 			infinite: true,
 			adaptiveHeight: true,
			arrows: true,
			prevArrow: '<div><svg width="14" height="30" viewBox="0 0 14 30" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.00129 14.9997C4.00129 14.8126 4.07631 14.6254 4.22673 14.4878L13.6945 2.78405V0.69604C13.6945 0.0915371 12.9758 -0.224589 12.5302 0.184163L0.225441 14.4882C0.0753968 14.6258 0 14.8129 0 15.0001C0 15.1872 0.0750217 15.3743 0.225441 15.5119L12.5302 29.816C12.9758 30.2244 13.6945 29.9086 13.6945 29.3041V27.2161L4.22673 15.5123C4.07631 15.3739 4.00129 15.1868 4.00129 14.9997Z" fill="#FEFEFE"/></svg></div>',
			nextArrow: '<div><svg width="14" height="30" viewBox="0 0 14 30" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.99871 14.9997C9.99871 14.8126 9.92369 14.6254 9.77327 14.4878L0.305473 2.78405V0.69604C0.305473 0.0915371 1.02418 -0.224589 1.46981 0.184163L13.7746 14.4882C13.9246 14.6258 14 14.8129 14 15.0001C14 15.1872 13.925 15.3743 13.7746 15.5119L1.46981 29.816C1.02418 30.2244 0.305473 29.9086 0.305473 29.3041V27.2161L9.77327 15.5123C9.92369 15.3739 9.99871 15.1868 9.99871 14.9997Z" fill="#FEFEFE"/></svg></div>',
			slidesToShow: 4,
			slidesToScroll: 1,
			responsive:
			[
				{
		    		breakpoint: 1024,
			    	settings:
			    	{
			        	slidesToShow: 3
			    	}
		    	},
		    	{
		    		breakpoint: 768,
			    	settings:
			    	{
			        	slidesToShow: 1,
 						adaptiveHeight: false,
			    	}
		    	}
		    ]
  		});
	},
	slickQuote: function()
	{
		$('.product__slider').slick({
 			infinite: true,
			arrows: true,
			dots: true,
			prevArrow: '<div><svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 0.826486L6.292 0.0875244L0.938999 5.67566L6.292 11.2638L7 10.5248L2.353 5.67566L7 0.826486Z" fill="#333333"/></svg></div>',
			nextArrow: '<div><svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 10.8295L0.708 11.5685L6.061 5.98034L0.708 0.392201L0 1.13116L4.647 5.98034L0 10.8295Z" fill="#333333"/></svg></div>',
			slidesToShow: 1,
			slidesToScroll: 1
  		});
	},
	popups:
	{
		show(popup)
		{
			$('._overlay').addClass('_show');
			$('body').addClass('ow-hidden');
			$(popup).addClass('_show');

			setTimeout(()=>{this.addClickOutside(popup)}, 10);
		},
		close(popup)
		{
			$('._overlay').removeClass('_show');
			$('body').removeClass('ow-hidden');
			$(popup).removeClass('_show');
			this.removeClickOutside();
		},
		remove(popup)
		{
			$(popup).remove();
		},
		removeClickOutside()
		{
			$(document).off('click');
		},
		addClickOutside(popup)
		{
			$(document).on('click',(e)=>
			{
				if ($(e.target).closest(popup).length) return;
					this.close(popup);
			});
		}
	}
}