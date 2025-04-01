import store from "./setting";

import {
  type ShortcutType,
  type ShortcutListType,
  shortcut_all_data,
} from "./shortcutData";

export type ShortcutType_bottom = keyof ShortcutListType;
export type ShortcutType_bottom_output = {
  id: keyof ShortcutListType;
  imgSrc: ShortcutType["imgSrc"];
  name: ShortcutType["name"];
  url: ShortcutType["url"];
  style: ShortcutType["style"];
};

let local_bottom_data: ShortcutType_bottom[] = JSON.parse(
  window.localStorage.getItem("shortcut_bottom_data") || "[]"
);

if (local_bottom_data.length == 0) {
  local_bottom_data = ["1", "2", "3", "4", "5", "6", "7", "8"];
}

export const shortcut_bottom_data = new Proxy(local_bottom_data, {
  get(
    target: ShortcutType_bottom[],
    key: number | string | symbol
  ): undefined | ShortcutType_bottom_output {
    const target_id = target[key as number];

    if (!target_id) {
      return undefined;
    }
    const target_all_data = shortcut_all_data[target_id];

    if (!target_all_data) {
      return undefined;
    }
    return {
      id: target_id + "",
      imgSrc: target_all_data.imgSrc,
      name: target_all_data.name,
      url: target_all_data.url,
      style: target_all_data.style,
    };
  },
  set(
    target: ShortcutType_bottom[],
    key: number | string | symbol,
    value: ShortcutType_bottom
  ) {
    target[key as number] = value;
    if (target[1] == undefined) {
      store.isBottomShow = false;
    }
    localStorage.setItem("shortcut_bottom_data", JSON.stringify(target));
    return true;
  },
});

export const bottomDataListPush = (
  id: string
): ShortcutType_bottom[] | { is: false; msg: string } => {
  let index: number = -1;
  for (let i = 0; i < Object.keys(shortcut_bottom_data).length; i++) {
    const item = shortcut_bottom_data[
      i
    ] as unknown as ShortcutType_bottom_output;
    if (!item) {
      index = i;
      break;
    }

    if (item.id == id) {
      return { is: false, msg: "item已存在！" };
    }
  }

  if (index == -1) {
    return { is: false, msg: "list已满！" };
  }

  shortcut_bottom_data[index] = id;

  return shortcut_bottom_data;
};

export const bottomDataListDelete = (
  id: keyof ShortcutListType
): ShortcutType_bottom[] | { is: false; msg: string } => {
  let isExist: boolean = false;

  for (let i = 0; i < Object.keys(shortcut_bottom_data).length; i++) {
    const item = shortcut_bottom_data[
      i
    ] as unknown as ShortcutType_bottom_output;

    if (isExist) {
      shortcut_bottom_data[i - 1] = item?.id == undefined ? "" : item.id;
      if (i == Object.keys(shortcut_bottom_data).length - 1) {
        shortcut_bottom_data[i] = "";
      }
    }

    if (item?.id && item.id == id) {
      isExist = true;
      if (i == Object.keys(shortcut_bottom_data).length - 1) {
        shortcut_bottom_data[i] = "";
      }
    }
  }

  if (!isExist) {
    return { is: false, msg: "item不存在！" };
  }

  return shortcut_bottom_data;
};

export const bottomDataListExchange = (
  a_id: string,
  b_id: string
): ShortcutType_bottom[] | { is: false; msg: string } => {
  let isExist: number = 0;
  for (let i = 0; i < Object.keys(shortcut_bottom_data).length; i++) {
    const item = shortcut_bottom_data[
      i
    ] as unknown as ShortcutType_bottom_output;

    if (!item) {
      break;
    }

    if ([a_id, b_id].includes(item.id as string)) {
      isExist++;
      continue;
    }
  }

  if (isExist != 2) {
    return { is: false, msg: "item不存在！" };
  }

  for (let i = 0; i < Object.keys(shortcut_bottom_data).length; i++) {
    const item = shortcut_bottom_data[
      i
    ] as unknown as ShortcutType_bottom_output;

    if (!item) {
      break;
    }

    if (item.id == a_id) {
      shortcut_bottom_data[i] = b_id;
      continue;
    }

    if (item.id == b_id) {
      shortcut_bottom_data[i] = a_id;
    }
  }

  return shortcut_bottom_data;
};
