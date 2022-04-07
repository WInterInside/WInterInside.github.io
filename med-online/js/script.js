$(document).ready(function(){
	$('.slider-hero').slick({
		arrows:false,
		dots:true,
		slidesToShow:1,
		autoplay:true,
		speed:1000,
		autoplaySpeed:5000,
		// responsive:[
		// 	{
		// 		breakpoint: 1370,
		// 		settings: {
		// 			slidesToShow:3
		// 		}
		// 	},
    //   {
		// 		breakpoint: 1070,
		// 		settings: {
		// 			slidesToShow:2
		// 		}
		// 	},
		// 	{
		// 		breakpoint: 760,
		// 		settings: {
		// 			slidesToShow:1,
		//       dots:true,
    //       arrows:false,
		// 		}
		// 	}
		// ]
	});
});

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
