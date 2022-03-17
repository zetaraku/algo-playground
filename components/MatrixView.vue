<script setup lang="ts">
const props = defineProps<{
  data: any[][],
}>();

const keyedData = computed(
  () => props.data.map(
    (row, i) => row.map(
      (col, j) => ({ key: `${i}-${j}`, value: col }),
    ),
  ),
);
</script>

<template>
  <KeyedMatrixView :data="keyedData">
    <!-- array elements -->
    <template #item="{ iIndex, jIndex, value, item }">
      <slot
        name="item"
        :i-index="iIndex"
        :j-index="jIndex"
        :value="value"
        :item="item"
      />
    </template>

    <!-- end indicator -->
    <template #end="{ iIndex, jIndex }">
      <slot
        name="end"
        :i-index="iIndex"
        :j-index="jIndex"
      />
    </template>

    <slot>
      <!-- marker slot -->
    </slot>
  </KeyedMatrixView>
</template>
