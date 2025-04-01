import { bgContainer } from "@/handler/dom";

bgContainer.addEventListener("contextmenu", (e) => {
  e.preventDefault();
});

export const bgUrl = localStorage.getItem("bg") || "/background.jpg";
export const bgImgRender = (src: string) => {
  bgContainer.replaceChildren();
  const img = document.createElement("img");
  img.src = src;
  bgContainer.appendChild(img);
};

bgImgRender(bgUrl);
