document.querySelector(".menu__close").addEventListener("click", function () {
  document.querySelector(".menu").classList.remove("active");
});

document.querySelector(".hamburger").addEventListener("click", function () {
  document.querySelector(".menu").classList.add("active");
});

const counters = document.querySelectorAll(".technology__progress-text"),
  lines = document.querySelectorAll(".technology__progress-orange");

counters.forEach((item, i) => {
  lines[i].style.width = item.innerHTML;
});
