$(window).scroll(function() {
  $('header').toggleClass('header--shadow', $(this).scrollTop() > 0);
});

$(document).ready(function(){
	$('.slider-hero').slick({
		arrows:false,
		dots:true,
		slidesToShow:1,
		autoplay:true,
		speed:1000,
		autoplaySpeed:5000,
	});
});

$(document).ready(function(){
	$('.slider-reviews').slick({
		arrows:false,
		dots:true,
		slidesToShow:3,
		autoplay:true,
		speed:1000,
		autoplaySpeed:5000,
    		responsive:[
			{
				breakpoint: 850,
				settings: {
					slidesToShow:2
				}
			},
      {
				breakpoint: 620,
				settings: {
					slidesToShow:1
				}
			}
		]
	});
});

(function () {

  const cropElement = document.querySelectorAll('.review__text'), // выбор элементов
        size = 460                                             // кол-во символов
        endCharacter = '...';                                  // окончание

  cropElement.forEach(el => {
      let text = el.innerHTML;

      if (el.innerHTML.length > size) {
          text = text.substr(0, size);
          el.innerHTML = text + endCharacter;
      }
  });

}());


// меню

var menu = document.querySelector(".navigation__menu");
var nav = document.querySelector(".navigation__list");
var body = document.querySelector("body");

nav.classList.add("navigation__list--closed");
menu.classList.add("navigation__menu--off");
body.classList.add("scroll-on")

menu.addEventListener("click", function() {
  if (nav.classList.contains("navigation__list--closed")) {
    nav.classList.remove("navigation__list--closed");
    nav.classList.add("navigation__list--opened");
    menu.classList.remove("navigation__menu--off");
    menu.classList.add("navigation__menu--on");
    body.classList.remove("scroll-on");
    body.classList.add("scroll-stop")
  } else {
    nav.classList.remove("navigation__list--opened");
    nav.classList.add("navigation__list--closed");
    menu.classList.remove("navigation__menu--on");
    menu.classList.add("navigation__menu--off");
    body.classList.remove("scroll-stop");
    body.classList.add("scroll-on")
  }
});

// список услуг

var servicesBtn = document.querySelector(".services__caption");
var servicesList = document.querySelector(".services__list");
var servicesArrow = document.querySelector(".services__arrow");

servicesArrow.classList.add("services__arrow--down");
servicesList.classList.add("services__list--off");

servicesBtn.addEventListener("click", function() {
  if (servicesList.classList.contains("services__list--off")) {
    servicesList.classList.remove("services__list--off");
    servicesList.classList.add("services__list--on");
    servicesArrow.classList.remove("services__arrow--down");
    servicesArrow.classList.add("services__arrow--up");
  } else {
    servicesList.classList.remove("services__list--on");
    servicesList.classList.add("services__list--off");
    servicesArrow.classList.remove("services__arrow--up");
    servicesArrow.classList.add("services__arrow--down");
  }
});

$(document).ready(function(){
  $('a[href^="#"]').bind("click", function(e){
      var anchor = $(this);
      $('html, body').stop().animate({
          scrollTop: $(anchor.attr('href')).offset().top - 150
      }, 1000);
      e.preventDefault();
  });
  return false;
});
