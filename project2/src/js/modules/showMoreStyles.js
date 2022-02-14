import { getResource } from "../services/requests";

const showMoreStyles = (trigger, wrapper) => {
  const btn = document.querySelector(trigger);

  btn.addEventListener("click", function () {
    getResource("http://localhost:3000/styles")
      .then((res) => createCards(res))
      .catch((e) => createCards(e));
    this.remove();
  });

  function createCards(response) {
    console.dir(response);
    if (response instanceof Error) {
      let card = document.createElement("div");
      console.log("Error");
      card.textContent = `Ошибка загрузки: ${response.message}`;
      card.style.textAlign = "center";
      console.dir(card);
      document.querySelector(wrapper).appendChild(card);
      return;
    }
    response.forEach(({ src, title, link }) => {
      let card = document.createElement("div");
      card.classList.add(
        "col-sm-3",
        "col-sm-offset-0",
        "col-xs-10",
        "col-xs-offset-1",
        "animate__animated",
        "animate__fadeInUp"
      );

      card.innerHTML = `<div class=styles-block>
	  <img src=${src} alt="style">
	  <h4>${title}</h4>
	  <a href=${link}>Подробнее</a>
  </div>`;

      document.querySelector(wrapper).appendChild(card);
    });
  }
};

export default showMoreStyles;
