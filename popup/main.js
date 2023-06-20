console.log("in main.js");

const btn1 = document.getElementById("btn1");

var curTabId = null;

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

btn1.addEventListener("click", async () => {
  const curTabId = await getCurTabId();
  if (curTabId) {
    excuteScript(curTabId, () => {
      window.showMask();
    });
  }
});

btn2.addEventListener("click", async () => {
  const curTabId = await getCurTabId();
  if (curTabId) {
    excuteScript(curTabId, () => {
      window.hideMask();
    });
  }
});

btn3.addEventListener("click", async () => {
  const curTabId = await getCurTabId();
  if (curTabId) {
    excuteScript(curTabId, () => {
      window.toggleBgColor();
    });
  }
});

btn4.addEventListener("click", async () => {
  const curTabId = await getCurTabId();
  if (curTabId) {
    excuteScript(curTabId, () => {
      window.toggleImg();
    });
  }
});
