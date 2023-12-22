//функционал бургера
document.addEventListener('DOMContentLoaded', function() {
	var menu = document.querySelector('.header__menu');
	var nav = document.querySelector('.header__nav');
	menu.addEventListener('click', function(event) {
		menu.classList.toggle('active');
		nav.classList.toggle('active');
		document.body.classList.toggle('lock');
	});
});

//прокрут к якорю, навигация
document.addEventListener("DOMContentLoaded", function() {
	var links = document.querySelectorAll('.header__nav-link');
	var menu = document.querySelector('.header__menu');
	var nav = document.querySelector('.header__nav');

	links.forEach(function(link) {
	link.addEventListener("click", function(e) {
			e.preventDefault();
			var targetId = this.getAttribute('href').slice(1);
			var targetElement = document.getElementById(targetId);
			var offsetTop = targetElement.offsetTop - 180;
			window.scrollTo({
			top: offsetTop,
			behavior: "smooth"
			});

			// Закрытие меню
			menu.classList.remove('active');
			nav.classList.remove('active');
			document.body.classList.remove('lock');
		});
	});
});

//прокрут к якорю, кнопки заказа
document.addEventListener("DOMContentLoaded", function() {
	var orderButtons = document.querySelectorAll('.btn--order');

	orderButtons.forEach(function(button) {
	button.addEventListener("click", function(e) {
		e.preventDefault();
		var targetElement = document.getElementById('contact');
		var offsetTop = targetElement.offsetTop;
		window.scrollTo({
			top: offsetTop,
			behavior: "smooth"
		});
	});
	});
});


// слайдер в секции хиро
$(document).ready(function() {
	$('.slider').slick({
		arrows:false,
		dots:true,
		slidesToShow:1,
		autoplay:true,
		speed:1000,
		autoplaySpeed:5000,
		appendDots: $('.slider-dots')
	});
});

$(document).ready(function() {
	var $portfolioList = $('.portfolio__list');
	$portfolioList.slick({
		arrows: false,
		dots: false,
		slidesToShow: 4,
		autoplay: false,
		speed: 1000,
		autoplaySpeed: 5000,
		infinite: false,
		responsive: [
		{
			breakpoint: 1200,
			settings: {
				slidesToShow: 3
			}
		},
		{
			breakpoint: 768,
			settings: {
				slidesToShow: 1
			}
		}
		]
	});

	$('.portfolio__control--prev').addClass('disabled');

	$portfolioList.on('afterChange', function(event, slick, currentSlide) {
		if (currentSlide === slick.slideCount - slick.options.slidesToShow) {
			$('.portfolio__control--next').addClass('disabled');
		} else {
			$('.portfolio__control--next').removeClass('disabled');
		}
		if (currentSlide === 0) {
			$('.portfolio__control--prev').addClass('disabled');
		} else {
			$('.portfolio__control--prev').removeClass('disabled');
		}
	});

	$portfolioList.on('init', function(event, slick){
		$('.portfolio__control--prev').addClass('disabled');
		});

		$('.portfolio__control--prev').click(function(){
			if(!$(this).hasClass('disabled')){
				$portfolioList.slick('slickPrev');
			}
		});

		$('.portfolio__control--next').click(function(){
		if(!$(this).hasClass('disabled')){
			$portfolioList.slick('slickNext');
		}
	});
});