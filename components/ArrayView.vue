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
    >
      <slot
        name="item"
        :index="index"
        :value="value"
      >
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
    </ArrayViewItem>
    <ArrayViewItem
      style="background-color: lightgray;"
    >
      <slot
        name="end"
        :index="data.length"
      >
        <span
          class="fs-5"
          style="transform: rotate(-45deg);"
        >
          END
        </span>
      </slot>
    </ArrayViewItem>
    <slot>
      <!-- marker slot -->
    </slot>
  </div>
</template>
