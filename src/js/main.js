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

$(".portfolio-item").isotope({
	itemSelector: ".item",
	layoutMode: "fitRows",
});

$(".portfolio-menu ul li").click(function () {
	$(".portfolio-menu ul li").removeClass("active");
	$(this).addClass("active");

	const selector = $(this).attr("data-filter");
	$(".portfolio-item").isotope({
		filter: selector,
	});
	return false;
});

$(document).ready(function () {
	const popup_btn = $(".popup-btn");
	popup_btn.magnificPopup({
		type: "image",
		gallery: {
			enabled: true,
		},
	});
});

handleCurrYear();
allNavLi.forEach((li) => li.addEventListener("click", closeNav));
burgerBtn.addEventListener("click", handleBurger);
