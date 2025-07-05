// Переменная для тела документа
const body = $('body');

// Навигационный переключатель
const navToggle = $('[data-element~="navToggle"]');
const subNavToggle = $('[data-element~="subNavToggle"]');
const bannerToggle = $('[data-element~="bannerToggle"]');

// Переключение состояния навигационного меню
const toggleNav = () => {
	if (!body.hasClass('is-nav-open')) {
		body.addClass('is-nav-open');
	} else {
		body.removeClass('is-nav-open');
	}
};

const toggleSubNav = () => {
	if (!body.hasClass('is-sub-nav-open')) {
		body.addClass('is-sub-nav-open');
	} else {
		body.removeClass('is-sub-nav-open');
	}
};

const toggleBannerNav = () => {
	if (!body.hasClass('is-banner-nav-open')) {
		body.addClass('is-banner-nav-open');
	} else {
		body.removeClass('is-banner-nav-open');
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
subNavToggle.on('click', toggleSubNav);
bannerToggle.on('click', toggleBannerNav);

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

// $('.form__input--tel').each(function() {
// 	var keyCode;

// 	function mask(event) {
// 		event.keyCode && (keyCode = event.keyCode);
// 		var pos = this.selectionStart;
// 		if (pos < 3) event.preventDefault();
// 		var matrix = "+7 (___) ___ __ __",
// 			i = 0,
// 			def = matrix.replace(/\D/g, ""),
// 			val = $(this).val().replace(/\D/g, ""),
// 			new_value = matrix.replace(/[_\d]/g, function(a) {
// 			return i < val.length ? val.charAt(i++) : def.charAt(i++)
// 			});
// 		i = new_value.indexOf("_");
// 		if (i != -1) {
// 			i < 5 && (i = 3);
// 			new_value = new_value.slice(0, i)
// 		}
// 		var reg = matrix.substr(0, $(this).val().length).replace(/_+/g,
// 			function(a) {
// 			return "\\d{1," + a.length + "}"
// 			}).replace(/[+()]/g, "\\$&");
// 		reg = new RegExp("^" + reg + "$");
// 		if (!reg.test($(this).val()) || $(this).val().length < 5 || keyCode > 47 && keyCode < 58) {
// 			$(this).val(new_value);
// 		}
// 		if (event.type == "blur" && $(this).val().length < 5) {
// 			$(this).val("");
// 		}
// 	}

// 	$(this).on("input focus blur keydown", mask);
// });

$(document).ready(function () {
	var $slider = $('.wishes__slider');

	// Инициализация слайдера
	$slider.slick({
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 5,
		arrows: false, // Отключаем встроенные стрелки Slick Slider
		centerMode: true, // Центрирование слайдов
		focusOnSelect: true, // Фокусировка на выбранном слайде
		autoplay: true,       // Включаем автоплей
		autoplaySpeed: 3000,  // Интервал смены слайдов – 3 секунды
		responsive: [
			{
				breakpoint: 1400, // При ширине экрана 1000 пикселей
				settings: {
					slidesToShow: 4 // Показываем 3 слайда
				}
			},
			{
				breakpoint: 1200, // При ширине экрана 1000 пикселей
				settings: {
					slidesToShow: 3 // Показываем 3 слайда
				}
			},
			{
				breakpoint: 900, // При ширине экрана 600 пикселей
				settings: {
					slidesToShow: 2 // Показываем 2 слайда
				}
			},
			{
				breakpoint: 600, // При ширине экрана 600 пикселей
				settings: {
					slidesToShow: 1 // Показываем 2 слайда
				}
			}
		]
	});

	// Обработчики для кнопок
	$('.wishes__controls .prev').on('click', function() {
		$slider.slick('slickPrev');
	});

	$('.wishes__controls .next').on('click', function() {
		$slider.slick('slickNext');
	});
});

$(document).ready(function () {
	var $slider = $('.analitics__slider');

	// Инициализация слайдера
	$slider.slick({
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 4,
		arrows: false, // Отключаем встроенные стрелки Slick Slider
		centerMode: true, // Центрирование слайдов
		focusOnSelect: true, // Фокусировка на выбранном слайде
		autoplay: true,       // Включаем автоплей
		autoplaySpeed: 3000,  // Интервал смены слайдов – 3 секунды
		responsive: [
			{
				breakpoint: 1200, // При ширине экрана 1000 пикселей
				settings: {
					slidesToShow: 3 // Показываем 3 слайда
				}
			},
			{
				breakpoint: 900, // При ширине экрана 600 пикселей
				settings: {
					slidesToShow: 2 // Показываем 2 слайда
				}
			},
			{
				breakpoint: 600, // При ширине экрана 600 пикселей
				settings: {
					slidesToShow: 1 // Показываем 1 слайда
				}
			}
		]
	});

	// Обработчики для кнопок
	$('.analitics__controls .prev').on('click', function() {
		$slider.slick('slickPrev');
	});

	$('.analitics__controls .next').on('click', function() {
		$slider.slick('slickNext');
	});
});

$(document).ready(function () {
	var $slider = $('.news__slider');

	// Инициализация слайдера
	$slider.slick({
		dots: false,
		infinite: true,
		speed: 300,
		arrows: false,
		slidesToShow: 1
	});

	// Обработчики для кнопок
	$('.news__controls .prev').on('click', function() {
		$slider.slick('slickPrev');
	});

	$('.news__controls .next').on('click', function() {
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

$(document).ready(function() {
    // Находим все ссылки внутри указанного div'а и скрываем их
    var links = $('.weekdays__wrapper aside h2:contains("#ИсторияДобровольца")').next('div').find('a');
    
    // Скрываем все ссылки, кроме первых десяти
    links.slice(4).addClass('is-hidden');

    // Обработчик для кнопки "Смотреть еще"
    $('.show-stories.button.button--light').on('click', function() {
        if ($(this).text().trim() === 'Смотреть еще') {
            // Показываем все скрытые ссылки
            links.removeClass('is-hidden');
            $(this).text('Скрыть'); // Меняем текст кнопки
        } else {
            // Скрываем все ссылки, кроме первых десяти
            links.slice(4).addClass('is-hidden');
            $(this).text('Смотреть еще'); // Возвращаем исходный текст кнопки
        }
    });
});

$(document).ready(function() {
    // Функция для определения количества элементов, которые будут скрыты
    function hideElements() {
        const width = window.innerWidth || document.documentElement.clientWidth;
        let startIndex = 12;

        if (width < 1000) { // Условие для изменения порога в зависимости от ширины экрана
            startIndex = 6;
        }

        // Скрываем ссылки, начиная с определенного индекса
        $('.weekdays__slide-wrapper a').slice(startIndex).addClass('is-hidden');
    }

    // Вызываем функцию сразу после загрузки страницы
    hideElements();

    // Обновляем состояние при изменении размера окна
    $(window).resize(hideElements);

    // Обработчик для кнопки с классом show-all-weekdays
    $('.show-all-weekdays').on('click', function() {
        var $this = $(this);
        
        if ($('.weekdays__slide-wrapper a.is-hidden').length > 0) {
            // Если есть скрытые элементы, показываем их и меняем текст кнопки
            $('.weekdays__slide-wrapper a.is-hidden').removeClass('is-hidden');
            $this.text('Скрыть');
        } else {
            // Если все элементы видны, скрываем их и возвращаем исходный текст кнопки
            hideElements(); // Используем ту же функцию для скрытия элементов
            $this.text('Смотреть еще');
        }
    });
});