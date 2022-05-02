const unit = document.querySelector('.main-screen__unit');
const scrn = document.querySelector('.main-screen');
const toggle = document.querySelector('.main-screen__toggle');

unit.addEventListener('click', () => {
  moveUnit();
});

const getRandomNum = (max) => {
  return Math.floor(Math.random() * Math.floor(80));
}

const moveUnit = () => {
  const w = window.innerWidth;
  const h = window.innerHeight;
  unit.style.top = getRandomNum(h) + 'vh';
  unit.style.left = getRandomNum(w) + 'vw';
  unit.style.transform = 'rotate(' + getRandomNum(200) + 'deg)'; 
}

toggle.addEventListener('click', function() {
    if (toggle.classList.contains('main-screen__toggle--day')) {
    scrn.classList.remove('main-screen--day');
    scrn.classList.add('main-screen--night');
    toggle.classList.remove('main-screen__toggle--day');
    toggle.classList.add('main-screen__toggle--night');
    document.getElementById("unit").src="img/firefly.png"
  } else {
    scrn.classList.remove('main-screen--night');
    scrn.classList.add('main-screen--day');
    toggle.classList.remove('main-screen__toggle--night');
    toggle.classList.add('main-screen__toggle--day');
    document.getElementById("unit").src="img/buterfly.png"
  }
});
