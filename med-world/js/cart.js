const cart = document.querySelector('.cart');
const cartQuantity = document.querySelector('.cart__value');
const cartQuantityInner = document.querySelector('.cart__value-inner');
const fullPrice = document.querySelector('.cart__full-price');
const productsBtn = document.querySelectorAll('.catalogue-page__add');
const cartProductsList = document.querySelector('.cart__list');

let price = 0;
let productArray = [];

const randomId = () => {
	return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

const priceWithoutSpaces = (str) => {
	return str.replace(/\s/g, '');
};

const normalPrice = (str) => {
	return String(str).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
};

const generateCartProduct = (count, img, title, price, id) => {
	return `
	<li class="cart__item" data-id="${id}">
	<img class="cart__img" src="${img}" alt="about img">
	<h3 class="cart__product-name">${title}</h3>
	<div class="cart__wrapper">
		<button class="cart__delete">x</button>
		<span class="cart__product-price">${normalPrice(price)}</span>
	</div>
	</li>
	`;
};

const plusFullPrice = (currentPrice) => {
	return price += currentPrice;
};

const minusFullPrice = (currentPrice) => {
	return price -= currentPrice;
};

const printFullPrice = () => {
	fullPrice.textContent = `${normalPrice(price)} ₽`;
};

const printQuantity = () => {
	let productsListLength = cartProductsList.children.length;
	cartQuantity.textContent = productsListLength;
	cartQuantityInner.textContent = productsListLength;
	productsListLength > 0 ? cart.classList.add('active') : cart.classList.remove('active');
	productsListLength > 0 ? cartQuantity.classList.add('active') : cartQuantity.classList.remove('active');
};

const deleteProducts = () => {
	let currentPrice = parseInt(priceWithoutSpaces(document.querySelector('.cart__product-price').textContent));
	minusFullPrice(currentPrice);
	printFullPrice();
	document.querySelector('.cart__item').remove();
	printQuantity();
};

productsBtn.forEach(el => {
	el.closest('.catalogue-page__item').setAttribute('data-id', randomId());
	el.addEventListener('click', (e) => {
		let count = 1;
		let self = e.currentTarget;
		let parent = self.closest('.catalogue-page__item');
		let id = parent.dataset.id;
		let img = parent.querySelector('.catalogue-page__img').getAttribute('src');
		let title = parent.querySelector('.catalogue-page__data-name').textContent;
		let priceString = priceWithoutSpaces(parent.querySelector('.catalogue-page__data-price').textContent);
		let priceNumber = parseInt(priceWithoutSpaces(parent.querySelector('.catalogue-page__data-price').textContent));
		let multiPlrice = priceNumber * count;
		plusFullPrice(multiPlrice);
		printFullPrice();
		cartProductsList.insertAdjacentHTML('afterbegin', generateCartProduct(count, img, title, priceString, id));
		printQuantity();
	});
});

cartProductsList.addEventListener('click', (e) => {
	if (e.target.classList.contains('cart__delete')) {
		deleteProducts(e.target.closest('.cart__item'));
	}
});

const modal = new GraphModal({
	isOpen: (modal) => {
		console.log('opened');
		let array = document.querySelector('.cart__list').children;

		for (item of array) {
			console.log(item)
			let title = item.querySelector('.cart__product-name').textContent;
			let priceString = priceWithoutSpaces(item.querySelector('.cart__product-price').textContent);

			let obj = {};
			obj.title = title;
			obj.price = priceString;
			productArray.push(obj);
		}
		let fp = ('Сумма заказа: ' + `${normalPrice(price)} ₽`);
		productArray.push(fp);
		// console.log(productArray);
	},
	isClose: () => {
		console.log('closed');
	}
});

document.querySelector('.order').addEventListener('submit', (e) => {
	e.preventDefault();
	let self = e.currentTarget;
	console.log(self);
	let formData = new FormData(self);
	console.log(formData);

	let name = self.querySelector('[name="Имя"]').value;
	console.log(name  + " :name");

	let tel = self.querySelector('[name="Телефон"]').value;
	console.log(tel + " :tel");

	formData.append('Товары', JSON.stringify(productArray));
	console.log(productArray);

	formData.append('Имя', name);
	formData.append('Телефон', tel);

	let xhr = new XMLHttpRequest();

	xhr.onreadystatechange = function() {

		const thx = document.querySelector('.thx');
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				console.log('Отправлено');
			} else {
				thx.classList.add('is-open');
				console.log('Error!');
			}
		}
	}

	xhr.open('POST', 'mail.php', true);
	xhr.send(formData);

	self.reset();
});

// поиск
function searchOnPage() {
	var searchTerm = document.getElementById('searchInput').value.toLowerCase();
	var elements = document.getElementsByTagName('span');
	var firstFoundElement = null;

	for (var i = 0; i < elements.length; i++) {
	  var elementText = elements[i].textContent.toLowerCase();

	  if (elementText.includes(searchTerm)) {
		elements[i].style.backgroundColor = 'yellow';
		if (firstFoundElement === null) {
		  firstFoundElement = elements[i];
		}
	  } else {
		elements[i].style.backgroundColor = 'inherit'; // Сброс цвета для элементов, не содержащих искомый текст
	  }
	}

	if (firstFoundElement !== null) {
	  var offset = window.innerHeight / 2;
	  var elementPosition = firstFoundElement.getBoundingClientRect().top;
	  window.scrollTo({
		top: elementPosition - offset,
		behavior: "smooth"
	  });
	}
  }