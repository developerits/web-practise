document.querySelector(".menu__close").addEventListener("click", function () {
  document.querySelector(".menu").classList.remove("active");
});

document.querySelector(".hamburger").addEventListener("click", function () {
  document.querySelector(".menu").classList.add("active");
});
