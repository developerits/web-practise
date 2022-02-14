const filter = () => {
  const menu = document.querySelector(".portfolio-menu"),
    items = menu.querySelectorAll("li"),
    wrapper = document.querySelector(".portfolio-wrapper"),
    markAll = wrapper.querySelectorAll(".all"),
    no = document.querySelector(".portfolio-no");

  const typeFilter = (markType) => {
    markAll.forEach((mark) => {
      mark.style.display = "none";
      mark.classList.remove("animate__animated", "animate__fadeIn");
    });

    no.style.display = "none";
    no.classList.remove("animate__animated", "animate__fadeIn");

    if (markType) {
      markType.forEach((mark) => {
        mark.style.display = "block";
        mark.classList.add("animate__animated", "animate__fadeIn");
      });
    } else {
      no.style.display = "block";
      no.classList.add("animate__animated", "animate__fadeIn");
    }
  };

  const bindBtnToEventClick = (btnSelector, markSelector = "") => {
    const btn = menu.querySelector(btnSelector);
    if (markSelector) {
      markSelector = wrapper.querySelectorAll(markSelector);
    }
    btn.addEventListener("click", () => {
      typeFilter(markSelector);
    });
    console.log("выполнилась");
  };

  bindBtnToEventClick(".all", ".all");
  bindBtnToEventClick(".lovers", ".lovers");
  bindBtnToEventClick(".chef", ".chef");
  bindBtnToEventClick(".girl", ".girl");
  bindBtnToEventClick(".guy", ".guy");
  bindBtnToEventClick(".grandmother");
  bindBtnToEventClick(".granddad");

  menu.addEventListener("click", (e) => {
    let target = e.target;
    if (target && target.tagName == "LI") {
      items.forEach((item) => {
        item.classList.remove("active");
      });
      target.classList.add("active");
    }
  });
};

export default filter;
