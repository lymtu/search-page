import { app } from "@/handler/dom";

import { shortcut_all_data } from "@/store/shortcutData";

import { addMessage } from "@/handler/message";

export type Item = {
  content: string;
  id: string;
  name: string;
  url: string;
  callback: () => void;
};

const deleteAlert = ({ content, id, name, url, callback }: Item) => {
  const mask = document.createElement("div");
  mask.classList.add("mask", "delete");
  mask.addEventListener("click", (e) => {
    if (e.target === mask) {
      mask.remove();
    }
  });

  const box = document.createElement("div");

  const text = document.createElement("p");
  text.textContent = content;

  const main = document.createElement("div");
  main.classList.add("alert-main");
  const nameContainer = document.createElement("div");
  const nameLable = document.createElement("p");
  nameLable.textContent = "网站名称：";
  const nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.value = name;
  nameInput.readOnly = true;
  nameContainer.replaceChildren(nameLable, nameInput);

  const urlContainer = document.createElement("div");
  const urlLable = document.createElement("p");
  urlLable.textContent = "网站地址：";
  const urlInput = document.createElement("input");
  urlInput.type = "text";
  urlInput.value = url;
  urlInput.readOnly = true;
  urlContainer.replaceChildren(urlLable, urlInput);

  main.replaceChildren(nameContainer, urlContainer);

  const btnContainer = document.createElement("div");
  const btn = document.createElement("button");
  btn.textContent = "确定";
  btn.addEventListener("click", () => {
    const msg = delete shortcut_all_data[id];
    if (msg) {
      addMessage({
        type: "success",
        msg: "删除" + name + "成功",
      });
      callback();
    }
    mask.remove();
  });

  const close = document.createElement("button");
  close.textContent = "取消";
  close.addEventListener("click", () => {
    mask.remove();
  });

  btnContainer.replaceChildren(close, btn);

  box.replaceChildren(text, main, btnContainer);
  mask.appendChild(box);
  app.appendChild(mask);
};

export default deleteAlert;
