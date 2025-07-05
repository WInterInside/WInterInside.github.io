$(document).ready(function() {


var $sticky = $(".sticky-card");
$(window).scroll(function(){
  if ( $(this).scrollTop() > 800 && $sticky.hasClass("default") ){
    $sticky.removeClass("default").addClass("fixed");
  } else if($(this).scrollTop() <= 800 && $sticky.hasClass("fixed")) {
    $sticky.removeClass("fixed").addClass("default");
  }

});

if ( $(this).scrollTop() > 800 && $sticky.hasClass("default") ){
    $sticky.removeClass("default").addClass("fixed");
  } else if($(this).scrollTop() <= 800 && $sticky.hasClass("fixed")) {
    $sticky.removeClass("fixed").addClass("default");
  }

  $(".item-question__head").click(function() {
    $(this).parent().toggleClass("active");
    $(this).siblings().slideToggle(200);
    $(this).parent().siblings(".item-question").removeClass("active");
    $(this).parent().siblings(".item-question").find(".item-question__content").slideUp(200);
  });

  $(document).on('mousemove', function(e) {
	$('.modal-icons i').each(function() {
		var offsetX = (e.pageX / $(window).width() - 0.5) * 20;
		var offsetY = (e.pageY / $(window).height() - 0.5) * 20;

		$(this).css('transform', 'translate(' + offsetX + 'px, ' + offsetY + 'px)');
	});
});

  $('.menu-list__open').click(function(event) {
	event.preventDefault();
	$(this).parent().siblings().find("ul").slideUp(200);
	$('.menu-list__open').removeClass("active");
	if ($(this).siblings("ul").is(":hidden")) {
		$(this).siblings("ul").slideDown(200);
		$(this).addClass("active");
	} else {
		$(this).siblings("ul").slideUp(200);
		$(this).removeClass("active");
	}
  });

  $('.tabs-menu li a').click(function(event) {
	event.preventDefault();
	$(this).parent().parent().find("li").removeClass('active');
	$(this).parent().addClass('active');
	$(".tab-pane-menu").fadeOut(0);
	var selectTab = $(this).attr("href");
	$(selectTab).fadeIn(200);
  });

	//плавный скролл
	$(".anchors-article a").mPageScroll2id({
		offset: 20
	});


	//кнопка sandwich
	$(".sandwich").click(function() {
		if ($(".menu-mobile").hasClass("active")) {
			$(".menu-mobile").removeClass("active");
			$(".menu-overlay").fadeOut(200);
			$("body").removeClass("no-scroll");
		} else {
			$(".menu-mobile").addClass("active");
			$(".menu-overlay").fadeIn(200);
			$("body").addClass("no-scroll");
		}
	});

	$(".menu-overlay").click(function() {
		$(".menu-mobile").removeClass("active");
		$(".sidebar-catalog").removeClass("active");
			$(".menu-overlay").fadeOut(200);
			$("body").removeClass("no-scroll");
	});

	$('.btn-open-sidebar, .btn-mobile_filter').click(function(event) {
		event.preventDefault();
		$(".sidebar-catalog").addClass("active");
		$(".menu-overlay").fadeIn(200);
		$("body").addClass("no-scroll");
	  });

	//слайдер

	$('.slider-about').slick({
		arrows: true,
		dots: true,
		infinite: true,
		touchThreshold: 1000,
		slidesToShow: 1,
		slidesToScroll: 1,
		prevArrow: '<div class="slick-prev slick-arrow"><i class="fal fa-chevron-left"></i><div/>',
		nextArrow: '<div class="slick-next slick-arrow"><i class="fal fa-chevron-right"></i><div/>',
		responsive: [
			{
				breakpoint: 992,
				settings: {
					adaptiveHeight: true,
				}
			}
			]
		});

	$('.slider-clients').slick({
		arrows: true,
		dots: true,
		infinite: true,
		touchThreshold: 1000,
		autoplay: true,
		autoplaySpeed: 6000,
		slidesToShow: 4,
		slidesToScroll: 1,
		prevArrow: '<div class="slick-prev slick-arrow"><i class="far fa-chevron-left"></i><div/>',
		nextArrow: '<div class="slick-next slick-arrow"><i class="far fa-chevron-right"></i><div/>',
		responsive: [
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 2,
				}
			}
			]
		});

	$('.slider-portfolio').slick({
		arrows: true,
		dots: false,
		infinite: true,
		touchThreshold: 1000,
		autoplay: true,
		autoplaySpeed: 6000,
		slidesToShow: 6,
		slidesToScroll: 1,
		prevArrow: '<div class="slick-prev slick-arrow"><i class="fas fa-chevron-left"></i><div/>',
		nextArrow: '<div class="slick-next slick-arrow"><i class="fas fa-chevron-right"></i><div/>',
		responsive: [
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 2,
				}
			}
			]
		});


	$('.slider-reviews').slick({
		arrows: true,
		dots: true,
		infinite: true,
		touchThreshold: 1000,
		autoplay: true,
		autoplaySpeed: 6000,
		slidesToShow: 2,
		slidesToScroll: 1,
		prevArrow: '<div class="slick-prev slick-arrow"><i class="fas fa-chevron-left"></i><div/>',
		nextArrow: '<div class="slick-next slick-arrow"><i class="fas fa-chevron-right"></i><div/>',
		responsive: [
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 1,
					adaptiveHeight: true,
				}
			}
			]
		});

		$('.slider-for').slick({
			arrows: true,
			dots: false,
			infinite: false,
			adaptiveHeight: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			asNavFor: '.slider-nav',
			touchThreshold: 1000,
			prevArrow: '<div class="slick-prev slick-arrow"><i class="far fa-chevron-left"></i><div/>',
			nextArrow: '<div class="slick-next slick-arrow"><i class="far fa-chevron-right"></i><div/>',
		});

		$('.slider-nav').slick({
			arrows: false,
			dots: false,
			infinite: false,
			slidesToShow: 4,
			slidesToScroll: 1,
			asNavFor: '.slider-for',
			touchThreshold: 1000,
			focusOnSelect: true,
			prevArrow: '<div class="slick-prev slick-arrow"><i class="far fa-chevron-left"></i><div/>',
			nextArrow: '<div class="slick-next slick-arrow"><i class="far fa-chevron-right"></i><div/>',

		});

		$('.slider-recommendations').slick({
			arrows: true,
			dots: true,
			infinite: true,
			slidesToShow: 5,
			slidesToScroll: 1,
			touchThreshold: 1000,
			focusOnSelect: true,
			prevArrow: '<div class="slick-prev slick-arrow"><i class="far fa-chevron-left"></i><div/>',
			nextArrow: '<div class="slick-next slick-arrow"><i class="far fa-chevron-right"></i><div/>',
			responsive: [
				{
					breakpoint: 992,
					settings: {
						slidesToShow: 2,
						arrows: false,
					}
				}
				]
			});

			$('.slider-catalog').slick({
				arrows: true,
				dots: true,
				infinite: true,
				slidesToShow: 6,
				slidesToScroll: 6,
				touchThreshold: 1000,
				speed: 3000,
				focusOnSelect: true,
				prevArrow: '<div class="slick-prev slick-arrow"><i class="far fa-chevron-left"></i><div/>',
				nextArrow: '<div class="slick-next slick-arrow"><i class="far fa-chevron-right"></i><div/>',
				responsive: [
					{
						breakpoint: 992,
						settings: {
							slidesToShow: 2,
							arrows: false,
						}
					}
					]
				});

				$('.slider-portfolio-service').slick({
					arrows: true,
					dots: false,
					infinite: true,
					touchThreshold: 1000,
					autoplay: true,
					autoplaySpeed: 6000,
					slidesToShow: 5,
					slidesToScroll: 1,
					prevArrow: '<div class="slick-prev slick-arrow"><i class="fas fa-chevron-left"></i><div/>',
					nextArrow: '<div class="slick-next slick-arrow"><i class="fas fa-chevron-right"></i><div/>',
					responsive: [
						{
							breakpoint: 992,
							settings: {
								slidesToShow: 2,
							}
						}
						]
					});

					$('.slider-catalog-small').slick({
						arrows: true,
						dots: true,
						infinite: true,
						slidesToShow: 3,
						slidesToScroll: 3,
						touchThreshold: 1000,
						speed: 3000,
						focusOnSelect: true,
						prevArrow: '<div class="slick-prev slick-arrow"><i class="far fa-chevron-left"></i><div/>',
						nextArrow: '<div class="slick-next slick-arrow"><i class="far fa-chevron-right"></i><div/>',
						responsive: [
							{
								breakpoint: 992,
								settings: {
									slidesToShow: 2,
									slidesToScroll: 2,
									arrows: false,
								}
							}
							]
						});
						$('.slider-view').slick({
							arrows: true,
							dots: false,
							infinite: false,
							slidesToShow: 1,
							slidesToScroll: 1,
							touchThreshold: 1000,
							focusOnSelect: true,
							prevArrow: '<div class="slick-prev slick-arrow"><i class="far fa-chevron-left"></i><div/>',
							nextArrow: '<div class="slick-next slick-arrow"><i class="far fa-chevron-right"></i><div/>',

							});

		$('.views-catalog a').click(function(event) {
			event.preventDefault();
			$(this).addClass("active");
			$(this).siblings().removeClass("active");
		  });

		$('.views-catalog_2').click(function() {
			$(".row_catalog").children().removeClass("col-lg-3 col-lg-4");
			$(".row_catalog").children().addClass("col-lg-6");
		  });
		  $('.views-catalog_3').click(function() {
			$(".row_catalog").children().removeClass("col-lg-3 col-lg-6");
			$(".row_catalog").children().addClass("col-lg-4");
		  });

		  $('.views-catalog_4').click(function() {
			$(".row_catalog").children().removeClass("col-lg-4 col-lg-6");
			$(".row_catalog").children().addClass("col-lg-3");
		  });


		$(".list-sidebar__arrow").click(function() {
			$(this).parent().toggleClass("active");
			$(this).siblings("ul").slideToggle(200);
			$(this).parent().siblings("li").removeClass("active");
			$(this).parent().siblings("li").find("ul").slideUp(200);
		  });

		  $(".btn-page_filter").click(function(e) {
			e.preventDefault();
			$(this).toggleClass("active");
			$(".sidebar-catalog").slideToggle(200);
		});

	$(".input-phone").mask("+7 (999) 999-99-99");

	$('.tabs li a').click(function(event) {
		event.preventDefault();
		$(this).parent().parent().find("li").removeClass('active');
		$(this).parent().addClass('active');
		$(".tab-pane").fadeOut(0);
		var selectTab = $(this).attr("href");
		$(selectTab).fadeIn(200);
		$('.tab-container .slider-catalog').slick('setPosition');

	  });

	  $('.tab-pane__head').click(function(event) {
		event.preventDefault();
		$(this).parent().siblings().find(".tab-pane__content").slideUp(200);
		$(this).parent().siblings(".tab-pane").removeClass("active");
		$(this).siblings(".tab-pane__content").slideToggle(200);
		$(this).parent().toggleClass("active");
	  });

	  $(".range-catalog").ionRangeSlider({
        type: "double",
        grid: true,
        min: 103,
        max: 223600,
        from: 103,
        to: 223600,
        prefix: "₽"
    });


	jQuery('.quantity').each(function() {
		var spinner = jQuery(this),
		input = spinner.find('input[type="number"]'),
		btnUp = spinner.find('.quantity-up'),
		btnDown = spinner.find('.quantity-down'),
		min = input.attr('min'),
		max = input.attr('max');

		btnUp.click(function() {
			var oldValue = parseFloat(input.val());
			if (oldValue >= max) {
				var newVal = oldValue;
			} else {
				var newVal = oldValue + 1;
			}
			spinner.find("input").val(newVal);
			spinner.find("input").trigger("change");
		});

		btnDown.click(function() {
			var oldValue = parseFloat(input.val());
			if (oldValue <= min) {
				var newVal = oldValue;
			} else {
				var newVal = oldValue - 1;
			}
			spinner.find("input").val(newVal);
			spinner.find("input").trigger("change");
		});
	});

	{
		if ($(window).width() < 992) {
		  $(".btn-hotspot").click(function() {
			if ($(".hotspot-wrap .item-catalog").is(":hidden")) {
				$(".hotspot-wrap .item-catalog").fadeIn(200);
			} else {
				$(".hotspot-wrap .item-catalog").fadeOut(200);
			}
		  });
		  $(document).mouseup(function (e) {
			var container = $(".hotspot-wrap .item-catalog");
			if (container.has(e.target).length === 0){
				$(".hotspot-wrap .item-catalog").fadeOut(200);
			}
		  });


		}
	  }

	//Попап менеджер FancyBox
	//Документация: http://fancybox.net/howto
	//<a class="fancybox"><img src="image.jpg" /></a>
	//<a class="fancybox" data-fancybox-group="group"><img src="image.jpg" /></a>
	$(".fancybox").fancybox({
		autoFocus: false,
		backFocus: false,
		beforeShow : function(){
			setTimeout(function () {
			  $('.slider-view').slick('setPosition');
			}, 30);

		  }
	});


	//Кнопка "Наверх"
	//Документация:
	//http://api.jquery.com/scrolltop/
	//http://api.jquery.com/animate/
	$(".btn_top").click(function () {
		$("body, html").animate({
			scrollTop: 0
		}, 800);
		return false;
	});

	objectFitImages();


	if ($('.etaps__image').length > 0) {
		var lastScrollTop = 0;

		function isElementInViewport(el) {
			var rect = el[0].getBoundingClientRect();
			return (
				rect.top >= 0 &&
				rect.left >= 0 &&
				rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
				rect.right <= (window.innerWidth || document.documentElement.clientWidth)
			);
		}

		$(window).on('scroll', function() {
			var st = $(this).scrollTop();
			var $image = $('.etaps__image');

			if (isElementInViewport($image)) {
				if (st > lastScrollTop) {
					// Scroll Down
					$image.css('transform', 'translateX(-50px)');
				} else {
					// Scroll Up
					$image.css('transform', 'translateX(50px)');
				}
			} else {
				// Reset position if not in viewport
				$image.css('transform', 'translateX(0)');
			}
			lastScrollTop = st;
		});

	}



});


