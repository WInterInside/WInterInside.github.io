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
if (document.getElementById('index')) {
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
}
$(document).ready(function() {
	var $portfolioList = $('.portfolio__list');
	$portfolioList.slick({
		arrows: false,
		dots: false,
		slidesToShow: 3,
		autoplay: true,
		speed: 3000,
		autoplaySpeed: 5000,
		infinite: true,
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
});