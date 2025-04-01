import { app } from "@/handler/dom";

import { addMessage } from "@/handler/message/index";

import { bgUrl, bgImgRender } from "./index";

export default () => {
  const mask = document.createElement("div");
  mask.classList.add("mask", "bg");

  const box = document.createElement("div");
  const title = document.createElement("p");
  title.textContent = "更换背景";

  const main = document.createElement("div");
  main.classList.add("alert-main");

  const inputContainer = document.createElement("div");
  const inputLable = document.createElement("label");
  inputLable.textContent = "图片地址：";
  inputLable.htmlFor = "bg-url";
  const input = document.createElement("input");
  input.id = "bg-url";
  input.type = "text";
  input.value = bgUrl;
  input.addEventListener("input", (e) => {
    const url = (e.target as HTMLInputElement).value;
    if (url) {
      img.src = url;
      img.style.display = "block";
    } else {
      img.style.display = "none";
    }
  });
  input.spellcheck = false;
  inputContainer.replaceChildren(inputLable, input);
  main.appendChild(inputContainer);

  let x_0: number, y_0: number;
  let x: number, y: number;
  let x_last: number = 0,
    y_last: number = 0;

  const imgMoveEvent = (e: MouseEvent) => {
    const { clientX: x_1, clientY: y_1 } = e;
    x = x_1 - x_0 + x_last;
    y = y_1 - y_0 + y_last;
    img.style.transform = `translate(${x}px, ${y}px)`;
  };

  const imgScrollEvent = (e: WheelEvent) => {
    const { deltaX, deltaY } = e;
    x_last += deltaX;
    y_last += deltaY;
    img.style.transform = `translate(${x_last}px, ${y_last}px)`;
  };

  const bgImgContainer = document.createElement("div");
  bgImgContainer.classList.add("bg-img-container");
  bgImgContainer.addEventListener("mousedown", (e) => {
    e.preventDefault();
    ({ clientX: x_0, clientY: y_0 } = e);
    bgImgContainer.addEventListener("mousemove", imgMoveEvent);
    bgImgContainer.addEventListener("wheel", imgScrollEvent, {
      passive: false,
    });
  });
  bgImgContainer.addEventListener("mouseup", (e) => {
    e.preventDefault();
    x_last = x;
    y_last = y;
    bgImgContainer.removeEventListener("mousemove", imgMoveEvent);
  });
  const img = document.createElement("img");
  img.src = bgUrl;
  img.alt = "faild to load";
  let timeout: null | NodeJS.Timeout = null;
  img.onerror = () => {
    timeout && clearTimeout(timeout);
    timeout = setTimeout(() => {
      addMessage({
        type: "warning",
        msg: "图片加载失败",
      });
      img.style.display = "none";
    }, 500);
  };
  img.onload = () => {
    console.clear();
  };

  bgImgContainer.appendChild(img);
  main.appendChild(bgImgContainer);

  const btnContainer = document.createElement("div");
  const cancel = document.createElement("button");
  cancel.textContent = "取消";
  cancel.addEventListener("click", () => {
    mask.remove();
  });
  const btn = document.createElement("button");
  btn.textContent = "确定";
  btn.addEventListener("click", () => {
    const url = input.value;
    if (url) {
      localStorage.setItem("bg", url);
      bgImgRender(url);
      mask.remove();
    } else {
      addMessage({
        type: "warning",
        msg: "请输入图片地址",
      });
    }
  });
  btnContainer.replaceChildren(cancel, btn);

  box.replaceChildren(title, main, btnContainer);
  mask.appendChild(box);
  app.appendChild(mask);
};
