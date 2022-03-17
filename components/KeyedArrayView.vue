<script setup lang="ts">
const props = defineProps<{
  data: { key: any, value: any }[],
}>();
</script>

<template>
  <KeyedMatrixView :data="[data]">
    <!-- array elements -->
    <template #item="{ jIndex, value, item }">
      <slot
        name="item"
        :index="jIndex"
        :value="value"
        :item="item"
      />
    </template>

    <!-- end indicator -->
    <template #end="{ jIndex }">
      <slot
        name="end"
        :index="jIndex"
      />
    </template>

    <slot>
      <!-- marker slot -->
    </slot>
  </KeyedMatrixView>
</template>
