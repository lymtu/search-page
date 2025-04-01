import arrowImg from "/arrow-left-up.png";

import { searchInput, associationContainer } from "@/handler/dom";
import { toSearch } from "./searchUrlBtn";
import store from "@/store/setting";

type AssociationType = string;

let index: number = -1; // 联想条的索引
let associationItems: HTMLLIElement[] = [];

export const associationRender = (keyword: string) => {
  if (!keyword) return;
  new Promise<AssociationType[]>((resolve) => {
    const script = document.createElement("script");
    script.src =
      "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=" + keyword;
    document.body.appendChild(script);
    // 移除script标签
    script.remove();

    (window as any).baidu = {
      sug: (json: { s: AssociationType[] }) => {
        resolve(json.s);
      },
    };
  }).then((data: AssociationType[]) => {
    associationItems = [];
    if (data.length === 0) return;
    const ul = document.createElement("ul");
    ul.id = "associationUL";
    data.forEach((item: string, i: number) => {
      const li = document.createElement("li");
      const span = document.createElement("span");
      span.textContent = item;
      const img = document.createElement("img");
      img.src = arrowImg;
      img.alt = "faild to load";
      img.onclick = (e: MouseEvent) => {
        e.stopPropagation();
        searchInput.value = item;
      };
      li.replaceChildren(span, img);
      li.onclick = () => {
        toSearch(item);
      };
      li.onmouseenter = () => {
        index = i;
        clearAllActive();
      };
      li.onmouseleave = () => {
        index = -1;
        clearAllActive();
      };
      ul.appendChild(li);
      associationItems.push(li);
    });
    associationContainer.replaceChildren(ul);
  });
};

function clearAllActive() {
  associationItems.forEach((item) => {
    item.classList.remove("active");
  });
}

const wheelEvent = (e: WheelEvent): void => {
  if (e.deltaY < 0) {
    index <= 0 ? (index = associationItems.length - 1) : index--;
  } else {
    index >= associationItems.length - 1 ? (index = 0) : index++;
  }

  clearAllActive();
  associationItems[index].classList.add("active");
  searchInput.value =
    associationItems[index].querySelector("span")?.textContent || "";
};

associationContainer.addEventListener("mouseenter", () => {
  associationContainer.addEventListener("wheel", wheelEvent);
});

associationContainer.addEventListener("mouseleave", () => {
  index = -1;
  associationContainer.removeEventListener("wheel", wheelEvent);
});

associationContainer.addEventListener("mousedown", (e) => {
  e.preventDefault(); // 阻止默认行为
  return false;
});

let timeout: NodeJS.Timeout | null = null;

export function associationHandler(e: HTMLInputElement): void {
  if (!store.isAssociation) return; // 关闭联想功能
  timeout && clearTimeout(timeout);
  if (!e.value) {
    timeout = setTimeout(() => {
      associationContainer.replaceChildren();
    }, 250);
  } else {
    timeout = setTimeout(() => {
      associationRender(e.value);
    }, 250);
  }
}
