import Swiper from "swiper/bundle";
import "bootstrap/dist/js/bootstrap.min.js";

import "swiper/css/bundle";
import "./assets/scss/all.scss";

document.addEventListener("DOMContentLoaded", () => {
	if (document.querySelector("#home-hero-wrap")) {
		const swiper = new Swiper("#home-hero-wrap .swiper", {
			loop: true,
			autoplay: {
				delay: 5000,
				disableOnInteraction: true,
			},
			effect: "fade",
			navigation: {
				nextEl: "#home-hero-wrap .swiper .swiper-button-next",
				prevEl: "#home-hero-wrap .swiper .swiper-button-prev",
			},
		});
	}

	if (document.querySelector("#hot-course")) {
		const swiper = new Swiper("#hot-course .swiper", {
			loop: true,
			slidesPerView: 2,
			spaceBetween: 24,
			breakpoints: {
				1200: {
					slidesPerView: 3,
					spaceBetween: 24,
				},
			},
			navigation: {
				nextEl: "#hot-course .swiper-button-next",
				prevEl: "#hot-course .swiper-button-prev",
			},
		});
	}

	if (document.querySelector("#home-event")) {
		const swiper = new Swiper("#home-event .swiper", {
			slidesPerView: "auto",
			spaceBetween: 24,
		});
	}

	if (document.querySelector("#home-comments")) {
		const swipers = document.querySelectorAll("#home-comments .swiper");

		swipers.forEach((swiperEl, index) => {
			const swiper = new Swiper(swiperEl, {
				slidesPerView: "auto",
				spaceBetween: 24,
				loop: true,
				centeredSlides: true,
				centeredSlidesBounds: true,
				pauseOnMouseEnter: true,
				freeMode: {
					enabled: true,
					minimumVelocity: 0.05,
					momentumRatio: 1.2,
				},
				autoplay: {
					delay: 3000,
					disableOnInteraction: false,
					reverseDirection: index === 1 ? true : false,
				},
				speed: 5000,
			});
		});
	}

	if (document.querySelector("#home-past-events")) {
		const swiper = new Swiper("#home-past-events .swiper", {
			slidesPerView: "auto",
			spaceBetween: 8,
			centeredSlides: false,
			centeredSlidesBounds: false,
			centerInsufficientSlides: true,
			breakpoints: {
				992: {
					spaceBetween: 24,
					centeredSlides: true,
					centeredSlidesBounds: true,
				},
			},
			freeMode: {
				enabled: true,
				minimumVelocity: 0.05,
				momentumRatio: 1.2,
			},
			speed: 1500,
		});
	}

	if (
		document.querySelector("#course-filters") &&
		document.querySelector("#course-list") &&
		document.querySelector("#dropdownMenuCourse")
	) {
		const rangeTextMap = {
			all: "所有課程",
			kids: "3-6歲",
			children: "7-12歲",
			teenages: "13-16歲",
		};
		const filters = document.querySelectorAll("#course-filters .btn, #dropdownMenuCourse .dropdown-item");
		const courses = document.querySelectorAll("#course-list .col");
		const dropdownButton = document.querySelector("#dropdownMenuCourseButton");

		filters.forEach((filter) => {
			filter.addEventListener("click", (e) => {
				const range = filter.getAttribute("data-range");
				const showClass = range === "all" ? null : range;

				courses.forEach((course) => {
					course.style.display =
						showClass === null || course.getAttribute("data-type") === showClass ? "block" : "none";
				});

				if (dropdownButton) {
					dropdownButton.textContent = rangeTextMap[range] || "按年齡篩選";
				}
			});
		});
	}

	if (document.querySelector("#gallery-group-swiper")) {
    const swiperThumbs = new Swiper("#gallery-group-swiper .gallery-thumbs", {
			loop: true,
			spaceBetween: 8,
			slidesPerView: 5,
			freeMode: true,
			watchSlidesProgress: true,
			lazy: {
				loadPrevNext: true, // 預載鄰近滑塊
				loadPrevNextAmount: 2, // 預載數量
			},
		});

    const swiperTop = new Swiper("#gallery-group-swiper .gallery-top", {
			loop: true,
			spaceBetween: 12,
			navigation: {
				nextEl: "#gallery-group-swiper .gallery-top .swiper-button-next",
				prevEl: "#gallery-group-swiper .gallery-top .swiper-button-prev",
			},
			thumbs: {
				swiper: swiperThumbs,
			},
			lazy: {
				loadPrevNext: true,
				loadPrevNextAmount: 2,
			},
		});
	}

	if (document.querySelector("#mainForm")) {
		const from = document.querySelector("#mainForm");
		const loginSection = document.getElementById("login-section");
		const registerSection = document.getElementById("register-section");
		const changeToRegister = document.getElementById("changeToRegister");
		const changeToLogin = document.getElementById("changeToLogin");
		const loginImage = document.getElementById("loginImage");
		const registerImage = document.getElementById("registerImage");

		// 切換到註冊表單
		changeToRegister.addEventListener("click", () => {
			loginSection.classList.remove("active");
			registerSection.classList.add("active");
			loginImage.classList.remove("active");
			registerImage.classList.add("active");
			setTimeout(() => {
				from.reset();
			}, 500);
		});

		// 切換到登入表單
		changeToLogin.addEventListener("click", () => {
			registerSection.classList.remove("active");
			loginSection.classList.add("active");
			registerImage.classList.remove("active");
			loginImage.classList.add("active");
			setTimeout(() => {
				from.reset();
			}, 500);
		});
	}
});
