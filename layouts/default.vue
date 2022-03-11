<template>
  <div class="relative min-h-screen">
    <nav
      class="
        fixed top-0 left-0 right-0 h-20 z-999
        flex items-center
        text-10 px-6 py-4 bg-teal-600
      "
    >
      <NuxtLink
        class="text-white no-underline"
        to="/"
      >
        <div class="inline-block text-white align-middle i-mdi:ferris-wheel mr-4" />
        <span>Algo Playground</span>
      </NuxtLink>
      <div class="m-a" />
      <a
        href="https://github.com/zetaraku/algo-playground"
        target="_blank"
      >
        <div class="inline-block text-white align-middle i-mdi:github" />
      </a>
    </nav>
    <header />

    <main class="pt-20 pb-20 px-6 min-h-screen">
      <slot />
    </main>

    <footer
      class="
        absolute left-0 right-0 bottom-0
        text-right px-2 pt-2 pb-1 bg-gray-100
      "
    >
      &copy; 2022 / made by
      <a
        class="no-underline"
        href="https://github.com/zetaraku"
        target="_blank"
      >
        <div class="inline-block align-middle i-mdi:github mr-0.5" />zetaraku
      </a>
      with :D
    </footer>
  </div>
</template>
