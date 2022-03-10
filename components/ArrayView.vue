<script setup lang="ts">
const props = defineProps<{
  data: any[],
}>();
</script>

<template>
  <div class="relative flex flex-wrap pl-1">
    <ArrayViewItem
      v-for="(item, i) in data"
      :key="i"
      :item="item"
    />
    <ArrayViewItem
      class="text-red-500"
      :item="'$'"
    />
    <slot>
      <!-- marker slot -->
    </slot>
  </div>
</template>
