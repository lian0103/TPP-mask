chrome.contextMenus.onClicked.addListener(genericOnClick);

// A generic onclick callback function.
function genericOnClick(info) {
  console.log('Standard context menu item clicked.', info);
  switch (info.menuItemId) {
    case 'call_btn1': {
      chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        curTabId = tabs[0].id;

        if (curTabId) {
          chrome.scripting
            .executeScript({
              target: { tabId: curTabId },
              func: () => {
                const target = document.getElementsByTagName('body')[0];
                const target2 = document.getElementById('shadow-wrapper');
                if (target2) {
                  target2.remove();
                }

                const wrapper = document.createElement('div');
                wrapper.setAttribute('id', 'shadow-wrapper');
                wrapper.classList.add('shadow-wrapper');
                wrapper.classList.add('white');

                const newImg = document.createElement('img');
                newImg.setAttribute('id', 'img1');
                newImg.setAttribute('draggable', false);
                newImg.src = chrome.runtime.getURL('icon.png');

                wrapper.appendChild(newImg);
                target.appendChild(wrapper);
                target.classList.add('scroll-none');
              },
            })
            .then(() => {
              chrome.action.setBadgeText({
                text: 'on',
              });
            });
        }
      });
      break;
    }
    case 'call_btn2': {
      chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        curTabId = tabs[0].id;

        if (curTabId) {
          chrome.scripting
            .executeScript({
              target: { tabId: curTabId },
              func: () => {
                const target = document.getElementsByTagName('body')[0];
                const target2 = document.getElementById('shadow-wrapper');
                if (target) {
                  target.classList.remove('scroll-none');
                  target2.remove();
                }
              },
            })
            .then(() => {
              chrome.action.setBadgeText({
                text: '',
              });
            });
        }
      });
      break;
    }
    case 'call_btn3': {
      chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        curTabId = tabs[0].id;

        if (curTabId) {
          chrome.scripting.executeScript({
            target: { tabId: curTabId },
            func: () => {
              const target = document.getElementById('shadow-wrapper');

              if (target) {
                target.classList.toggle('white');
              }
            },
          });
        }
      });
      break;
    }
    case 'call_btn4': {
      chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        curTabId = tabs[0].id;

        if (curTabId) {
          chrome.scripting.executeScript({
            target: { tabId: curTabId },
            func: () => {
              const target = document.getElementById('shadow-wrapper');
              if (target) {
                target.classList.toggle('bg2');

                if (document.getElementById('img1')) {
                  document.getElementById('img1').remove();
                  const newImg = document.createElement('img');
                  newImg.setAttribute('id', 'img2');
                  newImg.setAttribute('draggable', false);
                  newImg.src = chrome.runtime.getURL('icon2.svg');
                  target.appendChild(newImg);
                } else {
                  document.getElementById('img2').remove();
                  const newImg = document.createElement('img');
                  newImg.setAttribute('draggable', false);
                  newImg.setAttribute('id', 'img1');
                  newImg.src = chrome.runtime.getURL('icon.png');
                  target.appendChild(newImg);
                }
              }
            },
          });
        }
      });
      break;
    }
  }
}
chrome.runtime.onInstalled.addListener(function () {
  // Create one test item for each context type.
  let contexts = [
    'page',
    'selection',
    'link',
    'editable',
    'image',
    'video',
    'audio',
  ];

  const actions = [
    { title: '打開遮蔽', id: 'call_btn1' },
    { title: '關閉遮蔽', id: 'call_btn2' },
    { title: '切換背景色', id: 'call_btn3' },
    { title: '切換圖片', id: 'call_btn4' },
  ];

  actions.forEach((item) => {
    chrome.contextMenus.create({
      title: item.title,
      contexts: contexts,
      id: item.id,
    });
  });
});
