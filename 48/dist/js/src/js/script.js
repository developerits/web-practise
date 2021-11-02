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

//Modal
$(document).ready(function () {
  $("[data-modal=consultation]").on("click", function () {
    $(".overlay, #consultation").fadeIn("fast");
  });

  $(".modal__close").on("click", function () {
    $(".overlay, #consultation, #thanks, #order").fadeOut("fast");
  });

  $(".button_mini").each(function (i) {
    $(this).on("click", function () {
      $("#order .modal__descr").text($(".catalog-item__subtitle").eq(i).text());
      $(".overlay, #order").fadeIn("fast");
    });
  });

  function valideForms(form) {
    $(form).validate({
      rules: {
        name: "required",
        phone: "required",
        email: {
          required: true,
          email: true,
        },
      },

      messages: {
        name: "Пожалуйста, введите своё имя",
        phone: "Пожалуйста, введите свой номер телефона",
        email: {
          required: "Пожалуйста, введите свою почту",
          email: "Неправильно введён адрес почты",
        },
      },
    });
  }

  valideForms("#order form");
  valideForms("#consultation-form");
  valideForms("#consultation form");
});

document.querySelectorAll(".input-phone").forEach(function (el) {
  new Cleave(el, { phone: true, phoneRegionCode: "ru" });
});

const forms = document.querySelectorAll("form");
forms.forEach(function (el) {
  el.addEventListener("submit", function (event) {
    event.preventDefault();
    // Указываем путь до файла на сервере, который будет обрабатывать наш запрос
    const url = "../mailer/smart.php";
    let formData = new FormData(el);
    console.log(getQueryString(formData));
    /* Указываем что соединение	у нас будет POST, говорим что путь к файлу в переменной url, и что запрос у нас
асинхронный, по умолчанию так и есть не стоит его указывать, еще есть 4-й параметр пароль авторизации, но этот
	параметр тоже необязателен.*/
    // отправим данные
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.send(formData);
    let inputField = document.querySelectorAll("form input");

    el.reset();

    document.querySelector(".catalog__tab").click();

    $("#consultation, #order").fadeOut("fast");
    $(".overlay, #thanks").fadeIn("fast");

    xhr.onload = () => alert(xhr.response);
  });
});

function getQueryString(formData) {
  var pairs = [];
  for (var [key, value] of formData.entries()) {
    pairs.push(encodeURIComponent(key) + "=" + encodeURIComponent(value));
  }
  return pairs.join("&");
}

//Smooth scroll and pageUp

window.addEventListener("scroll", function () {
  // нижняя граница документа
  let windowRelativeBottom =
    document.documentElement.getBoundingClientRect().bottom;

  // если пользователь прокрутил достаточно далеко (< 100px до конца)
  if (windowRelativeBottom < document.documentElement.clientHeight + 700) {
    $(".pageup").fadeIn();
  } else {
    $(".pageup").fadeOut();
  }
});

new WOW().init();
