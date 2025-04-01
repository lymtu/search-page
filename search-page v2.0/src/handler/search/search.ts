import { toSearch } from "./searchUrlBtn";
import {
  bgContainer,
  searchForm,
  searchUrlBtn,
  searchInput,
  searchClearBtn,
  associationContainer,
  shortcutContainer_bottom,
  settingContainer,
  shortcutStore_btn,
} from "@/handler/dom";

import { associationHandler } from "@/handler/search/association";

import { addMessage } from "@/handler/message/index";

searchForm.addEventListener("submit", (e) => {
  e.preventDefault(); // 阻止默认行为
  const searchValue = searchInput.value;
  if (!searchValue) {
    addMessage({
      type: "warning",
      msg: "请输入搜索内容",
    });
    return false;
  }
  toSearch(searchValue);
});

searchInput.addEventListener("focus", () => {
  bgContainer.classList.add("search-focus");
  associationContainer.classList.add("search-focus");
  searchUrlBtn.classList.add("search-focus");
  shortcutContainer_bottom.classList.add("search-focus");
  settingContainer.classList.add("search-focus");
  shortcutStore_btn.classList.add("search-focus");
});

searchInput.addEventListener("blur", () => {
  bgContainer.classList.remove("search-focus");
  associationContainer.classList.remove("search-focus");
  searchUrlBtn.classList.remove("search-focus");
  shortcutContainer_bottom.classList.remove("search-focus");
  settingContainer.classList.remove("search-focus");
  shortcutStore_btn.classList.remove("search-focus");
});

const inputHandler = () => {
  associationHandler(searchInput);
  if (searchInput.value) {
    searchClearBtn.classList.add("search-clear-btn-show");
  } else {
    searchClearBtn.classList.remove("search-clear-btn-show");
  }
};

searchInput.addEventListener("compositionstart", (e) => {
  e.target?.removeEventListener("input", inputHandler);
});

searchInput.addEventListener("compositionend", (e) => {
  e.target?.addEventListener("input", inputHandler);
  const event = new Event("input", {
    bubbles: true, // 事件是否冒泡
    cancelable: true, // 事件是否可以被取消
  });
  searchInput.dispatchEvent(event);
});

searchInput.addEventListener("input", inputHandler);

document.getElementById("searchBtn")?.addEventListener("mousedown", (e) => {
  e.preventDefault(); // 阻止默认行为
  return false;
});

searchClearBtn.addEventListener("mousedown", (e) => {
  e.preventDefault(); // 阻止默认行为
  if (!searchInput.value) return;
  searchInput.value = "";
  inputHandler();
  return false;
});
