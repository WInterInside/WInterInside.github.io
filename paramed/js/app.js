// Переменная для тела документа
const body = $('body');

// Навигационный переключатель
const navToggle = $('[data-element~="navToggle"]');
const subNavToggle = $('[data-element~="subNavToggle"]');

// Переключение состояния навигационного меню
const toggleNav = () => {
	if (!body.hasClass('is-nav-open')) {
		body.addClass('is-nav-open');
	} else {
		body.removeClass('is-nav-open');
	}
};

// Обработка прокрутки страницы
const handleScroll = () => {
	if ($(window).scrollTop() > 0) {
		body.addClass('is-scrolled');
	} else {
		body.removeClass('is-scrolled');
	}
};

// Событие клика на навигационном переключателе
navToggle.on('click', toggleNav);

// Событие прокрутки окна
$(window).on('scroll', handleScroll);

// прокрутка статьи
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
	anchor.addEventListener('click', function(e) {
		e.preventDefault();
		let destination = document.querySelector(this.getAttribute('href'));
		const header = document.querySelector('[data-element="header"]');
		if (destination) {
			let headerHeight = (header.offsetHeight + 30);
			let topOfDestination = destination.getBoundingClientRect().top + window.scrollY - headerHeight;
			window.scrollTo({ top: topOfDestination, behavior: "smooth" });
		}
	});
});

$('.form__input--tel').each(function() {
	var keyCode;

	function mask(event) {
		event.keyCode && (keyCode = event.keyCode);
		var pos = this.selectionStart;
		if (pos < 3) event.preventDefault();
		var matrix = "+7 (___) ___ __ __",
			i = 0,
			def = matrix.replace(/\D/g, ""),
			val = $(this).val().replace(/\D/g, ""),
			new_value = matrix.replace(/[_\d]/g, function(a) {
			return i < val.length ? val.charAt(i++) : def.charAt(i++)
			});
		i = new_value.indexOf("_");
		if (i != -1) {
			i < 5 && (i = 3);
			new_value = new_value.slice(0, i)
		}
		var reg = matrix.substr(0, $(this).val().length).replace(/_+/g,
			function(a) {
			return "\\d{1," + a.length + "}"
			}).replace(/[+()]/g, "\\$&");
		reg = new RegExp("^" + reg + "$");
		if (!reg.test($(this).val()) || $(this).val().length < 5 || keyCode > 47 && keyCode < 58) {
			$(this).val(new_value);
		}
		if (event.type == "blur" && $(this).val().length < 5) {
			$(this).val("");
		}
	}

	$(this).on("input focus blur keydown", mask);
});

$(document).on('click', '[data-elements~="tabsBtn"]', function(e) {
	let id = $(this).data('tab');
	let tabs = $(this).closest('[data-elements~="tabs"]');
	let tabContents = tabs.find('[data-tab]');

	tabContents.each(function() {
		$(this).toggleClass('is-active', id === $(this).data('tab'));
	});
});


$(document).ready(function() {
	if ($(".faq").length > 0) { // Проверяем наличие блока с классом "faq"
		// Находим первый элемент details и открываем его
		$("details").first().attr("open", true);

		$("details").on("click", function(event) {
			let $this = $(this);

			if (!$this.attr("open")) { // Если элемент не открыт
				$("details").not($this).removeAttr("open"); // Закрываем все остальные элементы
			}
		});
	}
});

$(document).ready(function () {
	var $slider = $('.reviews__slider');

	// Инициализация слайдера
	$slider.slick({
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 5,
		arrows: false, // Отключаем встроенные стрелки Slick Slider
		centerMode: true, // Центрирование слайдов
		variableWidth: true, // Разрешаем разные ширины слайдов
		focusOnSelect: true, // Фокусировка на выбранном слайде
		centerPadding: '10px', // Отступы между слайдами
		autoplay: true,       // Включаем автоплей
		autoplaySpeed: 3000,  // Интервал смены слайдов – 3 секунды
		responsive: [
			{
				breakpoint: 1000, // При ширине экрана 1000 пикселей
				settings: {
					slidesToShow: 3 // Показываем 3 слайда
				}
			},
			{
				breakpoint: 900, // При ширине экрана 600 пикселей
				settings: {
					slidesToShow: 1 // Показываем 2 слайда
				}
			}
		]
	});

	// Обработчики для кнопок
	$('.prev').on('click', function () {
		$slider.slick('slickPrev');
	});

	$('.next').on('click', function () {
		$slider.slick('slickNext');
	});
});

$(document).ready(function() {
	$('.footer__up').on('click', function(event) {
		event.preventDefault();
		$('html, body').animate({
			scrollTop: 0 // Прокручиваем до верха страницы
		}, 500); // Время анимации в миллисекундах (здесь 500 мс)
	});
});

document.addEventListener("DOMContentLoaded", function() {
	// Функция создания карты
	function createMap(xID, coords) {
		const mapContainer = document.getElementById(xID);
		if (mapContainer) {
			ymaps.ready(function() {
				const myMap = new ymaps.Map(xID, {
					center: coords,
					zoom: 13,
					controls: [],
				});

				const myPlacemark = new ymaps.Placemark(
					coords,
					{
						hintContent: "г. Сочи улица Северная, д. 16",
						balloonContent: "г. Сочи улица Северная, д. 16",
					},
					{
						preset: "islands#redDotIcon", // Красный пин
					}
				);

				myMap.geoObjects.add(myPlacemark);
				myMap.behaviors.disable("scrollZoom");
			});
		} else {
			console.error("Элемент с ID", xID, "не найден.");
		}
	}

	// Вызов функции создания карты
	createMap("contacts-page__map", [43.595573, 39.724697]);
});