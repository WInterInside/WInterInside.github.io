var fav = document.getElementsByClassName("card__fav");

for (let i = 0; i < fav.length; i++) {

  fav[i].classList.add("card__fav--off");
  fav[i].addEventListener("click", function() {
    if (fav[i].classList.contains("card__fav--off")) {
      fav[i].classList.remove("card__fav--off");
      fav[i].classList.add("card__fav--on");
    } else {
      fav[i].classList.remove("card__fav--on");
      fav[i].classList.add("card__fav--off");
    }
  });
}
