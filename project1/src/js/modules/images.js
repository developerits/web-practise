const images = () => {
  const imgPopup = document.createElement("div"),
    workSection = document.querySelector(".works"),
    bigImage = document.createElement("img");

  imgPopup.classList.add("popup");
  workSection.appendChild(imgPopup);

  imgPopup.style.cssText = `
	justify-content: center;
	align-items: center;
	display: none;
	cursor: pointer;
  `;

  imgPopup.appendChild(bigImage);
  bigImage.addEventListener("mouseover", () => {
    bigImage.style.cursor = "zoom-out";
  });

  workSection.addEventListener("click", (e) => {
    e.preventDefault();
    document.body.style.overflow = "hidden";
    const target = e.target;
    if (target && target.classList.contains("preview")) {
      imgPopup.style.display = "flex";
      const path = target.parentNode.getAttribute("href");
      bigImage.setAttribute("src", path);
    }

    console.log(target);
    if (
      target &&
      (target.matches("div.popup > img") || target.matches("div.popup"))
    ) {
      document.body.style.overflow = "visible";
      imgPopup.style.display = "none";
    }
  });
};

export default images;
