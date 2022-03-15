<script setup lang="ts">
const props = defineProps<{
  beginIndex: number,
  endIndex: number,
}>();
</script>

<template>
  <div
    class="
      position-absolute
      d-inline-flex justify-content-center align-items-center
    "
    style="
      height: 60px;
      border: 4px solid;
      transition: all cubic-bezier(0.4, 0, 0.2, 1) 300ms;
    "
    :style="{
      width: `${Math.max(0, 4 + 4 * (15 - 1) * (endIndex - beginIndex))}px`,
      left: `${4 * (15 - 1) * beginIndex}px`,
    }"
  >
    <slot>
      <!-- marker info -->
    </slot>
  </div>
</template>
