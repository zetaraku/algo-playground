export default function useProcess() {
  const currentProcess = ref<Generator<string, string> | null>(null);
  const infoMessage = ref<string | null>(null);
  const autoPlayDelay = ref<number>(500);
  const autoplayTimeoutId = ref<number | null>(null);
  const autoPlaying = computed<boolean>(() => autoplayTimeoutId.value !== null);

  function nextStep() {
    if (currentProcess.value === null) return;

    const result = currentProcess.value.next();
    infoMessage.value = result.value;

    if (result.done) currentProcess.value = null;
  }

  function stopAutoplay() {
    if (autoplayTimeoutId.value === null) return;

    window.clearTimeout(autoplayTimeoutId.value);
    autoplayTimeoutId.value = null;
  }

  function autoplayLoop() {
    if (currentProcess.value === null) {
      stopAutoplay();
      return;
    }

    autoplayTimeoutId.value = window.setTimeout(
      autoplayLoop,
      autoPlayDelay.value,
    );

    nextStep();
  }

  function startAutoplay() {
    if (autoplayTimeoutId.value !== null) return;

    autoplayLoop();
  }

  function toggleAutoplay() {
    if (autoPlaying.value) {
      stopAutoplay();
    } else {
      startAutoplay();
    }
  }

  function skipAll() {
    while (currentProcess.value !== null) {
      nextStep();
    }
  }

  function beginProcess(start: () => Generator<string, string>) {
    stopAutoplay();
    currentProcess.value = start();
    nextStep();
  }

  function endProcess() {
    stopAutoplay();
    currentProcess.value = null;
    infoMessage.value = null;
  }

  return {
    currentProcess,
    infoMessage,
    autoPlaying,
    autoPlayDelay,
    beginProcess,
    endProcess,
    nextStep,
    autoPlay: startAutoplay,
    startAutoplay,
    stopAutoplay,
    toggleAutoplay,
    skipAll,
  };
}
