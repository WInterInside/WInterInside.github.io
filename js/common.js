$(function() {

$('input[type=tel]').mask('+7 (999) 999-99-99');

$('.fancybox').fancybox();

$('.js-modal-open').click(function(e) {
	e.preventDefault();
	$('body').addClass('overflow-hidden');
	$( $(this).attr('href') ).fadeIn();
});

$('.modal__close').click(function() {
	$('body').removeClass('overflow-hidden');
	$(this).parents('.modal').fadeOut();
});

$('.modal').click(function(e) {
	let modal = $(this).find('.modal__box');
	if (modal.is(e.target) || modal.has(e.target).length > 0) return;
	$('body').removeClass('overflow-hidden');
	$(this).fadeOut();
});

$('.tabs__content').hide();
$('.tabs__content:first').show();
$('.tabs__list li:first').addClass('active');
$('.tabs__list li').click(function(event) {
	event.preventDefault();
	let parent = $(this).parents('.tabs');
	parent.find('.tabs__list li').removeClass('active');
	$(this).addClass('active');
	parent.find('.tabs__content').hide();
	var selectTab = $(this).find('a').attr("href");
	$(selectTab).fadeIn();
	$('html, body').animate({
		scrollTop: $( selectTab ).offset().top - 50
	}, 1000);
});

$(window).scroll(function () {
	if ($(this).scrollTop() > 0) {
		$('.scroll-top').fadeIn(200);
	} else {
		$('.scroll-top').fadeOut(200);
	}
});

$('.scroll-top').click(function() {
	$('html, body').animate({scrollTop: 0}, 1000);
});

$('.js-scroll-link').click(function(e) {
	e.preventDefault();
	$('html, body').animate({
		scrollTop: $( $(this).attr('href') ).offset().top
	}, 1000);
});

$('.header__toggle').click(function() {
	$(this).toggleClass('active');
	$('.header__list-wrap').slideToggle();
});

});
