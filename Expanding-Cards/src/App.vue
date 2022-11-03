<template>
  <Loading class="loading" :loaded="loaded"></Loading>
  <div class="root" v-show="loaded">
    <ExpandingCards
      @get-length="handleGetLength"
      @img-loaded="handleImgLoaded"
    ></ExpandingCards>
  </div>
</template>

<script setup lang="ts">
import { ref, defineAsyncComponent } from "vue";
import Loading from "./components/Loading.vue";

const ExpandingCards = defineAsyncComponent({
  loader: () => import("./components/ExpandingCards.vue"),
});

/* 获取需要加载的图片数量 */
const getImgsListLength = ref(0);
const handleGetLength = (parames: number) => {
  getImgsListLength.value = parames;
};

/* 图片加载完隐藏loading */
//loaded的图片数量
let loadedCount = 0;
//是否全部loaded
let loaded = ref(false);
const handleImgLoaded = () => {
  loadedCount++;
  if (loadedCount === getImgsListLength.value) {
    loaded.value = true;
  }
};
</script>

<style scoped lang="less">
.loading {
  position: absolute;
  z-index: 1;
  top: 50%;
  transform: translateY(-50%);
}
</style>
