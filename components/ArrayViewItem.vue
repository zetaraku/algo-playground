<script setup lang="ts">
const props = defineProps<{
  value: any,
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
    <slot>
      <span
        v-if="value != null"
      >
        {{ value }}
      </span>
      <span
        v-else
        style="color: darkgray;"
      >
        {{ '-' }}
      </span>
    </slot>
  </div>
</template>
