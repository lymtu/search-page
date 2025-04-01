export type ShortcutType = {
  name: string;
  url: string;
  style: string;
  imgSrc: string;
  isBottom: boolean;
};

export type ShortcutListType = {
  [key: string]: ShortcutType;
};

const local_all_data: ShortcutListType = window.localStorage.getItem(
  "shortcut_all_data"
)
  ? JSON.parse(window.localStorage.getItem("shortcut_all_data") as string)
  : {
      "1": {
        name: "bilibili",
        url: "https://www.bilibili.com/",
        style: "translate(0, 0) scale(1)",
        imgSrc:
          "https://tse2-mm.cn.bing.net/th/id/OIP-C.49ZbzO9RA-ns3B_6I1w2wAHaHa?w=176&h=180&c=7&r=0&o=5&pid=1.7",
        isBottom: true,
      },
      "2": {
        name: "有道翻译",
        url: "https://fanyi.youdao.com/index.html#/",
        style: "translate(0, 0) scale(1)",
        imgSrc:
          "https://ts1.cn.mm.bing.net/th?id=OIP-C.BHq5lvJU_rCRsMqBeK_DWQHaHa&w=175&h=185&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2",
        isBottom: true,
      },
      "3": {
        name: "React Api",
        url: "https://react.docschina.org/reference/react",
        style: "translate(0, 0) scale(0.7)",
        imgSrc:
          "https://tse3-mm.cn.bing.net/th/id/OIP-C.swkWTqCj7NWt2Sb5K71X8QHaHa?rs=1&pid=ImgDetMain",
        isBottom: true,
      },
      "4": {
        name: "MDN",
        url: "https://developer.mozilla.org/zh-CN/",
        style: "translate(0,0) scale(1.25)",
        imgSrc:
          "https://www.zdnet.com/a/img/resize/44cb4343f342b683972621a6113a88cbaeff547e/2022/03/01/33b5e401-651b-4108-8fcf-6b6fa5670039/screen-shot-2022-03-01-at-11-24-49-am.png?width=770&height=578&fit=crop&format=pjpg&auto=webp",
        isBottom: true,
      },
      "5": {
        name: "React Router",
        url: "https://baimingxuan.github.io/react-router6-doc/start/tutorial",
        style: "translate(0, 0) scale(0.8)",
        imgSrc:
          "https://tse4-mm.cn.bing.net/th/id/OIP-C.tUj-2mmaCmlgk-2o4p7-wwHaHa?rs=1&pid=ImgDetMain",
        isBottom: true,
      },
      "6": {
        name: "Svg",
        url: "https://iconpark.oceanengine.com/official",
        style: "translate(0, 0) scale(0.6)",
        imgSrc:
          "https://tse3-mm.cn.bing.net/th/id/OIP-C.-3bRC2rPE62JKhN-p7WigAAAAA?rs=1&pid=ImgDetMain",
        isBottom: true,
      },
      "7": {
        name: "Vite",
        url: "https://cn.vitejs.dev/guide/",
        style: "translate(0, 0) scale(0.8)",
        imgSrc:
          "https://pic1.zhimg.com/v2-6471ccc5d04f8409fc639f0d4d492705_1440w.jpg?source=172ae18b",
        isBottom: true,
      },
      "8": {
        name: "TailwindCSS",
        url: "https://www.tailwindcss.cn/",
        style: "translate(0, 0) scale(0.6)",
        imgSrc:
          "https://tse4-mm.cn.bing.net/th/id/OIP-C.pEeKeUoENMqoN-kR8f8XoQHaFj?rs=1&pid=ImgDetMain",
        isBottom: true,
      },
    };

export const shortcut_all_data = new Proxy(local_all_data, {
  set(
    target: ShortcutListType,
    key: number | string | symbol,
    value: ShortcutType
  ) {
    target[key as number] = value;
    localStorage.setItem("shortcut_all_data", JSON.stringify(target));
    return true;
  },
});

export const allDataIsButtomSwitch = (id: keyof ShortcutListType) => {
  shortcut_all_data[id].isBottom = !shortcut_all_data[id].isBottom;
};
