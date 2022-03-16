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
