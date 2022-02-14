import { postData } from "../services/requests";

const forms = (state) => {
  const form = document.querySelectorAll("form"),
    inputs = document.querySelectorAll("input"),
    upload = document.querySelectorAll(`[name="upload"]`);

  const message = {
    loading: "Загрузка...",
    success: "Спасибо! Скоро мы с вами свяжемся",
    failure: "Что-то пошло не так",
    spinner: "assets/img/spinner.gif",
    ok: "assets/img/ok.png",
    fail: "assets/img/fail.png",
  };

  const path = {
    designer: "assets/server.php",
    question: "assets/question.php",
  };

  const clearInputs = () => {
    inputs.forEach((item) => {
      item.value = "";
    });

    upload.forEach((item) => {
      item.previousElementSibling.textContent = "Файл не выбран";
    });
  };

  upload.forEach((item) => {
    item.addEventListener("input", () => {
      console.log(item.files[0]);
      let dots;
      const arr = item.files[0].name.split(".");
      arr[0].length > 6 ? (dots = "...") : (dots = ".");
      let name = `${arr[0].substring(0, 6)}${dots}${arr[1]}`;
      item.previousElementSibling.style.display = "block";
      item.previousElementSibling.style.position = "absolute";
      item.previousElementSibling.textContent = name;
    });
  });

  form.forEach((item) => {
    item.addEventListener("submit", (e) => {
      e.preventDefault();

      let statusMessage = document.createElement("div");
      statusMessage.classList.add("status");
      item.parentNode.appendChild(statusMessage);

      item.classList.add("animate__animated", "animate__fadeOutUp");
      item.addEventListener(
        "animationend",
        () => {
          item.style.display = "none";
        },
        { once: true }
      );
      //   setTimeout(() => {
      //     item.style.display = "none";
      //   }, 400);

      //Картинка
      let statusImg = document.createElement("img");
      statusImg.setAttribute("src", message.spinner);
      statusImg.classList.add("animate__animated", "animate__fadeInUp");
      statusMessage.appendChild(statusImg);

      let textMessage = document.createElement("div");
      textMessage.textContent = message.loading;
      statusMessage.appendChild(textMessage);

      const formData = new FormData(item);

      console.log(document.getElementById("size"));
      try {
        formData.append("size", document.getElementById("size").value);
        formData.append("material", document.getElementById("material").value);
        formData.append("options", document.getElementById("options").value);
        formData.append(
          "calc-price",
          document.querySelector(".calc-price").textContent
        );
      } catch (error) {
        console.log(error);
      }

      let api;
      item.closest(".popup-design") || item.querySelector(".file_upload")
        ? (api = path.designer)
        : (api = path.question);
      console.log(api);

      postData(api, formData)
        .then((res) => {
          console.log(res);
          console.log("then");
          statusImg.setAttribute("src", message.ok);
          textMessage.textContent = message.success;
        })
        .catch(() => {
          console.log("catch");
          statusImg.setAttribute("src", message.fail);
          textMessage.textContent = message.failure;
        })
        .finally(() => {
          clearInputs();
          setTimeout(() => {
            statusMessage.remove();
            item.classList.remove("animate__fadeOutUp");
            item.classList.add("animate__fadeInUp");
            item.style.display = "block";
          }, 5000);
        });
    });
  });
};

export default forms;
