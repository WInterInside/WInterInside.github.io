window.onload = function () {
    var card = document.querySelectorAll('.card');
    var text = document.querySelectorAll('.card__text');
    var tasteValue = document.querySelectorAll('.card__taste-value');
    var tasteDiscription = document.querySelectorAll('.card__taste-discription');

    for (let i = 0; i < card.length; i++)
         card[i].addEventListener('click', function() {

        if (card[i].classList.contains('card--disabled')) {
            card[i].classList.remove('card--selected');
        }
        else if (card[i].classList.contains('card--selected')) {
            card[i].classList.remove('card--selected');
            text[i].innerHTML = 'Че сидишь? Порадуй котэ, <a class="card__link" href="#">купи.</a>'
        }
        else {
            card[i].classList.add('card--selected')
            text[i].innerHTML = tasteDiscription[i].textContent;
        }

    })

    for (let i = 0; i < tasteValue.length; i++) {
        console.log(tasteValue[i].textContent);
    }

    for (let i = 0; i < text.length; i++) {
        if (card[i].classList.contains('card--disabled')) {
            text[i].innerHTML = "Печаль, с " + tasteValue[i].textContent + " больше нет"
        }
    }
}
