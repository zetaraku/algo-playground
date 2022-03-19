<script setup lang="ts">
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiWikipedia, mdiDotsHorizontal } from '@mdi/js';

definePageMeta({
  title: 'Fisher–Yates shuffle',
});

const arrayJsonInput = ref<string>('');
const array = ref<{ key: number, value: any }[]>([]);

const iIndex = ref<number>(0);
const jIndex = ref<number | null>(null);

const {
  currentProcess,
  infoMessage,
  autoPlaying,
  autoPlayDelay,
  beginProcess,
  endProcess,
  nextStep,
  autoPlay,
  skipAll,
} = useProcess();

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
  endProcess();
  initArray();
  resetPointers();
}
function* shuffleArray() {
  resetPointers();

  yield 'Begin Shuffle Array (Click NEXT to Continue)';

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
              currentProcess !== null ? 'btn-danger' : 'btn-outline-danger'
            ]"
            @click="beginProcess(shuffleArray);"
          >
            Shuffle Array
          </button>
        </div>
        <div class="col">
          <button
            class="btn btn-lg btn-outline-secondary"
            :disabled="currentProcess === null"
            @click="nextStep();"
          >
            NEXT &gt;
          </button>
        </div>
        <div class="col">
          <button
            class="btn btn-sm btn-outline-secondary rounded-pill p-2 ms-2"
            data-bs-toggle="collapse"
            data-bs-target="#advancedOptions"
          >
            <SvgIcon
              class="d-inline-block align-middle"
              type="mdi"
              :path="mdiDotsHorizontal"
            />
          </button>
        </div>
      </div>
      <div
        id="advancedOptions"
        class="row row-cols-auto g-2 align-items-end my-1 collapse"
      >
        <div class="col">
          <label class="mb-1">
            delay (ms):
          </label>
          <input
            v-model.number="autoPlayDelay"
            type="number"
            min="0"
            step="50"
            class="form-control form-control-lg"
            style="width: 10em;"
          >
        </div>
        <div class="col">
          <button
            class="btn btn-lg"
            :class="[
              autoPlaying ? 'btn-secondary' : 'btn-outline-secondary'
            ]"
            :disabled="currentProcess === null || autoPlaying"
            @click="autoPlay();"
          >
            AUTO PLAY &gt;&gt;
          </button>
        </div>
        <div class="col">
          <button
            class="btn btn-lg btn-outline-secondary"
            :disabled="currentProcess === null"
            @click="skipAll();"
          >
            SKIP &gt;&gt;|
          </button>
        </div>
      </div>
    </div>

    <!-- Explanatory Message -->
    <blockquote class="blockquote">
      <p class="fs-3 font-monospace">
        {{ infoMessage ?? 'READY' }}
      </p>
    </blockquote>

    <!-- Array -->
    <div>
      <label class="fs-5 font-monospace">array</label>
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
          <span class="marker-text">
            i = {{ iIndex }}
          </span>
        </ArrayViewIndexMarker>
        <!-- Current j Index (lookup indicator) -->
        <ArrayViewIndexMarker
          v-if="jIndex !== null"
          class="marker-color-red"
          :index="jIndex"
        >
          <span class="marker-text">
            j = {{ jIndex }}
          </span>
        </ArrayViewIndexMarker>
      </KeyedArrayView>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.marker-color-lime {
  color: rgba(163, 230, 53, 1.0);
  border-color: rgba(163, 230, 53, 1.0);
  background-color: rgba(163, 230, 53, 0.5);
}
.marker-color-blue {
  color: rgba(59, 130, 246, 1.0);
  border-color: rgba(59, 130, 246, 1.0);
  background-color: rgba(59, 130, 246, 0.5);
}
.marker-color-red {
  color: rgba(239, 68, 68, 1.0);
  border-color: rgba(239, 68, 68, 1.0);
  background-color: rgba(239, 68, 68, 0.5);
}
.marker-color-text-only {
  border-color: transparent !important;
  background-color: transparent !important;
}
.marker-text {
  position: relative;
  bottom: -60px;
  font-size: 20px;
  font-weight: bold;
}
</style>
