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

    swipers.forEach((swiperEl) => {
      const swiper = new Swiper(swiperEl, {
        slidesPerView: "auto",
        spaceBetween: 24,
        loop: true,
      });
    });
  }
});
