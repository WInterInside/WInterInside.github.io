var rev = $('.rev_slider');
rev.on('init', function(event, slick, currentSlide) {
  var
  cur = $(slick.$slides[slick.currentSlide]),
  next = cur.next(),
  next2 = cur.next().next(),
  prev = cur.prev(),
  prev2 = cur.prev().prev();
  prev.addClass('slick-sprev');
  next.addClass('slick-snext');
  prev2.addClass('slick-sprev2');
  next2.addClass('slick-snext2');
  cur.removeClass('slick-snext').removeClass('slick-sprev').removeClass('slick-snext2').removeClass('slick-sprev2');
  slick.$prev = prev;
  slick.$next = next;
}).on('beforeChange', function(event, slick, currentSlide, nextSlide) {
  console.log('beforeChange');
  var
  cur = $(slick.$slides[nextSlide]);
  console.log(slick.$prev, slick.$next);
  slick.$prev.removeClass('slick-sprev');
  slick.$next.removeClass('slick-snext');
  slick.$prev.prev().removeClass('slick-sprev2');
  slick.$next.next().removeClass('slick-snext2');
  next = cur.next(),
  prev = cur.prev();
//prev2.prev().prev();
//next2.next().next();
prev.addClass('slick-sprev');
next.addClass('slick-snext');
prev.prev().addClass('slick-sprev2');
next.next().addClass('slick-snext2');
slick.$prev = prev;
slick.$next = next;
cur.removeClass('slick-next').removeClass('slick-sprev').removeClass('slick-next2').removeClass('slick-sprev2');
});

rev.slick({
  speed: 1000,
  arrows: true,
  dots: false,
  focusOnSelect: true,
  prevArrow: '<button> prev</button>',
  nextArrow: '<button> next</button>',
  infinite: true,
  centerMode: true,
  slidesPerRow: 1,
  slidesToShow: 1,
  slidesToScroll: 1,
  centerPadding: '0',
  swipe: true,
  customPaging: function(slider, i) {
    return '';
  },
  /*infinite: false,*/
});

"use strict"

window.addEventListener("load", windowLoad);

function windowLoad() {

  // инициализация
  function digitsCountersInit(digitsCountersItems) {
    let digitsCounters = digitsCountersItems ? digitsCountersItems : document.querySelectorAll("[data-digits-counter]");

    console.log (digitsCounters);

    if (digitsCounters) {
      digitsCounters.forEach(digitsCounter => {
        digitsCountersItemsAnimate(digitsCounter);
      });
    }
  }

// анимация
  function digitsCountersItemsAnimate(digitsCounter) {
    let startTimestamp = null;
    const duration = parseInt(digitsCounter.dataset.digitsCounter) ? parseInt(digitsCounter.dataset.digitsCounter) : 1500;
    const startValue = parseInt(digitsCounter.innerHTML);
    const startPosition = 0;
    const step = (timestamp) =>  {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      digitsCounter.innerHTML = Math.floor(progress * (startPosition + startValue));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }
  // пуск при загрузке страници
  // digitsCountersInit();


  // пуск при появлении в поле видимости
  let options = {
    threshold: 0.3
  }
  let observer = new IntersectionObserver ((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const targetElement = entry.target;
        const digitsCountersItems = targetElement.querySelectorAll("[data-digits-counter]");

        if (digitsCountersItems.length) {
          digitsCountersInit(digitsCountersItems);
        }
          // отключить отслеживание после сработки
          observer.unobserve(targetElement);
      }
    });
  }, options);

  let sections = document.querySelectorAll(".page__row");
  if (sections.length) {
    sections.forEach(section => {
      observer.observe(section);
    });
  }
}

var header = document.getElementById("nav");
var links = header.getElementsByClassName("navigation__link");
for (var i = 0; i < links.length; i++) {
  links[i].addEventListener("click", function() {
    var current = document.getElementsByClassName("navigation__link--current");
    current[0].className = current[0].className.replace(" navigation__link--current", "");
    this.className += " navigation__link--current";
  });
}

let scrollpos = window.scrollY
const shadow = document.querySelector("header")
const header_height = header.offsetHeight

const add_class_on_scroll = () => shadow.classList.add("header--shadow")
const remove_class_on_scroll = () => shadow.classList.remove("header--shadow")

window.addEventListener('scroll', function() {
  scrollpos = window.scrollY;

  if (scrollpos >= header_height) { add_class_on_scroll() }
  else { remove_class_on_scroll() }
})

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

$(document).ready(function(){
  $('a[href^="#"]').bind("click", function(e){
      var anchor = $(this);
      $('html, body').stop().animate({
          scrollTop: $(anchor.attr('href')).offset().top - 50
      }, 1000);
      e.preventDefault();
  });
  return false;
});
