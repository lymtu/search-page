import { shortcut_bottom_render } from "@/handler/shortcut/bottom";

export type Store = {
  isTip: boolean;
  isAssociation: boolean;
  isBottomShow: boolean;
};

let localStore: Store = JSON.parse(
  window.localStorage.getItem("store") || "{}"
);

if (Object.keys(localStore).length === 0) {
  localStore = {
    isTip: true,
    isAssociation: true,
    isBottomShow: true,
  };
}

const store = new Proxy(localStore, {
  set: (target: Store, key: keyof Store, value) => {
    target[key] = value;
    window.localStorage.setItem("store", JSON.stringify(target));
    if (key == "isBottomShow") {
      shortcut_bottom_render({ is: target.isBottomShow });
    }

    return true;
  },
});

shortcut_bottom_render({ is: localStore.isBottomShow });

export default store;
