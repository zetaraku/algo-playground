<script setup lang="ts">
const props = defineProps<{
  index: { i: number, j: number },
}>();
</script>

<template>
  <MatrixViewRangeMarker
    :begin-index="{ i: index.i, j: index.j }"
    :end-index="{ i: index.i + 1, j: index.j + 1 }"
  >
    <slot>
      <!-- marker info -->
    </slot>
  </MatrixViewRangeMarker>
</template>
