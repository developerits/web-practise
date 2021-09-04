// $(document).ready(function () {
//   $(".carousel__inner").slick({
//     dots: true,
//     speed: 1500,
//     prevArrow:
//       '<button type="button" class="slick-prev"><img src="icons/prev.png"></button>',
//     nextArrow:
//       '<button type="button" class="slick-next"><img src="icons/next.png"></button>',
//     responsive: [
//       {
//         breakpoint: 768,
//         settings: {
//           infinite: true,
//           dots: true,
//           arrows: false,
//         },
//       },
//     ],
//   });
// });
const slider = tns({
  container: ".carousel__inner",
  items: 1,
  slideBy: "page",
  autoplay: false,
  controls: false,
  nav: false,
  responsive: {
    640: {
      edgePadding: 20,
      gutter: 20,
      items: 1,
    },
    700: {
      gutter: 30,
    },
    900: {
      items: 1,
    },
  },
});

document.querySelector(".prev").addEventListener("click", function () {
  slider.goTo("prev");
});

document.querySelector(".next").addEventListener("click", function () {
  slider.goTo("next");
});
