import modals from "./modules/modals";
import { WOW } from "wowjs";

window.addEventListener("DOMContentLoaded", () => {
  "use strict";
  const wow = new WOW({ live: false });
  wow.init();
  modals();
});
