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
  },
});

document.querySelector(".prev").addEventListener("click", function () {
  slider.goTo("prev");
});

document.querySelector(".next").addEventListener("click", function () {
  slider.goTo("next");
});

const catalogTabs = document.querySelectorAll(".catalog__tab");
const catalogItem = document.querySelectorAll(".catalog__content");
catalogTabs.forEach(onTabClick);

function onTabClick(item) {
  item.addEventListener("click", function () {
    let currentBtn = item;
    let tabId = currentBtn.getAttribute("data-tab");
    let currentTab = document.querySelector(tabId);
    console.log(currentBtn.classList.contains("catalog__tab_active"));
    if (!currentBtn.classList.contains("catalog__tab_active")) {
      catalogTabs.forEach(function (item) {
        item.classList.remove("catalog__tab_active");
      });

      catalogItem.forEach(function (item) {
        item.classList.remove("catalog__content_active");
      });

      currentBtn.classList.add("catalog__tab_active");
      currentTab.classList.add("catalog__content_active");
    }
  });
}
document.querySelector(".catalog__tab").click();

const linkMore = document.querySelectorAll(".catalog-item__link");
linkMore.forEach(onMoreLink);

function onMoreLink(item, i) {
  toggleSlide(item, i);
}

const linkBack = document.querySelectorAll(".catalog-item__back");
linkBack.forEach(onBackLink);

function onBackLink(item, i) {
  toggleSlide(item, i);
}

function toggleSlide(item, i) {
  item.addEventListener("click", function (event) {
    console.log(i);
    event.preventDefault();
    let itemContent = document.querySelectorAll(".catalog-item__content");
    console.log(itemContent);
    itemContent[i].classList.toggle("catalog-item__content_active");

    let itemList = document.querySelectorAll(".catalog-item__list");
    itemList[i].classList.toggle("catalog-item__list_active");
  });
}
