<script setup lang="ts">
const props = defineProps<{
  data: { key: any, value: any }[],
}>();
</script>

<template>
  <div
    class="position-relative"
    style="padding-bottom: 60px;"
  >
    <!-- array elements -->
    <ArrayViewItem
      v-for="(item, index) in data"
      :key="item.key"
      class="position-absolute"
      style="transition: all cubic-bezier(0.4, 0, 0.2, 1) 300ms;"
      :style="{
        left: `${4 + 4 * (15 - 1) * index}px`,
      }"
    >
      <slot
        name="item"
        :index="index"
        :value="item.value"
        :item="item"
      >
        <span
          v-if="item.value === undefined"
          style="color: darkgray;"
        >
          {{ '-' }}
        </span>
        <span
          v-else-if="item.value === null"
          class="fs-6"
          style="color: blue;"
        >
          {{ 'NULL' }}
        </span>
        <span v-else>
          {{ item.value }}
        </span>
      </slot>
    </ArrayViewItem>

    <!-- end indicator -->
    <ArrayViewItem
      class="position-absolute"
      style="background-color: lightgray;"
      :style="{ left: `${4 + 4 * (15 - 1) * data.length}px` }"
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
