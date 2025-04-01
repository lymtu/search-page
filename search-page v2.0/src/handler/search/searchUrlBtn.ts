import bingLogo from "/bing-logo.png";
import baiduLogo from "/baidu-logo.png";
import sougouLogo from "/sougou-logo.png";

import { searchUrlBtn } from "@/handler/dom";

const searchUrlBtnRender = (searchMap: urlDataType[]) => {
  searchUrlBtn.innerHTML = "";
  searchMap.map((item, index: number) => {
    const div = document.createElement("div");
    div.className = "searchUrlBtn-item";

    div.title = item.key;
    div.innerHTML = `<img src="${item.logo}" alt="${item.key}">`;
    div.onclick = () => {
      if (index !== 0) {
        urlProxy.unshift(urlProxy.splice(index, 1)[0]);
      }
    };

    div.onmousedown = (e) => {
      e.preventDefault();
    };
    searchUrlBtn.appendChild(div);
  });
};

export type urlDataType = {
  key: string;
  url: string;
  logo: string;
};

const urlProxy = new Proxy(
  [
    {
      key: "bing",
      url: "https://www4.bing.com/search?q=%s",
      logo: bingLogo,
    },
    {
      key: "百度",
      url: "https://www.baidu.com/s?wd=%s",
      logo: baiduLogo,
    },
    {
      key: "搜狗",
      url: "https://www.sogou.com/web?query=%s",
      logo: sougouLogo,
    },
  ],
  {
    set(
      target: urlDataType[],
      prop: number | string | symbol,
      value: urlDataType
    ) {
      target[prop as number] = value;

      if (prop == 0) {
        searchUrlBtnRender(target);
      }
      return true;
    },
  }
);

searchUrlBtnRender(urlProxy);

export const toSearch = (keyword: string): void => {
  if (!keyword) {
    return;
  }
  const searchUrl = urlProxy[0].url;
  window.open(
    searchUrl.replace("%s", encodeURIComponent(keyword)),
    "_blank"
  );
};
