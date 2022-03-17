<script setup lang="ts">
import { algCategories } from '@@/assets/menu';

definePageMeta({
  title: 'Algorithms',
});
</script>

<template>
  <div>
    <h2 class="mb-3">
      Algorithms
    </h2>
    <ul>
      <li
        v-for="(category, i) in algCategories"
        :key="i"
      >
        {{ category.name }}
        <ul>
          <li
            v-for="(page, j) in category.pages"
            :key="j"
          >
            <NuxtLink :to="page.to">
              {{ page.name }}
            </NuxtLink>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
