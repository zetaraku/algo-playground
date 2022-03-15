<script setup lang="ts">
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiFerrisWheel } from '@mdi/js';
</script>

<template>
  <div
    class="d-flex flex-column justify-content-center align-items-center"
    style="height: calc(100vh - 56px - 41px - 2rem);"
  >
    <SvgIcon
      class="d-inline-block align-text-top m-5 animate-bounce"
      type="mdi"
      :path="mdiFerrisWheel"
      style="width: 16rem; height: 16rem; color: cadetblue;"
    />

    <h1 class="mb-5">
      Algo Playground
    </h1>
    <p class="text-center lh-lg mb-5">
      Welcome! :D<br>
      Here you can play with algorithms and watch it run step by step.<br>
      weeeeeeeeeeeeee &lt;:)
    </p>

    <NuxtLink
      class="
        btn btn-lg btn-outline-primary
      "
      to="/alg"
    >
      main();
    </NuxtLink>
  </div>
</template>

<style lang="scss" scoped>
@keyframes bounce {
  0%, 100% {
    transform: translateY(-25%);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  50% {
    transform: translateY(0);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
}
.animate-bounce {
  animation: bounce 1s infinite;
}
</style>
