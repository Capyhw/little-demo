/* 
用途:
    图片懒加载_当图片滚动到可见时才进行加载
    内容无限滚动_也就是用户滚动到接近内容底部时直接加载更多,而无需用户操作翻页,给用户一种网页可以无限滚动的错觉
    检测广告的曝光情况_为了计算广告收益,需要知道广告元素的曝光情况
    在用户看见某个区域时执行任务或播放动画
*/

let imgElements = document.querySelectorAll("img");

// Set things up.

let options = {
  root: null,
  /* 设置时传入字符串,对应于css中的"top,right,bottom,left"的设置方式,
        也可以使用css中的"top/bottom,left/right"的方式 */
  rootMargin: "0px",
  threshold: buildThresholdList(),
};

let io = new IntersectionObserver(handleIntersect, options);
for (let i = 0; i < imgElements.length; i++) {
  io.observe(imgElements[i]);
}

//设置触发频率  目标元素可见的占百分比多少时触发回调函数,
//配置为一个数组,每达到其中一个值就触发回调函数,默认值为[0]
function buildThresholdList() {
  let thresholds = [];
  let numSteps = 2;
  for (let i = 1.0; i <= numSteps; i++) {
    thresholds.push(i / numSteps);
  }
  return thresholds;
}

function handleIntersect(entries, observer) {
  entries.forEach(function (entry) {
    /*     intersectionRatio可以看到目标元素现在的可见比例
    console.log(entry.intersectionRatio); */
    /**
     * https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserverEntry
     * time
     * target
     * rootBounds
     * isIntersecting
     * intersectionRect
     * intersectionRatio
     * boundingClientRect
     */

    if (entry.isIntersecting > 0) {
      console.log(1);
      entry.target.src = entry.target.dataset.src;
      entry.target.classList.add("show");
      io.unobserve(entry.target);
    }
  });
}
