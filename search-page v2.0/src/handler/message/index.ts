import { messageContainer } from "@/handler/dom";
import store from "@/store/setting";

import tipsImg from "/tips.png";
import warningImg from "/warning.png";
import successImg from "/success.png";

export type MessageType = {
  msg: string;
  type: "success" | "warning" | "tip";
};

export const addMessage = ({ msg, type }: MessageType) => {
  if (!store.isTip) return;
  const item = document.createElement("div");
  item.dataset.type = type;
  item.id = type + "-" + Date.now();

  const img = document.createElement("img");
  img.src =
    type === "success" ? successImg : type === "warning" ? warningImg : tipsImg;
  item.appendChild(img);
  const text = document.createElement("p");
  text.innerText = msg;
  item.appendChild(text);

  messageContainer.appendChild(item);

  setTimeout(() => {
    item.classList.add("fade-out");
    setTimeout(() => {
      item.remove();
    }, 200);
  }, 3000);
};
