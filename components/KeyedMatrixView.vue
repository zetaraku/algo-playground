<script setup lang="ts">
const props = defineProps<{
  data: { key: any, value: any }[][],
}>();

const flatData = computed(
  () => props.data.flatMap(
    (row, i) => row.map(
      (col, j) => ({ index: { i, j }, item: col }),
    ),
  ),
);

const maxRowLength = computed(
  () => props.data.reduce(
    (acc, row) => Math.max(acc, row.length),
    0,
  ),
);
</script>

<template>
  <div
    class="position-relative"
    :style="{
      'padding-bottom': `${ 4 + 4 * (15 - 1) * (data.length + 1) }px`,
      'margin-bottom': `${ 0 + 4 * (15 - 1) * 1 }px`,
      'margin-right': `${ 0 + 4 * (15 - 1) * 1 }px`,
    }"
  >
    <ClientOnly>
      <ListTransitionGroup>
        <!-- array elements -->
        <ArrayViewValueBox
          v-for="{ item, index: { i, j }} in flatData"
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

        <!-- right end indicator -->
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

        <!-- bottom end indicator -->
        <ArrayViewEndBox
          v-for="(_, j) in (maxRowLength + 1)"
          :key="j"
          class="position-absolute"
          :style="{
            top: `${4 * (15 - 1) * data.length}px`,
            left: `${4 * (15 - 1) * j}px`,
          }"
        >
          <slot
            name="end"
            :i-index="data.length"
            :j-index="j"
          />
        </ArrayViewEndBox>
      </ListTransitionGroup>

      <slot>
        <!-- marker slot -->
      </slot>
    </ClientOnly>
  </div>
</template>
