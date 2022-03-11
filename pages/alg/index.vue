<script setup lang="ts">
definePageMeta({
  title: 'Algorithm',
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
    <h1>Algorithm</h1>
    <ul class="text-6">
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
