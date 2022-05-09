const modals = (state) => {
  let btnPressed = false;

  function bindModal(
    triggerSelector,
    modalSelector,
    closeSelector,
    destroy = false
  ) {
    const trigger = document.querySelectorAll(triggerSelector),
      modal = document.querySelector(modalSelector),
      close = document.querySelector(closeSelector),
      windows = document.querySelectorAll("[data-modal]"),
      scroll = calcScroll();

    trigger.forEach((item) => {
      item.addEventListener("click", (e) => {
        if (e.target) {
          e.preventDefault();
        }

        btnPressed = true;
        // console.log(document.querySelector(".popup_calc_button"));
        // if (
        //   !("form" in state) &&
        //   getComputedStyle(document.querySelector(".popup_calc")).display ===
        //     "block"
        // ) {
        //   if (!item.querySelector("[data-statusKey]")) {
        //     let statusKey = document.createElement("div");
        //     statusKey.classList.add("status");
        //     statusKey.setAttribute("data-statusKey", "true");
        //     statusKey.textContent = "Выберите форму окна";
        //     item.appendChild(statusKey);
        //     setTimeout(() => {
        //       statusKey.remove();
        //     }, 2000);
        //   }
        //   return;
        // }

        if (destroy) {
          item.remove();
        }

        windows.forEach((item) => {
          item.style.display = "none";
          item.classList.add("animate__animated", "animate__fadeIn");
        });

        modal.style.display = "block";
        document.body.style.overflow = "hidden";
        document.body.style.marginRight = `${scroll}px`;
      });
    });

    close.addEventListener("click", () => {
      windows.forEach((item) => {
        item.style.display = "none";
      });

      modal.style.display = "none";
      document.body.style.overflow = "";
      document.body.style.marginRight = `0px`;
    });

    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        windows.forEach((item) => {
          item.style.display = "none";
        });
        modal.style.display = "none";
        document.body.style.marginRight = `${scroll}px`;
        document.body.style.overflow = "";
      }
    });
  }

  function showModalByTime(selector, time) {
    setTimeout(() => {
      let display;

      document.querySelectorAll("[data-modal]").forEach((item) => {
        if (getComputedStyle(item).display !== "none") {
          display = "block";
        }
      });

      if (!display) {
        document.querySelector(selector).style.display = "block";
        document.body.style.overflow = "hidden";
        let scroll = calcScroll();
        document.body.style.marginRight = `${scroll}px`;
      }
    }, time);
  }

  function calcScroll() {
    let div = document.createElement("div");

    div.style.width = "50px";
    div.style.height = "50px";
    div.style.overflowY = "scroll";
    div.style.visibility = "hidden";

    document.body.appendChild(div);
    let scrollWidth = div.offsetWidth - div.clientWidth;
    div.remove();

    return scrollWidth;
  }

  function openByScroll(selector) {
    window.addEventListener("scroll", () => {
      let scrollHeight = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight
      );
      console.log(window.pageYOffset + document.documentElement.clientHeight);
      console.log(document.documentElement.scrollHeight);

      if (
        !btnPressed &&
        window.pageYOffset + document.documentElement.clientHeight >=
          scrollHeight - 50
      ) {
        document.querySelector(selector).click();
      }
    });
  }

  bindModal(".button-design", ".popup-design", ".popup-design .popup-close");
  bindModal(
    ".button-consultation",
    ".popup-consultation",
    ".popup-consultation .popup-close"
  );
  bindModal(".fixed-gift", ".popup-gift", ".popup-gift .popup-close", true);

  openByScroll(".fixed-gift");
  // showModalByTime(".popup-consultation", 5000);
};

export default modals;
