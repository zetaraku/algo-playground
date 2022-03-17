<script setup lang="ts">
const props = defineProps<{
  value?: any,
}>();
</script>

<template>
  <div
    class="d-inline-flex justify-content-center align-items-center fs-2"
    style="
      width: 60px;
      height: 60px;
      border: 4px solid lightgray;
      vertical-align: middle;
    "
  >
    <slot :value="value">
      <span
        v-if="value === undefined"
        style="color: darkgray;"
      >
        {{ '-' }}
      </span>
      <span
        v-else-if="value === null"
        class="fs-6"
        style="color: blue;"
      >
        {{ 'NULL' }}
      </span>
      <span v-else>
        {{ value }}
      </span>
    </slot>
  </div>
</template>
