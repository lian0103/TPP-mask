chrome.contextMenus.onClicked.addListener(genericOnClick);

async function getCurTabId() {
  const tabs = await chrome.tabs.query({ currentWindow: true, active: true });
  return tabs[0]?.id || null;
}

async function excuteScript(id, fn) {
  await chrome.scripting.executeScript({
    target: { tabId: id },
    func: fn,
  });
}

async function genericOnClick(info) {
  console.log("Standard context menu item clicked.", info);
  switch (info.menuItemId) {
    case "call_btn1": {
      const curTabId = await getCurTabId();
      if (curTabId) {
        excuteScript(curTabId, () => {
          window.showMask();
        });
      }
      break;
    }
    case "call_btn2": {
      const curTabId = await getCurTabId();
      if (curTabId) {
        excuteScript(curTabId, () => {
          window.hideMask();
        });
      }
      break;
    }
    case "call_btn3": {
      const curTabId = await getCurTabId();
      if (curTabId) {
        excuteScript(curTabId, () => {
          window.toggleBgColor();
        });
      }
      break;
    }
    case "call_btn4": {
      const curTabId = await getCurTabId();
      if (curTabId) {
        excuteScript(curTabId, () => {
          window.toggleImg();
        });
      }
      break;
    }
  }
}
chrome.runtime.onInstalled.addListener(function () {
  // Create one test item for each context type.
  let contexts = [
    "page",
    "selection",
    "link",
    "editable",
    "image",
    "video",
    "audio",
  ];

  const actions = [
    { title: "打開遮蔽 Cmd + I", id: "call_btn1" },
    { title: "關閉遮蔽 Cmd + I", id: "call_btn2" },
    { title: "切換背景色", id: "call_btn3" },
    { title: "切換圖片", id: "call_btn4" },
  ];

  actions.forEach((item) => {
    chrome.contextMenus.create({
      title: item.title,
      contexts: contexts,
      id: item.id,
    });
  });
});

var isOpen = false;

chrome.commands.onCommand.addListener(async (command) => {
  switch (command) {
    case "run-showMask": {
      const curTabId = await getCurTabId();
      if (curTabId) {
        if (!isOpen) {
          console.log("in???");
          await excuteScript(curTabId, () => {
            window.showMask();
          });
          isOpen = true;
        } else {
          await excuteScript(curTabId, () => {
            window.hideMask();
          });
          isOpen = false;
        }
      }
      break;
    }
  }
});
