<script setup lang="ts">
const props = defineProps<{
  item: any,
}>();
</script>

<template>
  <div
    class="
      w-15 h-15 border-4 -ml-1
      text-4xl border-gray-300
      inline-flex justify-center items-center whitespace-nowrap
    "
  >
    <span
      v-if="item != null"
      class="text-4xl"
    >
      {{ item }}
    </span>
    <span
      v-else
      class="text-4xl text-gray-400"
    >
      {{ '-' }}
    </span>
  </div>
</template>
