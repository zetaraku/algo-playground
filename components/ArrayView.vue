<script setup lang="ts">
const props = defineProps<{
  data: any[],
}>();
</script>

<template>
  <div class="relative whitespace-nowrap pl-1">
    <ArrayViewItem
      v-for="(item, i) in data"
      :key="i"
      :item="item"
    />
    <ArrayViewItem
      class="text-red-500 bg-gray-300"
      :item="'$'"
    />
    <slot>
      <!-- marker slot -->
    </slot>
  </div>
</template>
