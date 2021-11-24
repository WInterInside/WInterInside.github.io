$(document).ready(function(){
	$('.service-slider').slick({
		arrows:true,
		dots:false,
		slidesToShow:1,
		autoplay:false,
		speed:1000,
		autoplaySpeed:5000,
        responsive:[
			{
				breakpoint: 1230,
				settings: {
					slidesToShow:3,
		            dots:false,
                    arrows:true,
				},
				breakpoint: 600,
				settings: {
					slidesToShow:1,
		            dots:true,
                    arrows:false,
				}
			}
		]
	});
});

var price__accordion = (function (element) {
	var _getItem = function (elements, className) { 
		var element = undefined;
		elements.forEach(function (item) {
		if (item.classList.contains(className)) {
			element = item;
		}
	});
	return element;
	};
	return function () {
	var _mainElement = {},
	_items = {}, 
	_contents = {}; 
	var _actionClick = function (e) {
	if (!e.target.classList.contains('price__accordion-item-header')) {
		return;
	}
	e.preventDefault(); 
	var header = e.target,
	item = header.parentElement,
	itemActive = _getItem(_items, 'show');
	if (itemActive === undefined) { 
		item.classList.add('show');
	} else {
		itemActive.classList.remove('show');
		if (itemActive !== item) {			
			item.classList.add('show');
		}
	}
	},
	_setupListeners = function () {
		_mainElement.addEventListener('click', _actionClick);
	};
	return {
		init: function (element) {
			_mainElement = (typeof element === 'string' ? document.querySelector(element) : element);
			_items = _mainElement.querySelectorAll('.price__accordion-item');
			_setupListeners();
		}
	}
	}
})();

var price__accordion1 = price__accordion();
price__accordion1.init('#price__accordion');
