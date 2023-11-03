// home button
$(window).scroll(function() {
    $('.home').toggleClass('home--show', $(this).scrollTop() > 50);
});

//функционал бургера
$(document).ready(function() {
    $('.header__menu, .header__nav').click(function(event) {
        $('.header__menu, .header__nav').toggleClass('active');
        $('body').toggleClass('lock')
    });
});

// smooth scroll
$(document).ready(function(){
    $('.anchor-link').bind("click", function(e){
        var anchor = $(this);
        $('html, body').stop().animate({
        scrollTop: $(anchor.attr('href')).offset().top - 180
    }, 1000);
    e.preventDefault();
});
return false;
});

//slider
var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
	showSlides(slideIndex += n);
}

function currentSlide(n) {
	showSlides(slideIndex = n);
}

function showSlides(n) {
	var i;
	var slides = document.getElementsByClassName("mySlides");
	var dots = document.getElementsByClassName("dot");
	if (n > slides.length) {slideIndex = 1}
	if (n < 1) {slideIndex = slides.length}
	for (i = 0; i < slides.length; i++) {
			slides[i].style.display = "none";
	}
	for (i = 0; i < dots.length; i++) {
		dots[i].className = dots[i].className.replace(" active", "");
	}
	slides[slideIndex-1].style.display = "block";
	dots[slideIndex-1].className += " active";
}

var slideIndex = 0;
showSlides();

function showSlides() {
	var i;
	var slides = document.getElementsByClassName("mySlides");
	for (i = 0; i < slides.length; i++) {
		slides[i].style.display = "none";
	}
	slideIndex++;
	if (slideIndex > slides.length) {slideIndex = 1}
	slides[slideIndex-1].style.display = "block";
	setTimeout(showSlides, 3500);
}

// acordion logic
var faq__accordion = (function (element) {
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
	if (!e.target.classList.contains('faq__accordion-item-header')) {
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
			_items = _mainElement.querySelectorAll('.faq__accordion-item');
			_setupListeners();
		}
	}
	}
})();

//acordion start
var faq__accordion1 = faq__accordion();
faq__accordion1.init('#faq__accordion');


// modal
var btn = document.querySelector(".leistung__btn");
var popup = document.querySelector(".modal");
var body = document.querySelector('body');
var closeBtn = document.querySelector(".modal__close");

btn.addEventListener("click", function(evn) {
    evn.preventDefault();
    popup.classList.add("modal-show");
	body.classList.add("is-modal");
});

closeBtn.addEventListener("click", function(evn) {
    evn.preventDefault();
    popup.classList.remove("modal-show");
	body.classList.remove("is-modal");
});