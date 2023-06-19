console.log('in main.js');
const btn1 = document.getElementById('btn1');

var curTabId = null;

btn1.addEventListener('click', async () => {
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
});

btn2.addEventListener('click', async () => {
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
});

btn3.addEventListener('click', async () => {
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
});

btn4.addEventListener('click', async () => {
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
});
