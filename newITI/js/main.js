"use strict"
/**
	* основной объект
	* @type {object}
	*/
var o2 =
{
	sum: 0,
	sumOne:0,
	aloneSumm: 0,
	hftObj:
	{
		// 'parentChecks':{}
	},
	val:[],
	valFond:[],
	valFast:[],
	valValute:[],
	valEquipment:[],
	valVirtual:[],
	/**
		* вызов функций, которые должны запускаться при загрузке страницы
		*/
	init: function()
	{
		this.makePhoneMask();
		this.makePriceMask();
		this.dictionary.initDataList();
		this.dictionary.clearSearchOnFocus();
		this.index.kingOfAnimation();
		this.lazyLoad();
		this.payment.accordeon.init();
		this.software.softwareSlider();
		this.header.stickyHeader();
		this.search.init();
		this.liteBox.init();
		this.tableSort();
		this.tableSortLoad();
		this.gRangeSlider.init();
		this.gRangeSlider.initUnit();
		this.gRangeSlider.initIron();
		setTimeout(this.activeBlock,100);
		this.institutionalSlick();
		o2.hftObj = this.showFirstLvl(1);
		this.addInlineHeight();
		this.choosePage();
		// this.showSecondtLvl();
	},
	
	// fixedBlock()
	// {
	// 	let hftBlock = document.querySelector('.htf');
	// 	let htfAside = hftBlock.querySelector('.htf__aside');
	// 	let bottom = pageYOffset + document.documentElement.clientHeight;
	// 	window.addEventListener('scroll',function()
	// 	{
	// 		// console.log(pageYOffset);
	// 		// console.log(hftBlock.clientHeight);
	// 		if(pageYOffset>hftBlock.offsetTop)
	// 			htfAside.classList.add('active');
	// 		else
	// 			htfAside.classList.remove('active');

	// 	});
	// },
	choosePage()
	{
		$('.cash-currency__main-list-item-link').on('click', function()
		{
			cookies.cookie.setCookie('valute', $(this).attr('data-valute'), {expires: 3600 * 24, path: '/'});
		});
		$('.choose-bank__list-item-link').on('click', function()
		{
			cookies.cookie.setCookie('bank', $(this).attr('data-bank'), {expires: 3600 * 24, path: '/'});
		});
	},

	copyRequisite(instance)
	{
		var $temp = $("<input>");
		$("body").append($temp);
		$temp.val($(instance).prev().text()).select();
		document.execCommand("copy");
		$temp.remove();
	},
	copyAll(element)
	{
		var $temp = $("<input>");
		$("body").append($temp);
		$temp.val($(element).text()).select();
		document.execCommand("copy");
		$temp.remove();
	},
	arrange(instance, event)
	{
		event.preventDefault();
		let mainInputName;
		let inputName;
		let mainInputText;
		let inputText;
		let htfFondFustVlute = $(instance).find('.htf_fondFustVlute');
		let inputs = $(instance).find('.g-checkbox__input:checked');
		let mainInputBlock = $(instance).find('.hft-content__flex-main-check');
		let mainInputs = mainInputBlock.find('.g-checkbox__input:checked');
		let pay = $(instance).find('.onetime-payment');
		let added = $(instance).find('._added .g-checkbox__input:checked');
		let equipment = $(instance).find('._equipment .htf__item-flex .g-checkbox__input:checked');
		let userInform = $('.hft-popup__inp input');
		let text;
		let val;
		let checkElParent = $(instance).find('.htf__item-flex .g-checkbox__input:checked').parents('.htf__item');
		let transakcElChild = checkElParent.find('._checkAllText .g-checkbox__input:checked');
		let transakc;
		let transakcArr = [];
		transakcElChild.each((index,el)=>
		{
			if($(el).parents('.htf__item-inner-item').find('.g-range-slider'))
			{
				transakc = $(el).parents('._checkAllText').find('._g-range-slider__name').text();
				transakcArr.push(transakc);
			}
		});
		// console.log(transakcArr);
		// console.log(transakcArr);
		let data =
		{
			'market':[],
			'fond':[],
			'valute':[],
			'faster':[],
			'fasterIn':{},
			'fondIn':{},
			'valuteIn':{},
			'equipmentServer':{},
			'equipmentVirtual':{},
			'equipment':[],
			'added':[],
			'userInform':{},
		};
		mainInputs.each((index,el)=>
		{
			mainInputText = $(el).parents('label').find('._g-checkbox__text');
			data.market.push(mainInputText.text());
		});
		htfFondFustVlute.each((index,el)=>
		{
			let htfFondFustVluteChecks = $(el).find('.htf__item-flex .g-checkbox__input:checked');
			let innerChecks = $(el).find('.htf__item-inner-list .g-checkbox__input:not(.g-checkbox__input--twime):checked');
			let innerChecksPl = $(el).find('._htf__item-inner-list-plaza .g-checkbox__input:not(.g-checkbox__input--twime):checked');
			let fixCheck = $('._fix').find('.htf__item-flex .g-checkbox__input:checked');
			let textFix = fixCheck.parents('._fix').find('._g-range-slider__name').text();
			let twimeCheck = $('._twime').find('.htf__item-flex .g-checkbox__input:checked');
			let textTwime = twimeCheck.parents('._twime').find('._g-range-slider__name').text();
			htfFondFustVluteChecks.each((innerParentIndex,innerParentEl)=>
			{
				if(index == 0)
					data.fond.push($(innerParentEl).parents('.g-checkbox ').find('.g-checkbox__text').eq(0).text());
				if(index == 1)
					data.valute.push($(innerParentEl).parents('.g-checkbox ').find('.g-checkbox__text').eq(0).text());
				if(index == 2)
					data.faster.push($(innerParentEl).parents('.g-checkbox ').find('.g-checkbox__text').eq(0).text());
			});
			$(data.faster).each((index,el)=>
			{
				let elemFix = data.faster.indexOf('FIX');
				let elemTwime = data.faster.indexOf('TWIME');
				let filter = data.faster.filter(item => /FIX|TWIME/.test(item));
				let testArr = filter.map((item)=>
				{
					if(item == 'FIX')
						data.faster[elemFix] = 'FIX' + ': ' + textFix;
					if(item == 'TWIME')
						data.faster[elemTwime] = 'TWIME' + ': ' + textTwime;
				});
			});
			innerChecksPl.each((innerChildIndex,innerChildEl)=>
			{
				let key = $(innerChildEl).parents('.htf__item').find('.htf__item-flex .g-checkbox__text').eq(0).text();
				let valueFix = $(innerChildEl).parents('.g-checkbox ').find('.g-checkbox__text').eq(0).text() + ': ' + transakcArr[innerChildIndex];
				if(index == 2)
				{
					if (~o2.valFast.indexOf(valueFix))
						return;
					o2.valFast.push(valueFix);
					data.fasterIn = {};
					data.fasterIn[key] = o2.valFast;
				}
			});
			innerChecks.each((innerChildIndex,innerChildEl)=>
			{
				let key = $(innerChildEl).parents('.htf__item').find('.htf__item-flex .g-checkbox__text').eq(0).text();
				let value = $(innerChildEl).parents('.g-checkbox ').find('.g-checkbox__text').eq(0).text();
				let innerInnerBlock = $(innerChildEl).parents('.htf__item').find('.htf__item-inner-item');
				if(index == 0)
				{
					// o2.valFond = [];
					if (~o2.valFond.indexOf(value))
						return;
					o2.valFond.push(value);
					data.fondIn = {};
					data.fondIn[key] = o2.valFond;
				}
				if(index == 1)
				{
					// o2.valValute = [];
					if (~o2.valValute.indexOf(value))
						return;
					o2.valValute.push(value);
					data.valuteIn = {};
					data.valuteIn[key] = o2.valValute;

				}
				// if(index == 2)
				// {
				// 	if (~o2.valFast.indexOf(valueFix))
				// 		return;
				// 	o2.valFast.push(valueFix);
				// 	data.fasterIn = {};
				// 	data.fasterIn[key] = o2.valFast;
				// }
			});
		});
		pay.each((index,el)=>
		{
			text = $(el).find('.onetime-payment__price').data('text');
			val = $(el).find('.onetime-payment__price').text();
			data[text] = val;
		});
		added.each((equipmentIndex,equipmentEl)=>
		{
			data.added.push($(equipmentEl).parents('.g-checkbox ').find('.g-checkbox__text').eq(0).text());
		});
		userInform.each((index,el)=>
		{
			let key = $(el).attr('name');
			if($(el).val()!='')
			{
				data.userInform[key] = $(el).val();
			}
		});
		equipment.each((equipmentIndex,equipmentEl)=>
		{
			data.equipment.push($(equipmentEl).parents('.g-checkbox ').find('.g-checkbox__text').eq(0).text());
			let innerChecks = $(equipmentEl).parents('.htf__item').find('._htf__item-inner-list-eq  .g-checkbox__input:checked');
			let innerLi = $(equipmentEl).parents('.htf__item').find('._htf__item-inner-maschin');
			o2.valVirtual = [];
			let asideMark = $(equipmentEl).parents('.htf').find('._hft__aside-market-unit.active');
			let val;
			let text;
			let test = [];
			asideMark.each((index,el)=>
			{
				if($(el).find('._value'))
				{
					val = $(el).find('._value').text();
				}
				if($(el).find('._text'))
					text = $(el).find('._text').text();
				test.push(val + ' ' + text);
			});
			innerChecks.each((innerChildIndex,innerChildEl)=>
			{
				let key = $(innerChildEl).parents('.htf__item').find('.htf__item-flex .g-checkbox__text').eq(0).text();
				let value = $(innerChildEl).parents('.g-checkbox ').find('.g-checkbox__text').eq(0).text() + ': ' + test[innerChildIndex];
				let innerInnerBlock = $(innerChildEl).parents('.htf__item').find('.htf__item-inner-item');
				if (~o2.valEquipment.indexOf(value))
					return;
				o2.valEquipment.push(value);
				// console.log(o2.valEquipment);
				data.equipmentServer = {};
				data.equipmentServer["Размещение вашего сервера"] = o2.valEquipment;
			});
			innerLi.each((innerChildIndex,innerChildEl)=>
			{
				let key = $(innerChildEl).parents('.htf__item').find('.htf__item-flex .g-checkbox__text').eq(0).text();
				let checkSelect = $(innerChildEl).find('.htf__item-inner-item-choice-y-n .g-radio__input:checked');
				let checkVal = $(innerChildEl).find('.htf__item-inner-item-choice-w-l .g-radio__input:checked');
				let checkText = $(checkVal).parents('.g-radio').find('.g-radio__text');
				let rangeText = $(innerChildEl).find('.g-range-slider__name');
				if(rangeText.text() != '')
					o2.valVirtual.push(rangeText.text());
				if(checkSelect.data('choice') == 'yes')
					o2.valVirtual.push('OS: ' + checkText.text());
				data.equipmentVirtual = {};
				data.equipmentVirtual["Виртуальная машина"] = o2.valVirtual;

			});
		});
		console.log(data);
		$.ajax(
			{
				method      : 'post',
				cache       : false,
				url         : '/files/js/hft-mail.php',
				dataType    : 'json',
				crossDomain : true,
				data        : JSON.stringify(data),
				success     : function(res)
				{
					// console.log('res',res.success == true);
					if(res.success == true)
					{
						$('.hft-popup-success').addClass('success');
						$('.hft-popup-send').addClass('hide');

					}
				}
			});
		return false;
	},
	clickOutside(element, callback)
	{
		const outsideChecker = (event) =>
		{
			const container = $(element);
			if (!container.is(event.target) && container.has(event.target).length === 0)
			{
				document.removeEventListener('click', outsideChecker);
				callback();
			}
		};

		document.addEventListener('click', outsideChecker);

		return outsideChecker;
	},
	sendHftForm(instance)
	{
		// let userInform = instance.closest('.g-popup__content').querySelectorAll('input');
		let userInform = $(instance).parents('.g-popup__content').find('input');
		let userInformBlock = $(instance).parents('.g-popup__content').find('.hft-popup-inputs');
		if(userInform.eq(0).val() == '' || userInform.eq(1).val() == '' )
		{
			userInformBlock.addClass('error');
			return;
		}
		else
		{
			userInformBlock.removeClass('error');
			o2.arrange(document.forms['htf'],event);
		}
		// userInform.forEach((el,index)=>
		// {
		// 	if(userInform[0].value != '' && userInform[1].value != '')
		// 		o2.arrange(document.forms['htf'],event);
		// 	else
		// 		console.log(false);
		// });
	},
	gPopup:
	{
		outListener:false,
		paymentScrollBar()
		{
			const lockPadding = window.innerWidth - document.querySelector('.wrap').offsetWidth + 'px';
			document.body.style.paddingRight = lockPadding;
			document.querySelector('header').style.paddingRight = lockPadding;
			document.querySelector('.sticky-header').style.paddingRight = lockPadding;
		},
		paymentNoScrollBar()
		{
			setTimeout(function()
			{
				const paddigNull = 0 + 'px';
				document.body.style.paddingRight = paddigNull;
				document.querySelector('header').style.paddingRight = paddigNull;
				document.querySelector('.sticky-header').style.paddingRight = paddigNull;
			}, 300);
		},
		openPop(contentClass)
		{
			// this.removeListner();
			let popupHtml = $(`.${contentClass}`).html();
			$('._overlayHft').addClass('open').html(popupHtml);
			this.paymentScrollBar();
			$('body').css({overflow:'hidden'});
			this.setEscEvent();
			// console.log(popupHtml)

			let $popup = $('._overlayHft').find('._popup-content');
			let self = this;
			setTimeout(function()
			{
				self.outListener = o2.clickOutside($popup, () => {
					self.closePop();
				});
			},10);

		},
		closePop()
		{
			this.paymentNoScrollBar();
			$('._overlayHft').removeClass('open');
			setTimeout(function()
			{
				$('body').css({overflow:'auto'});
			}, 300);
			$('.hft-popup-success').removeClass('success');
			$('.hft-popup-send').removeClass('hide');
			this.removeListner();
		},
		// addClickOutside(popup)
		// {
		// 	$(document).on('click',(e)=>
		// 	{
		// 		if ($(e.target).closest(popup).length) return;
		// 			this.close(popup);
		// 	});
		// },
		removeListner()
		{
			if(this.outListener)
				document.removeEventListener('click', this.outListener);
			this.outListener = false;
		},
		escEvent:false,
		setEscEvent()
		{
			if(this.escEvent) return false;
			let self = this;
			document.onkeydown = function(evt)
			{
				evt = evt || window.event;
				if (evt.keyCode == 27)
					self.closePop();
			};
			this.escEvent = true;
		},
	},
	prev(instance,event)
	{
		event.preventDefault();
	},
	maskValue: val => (val+'').replace(/\D/g,'').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g,'$1 '),
	institutionalSlick()
	{

		$('.institutional-slider').slick({
			dots: false,
			infinite: false,
			slidesToShow: 2,
			slidesToScroll: 1,
			arrows:true,
			prevArrow: '<div class="prev-arrow"></div>',
			nextArrow: '<div class="next-arrow"></div>',
			responsive:[
				{
					breakpoint: 697,
					settings:{
						arrows:false,
					}
				},
				{
					breakpoint: 574,
					settings:{
						arrows:false,
						slidesToShow: 1,
					}
				}
			]
		});
		$('.institutional-slider').on('beforeChange', function(event, slick, currentSlide, nextSlide)
		{
			var lasIdx = slick["$slides"].length - 1;
			// let lastSlide = $('.institutional-slider__element').eq(lasIdx);
			let lastSlide = $('.institutional-slider').slick("getSlick").slideCount - 1;
			// let lastSlide = slick[lastIdx];
			if(nextSlide>0 && window.innerWidth>600)
			{
				$('.prev-arrow').addClass('active');
				$('.slick-list').addClass('last');
				$('.slick-list').addClass('center-mode');
				$('.institutional-slider').addClass('bg');
			}
			else
			{
				$('.prev-arrow').removeClass('active');
				$('.slick-list').removeClass('last');
				$('.slick-list').removeClass('center-mode');
				$('.institutional-slider').removeClass('bg');
			}
			if (slick.slideCount-(nextSlide+2) == 0)
			// if (slick.slideCount-lastSlide == 1)
			{
				$('.next-arrow').addClass('active');
				$('.slick-list').removeClass('center-mode');
				$('.slick-list').addClass('last-slide');
			}
			else
			{
				$('.slick-list').removeClass('last-slide');
				$('.next-arrow').removeClass('active');
			}
		});
	},
	tap(instance,className)
	{
		let classNameBlock = Array.prototype.slice.call(document.querySelectorAll(`.${className}`));
		let classNameEl = document.querySelector(`.${className}[data-number="${instance.getAttribute('data-number')}"]`);
		let instanceData = instance.getAttribute('data-number');
		let par = document.querySelector('.par');
		// console.log(classNameEl);

		// classNameBlock.forEach((el,index)=>
		// {
		// 	console.log(classNameBlock.length);
		// 	if(instanceData == el.getAttribute('data-number'))
		// 	{
		// 		if(el.nextElementSibling)
		// 		{
		// 			if(el.classList.contains('active'))
		// 				el.nextElementSibling.style.display = 'none';
		// 			else
		// 				el.nextElementSibling.style.display = 'inline-block';
		// 		}
		// 	}
		// });
	},
	changeOs(instance)
	{
		let changeOs = document.querySelector('._os-text');
		if(instance.checked)
			changeOs.innerText = instance.closest('.g-radio').querySelector('.g-radio__text').innerText;
	},
	connectionMarkets(instance)
	{
		let hftContentCheck = document.querySelector('.hft-content__flex-main-check');
		let inputs = hftContentCheck.querySelectorAll('._g-checkbox__input');
		let market = document.querySelector('._htf__aside-content-abs');
		let checkedOne = Array.prototype.slice.call(inputs).some(x => x.checked);
		if(checkedOne == false)
			market.classList.add('disabled');
		else
			market.classList.remove('disabled');
	},
	showMore(instance,className,secondClassName)
	{
		let classNameBlock = Array.prototype.slice.call(document.querySelectorAll(`.${className}`));
		let secondClassNameBl = Array.prototype.slice.call(document.querySelectorAll(`.${secondClassName}`));
		let secondClassNameEl = document.querySelector(`.${secondClassName}[data-number="${instance.getAttribute('data-number')}"]`);
		classNameBlock.forEach((el,index)=>
		{
			if(instance.hasAttribute('data-number'))
			{
				if(instance.getAttribute('data-number')==index)
				{
					if (el.classList.contains('active'))
					{
						el.classList.remove('active');
					}
					else
					{
						el.classList.add('active');
					}
				}
			}
		});
		if(!secondClassName) return;
		let par = secondClassNameEl.closest('.par');
		secondClassNameEl.remove();
		if(instance.checked)
		{
			secondClassNameEl.classList.add('active');
			par.append(secondClassNameEl);
		}
		else
		{
			secondClassNameEl.classList.remove('active');
			par.prepend(secondClassNameEl);
		}

	},
	choiseOs(instance)
	{
		let osText = document.querySelectorAll('._os');
		let radio = instance.closest('._lvl-1').querySelector('.g-radio__input:checked');
		osText.forEach((el,index)=>
		{
			if(instance.checked)
			{
				el.classList.add('active');
				osText[0].classList.add('active');
			}
			else
			{
				el.classList.remove('active');
				osText[0].classList.remove('active');
			}
		});
	},
	choice(instance)
	{
		let total = document.querySelector('.on-pay');
		let totalVal = +total.innerText.replace(/\D/g,'');
		let addedPrice = +document.querySelector('._one-of-os').innerText.replace(/\D/g,'');
		let osText = document.querySelector('._os');
		let osCheck = document.querySelector('._os-check .g-checkbox__input');
		if(instance.checked)
		{
			totalVal += addedPrice;
			osCheck.checked = true;
			osText.classList.add('active');
		}
		else
		{
			totalVal -= addedPrice;
			osCheck.checked = false;
			osText.classList.remove('active');
		}
		total.innerText = o2.maskValue(totalVal);
		o2.hftObj = o2.showFirstLvl(1);
		o2.totalSumm(o2.summMonth(),o2.summOne());
	},
	gRangeSlider:
	{
		stepBig:30,
		stepSmallBig:20,
		stepSmall:1,
		elementsSumm:0,
		prev:null,
		counter:0,
		firstVal:[],
		init()
		{
			$('._range-slider').each((index, element) =>
			{
				const dataParams = $(element).data();
				let start = $(element).data('start');
				let connect = [true,false];
				if(typeof start == 'string')
				{
					start = start.split(',');
					connect = true;
				}

				const slider = noUiSlider.create(element,{
					start    : start,
					connect  : connect,
					format   : this.format,
					step     : o2.gRangeSlider.stepBig,
					range    : {'min': dataParams.min, 'max': dataParams.max }
				});

				slider.on('set', this.set);
				slider.on('update', this.update);
				slider.on('slide', this.slide);
			});
		},
		initUnit()
		{
			$('._range-slider--unit').each((index, element) =>
			{
				const dataParams = $(element).data();
				let start = $(element).data('start');
				let connect = [true,false];
				if(typeof start == 'string')
				{
					start = start.split(',');
					connect = true;
				}

				const slider = noUiSlider.create(element,{
					start    : start,
					connect  : connect,
					format   : this.format,
					step     : o2.gRangeSlider.stepSmall,
					range    : {'min': dataParams.min, 'max': dataParams.max }
				});

				slider.on('set', this.set);
				slider.on('update', this.update);
				slider.on('slide', this.slide);
			});
		},
		initIron()
		{
			$('._range-slider--iron').each((index, element) =>
			{
				const dataParams = $(element).data();
				let start = $(element).data('start');
				let connect = [true,false];
				if(typeof start == 'string')
				{
					start = start.split(',');
					connect = true;
				}

				const slider = noUiSlider.create(element,{
					start    : start,
					connect  : connect,
					format   : this.format,
					step     : o2.gRangeSlider.stepSmallBig,
					range    : {'min': dataParams.min, 'max': dataParams.max }
				});

				slider.on('set', this.set);
				slider.on('update', this.update);
				slider.on('slide', this.slide);
			});
		},
		set(values, handle)
		{
			if (handle == 0)
				$(this.target).siblings('._min').trigger('change');
			else
				$(this.target).siblings('._max').trigger('change');
		},
		update(values, handle, unencoded, tap, positions)
		{
			let $slider = $(this.target).parents('._range-slider-wrap');
			let firstValue = o2.gRangeSlider.format.from(values[0].toString());
			let labTo = $slider.find('._label-to').html();

			let parentEl = $slider.parents('._calculated').find('._lvl-2');
			let parentElEq = $slider.parents('._calculated').find('.eqLvl');
			let price = $slider.parents('._calculated').find('._per-month');
			let priceSum = $slider.parents('._lvl-1').find('.htf__item-flex ._one-of');
			let priceSumEq = $slider.parents('._calculated').find('.htf__item-price-big ._one-of');
			let priceSumLvlOne = $slider.parents('._lvl-1');
			let priceSumId = priceSumLvlOne.attr('id');
			let parentElId = parentEl.attr('id');
			let label = $slider.find('._label');
			label.html(values[0]);
			o2.updateEq($slider,values,labTo,price,priceSum,priceSumEq,priceSumId,parentElId,$(this.target));
			o2.addInFromRange($slider,values);
			o2.addIron($slider,values);
			// o2.minPrice($slider);
			$slider.find('._min').val(firstValue);

			let from = o2.gRangeSlider.format.to(this.options.range.max);
			let inFrom = o2.gRangeSlider.format.to(this.options.range.min);
			$slider.find('._label-from').html(from);
			$slider.find('._label-to').html(inFrom);
			$slider.find('._label-in').html(values[0]);

			if(values.length > 1)
			{
				let secondVal = o2.gRangeSlider.format.from(values[1].toString());
				$slider.find('._max').val(secondVal);
				$slider.find('._label-from').html(values[0]);
				$slider.find('._label-to').html(values[1]);
			}
		},
		slide(values, handle, unencoded, tap, positions)
		{
			// if()
			// console.log(values, handle, unencoded, tap, positions);
		},
		format:
		{
			to(number)
			{
				number = Math.round(number);
				return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
			},
			from(stringNumber)
			{
				return Number(stringNumber.replace(/[ ,\-]+/, ''));
			}
		}
	},
	minPrice(slider)
	{
		$(slider).parents('._lvl-2').find('.g-checkbox--vm .g-checkbox__input').prop('checked',true);
	},
	addInFromRange(slider,values)
	{
		let activeBlock = $('._inner-check.active');
		let activeBlockS = $('._inner-checks.active');
		let checkNumber = $(slider).parents('.htf__item-inner-item').find('._lvl-2 .g-checkbox__input').data('number');
		let checkTExt = $(slider).find('.unit').text();
		activeBlock.each((index,el)=>
		{
			// console.log(el);
			if($(el).data('value')==checkNumber)
			{
				$(el).find('._value').text(values);
				$(el).find('._text').text(checkTExt);
			}

		});
		activeBlockS.each((index,el)=>
		{
			if($(el).data('value')==checkNumber)
			{
				$(el).find('._value').text(values);
				$(el).find('._text').text(checkTExt);
			}

		});
	},
	addIron(slider,values)
	{
		let count = document.querySelectorAll('._count');
		let yadro = document.querySelector('._yadro-text');
		let slederT = $(slider).find('.core');
		count.forEach((el,index)=>
		{
			if(slider.data('val') == index)
			{
				el.innerText = values;
				if(slederT.text() != "")
					yadro.innerText = slederT.text();
			}
		});
	},
	numeral(count,words,element)
	{
		if(count == 0)
			element.html(words[0]);
		if(count >= 1 && count < 4)
			element.html(words[1]);
		if(count >= 4)
			element.html(words[2]);
	},
	asideEq(instance)
	{
		let showerElement = document.querySelectorAll('._eq');
		showerElement.forEach((el,index)=>
		{
			if(instance.checked)
				el.classList.add('active');
			else
				el.classList.remove('active');
		});
	},
	checkParrent(instance)
	{
		let parentBlcok = instance.closest('.htf__item');
		let summerBlock = parentBlcok.querySelector('.htf__item-summ');
		let choice = instance.getAttribute('data-choice');
		if(instance.checked)
		{
			summerBlock.classList.add('active');
		}
		else
			summerBlock.classList.remove('active');
		if(instance.hasAttribute('data-choice'))
		{
			if (choice == 'yes')
				summerBlock.classList.add('active');
			else
				summerBlock.classList.remove('active');
		}
	},
	activeBlock()
	{
		let lvlOne = document.querySelectorAll('._lvl-1 .htf__item-flex .g-checkbox__input');
		lvlOne.forEach((el,index)=>
		{
			o2.check(el);
		});
	},
	showFirstLvl(index, initedEl = null)
	{
		let elements = initedEl ? initedEl.querySelectorAll(`._lvl-${index}`) : document.querySelectorAll(`._lvl-${index}`);
		if (!elements || !elements.length) return [];
		let elementsData = {};
		for (let el of elements)
		{
			let checkbox = el.querySelector('.g-checkbox__input');
			if (!checkbox ||!checkbox.checked) continue;
			let children = o2.showFirstLvl(index+1, el);
			let valueMonth = {
				html: el.querySelector('._per-month'),
				children: '',
			};
			let valueOne = {
				html: el.querySelector('._one-of'),
				children: '',
			};
			valueMonth.html = valueMonth.html ? +valueMonth.html.innerText.replace(/\D/g,'') : '';
			valueOne.html = valueOne.html ? +valueOne.html.innerText.replace(/\D/g,'') : '';
			if (Object.keys(children).length)
			{
				valueMonth.children = o2.getChildrenSum(children, 'valueMonth');
				valueOne.children = o2.getChildrenSum(children, 'valueOne');
			}
			elementsData[el.id] = {
				valueMonth: valueMonth.children !== '' ? valueMonth.children : valueMonth.html,
				valueOne: valueOne.children !== '' ? valueOne.children : valueOne.html,
				children,
			};
		}
		return elementsData;
	},
	getChildrenSum(children, type)
	{
		if (!children) return '';
		return Object.values(children).reduce((sum, current) => sum + current[type], 0);
	},
	checkParrentPrice(instance)
	{
		let parentBlcok = instance.closest('.htf__item-inner-item');
		let summerBlock = parentBlcok.querySelector('.htf__item-price--display');
		if(instance.checked)
		{
			summerBlock.classList.add('active');
		}
		else
			summerBlock.classList.remove('active');

	},
	check(instance)
	{
		o2.hftObj = o2.showFirstLvl(1);
		let parentBLock = instance.closest('._lvl-1');
		let summerEl = parentBLock.querySelector('._one-of');
		o2.summWithParentBlock(instance);
		o2.totalSumm(o2.summMonth(),o2.summOne());
	},
	checkEl(instance)
	{
		let htfFondFustVlute = Array.prototype.slice.call(document.querySelectorAll('.htf_fondFustVlute:not(.active) ._lvl-1 .htf__item-flex .g-checkbox__input'));
		htfFondFustVlute.forEach((elLvlOne,index)=>
		{
			elLvlOne.checked = false;
			o2.check(elLvlOne);
			elLvlOne.closest('.htf__item-flex').querySelector('.htf__item-summ').classList.remove('active');
			let innerRAnge;
			let innerParent;
			if(elLvlOne.closest('.htf__item').querySelector('.hft-range--showRange'))
			{
				innerRAnge = elLvlOne.closest('.htf__item').querySelectorAll('.hft-range--showRange');
				innerRAnge.forEach((el,index)=>
				{
					el.classList.remove('active');
				});
			}
			if(elLvlOne.closest('.htf__list').querySelectorAll('.htf__item-price'))
			{
				innerParent = elLvlOne.closest('.htf__list').querySelectorAll('.htf__item-price');
				innerParent.forEach((el,index)=>
				{
					// console.log(el);
					el.classList.remove('active');
				});
			}
			if(elLvlOne.closest('.htf__list').querySelectorAll('._htf__item-inner'))
			{
				innerParent = elLvlOne.closest('.htf__list').querySelectorAll('._htf__item-inner');
				innerParent.forEach((el,index)=>
				{
					// console.log(el);
					el.classList.remove('active');
				});
			}
			let innerCheckbox = elLvlOne.closest('.htf__item').querySelectorAll('._lvl-2 .g-checkbox__input');
			innerCheckbox.forEach((el,index)=>
			{
				el.checked = false;
			});
			if(!elLvlOne.closest('.htf__item').querySelector('._lvl-2 .g-checkbox__input--twime')) return
			elLvlOne.closest('.htf__item').querySelector('._lvl-2 .g-checkbox__input--twime').checked = true;
			elLvlOne.closest('.htf__item').querySelector('._lvl-2 .htf__item-price').classList.remove('active');
		});
		// o2.hftObj = o2.showFirstLvl(1);
	},
	summWithParentBlock(instanceElement)
	{
		let parentBLock = instanceElement.closest('._lvl-1');
		let summerEl = parentBLock.querySelector('._one-of');
		// console.log(instanceElement);
		if(o2.hftObj[parentBLock.id])
		{
			summerEl.innerText = o2.maskValue(o2.hftObj[parentBLock.id].valueMonth)
			if(o2.hftObj[parentBLock.id].valueMonth == 0)
				o2.hftObj[parentBLock.id].valueOne = 0;
		}

	},
	summMonth()
	{
		let localSumm = 0;
		let monthPay = document.querySelector('.month-pay');
		for(let result in o2.hftObj)
		{
			localSumm += o2.hftObj[result].valueMonth;
		}
		monthPay.innerText = o2.maskValue(localSumm);
		return localSumm;
	},
	summOne()
	{
		let localSumm = 0;
		let onPay = document.querySelector('.on-pay');
		let ofos = document.querySelector('._one-of-os');
		let ofosVal = +ofos.innerText;
		let ofosParent = ofos.closest('.htf__item-summ');
		let parentCheckBlock = document.querySelector('.htf__item--virtualMashina');
		let childCheckBlock = parentCheckBlock.querySelector('.htf__item-flex .g-checkbox__input');
		for(let result in o2.hftObj)
		{
			localSumm += +o2.hftObj[result].valueOne;
		}
		onPay.innerText = o2.maskValue(localSumm);
		return localSumm;
	},
	totalSumm(summMonth,summOne)
	{
		let _totalMonthPay = document.querySelector('._total');
		let _totalonPay = document.querySelector('._total-month-pay');
		let _equipmentVirt = document.querySelector('._equipment-virt');
		let totalSummMonthPay = summMonth + summOne;;
		_totalMonthPay.innerText = o2.maskValue(totalSummMonthPay);
		_totalonPay.innerText = o2.maskValue(summMonth);
	},
	updateEq(slider,values,labTo,price,priceSum,priceSumEq,priceSumId,lId = null,slide)
	{
		if(!o2.hftObj[priceSumId]) return;
		let steps = (+slide[0].noUiSlider.get() - +slide[0].noUiSlider.options.start) / +slide[0].noUiSlider.options.step;
		let oldValue = $(slider).parents('.htf__item-inner-item').find('.htf__item-price ._per-month').data('value');
		let oldValueOne = $(slider).parents('.htf__item-inner-item').find('.htf__item-price-big ._one-of').data('value');
		let newValueMonth = ((+slide[0].noUiSlider.get() - +slide[0].noUiSlider.options.start) / +slide[0].noUiSlider.options.step ) * oldValue + oldValue;
		// console.log($(slider).find('.core').text());
		if($(slider).find('.core').text() != '')
			o2.numeral(steps,['ядро','ядра','ядер'],$(slider).find('.core'));
		o2.numeral(steps,['юнит','юнита','юнитов'],$(slider).find('.unit'));
		let newValueOne = ((+slide[0].noUiSlider.get() - +slide[0].noUiSlider.options.start) / +slide[0].noUiSlider.options.step ) * oldValueOne + oldValueOne;
		let elId = lId ? lId : slider.closest('._lvl-2').attr('id');
		price.text(o2.maskValue(newValueMonth));
		o2.hftObj = o2.showFirstLvl(1);
		priceSumEq.text(o2.maskValue(newValueOne));
		priceSum.text(o2.maskValue(o2.hftObj[priceSumId].valueOne));
		o2.hftObj = o2.showFirstLvl(1);
		o2.totalSumm(o2.summMonth(),o2.summOne());
	},
	addInlineHeight()
	{
		let fondTEAP = document.querySelector('._fondTEAP');
		let fastPlaza = document.querySelector('._fastPlaza');
		let equipment = document.querySelector('._equipmentUl');
		if(!fondTEAP || !fastPlaza || !equipment) return;
		if(window.innerWidth >767)
		{
			fondTEAP.style.height = '120px';
			fastPlaza.style.height = '176px';
			equipment.style.height = '163px';
		}
		else
		{
			fondTEAP.style.height = '160px';
			fastPlaza.style.height = '220px';
			equipment.style.height = '220px';
		}

	},
	showRange(instance)
	{
		let parents = instance.closest('._htf__item-inner');
		let parentBlock = instance.closest('.htf__item-inner-item');
		let toggleBlock = parentBlock.querySelector('.hft-range--showRange');
		let disp = document.querySelector('.htf__item-price--display');
		let summerHeight;
		if(!toggleBlock.classList.contains('active'))
		{
			toggleBlock.classList.add('active');
			toggleBlock.style.height = 'auto';
			let height = toggleBlock.clientHeight + 'px';
			if(window.innerWidth >767)
				summerHeight = toggleBlock.clientHeight + parents.clientHeight + 10;
			else
			{
				if(instance.closest('#fastPlaza'))
				{
					summerHeight = toggleBlock.clientHeight + parents.clientHeight + 20;
				}
				else
				{
					summerHeight = toggleBlock.clientHeight + parents.clientHeight + 40;
				}
			}
			toggleBlock.style.height = '0px';
			setTimeout(function ()
			{
				toggleBlock.style.height = height;
				parents.style.height = summerHeight +'px';
			}, 0);
		}
		else
		{
			toggleBlock.style.height = '0px';
			if(window.innerWidth >767)
				parents.style.height = parents.clientHeight - toggleBlock.clientHeight - 10 + 'px';
			else
				parents.style.height = parents.clientHeight - toggleBlock.clientHeight - 40 + 'px';
			toggleBlock.addEventListener('transitionend',function()
			{
				toggleBlock.classList.remove('active');
			},
			{
				once: true,
			});
		}
	},
	showInform(instance)
	{
		let parentBlock = instance.closest('.htf__item');
		let toggleBlock = parentBlock.querySelector('._htf__item-inner');
		if(!toggleBlock) return;
		if(!toggleBlock.classList.contains('active'))
		{
			toggleBlock.classList.add('active')
			toggleBlock.style.height = 'auto';
			let height = toggleBlock.clientHeight + 'px';
			toggleBlock.style.height = '0px';
			setTimeout(function ()
			{
				toggleBlock.style.height = height;
			}, 0);
		}
		else
		{
			toggleBlock.style.height = '0px';
			toggleBlock.addEventListener('transitionend',function()
			{
				toggleBlock.classList.remove('active');
			},
			{
				once: true,
			});
		}
	},
	lazyLoad: function()
	{
		[].forEach.call(document.querySelectorAll('img[data-src]'),
			function(img) {
				img.setAttribute('src', img.getAttribute('data-src'));
				img.onload = function() {
				img.removeAttribute('data-src');
			};
		});
	},
	closePopover: function()
	{
		$('.popover').removeClass('openned');
	},
	checkBreadcrunbs: function()
	{
		if (!$('.breadcrumbs').length)
			return;

		if($('.breadcrumbs').innerHeight() > 20)
			$('.sevices-top__title').css("padding-top", 19);
		if(window.innerWidth < 1024)
		{
			if($('.breadcrumbs').innerHeight() > 10)
			{
				$('.sevices-top__title').css("padding-top", 5);
				$('.sevices-top__title_tag').css("padding-top", 10);
			}
			if($('.breadcrumbs').innerHeight() > 20)
				$('.sevices-top__title').css("padding-top", 30);
			if($('.breadcrumbs').innerHeight() > 40)
				$('.sevices-top__title').css("padding-top", 50);
		}
	},
	// открытие / закрытие блока сео текста в разделах
	toggleSearchText: function(instance)
	{
		$(instance).toggleClass('service-search-text-control_opened');
		$('.service-search-text-box').slideToggle(200);
	},
	qiwiTabs:
	{
		tabLength: false,
		init: function()
		{
			this.tabLength = $('.qiwi-popup__nav-item').length;
		},
		openTab: function(instance, event)
		{
			event.preventDefault();
			if(!$(instance).hasClass('active'))
			{
				this.setActive(instance);
				this.showTabById($(instance).data('tab-id'));
				this.slidingUnderline();
			}
		},
		setActive: function(instance)
		{
			$('.qiwi-popup__nav-item').removeClass('active');
			$(instance).addClass('active');
		},
		showTabById: function(id)
		{
			$('.qiwi-popup__tabs-item').hide();
			$('.qiwi-popup__tabs-item[data-tab-id="'+id+'"]').fadeIn(300);
		},
		slidingUnderline: function()
		{
			if($(".slideline").length == 0)
				return false;
			var currentItem = $(".qiwi-popup__nav-item.active"),
				slideLine = $(".slideline");

			slideLine.css({
				"width": currentItem.width()+37,
				"left": currentItem.position().left+6
			});

			$('.qiwi-popup__tabs').find(".qiwi-popup__nav-item").hover(
				function()
				{
					slideLine.css({
						"width": $(this).width()+37,
						"left": $(this).position().left+6
					});
				});
			$('.qiwi-popup__tabs').find(".qiwi-popup__nav-item").on('mouseleave', function ()
			{
				slideLine.css({
					"width": currentItem.width()+37,
					"left": currentItem.position().left+6
				});
			});
		},
	},
	citizenTabs:
	{
		tabLength: false,
		init: function()
		{
			this.tabLength = $('.citizen-popup__nav-item').length;
		},
		openTab: function(instance, event)
		{
			event.preventDefault();
			if(!$(instance).hasClass('active'))
			{
				this.setActive(instance);
				this.showTabById($(instance).data('tab-id'));
				this.slidingUnderline();
			}
		},
		setActive: function(instance)
		{
			$('.citizen-popup__nav-item').removeClass('active');
			$(instance).addClass('active');
		},
		showTabById: function(id)
		{
			$('.citizen-popup__tabs-item').hide();
			$('.citizen-popup__tabs-item[data-tab-id="'+id+'"]').fadeIn(300);
		},
		slidingUnderline: function()
		{
			if($(".slideline").length == 0)
				return false;
			var currentItem = $(".citizen-popup__nav-item.active"),
				slideLine = $(".slideline");

			slideLine.css({
				"width": currentItem.width()+37,
				"left": currentItem.position().left+6
			});

			$('.citizen-popup__tabs').find(".citizen-popup__nav-item").hover(
				function()
				{
					slideLine.css({
						"width": $(this).width()+37,
						"left": $(this).position().left+6
					});
				});
			$('.citizen-popup__tabs').find(".citizen-popup__nav-item").on('mouseleave', function ()
			{
				slideLine.css({
					"width": currentItem.width()+37,
					"left": currentItem.position().left+6
				});
			});
		},
	},
	header:
	{
		stickyHeader: function()
		{
			if($('header').length)
				var header = $('header').offset().top;

			var $window = $(window);
			$window.on('load scroll', function(){
				var top = $window.scrollTop();
				if (top > header+100)
				{
					$('.sticky-header').addClass('showF');
					$('.article-sticky-header').addClass('showed');
				}
				else if ($('.sticky-header.showF').length || $('.article-sticky-header.showed').length)
				{
					$('.sticky-header').removeClass('showF');
					$('.article-sticky-header').removeClass('showed');
				}
			})
		},
	},
	// объект для компонента поиска
	search:
	{
		scrollWidth: 0,
		// установка ширины скроллбара и всякое другое, если надо будет
		init: function()
		{
			this.scrollWidth = window.innerWidth - document.body.clientWidth;
		},
		// закрытие по escape
		closeOnKeyUp: function(e)
		{
			if (e.keyCode === 27)
				o2.search.hide();
		},
		// устанавливаем отступы для скачучих элементов
		setPaddings: function(padding)
		{
			setTimeout(function() {
				$('.sticky-header').css({"padding-right": padding});
				$('body').css({"padding-right": padding});
				$('.search-box-wr').css({"padding-right": padding});
			});
		},
		// открываем лайтбокс и меняем состояния сторонних элементов
		showLarge: function()
		{
			var targetElement = document.getElementsByClassName('search-box-wr');

			bodyScrollLock.disableBodyScroll(targetElement, {reserveScrollBarGap: true});
			this.setPaddings(this.scrollWidth + 'px');
			o2.popups.closePopup();
			$('body').addClass('search-showed');
			$('.burger').addClass('opened');
			$('.search-box-input__input').focus();
			document.addEventListener('keyup', o2.search.closeOnKeyUp);

			if($('.sticky-header__mobile-title').length && $('.sticky-header__mobile-title').is(':visible'))
				$('.search-box-wr').addClass('search-box-wr_pt');
			else
				$('.search-box-wr').removeClass('search-box-wr_pt');
		},
		// закрываем лайтбокс
		hide: function()
		{
			this.setPaddings(0);
			bodyScrollLock.clearAllBodyScrollLocks({reserveScrollBarGap: true});
			$('body').removeClass('search-showed');
			$('.burger').removeClass('opened');
			document.removeEventListener('keyup', o2.search.closeOnKeyUp);
		},
		// добавляем/убираем крестик для очищения инпута
		changeRequest: function(instance)
		{
			if($(instance).val())
				$(instance).addClass('search-box-input__input_filled');
			else
				$(instance).removeClass('search-box-input__input_filled');
		},
		clearRequest: function()
		{
			$('.search-box-input__input_filled').focus().val('').removeClass('search-box-input__input_filled');
		},
	},
	// объект лайтбокса для картинок
	liteBox:
	{
		// массив путей до картинок
		contentImages: [],
		// индекс активной картинки
		activeImgIndex: '',
		// инициализация лайтбокса
		// проходимся по картинкам и развешиваем события открытия попапа
		// убираем svg и дублирующиеся пути
		init: function()
		{
			if($('.sevices-content').length == 0)
				return false;

			$('.sevices-content').find('img').each(function(index, element)
			{
				if($(element).parents('.litebox-video-wrapper-btn-wrapper').hasClass('litebox-video-wrapper-btn-wrapper'))
					return false;

				var imgSrc = $(element).attr('src');
				var imgSrcInArray = $.inArray(imgSrc, o2.liteBox.contentImages);

				if(imgSrc.split('.').pop() == 'svg' || $(element).hasClass('no-zoom'))
					return true;

				if($(element).parent().attr('href') == imgSrc)
					$(element).parent().attr('href', 'javascript:void(0)');

				if($(element).parents('.software-slider__item').attr('onclick') == 'o2.software.openLitebox(this);')
					$(element).parents('.software-slider__item').attr('onclick', '');

				var imageIndex = o2.liteBox.contentImages.push(imgSrc) - 1;
				if ($(element).parent().get(0).tagName != 'A')
				{
					$(element).attr('onclick', 'o2.liteBox.open(this, ' + imageIndex + ');');
				}
				else
				{
					$(element).parent().css({'border-bottom':'none', 'display':'block'});
					$(element).css({'cursor':'pointer'});
				}
			});

			var imgContainer = document.getElementById('');

			this.setPopupNavigation();
		},
		// включение предыдущей картинки
		prevImg: function()
		{
			if(typeof this.contentImages[this.activeImgIndex - 1] != 'undefined')
				this.activeImgIndex -= 1;
			else
				this.activeImgIndex = this.contentImages.length - 1;

			this.setImage();
		},
		// включение следующей картинки
		nextImg: function()
		{
			if(typeof this.contentImages[this.activeImgIndex + 1] != 'undefined')
				this.activeImgIndex += 1;
			else
				this.activeImgIndex = 0;

			this.setImage();
		},
		// установка картики в попап
		setImage: function()
		{
			var activeImgSrc = this.contentImages[this.activeImgIndex];
			$('.litebox-popup-content').find('img').attr('src', activeImgSrc);
		},
		// показываем пагинацию в зависимости от количетсва картинок
		setPopupNavigation: function()
		{
			if(this.contentImages.length > 1)
				$('.litebox-popup-content').addClass('litebox-popup-content_navigation');
			else
				$('.litebox-popup-content').removeClass('litebox-popup-content_navigation');
		},
		// навигация стрелками
		keyboardNavigation: function()
		{
			if(!$('.litebox-popup-content').hasClass('_show'))
				return false

			if (event.keyCode == '37')
				o2.liteBox.prevImg();
			else if (event.keyCode == '39')
				o2.liteBox.nextImg();
		},
		// открываем попап с картинкой
		open: function(instance, imgIndex)
		{
			this.activeImgIndex = imgIndex;
			this.setImage();
			o2.popups.showPopup('.litebox-popup-content');
			$('.overlay').addClass('overlay_lite-box');
			document.addEventListener('keyup', o2.liteBox.keyboardNavigation);
		}
	},
	// скрипты для страницы software.html
	software:
	{
		softwareSlider: function()
		{
			if($('.software-slider__wrapper').length)
				$('.software-slider__wrapper').slick({
					dots: true,
					autoplay: false,
					infinite: true,
					speed: 500,
					slidesToShow: 1,
					slidesToScroll: 1,
					arrows: true,
					autoplaySpeed: 4000,
				})
		},
		openLitebox: function(instance)
		{
			o2.liteBox.open(instance);
		},
		changeLiteboxImage: function()
		{
			var url = $('.software-slider .slick-active').find('img').attr("src");
			$('.litebox-popup-content img').attr("src", url)
		},
	},
	dictionary:
	{
		initDataList: function()
		{
			$('.flexdatalist').flexdatalist({
				minLength: 1
			});
		},
		clearSearchOnFocus: function()
		{
			if(!$('.dictionary-searc__mobile input').length)
				return false
			$('.dictionary-searc__mobile input').on('focus', function(){
				$('.dictionary-searc__mobile input').val('');
				$('.dictionary-searc__mobile input').attr("placeholder", "")
			})
			$('.dictionary-searc__mobile input').on('blur', function(){
				$('.dictionary-searc__mobile input').attr("placeholder", "Поиск по словарю")
			})
		}
	},
	payment:
	{
		tabs:
		{
			openTab: function(instance, event, navigationClass, tabClass)
			{
				event.preventDefault();
				if($(instance).hasClass('_custom-tab-nav') || !$(instance).hasClass('active'))
				{
					this.setActive(instance, navigationClass);
					this.showTabById($(instance).data('tab-id'), tabClass);
					if(!$(instance).hasClass('_custom-tab-nav'))
						$('.border-bottom').css('display', 'block')
				}
			},
			setActive: function(instance, navigationClass)
			{
				$(navigationClass).removeClass('active');
				$(instance).addClass('active');
			},
			showTabById: function(id, tabClass)
			{
				$(tabClass).hide();

				if(!$(tabClass+'[data-tab-id="'+id+'"]').hasClass('firstFirst_bank-tab'))
				{
					$(tabClass+'[data-tab-id="'+id+'"]').slideDown(300);
				}
				else
				{
					$(tabClass+'[data-tab-id="'+id+'"]').show();
					if($(window).width() < 767)
						$('html').scrollTop($(tabClass+'[data-tab-id="'+id+'"]').offset().top - 180)
				}
			},
		},
		accordeon:
		{
			init: function()
			{
				if(window.innerWidth < 768)
				{
					$('.mobileLastVisible').show();
					$('.mobileLastVisible').prev().addClass('accordeonOpened')
				}
			},
			showItem: function(instance, wrapperClass)
			{
				if($(instance).hasClass('accordeonOpened'))
				{
					$(instance).parent().find(wrapperClass).slideUp(300);
					$(instance).removeClass('accordeonOpened');
				}
				else
				{
					$(instance).parent().siblings().find(wrapperClass).slideUp(300);
					$(instance).parent().find(wrapperClass).slideDown(300);
					$(instance).parent().siblings().find('.payment__nav__item').removeClass('accordeonOpened');
					$(instance).addClass('accordeonOpened');
				}
			}
		},
		removeBorder: function(instance)
		{
			$(instance).siblings('.border-bottom').css('display', 'none')
		}
	},
	index:
	{
		kingOfAnimation:function()
		{
			var self = this;

			if($('.index-tabs__tab-wrapper').length)
				var firstAnimationTop = $('.index-tabs__tab-wrapper').offset().top;

			if($('.index-news__banner--wrapper').length)
				var secondAnimationTop = $('.index-news__banner--wrapper').offset().top;

			if($('.index-bottom-banner').length)
				var thirdAnimationTop = $('.index-bottom-banner').offset().top;

			if($('.index-banner__advantage').length)
				var forthAnimationTop = $('.index-banner__advantage').offset().top;

			var bgimage = new Image();
			bgimage.src="assets/templates/newITI/images/index-header.jpg";

			if(window.innerWidth < 768)
				bgimage.src="assets/templates/newITI/images/mobile%20header-bg.jpg"

			if($('.background').length)
			{
				$(bgimage).load(function(){
					$('.background').css('background-image', 'url('+bgimage.src+')');
					$('.background').fadeIn(300);
				});
			}

			var $window = $(window);
			$window.on('load scroll', function(){
				var top = $window.scrollTop();
				var height = $window.height();


				if (top + height - 150 >= firstAnimationTop)
				{
					$('.index-tabs__tab-block').addClass('showA');
					setTimeout(function(){$('.index-tabs__tab-block').addClass('notrsdelay')}, 2000)
				}

				if (top + height - 150 >= secondAnimationTop)
					$('.index-news__banner--wrapper').addClass('showA');

				if (top + height - 150 >= thirdAnimationTop)
					$('.index-bottom-banner').addClass('showA');

				if (top + height - 150 >= forthAnimationTop)
					$('.index-banner__advantage').addClass('showA');
			})
		},
		titlePosition: function()
		{
			if(!$('.index-news__title').length)
				return false
			var padding = $('.index-container').offset().left + 20
			$('.index-news__title').css({'padding-left': padding})
		},
		indexTabs:
		{
			tabLength: false,
			init: function()
			{
				this.tabLength = $('.index-tabs__nav-item').length;
			},
			openTab: function(instance, event)
			{
				event.preventDefault();
				if(!$(instance).hasClass('active'))
				{
					var text = $(instance).html()
					this.setActive(instance);
					$('.index-tabs__mobile-select span').html(text)
					this.showTabById($(instance).data('tab-id'));

					if(window.innerWidth < 768)
						$('.index-tabs__nav').slideToggle(200);
				}
			},
			// устанавливает активность выбранному табу
			setActive: function(instance)
			{
				$('.index-tabs__nav-item').removeClass('active');
				$(instance).addClass('active');

			},
			// скрывает предыдущую вкладку и показывает новую
			showTabById: function(id)
			{
				$('.index-tabs__tab').hide();
				$('.index-tabs__tab[data-tab-id="'+id+'"]').fadeIn(300);
				$('index-tabs__nav-item[data-tab-id="'+id+'"]').fadeIn(300);
			},
			tabsSelectDropdown: function(instance)
			{
				$(instance).next().slideToggle(200);
				$(instance).toggleClass('openned');
			},
		},
	},
	// объект попапов
	popups:
	{
		top: false,
		closeOnKeyUp: function(e)
		{
			if (e.keyCode === 27)
				o2.popups.closePopup();
		},
		showPopup: function(popup, isfixed)
		{
			o2.search.setPaddings(o2.search.scrollWidth + 'px');
			var targetElement = document.body.getElementsByClassName(popup.replace('.', ''));
			bodyScrollLock.disableBodyScroll(targetElement, {reserveScrollBarGap: true});
			if($(popup).hasClass('_show') || $('.burger').hasClass('opened'))
			{
				this.closePopup(popup);
				o2.search.hide();
				return false;
			}
			$('.overlay').fadeIn(200);
			$('.overlay').toggleClass('_show');
			$('.overlay').find(popup).toggleClass('_show');
			if(popup == '.mobile-menu')
			{
				$('.burger').addClass('opened')
				if(isfixed == 'fullscreen' && $(window).width() > 767)
				{
					$('.overlay').addClass('fullscreen');
				}
				if($(window).width() < 767 && isfixed == 'fullscreen')
				{
					$('.sticky-header').addClass('showPopup')
				}
				if($('.sticky-header').hasClass('showF'))
				{
					var header = $('.sticky-header').height() - 2;
					$('.mobile-menu').css({'top': header, 'height': $(window).height() - header + 'px'})
				}
				else
				{
					var headerLogoHeight = $('header .header-logo').height() - window.pageYOffset - 2,
						headerLogoOffsetTop = $('header .header-logo').offset().top;
					$('.mobile-menu').css({'top': headerLogoHeight + headerLogoOffsetTop, 'height': $(window).height() - headerLogoHeight + 'px'})
				}
			}
			else
			{
				if(isfixed == 'black')
				{
					$('.overlay').addClass('black');
					$(popup).siblings().addClass('_hidden-popup');
					if ($(popup).height() < $(window).height())
						$(popup).addClass('popup--center');
					else
					{
						$(popup).removeClass('popup--center');
					}
				}
			}
			document.addEventListener('keyup', o2.popups.closeOnKeyUp);
		},
		closePopup: function(popup)
		{
			$('.overlay').fadeOut(200);
			$('.overlay').removeClass('_show');
			$('.popup').removeClass('_show');
			$('.burger').removeClass('opened');
			$('.overlay').removeClass('fullscreen');
			$('.popup').removeClass('_hidden-popup');

			if((popup = '.litebox-popup') || (popup = ".litebox-popup-content"))
				this.closeLitebox();

			$('.sticky-header').removeClass('showPopup');
			bodyScrollLock.clearAllBodyScrollLocks({reserveScrollBarGap: true});
			o2.search.setPaddings(0);
			document.removeEventListener('keyup', o2.popups.closeOnKeyUp);
			document.removeEventListener('keyup', o2.liteBox.keyboardNavigation);
		},
		showLiteBoxPopup: function(popup, url)
		{
			var litebox = $('.liteboxTemplate').html();
			$('.overlay').append(litebox);
			$('.overlay .litebox-popup iframe').attr("src", url);
			$('.overlay').css('background-color' , "#fff");
			$('.overlay').addClass('overlay_video');
			o2.popups.showPopup(popup);
		},
		closeLitebox: function()
		{
			$('.overlay').removeClass('overlay_video');
			$('.overlay .litebox-popup').remove();
		},
	},
	makePriceMask: function()
	{
		var controlButton = [39, 37, 8];

		$('._price-mask').on('focus', function(event)
		{
			event.stopPropagation();
			event.preventDefault();
			return setVal(event);
		});
		$('._price-mask').on('blur', function(event)
		{
			var input = $(event.target),
				val = +input.val().replace(/[^0-9]/g, '');

			if(val == 0)
				input.val('');
		});
		$('._price-mask').on('keydown', function(event)
		{
			if(controlButton.indexOf(event.keyCode) != -1)
				return event;

			if(!(+event.key >= 0) || event.keyCode == 32)
				return false;
		});
		$('._price-mask').on('keyup', function(event)
		{
			return setVal(event);
		});
		$('._price-mask').on('mousedown', function(event)
		{
			$(event.target).focus();
			event.preventDefault();
			return false;
		});

		function setVal(event)
		{
			var input = $(event.target),
				val = +input.val().replace(/[^0-9]/g, '');

			if(val != 0)
				val = val.toLocaleString('ru-RU');
			else
				val = '';

			val += ' руб.'

			input.val(val);
			input[0].selectionStart = input[0].selectionEnd = val.length;
			input[0].selectionStart = input[0].selectionEnd = val.length - 5;

			return false;
		}
	},
	makePhoneMask: function()
	{
		$('._phone-mask').inputmask({"mask": "+7 (999) 999-99-99", showMaskOnHover: false});
	},
	servicesAccordeon: function(instance)
	{
		var text = $(instance).find('.services-accordeon__item-text').html();

		$('.hidden-accordeon .services-accordeon__item').each(function(index, item)
		{
			if($(item).find('.services-accordeon__item-text').html() == text)
			{
				$(item).find('.services-accordeon__content').slideToggle(300);
				$(item).toggleClass('opened');
			}
		})
		$(instance).next().slideToggle(300);
		$(instance).toggleClass('opened');
	},
	// уменьшаем плейсхолдер для инпутов
	customPlaceholder: function(instance)
	{
		$(instance).prev().addClass('onFocus')
	},
	// увеличиваем плейсхолдер для инпутов
	customPlaceholderHide: function(instance)
	{
		if($(instance).val() != "")
			return false
		$(instance).prev().toggleClass('onFocus')
	},
	// открываем блок "открыть счет"
	openAccount: function()
	{
		$('.registration-wrapper').addClass('opened');
		$('.registration-form').addClass('opened');
		$('.registration-form').slideDown(200);
	},
	// закрываем блок "открыть счет"
	openAccountClose:function()
	{
		$('.registration-wrapper').removeClass('opened');
		$('.registration-form').removeClass('opened');
		$('.registration-form').slideUp(200);
	},
	openSearch: function()
	{
		$('.footer-search input').toggleClass('opened');
		$('.footer-search input').focus();
	},
	closeSearch: function()
	{
		$('.footer-search input').removeClass('opened');
	},
	tabsCreate:
	{
		tabLength: false,
		init: function()
		{
			this.tabLength = $('.create-form-block__tabs-list-item').length;
			this.tabLength = $('.open-account__tabs-list-item').length;
		},
		openTab: function(instance, event)
		{
			event.preventDefault();
			if(!$(instance).hasClass('active'))
			{
				var text = $(instance).html()
				this.setActive(instance);
				$('.registration__mobile-select').html(text)
				this.showTabById($(instance).data('tab-id'));

				if(window.innerWidth < 768)
					$('.open-account__tabs-list').slideToggle(200);
			}

		},
		// устанавливает активность выбранному табу
		setActive: function(instance)
		{
			$('.open-account__tabs-list-item').removeClass('active');
			$(instance).addClass('active');
		},
		// скрывает предыдущую вкладку и показывает новую
		showTabById: function(id)
		{
			$('.form-block__tab-content').hide()
			$('.open-account__tab-content').hide()
			$('.form-block__tab-content[data-tab-id="'+id+'"]').fadeIn(300);
			$('.open-account__tab-content[data-tab-id="'+id+'"]').fadeIn(300);
		},
		tabsSelectDropdown: function(instance)
		{
			$(instance).next().slideToggle(200);
			$(instance).toggleClass('openned');
		},
	},
	tabsSoftware:
	{
		tabLength: false,
		init: function()
		{
			this.tabLength = $('.software-tabs__btn').length;
		},
		openTab: function(instance, event)
		{
			event.preventDefault();
			if(!$(instance).hasClass('active'))
			{
				this.setActive(instance);
				this.showTabById($(instance).data('tab-id'));
			}

		},
		// устанавливает активность выбранному табу
		setActive: function(instance)
		{
			$('.software-tabs__btn').removeClass('active');
			$(instance).addClass('active');
		},
		// скрывает предыдущую вкладку и показывает новую
		showTabById: function(id)
		{
			$('.software-tabs__item').animate({width: 'hide'}, 0);
			$('.software-tabs__item').removeClass('show');
			$('.software-tabs__item[data-tab-id="'+id+'"]').animate({width: 'show'}, 200);
			$('.software-tabs__item[data-tab-id="'+id+'"]').addClass('show');
		},
	},
	mobileSoftwareTabs: function(instance)
	{
		$(instance).parent().siblings().find('.software-mobile-tabs__content').slideUp(200);
		$(instance).parent().siblings().find('.software-mobile-tabs__title').removeClass('active');
		$(instance).next().slideToggle(200);
		$(instance).toggleClass('active');
	},
	searchDictionary:
	{
		hangeSearch:function(instance)
		{
			if($(instance).val() == '' || !$('.dictionary-wrapper').length)
				return false;
			var text = $(instance).val();
			text = $.trim(text);
			$(".dictionary-wrapper a.dictionary-wrapper__item-word").removeClass('active');
			$(".dictionary-wrapper__item-word").each(function()
			{
				if($(this).text() == text)
				{
					$("html, body").animate({ scrollTop: $($(this)).offset().top }, 200);
					$(this).addClass("active");
					$(".flexdatalist-alias").val('');
				}
			});
		},
		hangeSearchDetail:function(instance)
		{
			if (!$(".block__searhe__detail span").length)
				return;

			if($(instance).val() == '')
				return false;
			var text = $(instance).val();
			text = $.trim(text);
			$(".block__searhe__detail span").each(function()
			{
				var work = $(this).data('alias');
				if($(this).text() == text)
					window.location = "/education/glossary/#"+work+"";
			});
		},
		selectLetter:function(instance)
		{
			var letter = $(instance).data('letter');
			if(!letter)
				return false;
			$("html, body").animate({ scrollTop: $("#" + letter).offset().top }, 500);
		},
	},
	stocks:
	{
		toggleFilters: function(instance)
		{
			if ($(instance).hasClass('_all'))
			{
				if ($(instance).hasClass('active'))
					$(instance).removeClass('active');
				else
					$(instance).addClass('active');

				$(instance).siblings().removeClass('active');
			}
			else
			{
				$(instance).siblings('._all').removeClass('active');
				$(instance).toggleClass('active');
			}
		},

		showMoreToggle: function(instance)
		{
			if ($(instance).hasClass('active'))
			{
				$(instance).removeClass('active');
				$(instance).find('.show-more__text').text('Посмотреть больше акций');
			}
			else
			{
				$(instance).addClass('active');
				$(instance).find('.show-more__text').text('Меньше акций');
			}
		},
		successSubmitPhone: function()
		{
			$('.stocks-callback').html('<div class="stocks-callback-text">Спасибо. Мы перезвоним вам в ближайшее время.</div>');
			cookies.cookie.setCookie('requestCallShares', 1, {path: '/'});
		}
	},
	// Сортировка таблицы
	tableSort: function()
	{
		if (document.querySelector('.table-sort'))
		{
			const getSort = ({ target }) => {
				const order = (target.dataset.order = -(target.dataset.order || -1));
				const index = [...target.parentNode.cells].indexOf(target);
				const collator = new Intl.Collator(['en', 'ru'], { numeric: true });
				const date = target.getAttribute('data-content');
				if (!date)
				{
					const comparator = (index, order) => (a, b) => order * collator.compare(
						a.children[index].innerHTML,
						b.children[index].innerHTML
					);
					for(const tBody of target.closest('table').tBodies)
						tBody.append(...[...tBody.rows].sort(comparator(index, order)));
					for(const cell of target.parentNode.cells)
						cell.classList.toggle('sorted', cell === target);
				}
				else
				{
					const comparator = (index, order) => (a, b) => order * collator.compare(
						a.children[index].textContent.replace(/(\d+).(\d+).(\d+)/, '$3/$2/$1'),
						b.children[index].textContent.replace(/(\d+).(\d+).(\d+)/, '$3/$2/$1')
					);
					for(const tBody of target.closest('table').tBodies)
						tBody.append(...[...tBody.rows].sort(comparator(index, order)));
					for(const cell of target.parentNode.cells)
						cell.classList.toggle('sorted', cell === target);
				}
			};
			document.querySelectorAll('.table-sort thead').forEach(tableTH => tableTH.addEventListener('click', () => getSort(event)));
		}
	},
	// Сортировка по первому столбцу при загрузке страницы
	tableSortLoad: function()
	{
		if (document.querySelector('.table-sort'))
		{
			let rows = document.querySelector('.table-sort').tBodies[0].rows
			function sortTable(rows, i){
				if(rows[i].innerText > rows[i + 1].innerText){
					rows[i + 1].after(rows[i])
					if(i>1){--i}
					sortTable(rows, i)
				}
				if(i < rows.length - 2){
					i++
					sortTable(rows, i)
				}
			}
			sortTable(rows, 1)
		}
	},
	// Предложение воспользоваться приложением
	mobileProposal: function(instance, popupName)
	{
		$(popupName).addClass('_show');
	},
	closeProposal: function(popupName, buttonName)
	{
		$(popupName).removeClass('_show');
	},
	specialSize: function(instance)
	{
		$(instance).parents('html').toggleClass('special');
		if (cookies.cookie.getCookie('special-size') === 'true')
		{
			document.cookie = "special-size=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
		}
		else
		{
			cookies.cookie.setCookie('special-size', true, {expires: 3600 * 24, path: '/'});
		}
	},
};

/**
	* инициализация всех инициализаций
	*/
$(document).ready(function()
{
	o2.init();
	$('.mobile-menu').on('scroll touchmove mousewheel', function(e){
		event.stopPropagation();
	})
});
$(window).resize(function()
{
	// o2.calcPositions();
	o2.index.titlePosition();
	o2.checkBreadcrunbs();
});
$(window).load(function()
{
	// o2.init();
	o2.index.titlePosition();
	o2.checkBreadcrunbs();
});