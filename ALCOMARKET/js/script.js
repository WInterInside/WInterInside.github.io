
var faq__accordion = (function (element) {
	var _getItem = function (elements, className) {
		var element = undefined;
		elements.forEach(function (item) {
		if (item.classList.contains(className)) {
			element = item;
		}
	});
	return element;
	};
	return function () {
	var _mainElement = {},
	_items = {},
	_contents = {};
	var _actionClick = function (e) {
	if (!e.target.classList.contains('faq__accordion-item-header')) {
		return;
	}
	e.preventDefault();
	var header = e.target,
	item = header.parentElement,
	itemActive = _getItem(_items, 'show');
	if (itemActive === undefined) {
		item.classList.add('show');
	} else {
		itemActive.classList.remove('show');
		if (itemActive !== item) {
			item.classList.add('show');
		}
	}
	},
	_setupListeners = function () {
		_mainElement.addEventListener('click', _actionClick);
	};
	return {
		init: function (element) {
			_mainElement = (typeof element === 'string' ? document.querySelector(element) : element);
			_items = _mainElement.querySelectorAll('.faq__accordion-item');
			_setupListeners();
		}
	}
	}
})();

var faq__accordion1 = faq__accordion();
faq__accordion1.init('#faq__accordion');

window.addEventListener("DOMContentLoaded", function() {
  [].forEach.call( document.querySelectorAll('.form__input--tel'), function(input) {
  var keyCode;
  function mask(event) {
      event.keyCode && (keyCode = event.keyCode);
      var pos = this.selectionStart;
      if (pos < 3) event.preventDefault();
      var matrix = "+7 (___) - ___ - __ - __",
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
