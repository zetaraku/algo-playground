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
      v-for="(item, i) in data"
      :key="i"
      :item="item"
    />
    <ArrayViewItem
      style="color: red; background-color: lightgray;"
      :item="'$'"
    />
    <slot>
      <!-- marker slot -->
    </slot>
  </div>
</template>
