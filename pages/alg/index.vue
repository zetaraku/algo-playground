<script setup lang="ts">
definePageMeta({
  title: 'Algorithms',
});

const categories = [
  {
    name: 'Strings',
    pages: [
      { name: 'Knuth–Morris–Pratt algorithm', to: '/alg/kmp' },
    ],
  },
  {
    name: 'Array',
    pages: [
      { name: 'Fisher–Yates shuffle', to: '/alg/shuffle' },
    ],
  },
];
</script>

<template>
  <div>
    <h2 class="mb-3">
      Algorithms
    </h2>
    <ul>
      <li
        v-for="(category, i) in categories"
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
