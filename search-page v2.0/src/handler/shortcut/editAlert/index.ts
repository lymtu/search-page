import { app } from "@/handler/dom";

import { shortcut_all_data, type ShortcutType } from "@/store/shortcutData";

import { addMessage } from "@/handler/message";
import transformStyleTranslateHandler from "@/tools/transformStyleTranslateHandler";

export type Item = {
  content: string;
  id: string;
  name: string;
  url: string;
  callback: () => void;
};

const editAlert = (
  data: (Item & ShortcutType) | { content: string; callback: () => void }
) => {
  const mask = document.createElement("div");
  mask.classList.add("mask", "edit");

  const box = document.createElement("div");

  const text = document.createElement("p");
  text.textContent = data.content;

  const main = document.createElement("div");
  main.classList.add("alert-main");
  const nameContainer = document.createElement("div");
  const nameLable = document.createElement("label");
  nameLable.textContent = "网站名称：";
  nameLable.htmlFor = "edit-name";
  const nameInput = document.createElement("input");
  nameInput.id = "edit-name";
  nameInput.type = "text";
  nameInput.value = "";
  nameInput.spellcheck = false;
  nameContainer.replaceChildren(nameLable, nameInput);

  const urlContainer = document.createElement("div");
  const urlLable = document.createElement("label");
  urlLable.textContent = "网站地址：";
  urlLable.htmlFor = "edit-url";
  const urlInput = document.createElement("input");
  urlInput.id = "edit-url";
  urlInput.type = "text";
  urlInput.value = "";
  urlInput.spellcheck = false;
  urlContainer.replaceChildren(urlLable, urlInput);

  const imgInfoContainer = document.createElement("div");
  const imgLable = document.createElement("label");
  imgLable.textContent = "网站图标：";
  imgLable.htmlFor = "edit-img";
  const imgInput = document.createElement("input");
  imgInput.id = "edit-img";
  imgInput.type = "text";
  imgInput.value = "";
  imgInput.spellcheck = false;
  imgInput.addEventListener("input", () => {
    if (imgInput.value) {
      img_styleContainer.style.display = "block";
      img.src = imgInput.value;
      return;
    }
    img_styleContainer.style.display = "none";
  });
  const img_styleContainer = document.createElement("div");
  img_styleContainer.style.display = "none";
  img_styleContainer.classList.add("img-style-container");
  const imgContainer = document.createElement("div");
  const img = document.createElement("img");
  img.src = "";
  img.alt = "faild to load";
  imgContainer.appendChild(img);
  const styleContainer = document.createElement("div");
  const xyContainer = document.createElement("div");
  xyContainer.classList.add("xy-container");
  const xlabel = document.createElement("label");
  xlabel.textContent = "x轴偏移量：";
  xlabel.htmlFor = "edit-x";
  const xInput = document.createElement("input");
  xInput.id = "edit-x";
  xInput.type = "number";
  xInput.value = "0";
  xInput.addEventListener("input", () => {
    img.style.transform = transformStyleTranslateHandler({
      x: +xInput.value,
      y: +yInput.value,
      scale: +scaleInput.value,
    });
  });
  const ylabel = document.createElement("label");
  ylabel.textContent = "y轴偏移量：";
  ylabel.htmlFor = "edit-y";
  const yInput = document.createElement("input");
  yInput.id = "edit-y";
  yInput.type = "number";
  yInput.value = "0";
  yInput.addEventListener("input", () => {
    img.style.transform = transformStyleTranslateHandler({
      x: +xInput.value,
      y: +yInput.value,
      scale: +scaleInput.value,
    });
  });
  xyContainer.replaceChildren(xlabel, xInput, ylabel, yInput);
  const scaleContainer = document.createElement("div");
  scaleContainer.classList.add("scale-container");
  const scalelabel = document.createElement("label");
  scalelabel.textContent = "缩放比例：";
  scalelabel.htmlFor = "edit-scale";
  const scaleInput = document.createElement("input");
  scaleInput.id = "edit-scale";
  scaleInput.type = "number";
  scaleInput.value = "1";
  scaleInput.addEventListener("input", () => {
    img.style.transform = transformStyleTranslateHandler({
      x: +xInput.value,
      y: +yInput.value,
      scale: +scaleInput.value,
    });
  });
  scaleContainer.replaceChildren(scalelabel, scaleInput);
  styleContainer.replaceChildren(xyContainer, scaleContainer);

  img_styleContainer.replaceChildren(imgContainer, styleContainer);
  imgInfoContainer.replaceChildren(imgLable, imgInput, img_styleContainer);

  if ("name" in data) {
    nameInput.value = data.name;
    urlInput.value = data.url;
    imgInput.value = data.imgSrc;
    img_styleContainer.style.display = "flex";
    img.src = data.imgSrc;
    img.style.transform = data.style;
    xInput.value = transformStyleTranslateHandler(data.style)[0];
    yInput.value = transformStyleTranslateHandler(data.style)[1];
    scaleInput.value = transformStyleTranslateHandler(data.style)[2];
  }

  main.replaceChildren(nameContainer, urlContainer, imgInfoContainer);

  const btnContainer = document.createElement("div");
  const btn = document.createElement("button");
  btn.textContent = "确定";
  btn.addEventListener("click", () => {
    const name = nameInput.value;
    const url = urlInput.value;
    const imgSrc = imgInput.value;

    if (!name || !url || !imgSrc) {
      addMessage({
        type: "tip",
        msg: "请填写完整",
      });
      return;
    }

    if ("id" in data) {
      shortcut_all_data[data.id] = {
        ...shortcut_all_data[data.id],
        style: transformStyleTranslateHandler({
          x: +xInput.value,
          y: +yInput.value,
          scale: +scaleInput.value,
        }),
        name,
        url,
        imgSrc,
      };
    } else {
      shortcut_all_data[Date.now().toString()] = {
        name,
        url,
        imgSrc,
        style: transformStyleTranslateHandler({
          x: +xInput.value,
          y: +yInput.value,
          scale: +scaleInput.value,
        }),
        isBottom: false,
      };
    }

    data.callback?.();
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

export default editAlert;
