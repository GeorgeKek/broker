"use strict",

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
		this.stickHeaderCall();
		this.hoverOverlay();
		this.sliders.init();
		this.showCallback();
		this.stickyCard();
		this.peopleMasonryGrid();
		this.lightBoxInit();
		this.lightBoxInit();
		this.anchor();
		this.validateForm();
		this.slickHead();
		this.tooltip();
		this.institutionalBannersSliderInit();
		// this.addNewRules();

		this.setVHforMobileMenu()
	},
	institutionalBannersSliderInit()
	{
		$('._institutional-banners__slider').slick({
			mobileFirst: true,
			infinite: true,
			arrows: false,
			dots: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			// autoplay: true,
			autoplaySpeed: 5000,
			responsive: [
				{
			      breakpoint: 768,
			      settings: {
			      	dots: false,
			        arrows: true,
			        prevArrow: '<div><svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg"><circle r="30" transform="matrix(-1 0 0 1 30 30)" fill="#FFFFFF" fill-opacity="0.64"/><path d="M28.0611 40L17.8793 29.8182L28.0611 19.6364L29.8111 21.3864L22.6065 28.5682H41.2656V31.0682H22.6065L29.8111 38.2727L28.0611 40Z" fill="#EC231A"/></svg></div>',
					nextArrow: '<div><svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="30" cy="30" r="30" fill="#FFFFFF" fill-opacity="0.64"/><path d="M31.9389 40L42.1207 29.8182L31.9389 19.6364L30.1889 21.3864L37.3935 28.5682H18.7344V31.0682H37.3935L30.1889 38.2727L31.9389 40Z" fill="#EC231A"/></svg></div>',
			      }
			    },
			]
		});
	},
	setVHforMobileMenu()
	{
		const vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty('--vh', `${vh}px`);
	},
	tooltip: function()
	{
		tippy('._tooltip',
			{
				placement: 'top-start',
				theme: 'white',
				arrow: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 0H12L0 12V0Z" fill="white" fill-opacity="0.96"/></svg>',
				maxWidth: 324,
				offset: [8, 13],
			});
	},
	slickHead: function()
	{
		$('.home-slider').slick({
			infinite: true,
			adaptiveHeight: true,
			arrows: true,
			prevArrow: '<div><svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg"><circle r="30" transform="matrix(-1 0 0 1 30 30)" fill="black" fill-opacity="0.64"/><path d="M28.0611 40L17.8793 29.8182L28.0611 19.6364L29.8111 21.3864L22.6065 28.5682H41.2656V31.0682H22.6065L29.8111 38.2727L28.0611 40Z" fill="white"/></svg></div>',
			nextArrow: '<div><svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="30" cy="30" r="30" fill="black" fill-opacity="0.64"/><path d="M31.9389 40L42.1207 29.8182L31.9389 19.6364L30.1889 21.3864L37.3935 28.5682H18.7344V31.0682H37.3935L30.1889 38.2727L31.9389 40Z" fill="white"/></svg></div>',
			slidesToShow: 1,
			slidesToScroll: 1,
			adaptiveHeight: false,
			autoplay: true,
			autoplaySpeed: 5000,
			responsive: [
				{
			      breakpoint: 767,
			      settings: {
			        arrows: false
			      }
			    },
			]
		});
	},
	stickHeader: function(instance)
	{
		if($(instance).scrollTop() != 0 && $('._header').hasClass('header--fixed'))
			return;

		if($(instance).scrollTop() != 0)
			{
				$('._header').addClass('header--fixed');
				$('._institutional-banners').addClass('hide');
			}
		else
			{
				$('._header').removeClass('header--fixed');
				$('._institutional-banners').removeClass('hide')
			}
	},
	subscribe(instance, event)
	{
		event.preventDefault();
		var emailEl = $(instance).find('._user-email:visible');

		var checked_one = $(instance).find('input[type="hidden"').attr('name');

		var data = {
			email: $(instance).find('input[name="email"]').val(),
			list_one: checked_one,
			name: $(instance).find('input[name="name"]').val(),
			surname: $(instance).find('input[name="surname"]').val(),
			phone: $(instance).find('input[name="phone"]').val(),
		};
		$.ajax(
			{
				method      : 'post',
				cache       : false,
				url         : '/assets/mailchimp/subscribe.php',
				dataType    : 'json',
				crossDomain : true,
				data        : JSON.stringify(data),
				success     : function(res)
				{
					if(res.status == 'true')
					{
						$('.register__form').addClass('register__form--hidden');
						$('.register__success').fadeIn(300);
						$('.register__title').fadeOut(300);
						$('.register__disclaimer').fadeOut(300);
					}
				}
			});
	},
	validateForm: function(event)
	{
		var emailRegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,12}$/;
		$('.register__input').on('input', function()
		{
			if (($('._user-email').val().match(emailRegExp)) && ($('._user-name').val() != '') && ($('._user-surname').val() != '') && ($('._user-phone').val() != ''))
			{
				$(this).siblings('.register__button').addClass('register__button--active');
				$(this).parents('.register__form').attr('onsubmit', "o2.subscribe(this, event); event.preventDefault()");
				return true;
			}
			else
			{
				$(this).siblings('.register__button').removeClass('register__button--active');
				$(this).parents('.register__form').attr('onsubmit', "event.preventDefault()");
				return false;
			}
		});

	},
	stickHeaderCall: function()
	{
		o2.stickHeader(window);
		o2.bodyAdjust();
		setTimeout(() => {
			$('.header').css('position', 'fixed')
		}, 0)

		$(window).scroll(function()
		{
			o2.stickHeader(this);
			o2.bodyAdjust();
		});
	},

	bodyAdjust: function()
	{
		setTimeout(function()
		{
			$('body').css('padding-top', $('._header').innerHeight());
		}, 100);
	},

	hoverOverlay: function()
	{
		$('._hover-overlay').each(function()
		{
			const headerHeight = document.querySelector('.header-nav');
			const bigBlock = document.querySelector('.header-big-block');

			$(this).mouseenter(function()
			{
				const screenWidth = document.documentElement.clientWidth;
				if (screenWidth < 767) return

				const offsetTop = screenWidth < 1024
					? headerHeight.offsetHeight - 1
					: bigBlock.offsetHeight + bigBlock.offsetTop

				$(this).addClass('mouse-hover');
				$('._overlay').addClass('visible');
				$(this).find('.header-dropdown').addClass('visible');
				$(this).find('.header-dropdown').css({
					'top': offsetTop
				});
				$('._mobile-menu-dropdown-show').slideDown(300)
			});
			$(this).mouseleave(function()
			{
				$('._overlay').removeClass('visible');
				$(this).removeClass('mouse-hover');
				$(this).find('.header-dropdown').removeClass('visible');
			});
		});
	},

	toggleNav(instance)
	{
		const screenWidth = document.documentElement.clientWidth;

		const $nav = $('._headerNav')

		$nav.toggleClass('header-nav--mobile');

		if (!$nav.hasClass('header-nav--mobile'))
			return $('body').removeClass('hidden');

		if(screenWidth < 768)
			$('body').toggleClass('hidden');
	},

	hideMobMenu()
	{
		if (document.documentElement.clientWidth > 1023) return

		$('.header-nav').removeClass('header-nav--mobile')
		$('body').removeClass('hidden')
	},

	showDropdown(el)
	{
		const screenWidth = document.documentElement.clientWidth
		if (screenWidth > 1023)
		{
			return
		}
		else if (screenWidth > 767 && screenWidth < 1023)
		{
			$('._mobile-menu-dropdown-show').slideDown(300)
		}
		else
		{
			$(el).parent('._hover-overlay').toggleClass('show')
			$('._mobile-menu-dropdown-show').slideToggle(300)
		}
	},

	scrollTo(elementClass, offset = 72)
	{
		const $el = $(elementClass)

		if ($el[0])
		{
			$('body, html').animate({
				scrollTop: ($el.offset().top - offset)
			}, 700);
		}

		this.hideMobMenu()
	},

	closeAlert: function(instance, key)
	{
		var now = new Date();
		now.setMonth( now.getMonth() + 1 );

		document.cookie =
			key + ' = true' +
			'; expires=' + now.toUTCString() +
			'; path=/';
		$(instance).parent().hide();
		o2.bodyAdjust();
	},

	showCallback: function()
	{
		if($("._stickyCard").length)
		{
			$(window).scroll(function()
			{
				var cardTop = $("._stickyCard").offset().top,
					cardBottom = $("._stickyCard").offset().top + $("._stickyCard").outerHeight(),
					screenTop = $(window).scrollTop(),
					screenBottom = $(window).scrollTop() + $(window).innerHeight();

				if ((screenTop < cardBottom) && (screenBottom > cardTop))
					$('._callback').removeClass('active');
				else
					$('._callback').addClass('active');
			});
		}

	},

	stickyCard: function()
	{
		if($("._stickyDesktop").length)
			var sticky = new Sticky('._stickyDesktop');
	},

	peopleMasonryGrid: function()
	{
		if($("._masonryGrid").length)
		{
			var masonry = new Macy({
				container: '._masonryGrid',
				trueOrder: true,
				columns: 2,
				margin:
				{
					y: 88,
					x: 56,
				},

				breakAt:
				{
					767:
					{
						margin:
						{
							y: 48,
						},

						columns: 1,
					},
				}
			});
		}
	},

	lightBoxInit: function()
	{
		if($("._lightBox").length)
		{
			$('._lightBox img').each(function()
			{
				$(this).attr('data-mfp-src', $(this).attr('src'));
			});

			$('._lightBox').magnificPopup({
				delegate: 'img',
				type: 'image'
			});
		}
	},
	anchor: function()
	{
		$('.faq__questions-item').click( function()
		{
			var pos = $(this).index();
			$('html, body').animate({
				scrollTop:  $('.faq__answers-item').eq(pos).offset().top - 150
			}, 600);
		});
		$('.sticky-card--digital-assets').find('a').click( function()
		{
			var pos = $(this).index();
			$('html, body').animate({
				scrollTop:  $('.private-section-header__title').eq(pos).offset().top - 200
			}, 600);
		});
	},
	sliders:
	{
		init()
		{
			$('.partners-carousel').slick({
				infinite: false,
				slidesToShow: 4,
				centerMode: false,
				variableWidth: true,
				arrows: true,
				prevArrow: '<button class="partners-carousel__btn btn-prev"><img src="./img/index-slider-btn.svg"></button>',
				nextArrow: '<button class="partners-carousel__btn btn-next"><img src="./img/index-slider-btn.svg"></button>',
			});
		}
	},

	popups:
	{
		showPopup(popup)
		{
			$('._overlay').addClass('visible visible--popup');
			$(popup).addClass('visible');
			this.bodyLock();
		},

		closePopup()
		{
			setTimeout(() => {
				this.bodyUnLock()
			}, 300)
			$('._popup').removeClass('visible');
			$('._overlay').removeClass('visible visible--popup');
		},
		bodyLock()
		{
			const lockPadding = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
			$('body').css({
				'overflow': 'hidden',
				'paddingRight': lockPadding
			})
			$('.header').css({'paddingRight': lockPadding});
		},
		bodyUnLock()
		{
			$('body').css({
				'overflow': 'visible',
				'paddingRight': '0px'
			})
			$('.header').css({'paddingRight': '0px'});
		},
	}
};
