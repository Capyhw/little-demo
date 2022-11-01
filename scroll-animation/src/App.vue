<template>
  <div>
    <h1>scroll to see animation</h1>
    <Box v-for="box in 30" :key="box"></Box>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import Box from "./components/Box.vue";

/* dom懒加载 */
const lazyLoad = function (selector: string) {
  const boxElements = document.querySelectorAll(selector);
  //设置触发频率  目标元素可见的占百分比多少时触发回调函数,
  //配置为一个数组,每达到其中一个值就触发回调函数,默认值为[0]
  function buildThresholdList() {
    let thresholds = [];
    let numSteps = 0;
    for (let i = 1.0; i <= numSteps; i++) {
      thresholds.push(i / numSteps);
    }
    return thresholds;
  }
  let options = {
    root: null,
    /* 设置时传入字符串,对应于css中的"top,right,bottom,left"的设置方式,
        也可以使用css中的"top/bottom,left/right"的方式 */
    rootMargin: "0px",
    threshold: buildThresholdList(),
  };
  function handleIntersect(entries, observer) {
    entries.forEach(function (entry) {
      //intersectionRatio可以看到目标元素现在的可见比例
      if (entry.isIntersecting > 0) {
        entry.target.src = entry.target.dataset.src;
        entry.target.classList.add("show");
        io.unobserve(entry.target);
      }
    });
  }
  let io = new IntersectionObserver(handleIntersect, options);
  for (let i = 0; i < boxElements.length; i++) {
    io.observe(boxElements[i]);
  }
};
onMounted(() => {
  lazyLoad(".scroll-box");
});
</script>

<style scoped></style>
