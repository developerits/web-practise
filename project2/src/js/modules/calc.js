import { getResource } from "../services/requests";

const calc = () => {
  const sizeBlock = document.querySelector("#size"),
    materialBlock = document.querySelector("#material"),
    optionsBlock = document.querySelector("#options"),
    promocodeBlock = document.querySelector(".promocode"),
    resultBlock = document.querySelector(".calc-price");

  const getData = async () => {
    console.log("Я в гетдата");
    return await getResource("http://localhost:3000/calculate");
    // console.log(data);
  };

  const setValues = (id, i) => {
    getData().then((arr) => {
      switch (id) {
        case "size":
          sizeBlock.setAttribute("value", arr[0].size[i]);
          break;
        case "material":
          materialBlock.setAttribute("value", arr[1].material[i]);
          break;
        case "options":
          optionsBlock.setAttribute("value", arr[2].options[i]);
          break;
        default:
          break;
      }
      calcFunc();
    });
  };

  const calcFunc = () => {
    let sum = 0;

    sum = Math.round(
      +(+sizeBlock.getAttribute("value")) *
        +materialBlock.getAttribute("value") +
        +optionsBlock.getAttribute("value")
    );
    console.log(sum);
    if (
      sizeBlock.getAttribute("value") == 0 ||
      materialBlock.getAttribute("value") == 0
    ) {
      resultBlock.textContent =
        "Пожалуйста, выберете размер и метериал картины";
    } else if (promocodeBlock.value === "IWANTPOPART") {
      resultBlock.textContent = Math.round(sum * 0.7);
    } else {
      resultBlock.textContent = sum;
    }

    // sum = Math.round
    //         +sizeBlock.value * +materialBlock.value + +optionsBlock.value
  };

  sizeBlock.addEventListener("change", (e) => {
    setValues("size", e.currentTarget.selectedIndex);
  });
  materialBlock.addEventListener("change", (e) => {
    setValues("material", e.currentTarget.selectedIndex);
  });
  //
  optionsBlock.addEventListener("change", (e) => {
    setValues("options", e.currentTarget.selectedIndex);
  });

  setValues("size", sizeBlock.selectedIndex);
  setValues("material", materialBlock.selectedIndex);
  setValues("options", optionsBlock.selectedIndex);

  promocodeBlock.addEventListener("input", calcFunc);
};

export default calc;
