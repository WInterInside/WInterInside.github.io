var toggle = document.querySelector(".header__toggle");
var menu = document.querySelector(".header__menu");

menu.classList.add("header__menu--closed");

toggle.addEventListener("click", function() {
  if (menu.classList.contains("header__menu--closed")) {
    menu.classList.remove("header__menu--closed");
    menu.classList.add("header__menu--opened");
  } else {
    menu.classList.remove("header__menu--opened");
    menu.classList.add("header__menu--closed");
  }
});
