/**
 * 不把长列表数据一次性全部直接渲染在页面上
 * 截取长列表一部分数据用来填充可视区域
 * 长列表数据不可视部分使用空白占位填充(startOffset和endOffset)
 * 监听滚动事件根据滚动位置动态改变可视列表
 * 监听滚动事件根据滚动位置动态改变空白填充
 */
const container = document.querySelector(".list-container");
const scrollbox = document.querySelector(".scroll-box");

let initData = () => {
  let data = [];
  for (let i = 0; i < 1000; i++) {
    data.push({
      content: i,
    });
  }
  return data;
};
let data = initData();
let itemHeight = 100; //100    每一个item的高度
let containerHeight = container.clientHeight; //600   可见区域高度
let startIndex = Math.floor(container.scrollTop / itemHeight);
let endIndex = Math.ceil(containerHeight / itemHeight) + startIndex;
//当可视化区域大小变化时 重新计算
function updataContainerHeight() {
  containerHeight = container.clientHeight; //600   可见区域高度
  startIndex = Math.floor(container.scrollTop / itemHeight);
  endIndex = Math.ceil(containerHeight / itemHeight) * 2 + startIndex;
  scrollEvent();
}

let ticking = false,
  then = 0;

function onScroll() {
  /**
   * 动画帧节流
   */
  const now = Date.now();
  if (!ticking) {
    if (now - then > 33) {
      requestAnimationFrame(scrollEvent);
      ticking = false;
    }
  }
}

function scrollEvent() {
  /**
   * 解决滑动过快出现的白屏问题:
   * endIndex多缓存一版当缓冲区
   */
  startIndex = Math.floor(container.scrollTop / itemHeight);
  endIndex = Math.ceil(containerHeight / itemHeight) * 2 + startIndex;
  let viewData = data.slice(startIndex, endIndex + 1);

  scrollbox.innerHTML = "";
  for (let i = 0; i < viewData.length; i++) {
    let item = document.createElement("div");
    item.innerHTML = viewData[i].content;
    item.className = "item";
    scrollbox.appendChild(item);
  }
  let paddingTop = startIndex * itemHeight;
  let paddingBottom = (data.length - endIndex) * itemHeight;
  scrollbox.setAttribute(
    "style",
    `padding-top: ${paddingTop}px; padding-bottom: ${paddingBottom}px`
  );
}

scrollEvent();
window.addEventListener("resize", updataContainerHeight);
container.addEventListener("scroll", onScroll, { passive: true });
