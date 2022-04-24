const burgerBtn = document.querySelector(".hamburger");
const nav = document.querySelector(".nav");
const navUl = document.querySelector(".nav__links");
const allNavLi = document.querySelectorAll(".nav__item");
const footerYear = document.querySelector(".footer__year");

const handleBurger = () => {
	burgerBtn.classList.toggle("is-active");
	navUl.classList.toggle("display-menu");
};

const closeNav = () => {
	navUl.classList.remove("display-menu");
	burgerBtn.classList.remove("is-active");
};

const handleCurrYear = () => {
	const year = new Date().getFullYear();
	footerYear.innerText = year;
};

// $(".portfolio-item").isotope({
// 	itemSelector: ".item",
// 	layoutMode: "fitRows",
// });

$(".portfolio-menu ul li").click(function () {
	$(".portfolio-menu ul li").removeClass("active");
	$(this).addClass("active");

	const selector = $(this).attr("data-filter");
	$(".portfolio-item").isotope({
		filter: selector,
	});
	return false;
});

$(document).ready(function ($) {
	const popup_btn = $(".popup-btn");
	popup_btn.magnificPopup({
		type: "image",
		gallery: {
			enabled: true,
		},
	});
});

$(function () {
	function rescaleCaptcha() {
		const width = $(".g-recaptcha").parent().width();
		let scale;
		if (width < 302) {
			scale = width / 302;
		} else {
			scale = 1.0;
		}

		$(".g-recaptcha").css("transform", "scale(" + scale + ")");
		$(".g-recaptcha").css("-webkit-transform", "scale(" + scale + ")");
		$(".g-recaptcha").css("transform-origin", "0 0");
		$(".g-recaptcha").css("-webkit-transform-origin", "0 0");
	}

	rescaleCaptcha();
	$(window).resize(function () {
		rescaleCaptcha();
	});
});

handleCurrYear();
allNavLi.forEach((li) => li.addEventListener("click", closeNav));
burgerBtn.addEventListener("click", handleBurger);
