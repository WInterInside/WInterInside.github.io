//функционал бургера

$(document).ready(function() {
    $('.header__menu, .header__nav').click(function(event) {
        $('.header__menu, .header__nav').toggleClass('active');
        $('body').toggleClass('lock')
    });
});

//home
$(window).scroll(function() {
    $('.home').toggleClass('home--show', $(this).scrollTop() > 50);
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

// маска номера
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

$(document).ready(function(){
    $('.slider').slick({
        arrows:true,
        dots:false,
        slidesToShow:2,
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


//drag-and-drop

const moveList = document.querySelector(`.main__row--move`);

const moveItem = moveList.querySelectorAll(`.main__move`);

for (const item of moveItem) {
    item.draggable = true;
}

moveList.addEventListener(`dragstart`, (evt) => {
    evt.target.classList.add(`selected`);
});

moveList.addEventListener(`dragend`, (evt) => {
    evt.target.classList.remove(`selected`);
});

const getNextElement = (cursorPosition, currentElement) => {
    const currentElementCoord = currentElement.getBoundingClientRect();
    const currentElementCenter = currentElementCoord.y + currentElementCoord.height / 2;
    const nextElement = (cursorPosition < currentElementCenter) ?
    currentElement :
    currentElement.nextElementSibling;
    return nextElement;
};

moveList.addEventListener(`dragover`, (evt) => {
    evt.preventDefault();

    const activeElement = moveList.querySelector(`.selected`);
    const currentElement = evt.target;
    const isMoveable = activeElement !== currentElement &&
    currentElement.classList.contains(`main__move`);

    if (!isMoveable) {
        return;
    }

    const nextElement = getNextElement(evt.clientY, currentElement);

    if (
        nextElement &&
        activeElement === nextElement.previousElementSibling ||
        activeElement === nextElement
      ) {
        return;
      }

    moveList.insertBefore(activeElement, nextElement);
});
