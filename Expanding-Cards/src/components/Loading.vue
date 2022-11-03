<template>
  <div class="backgruond" v-if="!loaded">
    <div class="balls">
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

interface Props {
  title?: string;
  time?: number;
  loaded?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  title: "正在加载中",
  time: 500,
  loaded: false,
});
const loaded = ref(false);
const delay = () => new Promise((resolve) => setTimeout(resolve, props.time));

let number = 0;
let interval = setInterval(() => {
  number++;
}, props.time);

watch(
  () => props.loaded,

  async (newVal) => {
    if (number < 1) {
      await delay();
    }
    loaded.value = newVal;
    clearInterval(interval);
  }
);
</script>

<style scoped lang="less">
.backgruond {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  opacity: 80%;
  background-color: rgba(0, 0, 0, 0.768);
}
.balls {
  width: 3.5em;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
}

.balls div {
  width: 0.8em;
  height: 0.8em;
  border-radius: 50%;
  background-color: #fc2f70;
  transform: translateY(-100%);
  animation: wave 0.8s ease-in-out alternate infinite;
}

.balls div:nth-of-type(1) {
  animation-delay: -0.4s;
}

.balls div:nth-of-type(2) {
  animation-delay: -0.2s;
}

@keyframes wave {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(100%);
  }
}
</style>
