<script setup lang="ts">
const props = defineProps<{
  beginIndex: number,
  endIndex: number,
}>();
</script>

<template>
  <div
    class="
      absolute w-15 h-15 border-4 -ml-1
      transition-all duration-300
      inline-flex justify-center items-center
    "
    :style="{
      width: `${Math.max(0, 4 + 4 * (15 - 1) * (endIndex - beginIndex))}px`,
      transform: `translateX(${4 * (15 - 1) * beginIndex}px)`,
    }"
  >
    <slot>
      <!-- marker info -->
    </slot>
  </div>
</template>
