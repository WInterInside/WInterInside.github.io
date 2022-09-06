//функционал бургера

$(document).ready(function() {
    $('.header__menu, .header__nav').click(function(event) {
        $('.header__menu, .header__nav').toggleClass('active');
        $('body').toggleClass('lock')
    });
});

//тень на скролле
$(window).scroll(function() {
    $('header').toggleClass('header--shadow', $(this).scrollTop() > 50);
});

  //прокрут к якорю
$(document).ready(function(){
    $('a[href^="#"]').bind("click", function(e){
        var anchor = $(this);
        $('html, body').stop().animate({
        scrollTop: $(anchor.attr('href')).offset().top - 250
    }, 1000);
    e.preventDefault();
});
return false;
});