/*polifyl*/
  /*! npm.im/object-fit-images 3.2.4 */
  var objectFitImages=function(){"use strict";function t(t,e){return"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='"+t+"' height='"+e+"'%3E%3C/svg%3E"}function e(t){if(t.srcset&&!p&&window.picturefill){var e=window.picturefill._;t[e.ns]&&t[e.ns].evaled||e.fillImg(t,{reselect:!0}),t[e.ns].curSrc||(t[e.ns].supported=!1,e.fillImg(t,{reselect:!0})),t.currentSrc=t[e.ns].curSrc||t.src}}function i(t){for(var e,i=getComputedStyle(t).fontFamily,r={};null!==(e=u.exec(i));)r[e[1]]=e[2];return r}function r(e,i,r){var n=t(i||1,r||0);b.call(e,"src")!==n&&h.call(e,"src",n)}function n(t,e){t.naturalWidth?e(t):setTimeout(n,100,t,e)}function c(t){var c=i(t),o=t[l];if(c["object-fit"]=c["object-fit"]||"fill",!o.img){if("fill"===c["object-fit"])return;if(!o.skipTest&&f&&!c["object-position"])return}if(!o.img){o.img=new Image(t.width,t.height),o.img.srcset=b.call(t,"data-ofi-srcset")||t.srcset,o.img.src=b.call(t,"data-ofi-src")||t.src,h.call(t,"data-ofi-src",t.src),t.srcset&&h.call(t,"data-ofi-srcset",t.srcset),r(t,t.naturalWidth||t.width,t.naturalHeight||t.height),t.srcset&&(t.srcset="");try{s(t)}catch(t){window.console&&console.warn("https://bit.ly/ofi-old-browser")}}e(o.img),t.style.backgroundImage='url("'+(o.img.currentSrc||o.img.src).replace(/"/g,'\\"')+'")',t.style.backgroundPosition=c["object-position"]||"center",t.style.backgroundRepeat="no-repeat",t.style.backgroundOrigin="content-box",/scale-down/.test(c["object-fit"])?n(o.img,function(){o.img.naturalWidth>t.width||o.img.naturalHeight>t.height?t.style.backgroundSize="contain":t.style.backgroundSize="auto"}):t.style.backgroundSize=c["object-fit"].replace("none","auto").replace("fill","100% 100%"),n(o.img,function(e){r(t,e.naturalWidth,e.naturalHeight)})}function s(t){var e={get:function(e){return t[l].img[e?e:"src"]},set:function(e,i){return t[l].img[i?i:"src"]=e,h.call(t,"data-ofi-"+i,e),c(t),e}};Object.defineProperty(t,"src",e),Object.defineProperty(t,"currentSrc",{get:function(){return e.get("currentSrc")}}),Object.defineProperty(t,"srcset",{get:function(){return e.get("srcset")},set:function(t){return e.set(t,"srcset")}})}function o(){function t(t,e){return t[l]&&t[l].img&&("src"===e||"srcset"===e)?t[l].img:t}d||(HTMLImageElement.prototype.getAttribute=function(e){return b.call(t(this,e),e)},HTMLImageElement.prototype.setAttribute=function(e,i){return h.call(t(this,e),e,String(i))})}function a(t,e){var i=!y&&!t;if(e=e||{},t=t||"img",d&&!e.skipTest||!m)return!1;"img"===t?t=document.getElementsByTagName("img"):"string"==typeof t?t=document.querySelectorAll(t):"length"in t||(t=[t]);for(var r=0;r<t.length;r++)t[r][l]=t[r][l]||{skipTest:e.skipTest},c(t[r]);i&&(document.body.addEventListener("load",function(t){"IMG"===t.target.tagName&&a(t.target,{skipTest:e.skipTest})},!0),y=!0,t="img"),e.watchMQ&&window.addEventListener("resize",a.bind(null,t,{skipTest:e.skipTest}))}var l="fregante:object-fit-images",u=/(object-fit|object-position)\s*:\s*([-.\w\s%]+)/g,g="undefined"==typeof Image?{style:{"object-position":1}}:new Image,f="object-fit"in g.style,d="object-position"in g.style,m="background-size"in g.style,p="string"==typeof g.currentSrc,b=g.getAttribute,h=g.setAttribute,y=!1;return a.supportsObjectFit=f,a.supportsObjectPosition=d,o(),a}();

  const observer = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			entry.target.classList.add("active");
		}
	})

	}, {
		threshold: 0.9
	})

	document.querySelectorAll(".page-portfolio .item-portfolio").forEach(item => {
		observer.observe(item)
	})

// появление первого елемента в списке при попадании егов поле видимости
$(document).ready(function () {
	var $window = $(window);
	var $element = $('.how-work__item--first');

	function checkVisibility() {
		var windowHeight = $window.height();
		var scrollTop = $window.scrollTop();
		var elementOffset = $element.offset().top;
		var elementHeight = $element.outerHeight(true);

		if ((scrollTop + windowHeight) >= (elementOffset + elementHeight)) {
			$element.addClass('visible');
		} else {
			$element.removeClass('visible');
		}
	}

	$window.on('resize scroll', checkVisibility);

	checkVisibility();
});