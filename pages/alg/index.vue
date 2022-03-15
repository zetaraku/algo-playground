<script setup lang="ts">
definePageMeta({
  title: 'Algorithms',
});

const categories = [
  {
    title: 'Strings',
    pages: [
      { title: 'Knuth–Morris–Pratt algorithm', to: '/alg/kmp' },
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
        {{ category.title }}
        <ul>
          <li
            v-for="(page, j) in category.pages"
            :key="j"
          >
            <NuxtLink :to="page.to">
              {{ page.title }}
            </NuxtLink>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
