<script setup lang="ts">
const props = defineProps<{
  begin: number,
  end: number,
}>();
</script>

<template>
  <div
    class="
      absolute w-15 h-15 border-4 -ml-1
      transition-all
    "
    :style="{
      width: `${(-4) + 4 * (15 + 1) * (end - begin)}px`,
      transform: `translateX(${4 * (15 + 1) * begin}px)`,
    }"
  />
</template>
