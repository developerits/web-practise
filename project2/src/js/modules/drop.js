const drop = () => {
  const fileInputs = document.querySelectorAll(`[name="upload"]`);
  ["dragenter", "dragleave", "dragover", "drop"].forEach((eventName) => {
    fileInputs.forEach((input) => {
      input.addEventListener(eventName, preventDefault);
    });
  });

  function preventDefault(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  function highligth(item) {
    console.log("higligth");
    item.closest(".file_upload").style.border = "5px solid yellow";
    item.closest(".file_upload").style.backgroundColor = "rgba(0,0,0, .7)";
  }

  function unHighligth(item) {
    item.closest(".file_upload").style.border = "none";
    item.closest(".file_upload").style.backgroundColor = "";
  }

  ["dragenter", "dragover"].forEach((eventName) => {
    fileInputs.forEach((input) => {
      input.addEventListener(eventName, () => {
        highligth(input);
      });
    });
  });

  ["dragleave", "drop"].forEach((eventName) => {
    fileInputs.forEach((input) => {
      input.addEventListener(eventName, () => {
        unHighligth(input);
      });
    });
  });

  fileInputs.forEach((input) => {
    input.addEventListener("drop", (e) => {
      input.files = e.dataTransfer.files;
      let dots;
      const arr = input.files[0].name.split(".");
      arr[0].length > 6 ? (dots = "...") : (dots = ".");
      let name = `${arr[0].substring(0, 6)}${dots}${arr[1]}`;
      input.previousElementSibling.textContent = name;
    });
  });
};

export default drop;
