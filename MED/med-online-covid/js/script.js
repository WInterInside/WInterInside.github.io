var stickySidebar = $('.sticky');
var mContent = $('.main-content');

if (stickySidebar.length > 0) {
  var stickyHeight = stickySidebar.height(),
      sidebarTop = stickySidebar.offset().top;
}

// on scroll move the sidebar
$(window).scroll(function () {
  if (stickySidebar.length > 0) {
    var scrollTop = $(window).scrollTop();

    if (sidebarTop < scrollTop) {
      console.log (scrollTop - sidebarTop);
      stickySidebar.css('top', scrollTop - sidebarTop);


      // stop the sticky sidebar at the footer to avoid overlapping
      var sidebarBottom = stickySidebar.offset().top + stickyHeight,
          stickyStop = $('.main-content').offset().top + $('.main-content').height();
      if (stickyStop < sidebarBottom) {
        var stopPosition = $('.main-content').height() - (stickyHeight + 145);
        stickySidebar.css('top', stopPosition);
      }
    }
    else {
      stickySidebar.css('top', '0');
    }
  }
});

$(window).resize(function () {
  if (stickySidebar.length > 0) {
    stickyHeight = stickySidebar.height();
  }
});

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
    slidesToScroll: 3,
		autoplay:true,
		speed:1000,
		autoplaySpeed:5000,
    		responsive:[
			{
				breakpoint: 850,
				settings: {
					slidesToShow:2,
          slidesToScroll: 3
				}
			},
      {
				breakpoint: 620,
				settings: {
					slidesToShow:1,
          slidesToScroll: 3
				}
			}
		]
	});
});

(function () {

  const cropElement = document.querySelectorAll('.preview-text'), // выбор элементов
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
var nav = document.querySelector(".navigation__list-mobile");
var body = document.querySelector("body");

nav.classList.add("navigation__list-mobile--closed");
menu.classList.add("navigation__menu--off");
body.classList.add("scroll-on")

menu.addEventListener("click", function() {
  if (nav.classList.contains("navigation__list-mobile--closed")) {
    nav.classList.remove("navigation__list-mobile--closed");
    nav.classList.add("navigation__list-mobile--opened");
    menu.classList.remove("navigation__menu--off");
    menu.classList.add("navigation__menu--on");
    body.classList.remove("scroll-on");
    body.classList.add("scroll-stop")
  } else {
    nav.classList.remove("navigation__list-mobile--opened");
    nav.classList.add("navigation__list-mobile--closed");
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
  $('.home').bind("click", function(e){
      var anchor = $(this);
      $('html, body').stop().animate({
          scrollTop: $(anchor.attr('href')).offset().top - 150
      }, 1000);
      e.preventDefault();
  });
  return false;
});

// список услуг

var depBtn = document.querySelector(".navigation__item--services");
var depList = document.querySelector(".navigation__services-mobile-list");

depBtn.classList.add("navigation__item--services-off");
depList.classList.add("navigation__services-mobile-list--off");

depBtn.addEventListener("click", function() {
  if (depList.classList.contains("navigation__services-mobile-list--off")) {
    depList.classList.remove("navigation__services-mobile-list--off");
    depList.classList.add("navigation__services-mobile-list--on");
    depBtn.classList.remove("navigation__item--services-off");
    depBtn.classList.add("navigation__item--services-on");
  } else {
    depList.classList.remove("navigation__services-mobile-list--on");
    depList.classList.add("navigation__services-mobile-list--off");
    depBtn.classList.remove("navigation__item--services-on");
    depBtn.classList.add("navigation__item--services-off");
  }
});

window.addEventListener("DOMContentLoaded", function() {
  [].forEach.call( document.querySelectorAll('.form__input--tel'), function(input) {
  var keyCode;
  function mask(event) {
      event.keyCode && (keyCode = event.keyCode);
      var pos = this.selectionStart;
      if (pos < 3) event.preventDefault();
      var matrix = "+7 (___) ___-__-__",
          i = 0,
          def = matrix.replace(/\D/g, ""),
          val = this.value.replace(/\D/g, ""),
          new_value = matrix.replace(/[_\d]/g, function(a) {
              return i < val.length ? val.charAt(i++) || def.charAt(i) : a
          });
      i = new_value.indexOf("_");
      if (i != -1) {
          i < 5 && (i = 3);
          new_value = new_value.slice(0, i)
      }
      var reg = matrix.substr(0, this.value.length).replace(/_+/g,
          function(a) {
              return "\\d{1," + a.length + "}"
          }).replace(/[+()]/g, "\\$&");
      reg = new RegExp("^" + reg + "$");
      if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
      if (event.type == "blur" && this.value.length < 5)  this.value = ""
  }

  input.addEventListener("input", mask, false);
  input.addEventListener("focus", mask, false);
  input.addEventListener("blur", mask, false);
  input.addEventListener("keydown", mask, false)

});
});

var acc = document.getElementsByClassName("accordion");

for (let i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    for (let j = 0; j < acc.length; j++) {
    acc[j].classList.remove("active");
      if(j!=i){
        acc[j].nextElementSibling.style.maxHeight = null;
      }
    }
    this.classList.add("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight){
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
}

$(document).ready(function($) {
  $('.tab_content').hide();
  $('.tab_content--2').show();
  $('.tab_content--news').show();
  $('.tabs li').removeClass('active');
  $('.tabs li.audio').addClass('active');
  $('.tabs li.news-tab').addClass('active');
  $('.tabs li').click(function(event) {
    event.preventDefault();
    $('.tabs li').removeClass('active');
    $(this).addClass('active');
    $('.tab_content').hide();
    var selectTab = $(this).find('a').attr("href");
    $(selectTab).fadeIn();
  });
});

var faqBtn = document.querySelector(".btn__faq");
var faqList = document.querySelector(".faq__hidden");

faqBtn.classList.add("faq__btn--off");
faqList.classList.add("faq__hidden--off");

faqBtn.addEventListener("click", function() {
  if (faqList.classList.contains("faq__hidden--off")) {
    faqList.classList.remove("faq__hidden--off");
    faqList.classList.add("faq__hidden--on");
    faqBtn.classList.remove("faq__btn--off");
    faqBtn.classList.add("faq__btn--on");
  } else {
    faqList.classList.remove("faq__hidden--on");
    faqList.classList.add("faq__hidden--off");
    faqBtn.classList.remove("faq__btn--on");
    faqBtn.classList.add("faq__btn--off");
  }
});

const btn = document.querySelector('.btn__faq');
btn.addEventListener('click', function() {
  btn.innerHTML =
    (btn.innerHTML === 'Все вопросы') ? btn.innerHTML = 'Скрыть' : btn.innerHTML = 'Все вопросы';
})
