const burgerBtn = document.querySelector(".hamburger");
const nav = document.querySelector(".nav");
const navUl = document.querySelector(".nav__links");
const allNavLi = document.querySelectorAll(".nav__item");
const footerYear = document.querySelector(".footer__year");

const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const phoneInput = document.querySelector("#phone");
const msgInput = document.querySelector("#msg");
const contactForm = document.querySelector(".form_html");
const sendBtn = document.querySelector(".contact__form-btn");
const closeBtn = document.querySelector(".close-btn");
const popup = document.querySelector(".pop-up");

const allInputs = [nameInput, emailInput, msgInput];

const checkErrors = () => {
	const allinp = document.querySelectorAll(".contact__form-box");
	let errNo = 0;

	allinp.forEach((input) => {
		if (input.classList.contains("error-active")) {
			errNo++;
		}
	});

	if (!(grecaptcha && grecaptcha.getResponse().length !== 0)) {
		errNo++;
	}

	if (errNo === 0) {
		return true;
	}

	return false;
};

const checkEmail = (email) => {
	const re =
		/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

	if (re.test(email.value)) {
		clearError(email);
	} else {
		printError(email, `Adres email jest niepoprawny`);
	}
};

const checkLength = (input, min) => {
	if (input.value.length < min) {
		printError(input, `${input.name} składa się z min. ${min} znaków`);
	}
};

const printError = (input, msg) => {
	const formBox = input.parentElement;
	formBox.classList.add("error-active");
	const errorP = formBox.querySelector(".error-text");
	errorP.textContent = msg;
};

const clearError = (input) => {
	const formBox = input.parentElement;
	formBox.classList.remove("error-active");
};

const checkCaptcha = () => {
	const captchaP = document.querySelector(".captcha-error-text");
	if (!(grecaptcha && grecaptcha.getResponse().length !== 0)) {
		captchaP.textContent = "Zaznacz antyspam";
		captchaP.classList.add("error-active");
	} else {
		captchaP.classList.remove("error-active");
	}
};

const checkForm = (inputs) => {
	inputs.forEach((input) => {
		if (input.value === "") {
			printError(input, "Puste pole");
		} else {
			clearError(input);
		}
	});
};

const allChecks = () => {
	checkForm(allInputs);
	checkLength(nameInput, 3);
	checkLength(msgInput, 10);
	checkEmail(emailInput);
	checkCaptcha();
	return checkErrors();
};

if (contactForm) {
	contactForm.addEventListener("submit", function (event) {
		event.preventDefault();
		if (!allChecks()) {
			return false;
		}
		let dataString = $(this).serialize();
		$.ajax({
			type: $(this).attr("method"),
			url: $(this).attr("action"),
			data: dataString,
			success: function () {
				popup.firstElementChild.textContent = "Zapytanie zostało wysłane!";
				popup.classList.add("pop-up-show");
			},
			error: function (request, status, error) {
				popup.firstElementChild.textContent = `Wystąpił błąd w trakcie wysyłania: ${request.status}`;
				popup.classList.add("pop-up-show");
			},
		});
	});
}

if (closeBtn) {
	closeBtn.addEventListener("click", (e) => {
		e.preventDefault();
		popup.classList.remove("pop-up-show");
		contactForm.reset();
	});
}

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
		const width = $(".g-recaptcha").parent().parent().width();
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
