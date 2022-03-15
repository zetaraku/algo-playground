<script setup lang="ts">
const props = defineProps<{
  data: any[],
}>();
</script>

<template>
  <div
    class="position-relative"
    style="padding-left: 4px;"
  >
    <ArrayViewItem
      v-for="(value, index) in data"
      :key="index"
      :value="value"
    >
      <slot
        name="item"
        :index="index"
        :value="value"
      />
    </ArrayViewItem>
    <ArrayViewItem
      style="color: red; background-color: lightgray;"
      :value="'$'"
    >
      <slot
        name="end"
        :index="data.length"
      />
    </ArrayViewItem>
    <slot>
      <!-- marker slot -->
    </slot>
  </div>
</template>
