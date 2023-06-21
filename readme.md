# Chrome Extension Manifest V3

## 效果

https://hackmd.io/_uploads/SJTsb1x_3.png

https://hackmd.io/_uploads/H1xnZkl_n.png

## chrome object model 的使用

- runtime

```javascript
// 在chrome 背景執行完成時 do something...
chrome.runtime.onInstalled.addListener(() => {
  // do something ex. 建立插件的操作選單
});
```

- contextMenus

```javascript
// 建立插件的操作選單，contexts可以理解是在點選右鍵時的滑鼠位置的情境(對象)
const contexts = [
  "page",
  "selection",
  "link",
  "editable",
  "image",
  "video",
  "audio",
];

chrome.contextMenus.create({
  title: item.title,
  contexts: contexts,
  id: item.id,
});

// 監聽操作選單的點擊事件
chrome.contextMenus.onClicked.addListener((target) => {
  //...
});
```

- scripting

```javascript
// 在指定tab(網頁)裡執行Fn
chrome.scripting.executeScript({
  target: { tabId: id },
  func: fn,
});
```

- commands

```javascript
// 監聽在manifest.json裡註冊的commands
chrome.commands.onCommand.addListener(handleCommand);
```
