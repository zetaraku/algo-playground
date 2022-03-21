export default function useProcedure() {
  const currentProcedure = ref<Generator<string, string> | null>(null);
  const currentMessage = ref<string | null>(null);
  const isProcedureRunning = computed<boolean>(() => currentProcedure.value !== null);

  function nextStep() {
    if (currentProcedure.value === null) {
      return true;
    }

    const result = currentProcedure.value.next();

    if (result.done) {
      currentProcedure.value = null;
    }

    currentMessage.value = result.value;
    return false;
  }

  function startProcedure(procedure: Generator<string, string>) {
    currentProcedure.value = procedure;
    nextStep();
  }

  function endProcedure() {
    currentProcedure.value = null;
    currentMessage.value = null;
  }

  function skipAllSteps() {
    while (currentProcedure.value !== null) {
      nextStep();
    }
  }

  return {
    currentMessage,
    isProcedureRunning,
    startProcedure,
    nextStep,
    skipAllSteps,
    endProcedure,
  };
}
