<script setup lang="ts">
const siteTitle = 'Algo Playground';

const route = useRoute();

useMeta({
  title: computed(
    () => (route.meta.title ? `${route.meta.title} | ${siteTitle}` : siteTitle),
  ),
});

onMounted(() => import('bootstrap'));
</script>

<template>
  <div class="vh-100">
    <header class="fixed-top">
      <AppHeader />
    </header>
    <main
      style="
        padding-top: 56px !important;
        min-height: calc(100vh - 41px);
      "
    >
      <div class="container-fluid py-3">
        <slot />
      </div>
    </main>
    <footer>
      <AppFooter />
    </footer>
  </div>
</template>
