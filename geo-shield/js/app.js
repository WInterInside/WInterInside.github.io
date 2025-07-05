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

const toggleSubNav = () => {
	if (!body.hasClass('is-sub-nav-open')) {
		body.addClass('is-sub-nav-open');
	} else {
		body.removeClass('is-sub-nav-open');
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

$(document).ready(function () {
	var sliders = $('.drawings__slider');
	var prevButtons = $('.prev');
	var nextButtons = $('.next');


	sliders.each(function(index) {
		var currentSlider = $(this);

		currentSlider.slick({
			dots: false,
			arrows: false,
			controls: false,
			infinite: true,
			speed: 300,
			slidesToShow: 1,
			adaptiveHeight: true,
			autoplay: true,
			autoplaySpeed: 3000
		});


		prevButtons.eq(index).on('click', function () {
			currentSlider.slick('slickPrev');
		});

		nextButtons.eq(index).on('click', function () {
			currentSlider.slick('slickNext');
		});
	});
});

$(document).ready(function() {
	var $bigSlider = $('.big-slider');
	var $smallSlider = $('.small-slider');

	$bigSlider.slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		fade: true,
		asNavFor: '.small-slider'
	});

	$smallSlider.slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		asNavFor: '.big-slider',
		dots: false,
		arrows: false,
		centerMode: false,
		focusOnSelect: true
	});

	// Кастомные кнопки управления
	$('.prev').on('click', function() {
		$smallSlider.slick('slickPrev');
	});

	$('.next').on('click', function() {
		$smallSlider.slick('slickNext');
	});
});

$(document).ready(function () {
	// Находим все слайдеры и кнопки
	var sliders = $('.drawings__slider');
	var prevButtons = $('.prev');
	var nextButtons = $('.next');

	// Проходимся по каждому слайдеру
	sliders.each(function(index) {
		var currentSlider = $(this);

		// Инициализируем текущий слайдер
		currentSlider.slick({
			dots: false,
			arrows: false,
			controls: false,
			infinite: true,
			speed: 300,
			slidesToShow: 1,
			adaptiveHeight: true,
			autoplay: true,
			autoplaySpeed: 3000
		});

		// Привязываем события к кнопкам текущего слайдера
		prevButtons.eq(index).on('click', function () {
			currentSlider.slick('slickPrev');
		});

		nextButtons.eq(index).on('click', function () {
			currentSlider.slick('slickNext');
		});
	});
});

$(document).ready(function () {
	var sliders = $('.project-page__slider');
	var prevButtons = $('.prev');
	var nextButtons = $('.next');

	sliders.each(function(index) {
	var currentSlider = $(this);

	if (currentSlider.hasClass('presentation')) {
		currentSlider.slick({
			dots: true,
			arrows: false,
			controls: false,
			infinite: true,
			speed: 300,
			slidesToShow: 3,
			adaptiveHeight: true,
			autoplay: false,
			autoplaySpeed: 3000,
			responsive: [
			{
				breakpoint: 1300,
				settings: {
				slidesToShow: 2
				}
			},
			{
				breakpoint: 900,
				settings: {
				slidesToShow: 1
				}
			}
			]
		});
	} else {
		currentSlider.slick({
			dots: true,
			arrows: false,
			controls: false,
			infinite: true,
			speed: 300,
			slidesToShow: 1,
			adaptiveHeight: true,
			autoplay: false,
			autoplaySpeed: 3000
		});
	}

	// Привязываем события к кнопкам текущего слайдера
	prevButtons.eq(index).on('click', function () {
		currentSlider.slick('slickPrev');
	});

	nextButtons.eq(index).on('click', function () {
		currentSlider.slick('slickNext');
	});
	});
});

