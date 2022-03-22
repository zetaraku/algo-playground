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
    <template #item="{ index, value, item }">
      <slot
        name="item"
        :index="index"
        :value="value"
        :item="item"
      />
    </template>

    <!-- end indicator -->
    <template #end="{ index }">
      <slot
        name="end"
        :index="index"
      />
    </template>

    <slot>
      <!-- marker slot -->
    </slot>
  </KeyedMatrixView>
</template>
