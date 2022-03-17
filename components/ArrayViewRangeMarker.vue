<script setup lang="ts">
const props = defineProps<{
  beginIndex: number,
  endIndex: number,
}>();
</script>

<template>
  <MatrixViewRangeMarker
    :begin-index="{ i: 0, j: beginIndex }"
    :end-index="{ i: 1, j: endIndex }"
  >
    <slot>
      <!-- marker info -->
    </slot>
  </MatrixViewRangeMarker>
</template>
