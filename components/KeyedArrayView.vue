<script setup lang="ts">
const props = defineProps<{
  data: { key: any, value: any }[],
}>();
</script>

<template>
  <div
    class="position-relative"
    :style="{
      'padding-bottom': `${ 4 + 4 * (15 - 1) * 1 }px`,
      'margin-bottom': `${ 0 + 4 * (15 - 1) * 1 }px`,
      'margin-right': `${ 0 + 4 * (15 - 1) * 1 }px`,
    }"
  >
    <ClientOnly>
      <ListTransitionGroup>
        <!-- array elements -->
        <ArrayViewValueBox
          v-for="(item, index) in data"
          :key="item.key"
          :value="item.value"
          class="position-absolute"
          :style="{
            top: `${4 * (15 - 1) * 0}px`,
            left: `${4 * (15 - 1) * index}px`,
          }"
        >
          <slot
            name="item"
            :index="index"
            :value="item.value"
            :item="item"
          />
        </ArrayViewValueBox>

        <!-- end indicator -->
        <ArrayViewEndBox
          v-for="key in ['end']"
          :key="key"
          class="position-absolute"
          :style="{
            top: `${4 * (15 - 1) * 0}px`,
            left: `${4 * (15 - 1) * data.length}px`,
          }"
        >
          <slot
            name="end"
            :index="data.length"
          />
        </ArrayViewEndBox>
      </ListTransitionGroup>

      <slot>
        <!-- marker slot -->
      </slot>
    </ClientOnly>
  </div>
</template>
