import Swiper from "swiper/bundle";
import "bootstrap/dist/js/bootstrap.min.js";

import "swiper/css/bundle";
import "./assets/scss/all.scss";

document.addEventListener("DOMContentLoaded", () => {
  if (document.querySelector("#home-hero-wrap")) {
    const swiper = new Swiper("#home-hero-wrap .swiper", {
      loop: true,
      // autoplay: {
      //   delay: 5000,
      //   disableOnInteraction: true,
      // },
      effect: "fade",
      navigation: {
        nextEl: "#home-hero-wrap .swiper .swiper-button-next",
        prevEl: "#home-hero-wrap .swiper .swiper-button-prev",
      },
    });
  }

  console.log(Swiper);
});
