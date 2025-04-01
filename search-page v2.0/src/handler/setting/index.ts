import { setting } from "@/handler/dom";

import bgMaskRender from "@/handler/background/bgAlertRender";

import store, { type Store } from "@/store/setting";

const settingOptions: { title: string; key: keyof Store }[] = [
  { title: "是否展示底框", key: "isBottomShow" },
  { title: "是否显示提示 / 报错", key: "isTip" },
  { title: "是否展开搜索联想", key: "isAssociation" },
];

const settingRender = () => {
  setting.replaceChildren();
  const bgSwitch = document.createElement("div");
  const bgSwitchSpan = document.createElement("span");
  bgSwitchSpan.textContent = "切换背景";
  const bgSwitchButton = document.createElement("button");
  bgSwitchButton.textContent = "切换";
  bgSwitchButton.onclick = () => {
    bgMaskRender();
  };
  bgSwitch.replaceChildren(bgSwitchSpan, bgSwitchButton);

  setting.appendChild(bgSwitch);
  settingOptions.map((item) => {
    const settingItem = document.createElement("div");
    const settingSpan = document.createElement("span");
    settingSpan.textContent = item.title;
    const settingSwitch = document.createElement("div");
    settingSwitch.className = store[item.key] ? "true switch" : "switch";
    const settingBoll = document.createElement("div");
    settingSwitch.onclick = () => {
      store[item.key] = !store[item.key];
      settingSwitch.classList.toggle("true");
    };
    settingSwitch.appendChild(settingBoll);
    settingItem.replaceChildren(settingSpan, settingSwitch);
    setting.appendChild(settingItem);
  });
};

settingRender();
