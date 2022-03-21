export default function useAutoplay(nextStep: () => boolean) {
  const autoplayDelay = ref<number>(500);
  const timeoutId = ref<number | null>(null);
  const isAutoplayActive = computed<boolean>(() => timeoutId.value !== null);

  function stopAutoplay() {
    if (!isAutoplayActive.value) return;

    window.clearTimeout(timeoutId.value!);
    timeoutId.value = null;
  }

  function startAutoplay() {
    if (isAutoplayActive.value) return;

    (function loop() {
      timeoutId.value = window.setTimeout(loop, autoplayDelay.value);

      const done = nextStep();
      if (done) stopAutoplay();
    }());
  }

  function toggleAutoplay() {
    if (isAutoplayActive.value) {
      stopAutoplay();
    } else {
      startAutoplay();
    }
  }

  return {
    autoplayDelay,
    isAutoplayActive,
    startAutoplay,
    stopAutoplay,
    toggleAutoplay,
  };
}
