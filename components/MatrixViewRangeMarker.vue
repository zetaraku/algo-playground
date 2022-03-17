<script setup lang="ts">
const props = defineProps<{
  beginIndex: { i: number, j: number },
  endIndex: { i: number, j: number },
}>();
</script>

<template>
  <div
    class="
      position-absolute
      d-inline-flex justify-content-center align-items-center
    "
    style="
      border: 4px solid;
      transition: all cubic-bezier(0.4, 0, 0.2, 1) 300ms;
    "
    :style="{
      height: `${Math.max(0, 4 + 4 * (15 - 1) * (endIndex.i - beginIndex.i))}px`,
      width: `${Math.max(0, 4 + 4 * (15 - 1) * (endIndex.j - beginIndex.j))}px`,
      top: `${4 * (15 - 1) * beginIndex.i}px`,
      left: `${4 * (15 - 1) * beginIndex.j}px`,
    }"
  >
    <slot>
      <!-- marker info -->
    </slot>
  </div>
</template>
