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
		autoplay:false,
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