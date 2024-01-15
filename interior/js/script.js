const navigationScroll = 180;

//Функционал бургера
document.addEventListener('DOMContentLoaded', function () {
	let menu = document.querySelector('.header__menu');
	let nav = document.querySelector('.header__nav');
	menu.addEventListener('click', function (event) {
		menu.classList.toggle('active');
		nav.classList.toggle('active');
		document.body.classList.toggle('lock');
	});
});

// кнопка вверх
window.addEventListener('scroll', function() {
	var homeElement = document.querySelector('.home');
	if (window.scrollY > 50) {
		homeElement.classList.add('home--show');
	} else {
		homeElement.classList.remove('home--show');
	}
});

//Прокрутка, навигация
document.addEventListener('DOMContentLoaded', function () {
	let links = document.querySelectorAll('.header__nav-link');
	let menu = document.querySelector('.header__menu');
	let nav = document.querySelector('.header__nav');

	links.forEach(function (link) {
		link.addEventListener('click', function (e) {
			e.preventDefault();
			let targetId = this.getAttribute('href').slice(1);
			let targetElement = document.getElementById(targetId);
			let offsetTop = targetElement.offsetTop - navigationScroll;
			window.scrollTo({
				top: offsetTop,
				behavior: 'smooth'
			});

			// Закрытие меню
			menu.classList.remove('active');
			nav.classList.remove('active');
			document.body.classList.remove('lock');
		});
	});
});

//Прокрутка, кнопки заказа
document.addEventListener('DOMContentLoaded', function () {
	let orderButtons = document.querySelectorAll('.btn-order');

	orderButtons.forEach(function (button) {
		button.addEventListener('click', function (e) {
			e.preventDefault();
			let targetElement = document.getElementById('contact');
			let offsetTop = targetElement.offsetTop;
			window.scrollTo({
				top: offsetTop,
				behavior: 'smooth'
			});
		});
	});
});

//конфигурация слайдера в секции хиро
$(document).ready(function () {
	$('.slider').slick({
		arrows: false,
		dots: true,
		slidesToShow: 1,
		autoplay: true,
		speed: 1000,
		autoplaySpeed: 5000,
		appendDots: $('.slider-dots')
	});
});

// конфигурация слайдера портфолио
$(document).ready(function () {
	let $portfolioList = $('.portfolio__list');
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
				breakpoint: 1300,
				settings: {
					slidesToShow: 3
				}
			},
			{
				breakpoint: 770,
				settings: {
					slidesToShow: 1
				}
			}
		]
	});

	$('.portfolio__control-prev').addClass('disabled');

	$portfolioList.on('afterChange', function (event, slick, currentSlide) {
		if (currentSlide === slick.slideCount - slick.options.slidesToShow) {
			$('.portfolio__control-next').addClass('disabled');
		} else {
			$('.portfolio__control-next').removeClass('disabled');
		}
		if (currentSlide === 0) {
			$('.portfolio__control-prev').addClass('disabled');
		} else {
			$('.portfolio__control-prev').removeClass('disabled');
		}
	});

	$portfolioList.on('init', function (event, slick) {
		$('.portfolio__control-prev').addClass('disabled');
	});

	$('.portfolio__control-prev').click(function () {
		if (!$(this).hasClass('disabled')) {
			$portfolioList.slick('slickPrev');
		}
	});

	$('.portfolio__control-next').click(function () {
		if (!$(this).hasClass('disabled')) {
			$portfolioList.slick('slickNext');
		}
	});
});