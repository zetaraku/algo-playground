<script setup lang="ts">
const props = defineProps<{
  data: { key: any, value: any }[][],
}>();

const indexedFlatData = computed(
  () => props.data.flatMap(
    (row, i) => row.map(
      (col, j) => ({ index: { i, j }, item: col }),
    ),
  ),
);
</script>

<template>
  <div
    class="position-relative"
    :style="{ 'padding-bottom': `${ 4 + 4 * (15 - 1) * data.length }px` }"
  >
    <ClientOnly>
      <TransitionGroup name="list">
        <!-- array elements -->
        <ArrayViewValueBox
          v-for="{ item, index: { i, j }} in indexedFlatData"
          :key="item.key"
          :value="item.value"
          class="position-absolute"
          :style="{
            top: `${4 * (15 - 1) * i}px`,
            left: `${4 * (15 - 1) * j}px`,
          }"
        >
          <slot
            name="item"
            :i-index="i"
            :j-index="j"
            :value="item.value"
            :item="item"
          />
        </ArrayViewValueBox>

        <!-- end indicator -->
        <ArrayViewEndBox
          v-for="(row, i) in data"
          :key="i"
          class="position-absolute"
          :style="{
            top: `${4 * (15 - 1) * i}px`,
            left: `${4 * (15 - 1) * row.length}px`,
          }"
        >
          <slot
            name="end"
            :i-index="i"
            :j-index="row.length"
          />
        </ArrayViewEndBox>
      </TransitionGroup>

      <slot>
        <!-- marker slot -->
      </slot>
    </ClientOnly>
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
