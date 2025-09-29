import "https://font.emtech.cc/emfont.js";
import Swiper from "swiper/bundle";
import AOS from "aos";
import "bootstrap/dist/js/bootstrap.min.js";
import "swiper/css/bundle";
// import "aos/dist/aos.css";
import "./assets/scss/all.scss";

document.addEventListener("DOMContentLoaded", async () => {
	// 初始化 emfont
	emfont.init({
		caseSensitive: true,
		autoApply: false,
		weight: 500,
	});

	const loading = document.getElementById("loading");

	// 函數：提取所有唯一的圖片 URL（<img> 和 background-image）
	function getAllImageUrls() {
		const urls = new Set();

		// 收集 <img> 的 src
		document.querySelectorAll("img").forEach((img) => {
			if (img.src) urls.add(img.src);
		});

		// 收集所有元素的 background-image
		document.querySelectorAll("*").forEach((el) => {
			const style = window.getComputedStyle(el);
			const bg = style.backgroundImage;
			if (bg && bg !== "none") {
				const match = bg.match(/url\(["']?([^"']+)["']?\)/);
				if (match && match[1]) urls.add(match[1]);
			}
		});

		return Array.from(urls);
	}

	// 獲取所有圖片 URL
	const imageUrls = getAllImageUrls();
	// 如果沒有圖片，直接隱藏 Loading 並初始化其他功能
	if (imageUrls.length === 0) {
		loading.classList.add("hidden");
		initializeFeatures();
		return;
	}

	// 創建 Promise 陣列：為每個 URL 載入圖片
	const promises = imageUrls.map((url) => {
		return new Promise((resolve) => {
			const img = new Image();
			img.src = url;
			if (img.complete) return resolve(); // 快取圖片立即解析
			img.addEventListener("load", resolve);
			img.addEventListener("error", resolve); // 錯誤也解析，避免卡住
		});
	});

	// 等待所有圖片載入完成
	try {
		await Promise.all(promises);
		loading.classList.add("hidden");
		initializeFeatures();
	} catch (error) {
		console.error("載入圖片時發生錯誤:", error);
		loading.classList.add("hidden"); // 即使錯誤也隱藏 Loading
		initializeFeatures();
	}

	// 初始化所有其他功能（Swiper、AOS、表單等）
	function initializeFeatures() {
		AOS.init({
			once: true,
			offset: 0,
			duration: 600,
		});

		window.addEventListener("load", () => {
			AOS.refresh();
		});

		// Swiper for #home-hero-wrap
		if (document.querySelector("#home-hero-wrap")) {
			const swiper = new Swiper("#home-hero-wrap .swiper", {
				loop: true,
				autoplay: {
					delay: 8000,
					disableOnInteraction: false,
				},
				effect: "fade",
				navigation: {
					nextEl: "#home-hero-wrap .swiper .swiper-button-next",
					prevEl: "#home-hero-wrap .swiper .swiper-button-prev",
				},
			});
		}

		// Swiper for #hot-course
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

		// Swiper for #home-event
		if (document.querySelector("#home-event")) {
			const swiper = new Swiper("#home-event .swiper", {
				slidesPerView: "auto",
				spaceBetween: 24,
			});
		}

		// Swiper for #home-comments
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

		// Swiper for #home-past-events
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

		// Swiper for #gallery-group-swiper
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

		// 課程篩選邏輯
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

		// 表單切換邏輯
		// if (document.querySelector("#mainForm")) {
		// 	const from = document.querySelector("#mainForm");
		// 	const loginSection = document.getElementById("login-section");
		// 	const registerSection = document.getElementById("register-section");
		// 	const changeToRegister = document.getElementById("changeToRegister");
		// 	const changeToLogin = document.getElementById("changeToLogin");
		// 	const loginImage = document.getElementById("loginImage");
		// 	const registerImage = document.getElementById("registerImage");

		// 	changeToRegister.addEventListener("click", () => {
		// 		loginSection.classList.remove("active");
		// 		registerSection.classList.add("active");
		// 		loginImage.classList.remove("active");
		// 		registerImage.classList.add("active");
		// 		setTimeout(() => {
		// 			from.reset();
		// 		}, 500);
		// 	});

		// 	changeToLogin.addEventListener("click", () => {
		// 		registerSection.classList.remove("active");
		// 		loginSection.classList.add("active");
		// 		registerImage.classList.remove("active");
		// 		loginImage.classList.add("active");
		// 		setTimeout(() => {
		// 			from.reset();
		// 		}, 500);
		// 	});
		// }

    if (document.querySelector("#mainForm")) {
			const from = document.querySelector("#mainForm");
			const loginSection = document.getElementById("login-section");
			const registerSection = document.getElementById("register-section");
			const changeToRegister = document.getElementById("changeToRegister");
			const changeToLogin = document.getElementById("changeToLogin");
			const loginImage = document.getElementById("loginImage");
			const registerImage = document.getElementById("registerImage");

			changeToRegister.addEventListener("click", () => {
				loginSection.classList.remove("active");
				registerSection.classList.add("active");
				loginImage.classList.remove("active");
				registerImage.classList.add("active");
				setTimeout(() => {
					from.reset();
					AOS.refresh(); // 刷新 AOS 以觸發新顯示區塊的動畫
				}, 500);
			});

			changeToLogin.addEventListener("click", () => {
				registerSection.classList.remove("active");
				loginSection.classList.add("active");
				registerImage.classList.remove("active");
				loginImage.classList.add("active");
				setTimeout(() => {
					from.reset();
					AOS.refresh(); // 刷新 AOS 以觸發新顯示區塊的動畫
				}, 500);
			});
		}

		// 密碼輸入邏輯
		if (document.querySelector("#change-password-btn") && document.querySelector("#portfolio-password")) {
			const changePasswordBtn = document.querySelector("#change-password-btn");
			const passwordInput = document.querySelector("#portfolio-password");

			changePasswordBtn.addEventListener("click", (e) => {
				const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
				if (type === "text") {
					passwordInput.setAttribute("type", type);
					passwordInput.disabled = false;
					passwordInput.focus();
					const valLength = passwordInput.value.length;
					passwordInput.setSelectionRange(valLength, valLength);
					changePasswordBtn.textContent = "確定密碼";
				} else {
					passwordInput.value = passwordInput.value.trim();
					passwordInput.setAttribute("type", type);
					passwordInput.disabled = true;
					changePasswordBtn.textContent = "修改密碼";
				}
			});
		}
	}
});
