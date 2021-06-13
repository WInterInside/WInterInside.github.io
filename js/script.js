var menu = document.querySelector('.navigation__menu');
var nav = document.querySelector('.navigation__list');

nav.classList.add('navigation__list--closed');

menu.addEventListener('click', function() {
    if (nav.classList.contains('navigation__list--closed')) {
    nav.classList.remove('navigation__list--closed');
    nav.classList.add('navigation__list--opened');
  } else {
    nav.classList.remove('navigation__list--opened');
    nav.classList.add('navigation__list--closed');
  }
});

$(document).ready(function($) {
  $('.objects__content').hide();
  $('.objects__content:first').show();
  $('.objects__tabs li:first').addClass('active');
  $('.objects__tabs li').click(function(event) {
    $('.objects__tabs li').removeClass('active');
    $(this).addClass('active');
    $('.objects__content').hide();

    var selectTab = $(this).find('a').attr("href");

    $(selectTab).fadeIn();
  });
});

$(function(){
  $("#phone").mask("+7 (999) 999-99-99");
});
