$(document).ready(function(){
	$('.slider').slick({
		arrows:true,
		dots:false,
		slidesToShow:1,
		autoplay:true,
		speed:1000,
		autoplaySpeed:5000,
    responsive:[
      {
				breakpoint: 650,
				settings: {
					slidesToShow:1,
		      dots:true,
          arrows:false,
				}
			}
		]
	});
});
