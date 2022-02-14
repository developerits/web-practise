const checkTextInputs = (selector) => {
  const txtInputs = document.querySelectorAll(selector);
  txtInputs.forEach((input) => {
    input.addEventListener("keypress", function (e) {
      if (e.key.match(/[^а-яё 0-9]/gi)) {
        e.preventDefault();
      }
    });

    input.addEventListener("input", (e) => {
      console.log(e);
      if (e.target.value.match(/[^а-яё 0-9]/gi)) {
        e.target.value = "";
      }
    });
  });
};

export default checkTextInputs;
