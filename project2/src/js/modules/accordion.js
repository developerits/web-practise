const accordion = (triggersSelector, itemsSelector) => {
  const btns = document.querySelectorAll(triggersSelector),
    blocks = document.querySelectorAll(itemsSelector);

  blocks.forEach((block) => {
    block.classList.add("animate__animated", "animate__fadeInDown");
  });

  btns.forEach((btn) => {
    btn.addEventListener("click", function () {
      console.log("обработчие");
      if (!this.classList.contains("active")) {
        btns.forEach((btn) => {
          btn.classList.remove("active", "active-style");
        });
      }

      this.classList.toggle("active");
      this.classList.toggle("active-style");
    });
  });
};

export default accordion;
