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
