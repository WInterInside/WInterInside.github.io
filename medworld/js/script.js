//функционал бургера
$(document).ready(function() {
    $('.header__menu, .header__nav').click(function(event) {
        $('.header__menu, .header__nav').toggleClass('active');
        $('body').toggleClass('lock')
    });
});

  //прокрут к якорю
$(document).ready(function(){
    $('.header__nav-link').bind("click", function(e){
        var anchor = $(this);
        $('html, body').stop().animate({
        scrollTop: $(anchor.attr('href')).offset().top - 180
    }, 1000);
    e.preventDefault();
});
return false;
});