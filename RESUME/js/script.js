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

function Tabs() {
  var bindAll = function() {
    var menuElements = document.querySelectorAll('[data-tab]');
    for(var i = 0; i < menuElements.length ; i++) {
      menuElements[i].addEventListener('click', change, false);
    }
  }

  var clear = function() {
    var menuElements = document.querySelectorAll('[data-tab]');
    for(var i = 0; i < menuElements.length ; i++) {
      menuElements[i].classList.remove('active');
      var id = menuElements[i].getAttribute('data-tab');
      document.getElementById(id).classList.remove('active');
    }
  }

  var change = function(e) {
    clear();
    e.target.classList.add('active');
    e.preventDefault();
    var id = e.currentTarget.getAttribute('data-tab');
    document.getElementById(id).classList.add('active');
  }

  bindAll();
}

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
