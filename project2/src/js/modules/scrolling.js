const scrolling = (Selector) => {
  const upElem = document.querySelector(".pageup");
  const Elem = document.querySelectorAll(Selector);

  window.addEventListener("scroll", () => {
    if (document.documentElement.scrollTop > 1650) {
      upElem.classList.add("animate__animated", "animate__fadeIn");
      upElem.classList.remove("animate__fadeOut");
    } else {
      upElem.classList.add("animate__animated", "animate__fadeOut");
      upElem.classList.remove("animate__fadeIn");
    }
  });

  const element = document.documentElement,
    body = document.body;

  const bindCalcScroll = (elem) => {
    elem.addEventListener("click", calcScroll);
  };

  bindCalcScroll(upElem);
  Elem.forEach((elem) => {
    bindCalcScroll(elem);
  });

  function calcScroll(event) {
    console.log(event);
    console.log(this);
    let scrollTop = Math.round(body.scrollTop || element.scrollTop);

    if (this.hash !== "") {
      console.log(this.hash);
      event.preventDefault();
      let hashElement = document.querySelector(this.hash),
        hashElementTop = 0;

      while (hashElement.offsetParent) {
        hashElementTop += hashElement.offsetTop;
        hashElement = hashElement.offsetParent;
      }

      hashElementTop = Math.round(hashElementTop);
      smoothScroll(scrollTop, hashElementTop, this.hash);
    }
  }

  const smoothScroll = (from, to, hash) => {
    let timeInterval = 1,
      prevScrollTop,
      speed;

    if (to > from) {
      speed = 120;
    } else {
      speed = -60;
    }

    let move = setInterval(() => {
      let scrollTop = Math.round(body.scrollTop || element.scrollTop);

      if (
        prevScrollTop === scrollTop ||
        (to > from && scrollTop >= to) ||
        (to < from && scrollTop <= to)
      ) {
        console.log(
          `Один тик: prevScroll: ${prevScrollTop} scrollTop: ${scrollTop} to: ${to} from: ${from}`
        );
        clearInterval(move);
        history.replaceState(
          history.state,
          document.title,
          location.href.replace(/#.*$/g, "") + hash
        );
      } else {
        console.log("scrollTop: " + scrollTop);
        body.scrollTop += speed;
        element.scrollTop += speed;
        prevScrollTop = scrollTop;
      }
    }, timeInterval);
  };
};

export default scrolling;