$(document).ready(function() {
	// Функция для проверки видимости блока
	function isElementInViewport(el) {
		var rect = el.getBoundingClientRect();

		return (
		rect.top < window.innerHeight && // Верхняя граница блока выше нижней границы окна
		rect.bottom > 0 &&               // Нижняя граница блока ниже верхней границы окна
		rect.left < window.innerWidth && // Левая граница блока левее правой границы окна
		rect.right > 0                   // Правая граница блока правее левой границы окна
		);
	}

	// Функция для анимации
	function animateDescriptionItems() {
		const items = $('.description__item');

		if (!items.length) { // Если блоков нет, то ничего не делаем
			return;
		}

		let currentIndex = 0;

		setInterval(() => {
			items.removeClass('is-current'); // Убираем текущий класс у всех элементов

			// Проверяем видимость текущего элемента
			if (isElementInViewport(items[currentIndex])) {
				items.eq(currentIndex).addClass('is-current'); // Добавляем класс текущему элементу

				currentIndex++;
				if (currentIndex >= items.length) {
					currentIndex = 0;
				}
			}
		}, 2000); // Переключаем каждые 2 секунды
	}


	// Функция для анимации
	function animateDescriptionItemsSteps() {
		const items = $('.map__step');

		if (!items.length) { // Если блоков нет, то ничего не делаем
			return;
		}

		let currentIndex = 0;

		if ($(window).width() < 1300) {

			setInterval(() => {
				items.removeClass('is-current'); // Убираем текущий класс у всех элементов

				// Проверяем видимость текущего элемента
				if (isElementInViewport(items[currentIndex])) {
					items.eq(currentIndex).addClass('is-current'); // Добавляем класс текущему элементу

					currentIndex++;
					if (currentIndex >= items.length) {
						currentIndex = 0;
					}
				}
			}, 2000); // Переключаем каждые 2 секунды

		} else {
			return;
		}
	}

	// Запускаем анимацию при загрузке страницы
	animateDescriptionItems();
	animateDescriptionItemsSteps();
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
	var $slider = $('.docs__slider');

	// Инициализация слайдера
	$slider.slick({
		dots: false,
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

$(document).ready(function () {
	// Находим все элементы с классом devices__item
	$('.devices__item').each(function () {
		// Находим первый элемент details внутри блока
		var firstDetails = $(this).find('details')[0];

		if (firstDetails) {
			// Открываем первый элемент details
			firstDetails.open = true;
		}
	});
});

$(document).ready(function() {
    // Находим все элементы с классом map__data-item
    var items = $('.map__data-item');
    
    function checkVisibility() {
        items.each(function(index, item) {
            if (isElementPartiallyVisible(item, 0.3)) { // Проверяем видимость на 30%
                setTimeout(function() {
                    $(item).addClass('is-visible');
                }, index * 500); // Задержка в 1 секунду между каждым элементом
            }
        });
    }

    // Функция для проверки частичной видимости элемента на экране
    function isElementPartiallyVisible(el, threshold) {
        var rect = el.getBoundingClientRect();
        
        // Высота и ширина элемента
        var elementHeight = rect.height || el.offsetHeight;
        var elementWidth = rect.width || el.offsetWidth;
        
        // Видимая высота и ширина элемента
        var visibleHeight = Math.max(0, window.innerHeight - rect.top);
        var visibleWidth = Math.max(0, window.innerWidth - rect.left);
        
        // Процент видимости по высоте и ширине
        var heightPercentage = visibleHeight / elementHeight;
        var widthPercentage = visibleWidth / elementWidth;
        
        // Элемент считается частично видимым, если виден хотя бы на заданный процент
        return (heightPercentage >= threshold && widthPercentage >= threshold);
    }

    // Запускаем проверку при загрузке страницы
    checkVisibility();

    // Также проверяем видимость элементов при прокрутке окна
    $(window).on('scroll', checkVisibility);
});

$(document).ready(function () {
    // Находим все элементы с классом .map__order
    var orders = $('.map__order');

    function checkOrderVisibility() {
        orders.each(function (index, order) {
            // Для каждого блока находим все вложенные div'ы
            var childrenDivs = $(order).find('div');

            childrenDivs.each(function (childIndex, childItem) {
                if (isElementPartiallyVisible(childItem, 0.3)) { // Проверяем видимость на 30%
                    setTimeout(function () {
                        $(childItem).addClass('is-visible');
                    }, childIndex * 1000); // Задержка в 1 секунду между каждым элементом
                }
            });
        });
    }

    // Функция для проверки частичной видимости элемента на экране
    function isElementPartiallyVisible(el, threshold) {
        var rect = el.getBoundingClientRect();

        // Высота и ширина элемента
        var elementHeight = rect.height || el.offsetHeight;
        var elementWidth = rect.width || el.offsetWidth;

        // Видимая высота и ширина элемента
        var visibleHeight = Math.max(0, window.innerHeight - rect.top);
        var visibleWidth = Math.max(0, window.innerWidth - rect.left);

        // Процент видимости по высоте и ширине
        var heightPercentage = visibleHeight / elementHeight;
        var widthPercentage = visibleWidth / elementWidth;

        // Элемент считается частично видимым, если виден хотя бы на заданный процент
        return (heightPercentage >= threshold && widthPercentage >= threshold);
    }

    // Запускаем проверку при загрузке страницы
    checkOrderVisibility();

    // Также проверяем видимость элементов при прокрутке окна
    $(window).on('scroll', checkOrderVisibility);
});

// подсветка текущей станици в навигации - мб стоит подобрать другую реализацию, стили для класса написаны.
$(document).ready(function () {
	// Получаем текущий URL страницы
	var currentUrl = window.location.pathname;

	// Находим все ссылки внутри списка навигации
	$('nav ul li a').each(function () {
		var $this = $(this);

		if ($this.attr('href') === currentUrl || $this.prop('href') === window.location.href) {
			// Если ссылка совпадает с текущей страницей, добавляем ей класс is-current
			$this.addClass('is-current');
		}
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