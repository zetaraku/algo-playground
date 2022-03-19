<script setup lang="ts">
const props = defineProps<{
  rowIndex: number,
}>();

const colCount = inject<number>('colCount');
</script>

<template>
  <MatrixViewIndexMarker
    class="marker-color-text-only"
    :index="{ i: rowIndex, j: colCount! + 1 }"
  >
    <div
      class="position-absolute translate-middle-y text-nowrap"
      style="top: 50%; left: 25%;"
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
