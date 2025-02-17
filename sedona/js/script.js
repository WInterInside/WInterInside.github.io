var search = document.querySelector("a.modal-search");
var popup = document.querySelector(".modal");
search.addEventListener("click", function(evn) {
    evn.preventDefault();
    popup.classList.toggle("modal-show");;
    datein.focus();
});
