<script setup lang="ts">
const config = useRuntimeConfig();
</script>

<template>
  <div class="container-fluid">
    <div class="d-flex flex-wrap justify-content-end align-items-center py-2 border-top">
      <a
        class="d-flex align-items-center mx-2"
        href="https://www.free-counter.jp/"
      >
        <img
          :src="config.FREE_COUNTER_URL"
          alt="アクセスカウンター"
        >
      </a>
      <span class="text-muted">&copy; 2022 / made by <a
        target="_blank"
        href="https://github.com/zetaraku"
      >zetaraku</a> with :D</span>
    </div>
  </div>
</template>
