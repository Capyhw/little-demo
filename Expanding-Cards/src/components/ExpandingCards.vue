<template>
  <div class="box">
    <img
      class="imgs"
      v-for="(item, index) in backgroundImgList"
      :key="item"
      :src="item"
      :class="{ active: index === curIndex }"
      @click="curIndex = index"
      @load="loaded"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, Ref, ref } from "vue";
const emits = defineEmits(["getLength", "imgLoaded"]);
const backgroundImgList: Ref<string[]> = ref([]);
const importImgs = import.meta.glob("../assets/*.webp");
let importList = [];
for (let path in importImgs) {
  let p = importImgs[path]().then((mod) => {
    backgroundImgList.value.push(mod["default"]);
  });
  importList.push(p);
}
Promise.all(importList).then(() => {
  emits("getLength", backgroundImgList.value.length);
});

const curIndex = ref(0);

const loaded = () => {
  emits("imgLoaded");
};
</script>

<style scoped lang="less">
.box {
  margin: 0 auto;
  display: flex;
  width: 90vw;
  height: 90vh;
  flex-direction: column;
  .imgs {
    border-radius: 1vh;
    object-fit: cover;
    overflow: hidden;
    cursor: pointer;
    flex: 0.5 1;
    transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
    filter: blur(0.2vh);
    &.active {
      flex: v-bind("backgroundImgList.length") 1;
      filter: blur(0);
    }
  }
}
</style>
