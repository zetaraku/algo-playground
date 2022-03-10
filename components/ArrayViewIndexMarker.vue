<script setup lang="ts">
const props = defineProps<{
  index: number,
}>();
</script>

<template>
  <ArrayViewRangeMarker
    :begin-index="index"
    :end-index="index + 1"
  >
    <slot>
      <!-- marker info -->
    </slot>
  </ArrayViewRangeMarker>
</template>
