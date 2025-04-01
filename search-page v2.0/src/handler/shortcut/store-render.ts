import {
  shortcut_all_data,
  allDataIsButtomSwitch,
  type ShortcutListType,
} from "@/store/shortcutData";

import {
  shortcut_bottom_data,
  bottomDataListPush,
  bottomDataListDelete,
  bottomDataListExchange,
  type ShortcutType_bottom_output,
} from "@/store/shortcutData-bottom";

import { addMessage } from "@/handler/message/index";
import deleteAlert from "@/handler/shortcut/deleteAlert/index";
import editAlert from "@/handler/shortcut/editAlert/index";

import {
  shortcutContainer_store,
  shortcutContainer_store_bottomContainer,
} from "@/handler/dom";

export const closeEvent = (
  type: "all" | "addToBottom" | "deleteMode" | "editMode"
) => {
  [
    "#shortcutContainer-store.addToBottom #bottomEditBtn",
    "#shortcutContainer-store.deleteMode .deleteBtn",
    "#shortcutContainer-store.editMode .editBtn",
  ]
    .filter((item) => !item.includes(type))
    .forEach((item) => {
      const dom = document.querySelector(item);
      if (dom) {
        const event = new Event("click", {
          bubbles: true, // 事件是否冒泡
          cancelable: true, // 事件是否可以被取消
        });
        dom.dispatchEvent(event);
      }
    });
};

const storeControlInputEvent = (e: Event) => {
  const keyword: string = (e.target as HTMLInputElement).value;

  if (!keyword) {
    shortcutStoreRender();
  }

  let match_data: ShortcutListType = {};
  for (const key in shortcut_all_data) {
    const { name } = shortcut_all_data[key];
    if (name.includes(keyword)) {
      match_data[key] = shortcut_all_data[key];
    }
  }

  shortcutStoreRender(match_data);
};

