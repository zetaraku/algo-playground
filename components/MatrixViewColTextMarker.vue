<script setup lang="ts">
const props = defineProps<{
  colIndex: number,
}>();

const rowCount = inject<number>('rowCount');
</script>

<template>
  <MatrixViewIndexMarker
    class="marker-color-text-only"
    :index="{ i: rowCount! + 1, j: colIndex }"
  >
    <div
      class="position-absolute translate-middle text-nowrap"
      style="top: 50%; left: 50%;"
    >
      <slot>
        <!-- marker info -->
      </slot>
    </div>
  </MatrixViewIndexMarker>
</template>

<style lang="scss" scoped>
.marker-color-text-only {
  border-color: transparent !important;
  background-color: transparent !important;
}
</style>
