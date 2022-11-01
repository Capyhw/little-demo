<template>
  <div class="scroll-box">
    <slot>default content</slot>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

const props = withDefaults(
  defineProps<{
    margin?: string;
  }>(),
  {
    margin: "2vh 0",
  }
);
const margin = ref(props.margin);
</script>

<style scoped lang="less">
@heigth: 30vh;
@width: 60vw;
@animation-height:@heigth /3;
.scroll-box {
  width: @width;
  height: @heigth;
  background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
  border-radius: 2vh;
  box-shadow: 1vw 1vh 1vh rgba(245, 245, 245, 0.347);
  margin: v-bind(margin);
  color: white;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;

  &.show {
    animation: slide-in-elliptic-bottom-fwd 0.7s
      cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  }
  @keyframes slide-in-elliptic-bottom-fwd {
    0% {
      transform: translateY(10vh) rotateX(30deg) scale(0);
      transform-origin: 50% 100%;
      opacity: 0;
    }
    100% {
      transform: translateY(0) rotateX(0) scale(1);
      transform-origin: 50% @heigth;
      opacity: 1;
    }
  }
}
</style>
