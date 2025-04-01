import {
  shortcutContainer_store_mask,
  shortcutContainer_store,
} from "@/handler/dom";

import store from "@/store/setting";
import { shortcut_bottom_render } from "./bottom";

import {
  shortcutStoreRender,
  storeControlContainerRender,
  shortcutStoreBottomRender,
  // bottomEditBtnCloseEvent,
  // deleteBtnClostEvent,
  closeEvent,
} from "./store-render";

shortcutContainer_store_mask.addEventListener("click", () => {
  closeEvent("all");
  shortcutContainer_store_mask.classList.remove("show");
  shortcut_bottom_render({ is: store.isBottomShow });
});

shortcutContainer_store.addEventListener("click", (e) => {
  e.stopPropagation();
});

storeControlContainerRender();
shortcutStoreRender();
shortcutStoreBottomRender();
