<script setup lang="ts">
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiWikipedia, mdiPlay, mdiPause } from '@mdi/js';

definePageMeta({
  title: 'TEMPLATE TITLE',
});

const inputInput = ref<string>('');
const input = computed<string[]>(() => [...inputInput.value]);

const iIndex = ref<number>(0);

const {
  currentMessage,
  isProcedureRunning,
  startProcedure,
  nextStep,
  skipAllSteps,
  endProcedure,
} = useProcedure();
const {
  autoplayDelay,
  isAutoplayActive,
  toggleAutoplay,
} = useAutoplay(nextStep);

function init() {
  iIndex.value = 0;
}

function* run() {
  init();

  yield 'Start Run (Click NEXT or AUTO PLAY to Continue)';

  while (iIndex.value !== input.value.length) {
    yield 'i += 1;';
    iIndex.value += 1;
  }

  return 'Done';
}

watch(input, () => {
  endProcedure();
  init();
});

onMounted(() => {
  inputInput.value = '🎡😀😀😀😀😀😀😀😀🎡';
});
</script>

<template>
  <div class="font-sans text-nowrap">
    <!-- Headings -->
    <div class="mb-4">
      <h2 class="d-inline-block me-2">
        TEMPLATE TITLE
      </h2>
      <div class="d-inline-block">
        <a
          class="me-1"
          href="TEMPLATE WIKI URL"
          target="_blank"
        ><SvgIcon
          class="d-inline-block align-middle me-1"
          type="mdi"
          :path="mdiWikipedia"
        />Wikipedia</a>
      </div>
    </div>

    <!-- Inputs -->
    <div>
      <label class="d-block mb-3">
        <span class="form-label">Input</span>
        <input
          v-model="inputInput"
          type="text"
          class="form-control form-control-lg"
        >
      </label>
    </div>

    <!-- Buttons -->
    <div class="my-4">
      <div class="row row-cols-auto g-2 align-items-center my-1">
        <div class="col">
          <button
            class="btn btn-lg"
            :class="[
              isProcedureRunning ? 'btn-primary' : 'btn-outline-primary'
            ]"
            @click="startProcedure(run());"
          >
            Run
          </button>
        </div>
        <div class="col">
          <button
            class="btn btn-lg btn-outline-secondary"
            :disabled="!isProcedureRunning"
            @click="nextStep();"
          >
            NEXT &gt;
          </button>
        </div>
      </div>
      <div class="row row-cols-auto g-2 align-items-end my-1">
        <div class="col">
          <label class="mb-1">
            delay (ms):
          </label>
          <input
            v-model.number="autoplayDelay"
            type="number"
            min="0"
            step="50"
            class="form-control form-control-lg"
            style="width: 8em;"
          >
        </div>
        <div class="col">
          <button
            class="btn btn-lg"
            :class="[
              isAutoplayActive ? 'btn-secondary' : 'btn-outline-secondary'
            ]"
            :disabled="!isProcedureRunning"
            @click="toggleAutoplay();"
          >
            AUTO PLAY
            <SvgIcon
              class="d-inline-block align-middle ml-1 mb-1"
              type="mdi"
              :path="isAutoplayActive ? mdiPlay : mdiPause"
            />
          </button>
        </div>
        <div class="col">
          <button
            class="btn btn-lg btn-outline-secondary"
            :disabled="!isProcedureRunning"
            @click="skipAllSteps();"
          >
            SKIP &gt;&gt;|
          </button>
        </div>
      </div>
    </div>

    <!-- Explanatory Message -->
    <blockquote class="blockquote">
      <p class="fs-3 font-monospace">
        {{ currentMessage ?? 'READY' }}
      </p>
    </blockquote>

    <!-- ArrayView -->
    <div>
      <label class="fs-5 font-monospace">
        input[{{ input.length }}]
      </label>
      <ArrayView :data="input">
        <ArrayViewIndexMarker
          :index="iIndex"
          class="marker-color-blue"
        >
          <span>
            i = {{ iIndex }}
          </span>
        </ArrayViewIndexMarker>
      </ArrayView>
    </div>
  </div>
</template>
