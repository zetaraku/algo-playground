export default function useProcess() {
  const currentProcess = ref<Generator<string, string> | null>(null);
  const infoMessage = ref<string | null>(null);
  const autoPlaying = ref<boolean>(false);
  const autoPlayDelay = ref<number>(500);

  function nextStep() {
    if (currentProcess.value === null) return;

    const result = currentProcess.value.next();
    infoMessage.value = result.value;

    if (result.done) currentProcess.value = null;
  }
  async function autoPlay() {
    if (autoPlaying.value) return;

    autoPlaying.value = true;
    while (currentProcess.value !== null) {
      nextStep();
      // eslint-disable-next-line no-await-in-loop
      await new Promise((resolve) => {
        setTimeout(resolve, autoPlayDelay.value);
      });
    }
    autoPlaying.value = false;
  }
  function skipAll() {
    while (currentProcess.value !== null) {
      nextStep();
    }
  }

  function beginProcess(start: () => Generator<string, string>) {
    currentProcess.value = start();
    nextStep();
  }
  function endProcess() {
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
    autoPlay,
    skipAll,
  };
}