export const storeControlContainerRender = () => {
  const container = shortcutContainer_store.children[0];
  const bottomEditBtn = document.createElement("div");
  bottomEditBtn.id = "bottomEditBtn";
  bottomEditBtn.textContent = "选择底部容器内容";
  bottomEditBtn.onclick = () => {
    closeEvent("addToBottom");
    shortcutContainer_store_bottomContainer.classList.toggle("show");
    shortcutContainer_store.classList.toggle("addToBottom");

    bottomEditBtn.textContent =
      bottomEditBtn.textContent == "选择底部容器内容"
        ? "取消选择容器内容"
        : "选择底部容器内容";
  };
  container.appendChild(bottomEditBtn);

  const searchContainer = document.createElement("div");
  searchContainer.classList.add("searchContainer");
  const search = document.createElement("input");
  search.spellcheck = false;
  search.type = "text";
  search.placeholder = "搜索";
  search.addEventListener("compositionstart", () => {
    search.removeEventListener("input", storeControlInputEvent);
  });

  search.addEventListener("compositionend", () => {
    search.addEventListener("input", storeControlInputEvent);
    const event = new Event("input", {
      bubbles: true, // 事件是否冒泡
      cancelable: true, // 事件是否可以被取消
    });
    search.dispatchEvent(event);
  });

  search.addEventListener("input", storeControlInputEvent);

  const clearBtn = document.createElement("button");
  clearBtn.textContent = "清空";
  clearBtn.onmousedown = (e) => {
    e.preventDefault();
  };
  clearBtn.onclick = () => {
    search.value = "";
    const event = new Event("input", {
      bubbles: true, // 事件是否冒泡
      cancelable: true, // 事件是否可以被取消
    });
    search.dispatchEvent(event);
  };

  searchContainer.replaceChildren(search, clearBtn);
  container.appendChild(searchContainer);

  const controlContainer = document.createElement("div");
  controlContainer.className = "controlContainer";

  const addBtn = document.createElement("button");
  addBtn.innerHTML = `<svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 28H24"0 stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 37H24"0 stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 19H40"0 stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 10H40"0 stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M30 33H40"0 stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M35 28L35 38"0 stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  addBtn.onclick = () => {
    editAlert({
      content: "添加快捷方式",
      callback: () => {
        shortcutStoreRender();
      },
    });
  };

  const editBtn = document.createElement("button");
  editBtn.classList.add("editBtn");
  editBtn.innerHTML = `<svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M42 26V40C42 41.1046 41.1046 42 40 42H8C6.89543 42 6 41.1046 6 40V8C6 6.89543 6.89543 6 8 6L22 6"0 stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M14 26.7199V34H21.3172L42 13.3081L34.6951 6L14 26.7199Z" fill="none"0 stroke-width="4" stroke-linejoin="round"/></svg>`;
  editBtn.onclick = () => {
    closeEvent("editMode");
    shortcutContainer_store.classList.toggle("editMode");
  };

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("deleteBtn");
  deleteBtn.innerHTML = `<svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 10V44H39V10H9Z" fill="none"0 stroke-width="4" stroke-linejoin="round"/><path d="M20 20V33"0 stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M28 20V33"0 stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 10H44"0 stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M16 10L19.289 4H28.7771L32 10H16Z" fill="none"0 stroke-width="4" stroke-linejoin="round"/></svg>`;
  deleteBtn.onclick = () => {
    closeEvent("deleteMode");
    shortcutContainer_store.classList.toggle("deleteMode");
  };

  controlContainer.replaceChildren(addBtn, editBtn, deleteBtn);
  container.appendChild(controlContainer);
};

export const shortcutStoreBottomRender = () => {
  shortcutContainer_store_bottomContainer.replaceChildren();
  let dragEndId: string = "";
  for (const index in shortcut_bottom_data) {
    if (!shortcut_bottom_data[index]) continue;
    const { id, name, imgSrc, style } = shortcut_bottom_data[
      index
    ] as unknown as ShortcutType_bottom_output;

    const item = document.createElement("div");
    item.style.setProperty("--i", "1");
    item.classList.add("item");
    item.title = name;
    item.setAttribute("draggable", "true");

    item.ondragstart = (e) => {
      if (!e.dataTransfer) return;
      e.dataTransfer.effectAllowed = "move";
    };

    item.ondragenter = () => {
      dragEndId = id + "";
    };

    item.ondragover = (e) => {
      e.preventDefault();
    };

    item.ondragleave = () => {
      dragEndId = "";
    };

    item.ondragend = () => {
      if (dragEndId) {
        bottomDataListExchange(id + "", dragEndId);
        shortcutStoreBottomRender();
      }
    };

    const img = document.createElement("img");
    img.setAttribute("style", style);
    img.src = imgSrc;
    img.alt = "faild to load";
    item.appendChild(img);

    shortcutContainer_store_bottomContainer.appendChild(item);
  }
};

export const shortcutStoreRender = (
  data: ShortcutListType = shortcut_all_data
) => {
  if (!data && Object.keys(data).length) return;
  const container = shortcutContainer_store.children[1];
  container.replaceChildren();

  container.classList.add("container");
  for (const id in data) {
    const { name, url, style, imgSrc, isBottom } = data[id];
    const item = document.createElement("div");
    item.classList.add("item");
    item.title = name;
    const title = document.createElement("p");
    title.textContent = name;
    const imgContainer = document.createElement("div");
    imgContainer.classList.add("imgContainer");
    const img = document.createElement("img");
    img.style.transform = style;
    img.src = imgSrc;
    img.alt = "faild to load";
    img.onclick = () => {
      window.open(url, name);
    };
    imgContainer.appendChild(img);
    const addToBottomBtn = document.createElement("button");
    addToBottomBtn.setAttribute("data-for", "addToBottom");
    let isButtom_copy = isBottom;
    item.setAttribute("data-isBottom", isButtom_copy + "");
    addToBottomBtn.textContent = isBottom ? "取消" : "选择";
    addToBottomBtn.onclick = () => {
      let isOk: boolean = false;
      if (isButtom_copy) {
        const code = bottomDataListDelete(id);
        if ("msg" in code) {
          addMessage({
            type: "warning",
            msg: code.msg,
          });
        } else {
          isOk = true;
        }
      } else {
        addToBottomBtn.textContent = "取消";
        const code = bottomDataListPush(id);
        if ("msg" in code) {
          addMessage({
            type: "warning",
            msg: code.msg,
          });
        } else {
          isOk = true;
        }
      }

      if (isOk) {
        allDataIsButtomSwitch(id);
        isButtom_copy = !isButtom_copy;
        addToBottomBtn.textContent = isButtom_copy ? "取消" : "选择";
        item.setAttribute("data-isBottom", isButtom_copy + "");
        shortcutStoreBottomRender();
      }
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.setAttribute("data-for", "deleteMode");
    deleteBtn.textContent = "删除";
    deleteBtn.onclick = () => {
      deleteAlert({
        content: "确定要删除吗？",
        id,
        name,
        url,
        callback: () => {
          shortcutStoreRender();
        },
      });
    };

    const editBtn = document.createElement("button");
    editBtn.setAttribute("data-for", "editMode");
    editBtn.textContent = "编辑";
    editBtn.onclick = () => {
      editAlert({
        content: "编辑",
        id,
        ...data[id],
        callback: () => {
          shortcutStoreRender();
        },
      });
    };

    item.replaceChildren(imgContainer, title, addToBottomBtn, deleteBtn, editBtn);
    container.appendChild(item);
  }
};
