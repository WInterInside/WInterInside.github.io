$(document).ready(function(){
	$('.slider-hero').slick({
		arrows:false,
		dots:true,
		slidesToShow:1,
		autoplay:false,
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

nav.classList.add("navigation__list--closed");
menu.classList.add("navigation__menu--off");

menu.addEventListener("click", function() {
  if (nav.classList.contains("navigation__list--closed")) {
    nav.classList.remove("navigation__list--closed");
    nav.classList.add("navigation__list--opened");
    menu.classList.remove("navigation__menu--off");
    menu.classList.add("navigation__menu--on");
  } else {
    nav.classList.remove("navigation__list--opened");
    nav.classList.add("navigation__list--closed");
    menu.classList.remove("navigation__menu--on");
    menu.classList.add("navigation__menu--off");
  }
});
