<script setup lang="ts">
const props = defineProps<{
  data: any[],
}>();

const keyedData = computed(
  () => props.data.map((value, index) => ({ key: index, value })),
);
</script>

<template>
  <KeyedArrayView :data="keyedData">
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
  </KeyedArrayView>
</template>
