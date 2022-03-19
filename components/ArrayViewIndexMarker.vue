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
    <div class="marker-text">
      <slot>
        <!-- marker info -->
      </slot>
    </div>
  </ArrayViewRangeMarker>
</template>

<style lang="scss" scoped>
.marker-text {
  position: relative;
  bottom: -56px;
}
</style>
