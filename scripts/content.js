const showMask = async () => {
  const target = document.getElementsByTagName("body")[0];
  const target2 = document.getElementById("shadow-wrapper");
  if (target2) {
    target2.remove();
  }

  const wrapper = document.createElement("div");
  wrapper.setAttribute("id", "shadow-wrapper");
  wrapper.classList.add("shadow-wrapper");
  wrapper.classList.add("white");

  const newImg = document.createElement("img");
  newImg.setAttribute("id", "img1");
  newImg.setAttribute("draggable", false);
  newImg.src = chrome.runtime.getURL("icon.png");

  wrapper.appendChild(newImg);
  target.appendChild(wrapper);
  target.classList.add("scroll-none");
};

const hideMask = async () => {
  const target = document.getElementsByTagName("body")[0];
  const target2 = document.getElementById("shadow-wrapper");
  if (target2) {
    target.classList.remove("scroll-none");
    target2.remove();
  }
};

const toggleBgColor = async () => {
  const target = document.getElementById("shadow-wrapper");

  if (target) {
    target.classList.toggle("white");
  }
};

const toggleImg = async () => {
  const target = document.getElementById("shadow-wrapper");
  if (target) {
    target.classList.toggle("bg2");

    if (document.getElementById("img1")) {
      document.getElementById("img1").remove();
      const newImg = document.createElement("img");
      newImg.setAttribute("id", "img2");
      newImg.setAttribute("draggable", false);
      newImg.src = chrome.runtime.getURL("icon2.svg");
      target.appendChild(newImg);
    } else {
      document.getElementById("img2").remove();
      const newImg = document.createElement("img");
      newImg.setAttribute("draggable", false);
      newImg.setAttribute("id", "img1");
      newImg.src = chrome.runtime.getURL("icon.png");
      target.appendChild(newImg);
    }
  }
};

(function (cxt) {
  const window = cxt.window;
  window.showMask = showMask;
  window.hideMask = hideMask;
  window.toggleBgColor = toggleBgColor;
  window.toggleImg = toggleImg;
})(this);
