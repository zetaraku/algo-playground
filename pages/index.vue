<template>
  <div class="h-full flex flex-col justify-center items-center">
    <div class="i-mdi:ferris-wheel text-60 text-teal-600 animate-bounce" />

    <h1 class="text-10 mb-3">
      Algo Playground
    </h1>
    <p class="text-5 text-center leading-relaxed mb-10">
      Welcome! :D<br>
      Here you can play with algorithm and watch it run step by step.<br>
      weeeeeeeeeeeeee &lt;:)
    </p>

    <NuxtLink
      class="
        px-5 py-3 text-4xl text-teal-600 no-underline
        rounded border border-teal-600
        hover:bg-teal-600 hover:text-white
        animate-pulse hover:animate-none
      "
      to="/alg"
    >
      Enter
    </NuxtLink>
  </div>
</template>
