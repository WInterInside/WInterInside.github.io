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