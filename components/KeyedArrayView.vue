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
    <TransitionGroup name="list">
      <ArrayViewItem
        v-for="(item, index) in data"
        :key="item.key"
        class="position-absolute"
        :style="{
          left: `${4 * (15 - 1) * index}px`,
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
    </TransitionGroup>

    <!-- end indicator -->
    <ArrayViewItem
      class="position-absolute"
      style="background-color: lightgray;"
      :style="{ left: `${4 * (15 - 1) * data.length}px` }"
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

<style lang="scss" scoped>
.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}
</style>
