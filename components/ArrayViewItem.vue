<script setup lang="ts">
const props = defineProps<{
  item: any,
}>();
</script>

<template>
  <div
    class="d-inline-flex justify-content-center align-items-center"
    style="
      width: 60px;
      height: 60px;
      border: 4px solid lightgray;
      margin-left: -4px;
      font-size: 36px;
      vertical-align: middle;
    "
  >
    <span
      v-if="item != null"
    >
      {{ item }}
    </span>
    <span
      v-else
      style="color: darkgray;"
    >
      {{ '-' }}
    </span>
  </div>
</template>
