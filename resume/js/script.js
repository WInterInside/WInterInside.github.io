//функционал бургера

$(document).ready(function() {
    $('.header__menu, .header__nav').click(function(event) {
        $('.header__menu, .header__nav').toggleClass('active');
        $('body').toggleClass('lock')
    });
});

//homw
$(window).scroll(function() {
    $('home').toggleClass('home--show', $(this).scrollTop() > 50);
});

//тень на скролле
$(window).scroll(function() {
    $('header').toggleClass('header--shadow', $(this).scrollTop() > 50);
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
