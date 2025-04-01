import {
  shortcutContainer_bottom,
  shortcutContainer_store_mask,
  shortcutStore_btn,
} from "@/handler/dom";

import {
  shortcut_bottom_data,
  type ShortcutType_bottom,
  type ShortcutType_bottom_output,
} from "@/store/shortcutData-bottom";

let dom_arr: { dom: HTMLDivElement; p: number }[];

export const shortcut_bottom_render = ({
  data = shortcut_bottom_data,
  is,
}: {
  data?: ShortcutType_bottom[];
  is: boolean;
}) => {
  shortcutContainer_bottom.replaceChildren();
  shortcutStore_btn.classList.remove("hidden");
  if (!data || shortcut_bottom_data[0] == undefined || !is) return;
  shortcutStore_btn.classList.add("hidden");
  dom_arr = [];
  const container = document.createElement("div");
  container.classList.add("bottom-container");

  for (const key in data) {
    if (!data[key]) {
      continue;
    }

    const { name, url, imgSrc, style } = data[
      key
    ] as unknown as ShortcutType_bottom_output;

    const gap = document.createElement("div");
    gap.style.setProperty("--i", "1");
    gap.classList.add("gap");
    const item = document.createElement("div");
    item.style.setProperty("--i", "1");
    item.classList.add("item");
    item.addEventListener("click", () => {
      window.open(url, name);
    });

    const img = document.createElement("img");
    img.style.transform = style;
    img.src = imgSrc;
    img.alt = "faild to load";
    item.appendChild(img);

    container.appendChild(gap);
    container.appendChild(item);
  }

  const gap = document.createElement("div");
  gap.style.setProperty("--i", "1");
  gap.classList.add("gap");
  container.appendChild(gap);

  const more = document.createElement("div");
  more.classList.add("item");
  more.style.setProperty("--i", "1");
  more.innerHTML = `<svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 6H8C6.89543 6 6 6.89543 6 8V18C6 19.1046 6.89543 20 8 20H18C19.1046 20 20 19.1046 20 18V8C20 6.89543 19.1046 6 18 6Z" fill="none" stroke="#000000" stroke-width="4" stroke-linejoin="round"/><path d="M18 28H8C6.89543 28 6 28.8954 6 30V40C6 41.1046 6.89543 42 8 42H18C19.1046 42 20 41.1046 20 40V30C20 28.8954 19.1046 28 18 28Z" fill="none" stroke="#000000" stroke-width="4" stroke-linejoin="round"/><path d="M40 6H30C28.8954 6 28 6.89543 28 8V18C28 19.1046 28.8954 20 30 20H40C41.1046 20 42 19.1046 42 18V8C42 6.89543 41.1046 6 40 6Z" fill="none" stroke="#000000" stroke-width="4" stroke-linejoin="round"/><path d="M40 28H30C28.8954 28 28 28.8954 28 30V40C28 41.1046 28.8954 42 30 42H40C41.1046 42 42 41.1046 42 40V30C42 28.8954 41.1046 28 40 28Z" fill="none" stroke="#000000" stroke-width="4" stroke-linejoin="round"/></svg>`;
  more.addEventListener("click", () => {
    storeMaskShow();
  });

  container.appendChild(more);

  const gap_end = document.createElement("div");
  gap_end.style.setProperty("--i", "1");
  gap_end.classList.add("gap");
  container.appendChild(gap_end);

  const div_first = document.createElement("div");
  const div_last = document.createElement("div");

  div_first.appendChild(container);

  addEventListener(container);
  shortcutContainer_bottom.replaceChildren(div_first, div_last);
  (Array.from(container.children) as HTMLDivElement[]).map((i) => {
    dom_arr.push({
      dom: i,
      p: i.offsetLeft + i.offsetWidth / 2,
    });
  });
};

function storeMaskShow() {
  shortcutContainer_store_mask.classList.add("show");
}

shortcutStore_btn.addEventListener("click", () => {
  storeMaskShow();
});

let container_width: number = 0;
let o: number = 0;


function addEventListener(dom: HTMLDivElement) {
  dom.addEventListener("mouseenter", () => {
    container_width = dom.clientWidth;
  });

  dom.addEventListener("mousemove", (e) => {
    setTimeout(() => {
      o = e.pageX - (window.innerWidth - container_width) / 2;
      dom_arr.map((i) => {
        i.dom.style.setProperty("--i", `${scaleHandle(i.p)}`);
        i.dom.style.setProperty("transition", "all 0s");
      });
    }, 16.6667);
  });

  dom.addEventListener("mouseleave", () => {
    setTimeout(() => {
      dom_arr.map((i) => {
        i.dom.style.setProperty("--i", "1");
        i.dom.style.setProperty("transition", "all 0.25s");
      });
    }, 20);
  });
}

const a: number = -0.00005;
const maxScale: number = 1.6;

function scaleHandle(x: number) {
  const b = -2 * a * o;
  const y = a * x ** 2 + b * x + maxScale + b ** 2 / (4 * a);
  return y < 1 ? 1 : y;
}
