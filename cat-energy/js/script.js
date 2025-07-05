var menu = document.querySelector('.header__menu');
var nav = document.querySelector('.site-navigation');

menu.classList.remove('header__menu--nojs');
menu.classList.add('header__menu--off');
nav.classList.remove('site-navigation--nojs');
nav.classList.add('site-navigation--closed');

menu.addEventListener('click', function() {
    if (nav.classList.contains('site-navigation--closed')) {
    nav.classList.remove('site-navigation--closed');
    nav.classList.add('site-navigation--opened');
    menu.classList.add('header__menu--on');
    menu.classList.remove('header__menu--off');
  } else {
    nav.classList.remove('site-navigation--opened');
    nav.classList.add('site-navigation--closed');
    menu.classList.remove('header__menu--on');
    menu.classList.add('header__menu--off');
  }
});
