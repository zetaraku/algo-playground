<script setup lang="ts">
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiWikipedia, mdiPlay, mdiPause } from '@mdi/js';

definePageMeta({
  title: 'Fisher–Yates shuffle',
});

const arrayJsonInput = ref<string>('');
const array = ref<{ key: number, value: any }[]>([]);

const iIndex = ref<number>(0);
const jIndex = ref<number | null>(null);

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

function resetPointers() {
  iIndex.value = 0;
  jIndex.value = null;
}
function initArray() {
  try {
    const result = JSON.parse(arrayJsonInput.value);
    if (!Array.isArray(result)) throw new TypeError('Input must be an array.');
    array.value = result.map((value, index) => ({ key: index, value }));
  } catch (e) {
    array.value = [...'INVALID😕INPUT'].map((value, index) => ({ key: index, value }));
  }
}

function resetArray() {
  endProcedure();
  initArray();
  resetPointers();
}
function* shuffleArray() {
  resetPointers();

  yield 'Start Shuffle Array (Click NEXT or AUTO PLAY to Continue)';

  while (iIndex.value !== array.value.length) {
    yield 'set j = i + rand() % (len(array) - i);';
    jIndex.value = iIndex.value + Math.trunc(Math.random() * (array.value.length - iIndex.value));

    yield 'swap array[i], array[j];';
    [
      array.value[iIndex.value], array.value[jIndex.value],
    ] = [
      array.value[jIndex.value], array.value[iIndex.value],
    ];

    yield 'set i += 1;';
    iIndex.value += 1;

    jIndex.value = null;
  }

  return 'Finished';
}

watch(arrayJsonInput, () => {
  resetArray();
});

onMounted(() => {
  arrayJsonInput.value = JSON.stringify(
    [...Array(20)].map<any>((_, i) => 1 + i)
      .concat(['😀', '😮', '🙂', '😄', '🙃']),
  );
});
</script>

<template>
  <div class="font-sans text-nowrap">
    <!-- Headings -->
    <div class="mb-4">
      <h2 class="d-inline-block me-2">
        Fisher–Yates shuffle
      </h2>
      <div class="d-inline-block">
        <a
          class="me-1"
          href="https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle"
          target="_blank"
        ><SvgIcon
          class="d-inline-block align-middle me-1"
          type="mdi"
          :path="mdiWikipedia"
        />Wikipedia</a>
      </div>
    </div>

    <!-- Array Input -->
    <div>
      <label class="d-block mb-3">
        <span class="form-label">Array (in JSON format)</span>
        <input
          v-model="arrayJsonInput"
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
            class="btn btn-lg btn-outline-primary"
            @click="resetArray();"
          >
            Reset Array
          </button>
        </div>
        <div class="col">
          <button
            class="btn btn-lg"
            :class="[
              isProcedureRunning ? 'btn-danger' : 'btn-outline-danger'
            ]"
            @click="startProcedure(shuffleArray());"
          >
            Shuffle Array
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
      <div
        id="advancedOptions"
        class="row row-cols-auto g-2 align-items-end my-1"
      >
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

    <!-- Array -->
    <div>
      <label class="fs-5 font-monospace">array[{{ array.length }}]</label>
      <KeyedArrayView
        :data="array"
      >
        <template #item="{ value }">
          <span class="fs-3">
            {{ value }}
          </span>
        </template>
        <!-- Matched Range -->
        <ArrayViewRangeMarker
          class="marker-color-lime border-end-0"
          :begin-index="0"
          :end-index="iIndex"
        />
        <!-- Current i Index -->
        <ArrayViewIndexMarker
          class="marker-color-blue"
          :index="iIndex"
        >
          <span>
            i = {{ iIndex }}
          </span>
        </ArrayViewIndexMarker>
        <!-- Current j Index (lookup indicator) -->
        <ArrayViewIndexMarker
          v-if="jIndex !== null"
          class="marker-color-red"
          :index="jIndex"
        >
          <span>
            j = {{ jIndex }}
          </span>
        </ArrayViewIndexMarker>
      </KeyedArrayView>
    </div>
  </div>
</template>
