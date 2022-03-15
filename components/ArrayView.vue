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
      v-for="(value, i) in data"
      :key="i"
      :value="value"
    />
    <ArrayViewItem
      style="color: red; background-color: lightgray;"
      :value="'$'"
    />
    <slot>
      <!-- marker slot -->
    </slot>
  </div>
</template>
