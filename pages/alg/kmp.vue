<script setup lang="ts">
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiWikipedia, mdiCodeTags, mdiDotsHorizontal } from '@mdi/js';

definePageMeta({
  title: 'Knuth–Morris–Pratt algorithm',
});

const patternInput = ref<string>('');
const textInput = ref<string>('');

const pattern = computed<string[]>(() => [...patternInput.value]);
const text = computed<string[]>(() => [...textInput.value]);

const stage = ref<'preprocessing' | 'matching'>('preprocessing');
const currentProcess = ref<Generator<string, string> | null>(null);
const infoMessage = ref<string | null>(null);
const autoPlaying = ref<boolean>(false);
const autoPlayDelay = ref<number>(250);

const lps = ref<(number | undefined)[]>([]);
const lpsFinished = computed<boolean>(() => !lps.value.includes(undefined));

function initLPSTable() {
  lps.value = [...Array(pattern.value.length)];
}

const iIndex = ref<number>(0);
const jIndex = ref<number>(0);
const kIndex = ref<number | null>(null);

const currentIndexesMatched = computed(() => {
  if (stage.value === 'preprocessing') {
    return pattern.value[iIndex.value] === pattern.value[jIndex.value];
  }
  if (stage.value === 'matching') {
    return pattern.value[iIndex.value] === text.value[jIndex.value];
  }
  return false;
});

function resetPointers() {
  iIndex.value = 0;
  jIndex.value = 0;
  kIndex.value = null;
}

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
async function skipAll() {
  while (currentProcess.value !== null) {
    nextStep();
  }
}
function beginProcess(start: () => Generator<string, string>) {
  currentProcess.value = start();
  nextStep();
}
function endCurrentProcess() {
  currentProcess.value = null;
  infoMessage.value = null;
}

watch(pattern, () => {
  resetPointers();
  initLPSTable();
  endCurrentProcess();
});

watch(text, () => {
  if (stage.value === 'matching') {
    resetPointers();
    endCurrentProcess();
  }
});

function* computeLPSTable() {
  stage.value = 'preprocessing';

  resetPointers();
  initLPSTable();

  yield 'Begin Compute LPS Table (Click NEXT to Continue)';

  if (pattern.value.length === 0) {
    return 'Finished (You can Match Text now!)';
  }

  yield 'set lps[0] = 0;';
  lps.value[0] = 0;
  yield 'set j = 1;';
  jIndex.value = 1;

  while (jIndex.value !== pattern.value.length) {
    yield 'check (pattern[i] == pattern[j])';
    if (pattern.value[iIndex.value] === pattern.value[jIndex.value]) {
      yield 'check (pattern[i] == pattern[j]) => true';

      yield 'set lps[j] = i + 1;';
      lps.value[jIndex.value] = iIndex.value + 1;

      yield 'set i += 1; set j += 1;';
      iIndex.value += 1;
      jIndex.value += 1;
    } else {
      yield 'check (pattern[i] == pattern[j]) => false';

      yield 'check (i != 0)';
      if (iIndex.value !== 0) {
        yield 'check (i != 0) => true';

        kIndex.value = iIndex.value - 1;
        yield 'set i = lps[i - 1];';
        iIndex.value = lps.value[iIndex.value - 1]!;
        kIndex.value = null;
      } else {
        yield 'check (i != 0) => false';

        yield 'set lps[j] = 0;';
        lps.value[jIndex.value] = 0;

        yield 'set j += 1;';
        jIndex.value += 1;
      }
    }
  }

  return 'Finished (You can Match Text now!)';
}

function* matchText() {
  stage.value = 'matching';

  resetPointers();

  yield 'Begin Match Text (Click NEXT to Continue)';

  if (pattern.value.length === 0) {
    return 'Found at Index 0 (pattern is empty)';
  }

  while (jIndex.value !== text.value.length) {
    yield 'check (pattern[i] == text[j])';
    if (pattern.value[iIndex.value] === text.value[jIndex.value]) {
      yield 'check (pattern[i] == text[j]) => true';

      yield 'set i += 1; set j += 1;';
      iIndex.value += 1;
      jIndex.value += 1;

      if (iIndex.value === pattern.value.length) {
        return `Found at Index ${jIndex.value - pattern.value.length}`;
      }
    } else {
      yield 'check (pattern[i] == text[j]) => false';

      yield 'check (i != 0)';
      if (iIndex.value !== 0) {
        yield 'check (i != 0) => true';

        kIndex.value = iIndex.value - 1;
        yield 'set i = lps[i - 1];';
        iIndex.value = lps.value[iIndex.value - 1]!;
        kIndex.value = null;
      } else {
        yield 'check (i != 0) => false';

        yield 'set j += 1;';
        jIndex.value += 1;
      }
    }
  }

  return 'Not found';
}

onMounted(() => {
  patternInput.value = '😀😀😀🎡😀😀😀😀';
  textInput.value = '😀😀😀😀😀🎡😀😀😀🎡😀😀😀😀🎡';
});
</script>

<template>
  <div class="font-sans text-nowrap">
    <!-- Headings -->
    <div class="mb-4">
      <h2 class="d-inline-block me-2">
        Knuth–Morris–Pratt algorithm
      </h2>
      <div class="d-inline-block">
        <a
          class="me-1"
          href="https://en.wikipedia.org/wiki/Knuth%E2%80%93Morris%E2%80%93Pratt_algorithm"
          target="_blank"
        ><SvgIcon
          class="d-inline-block align-middle me-1"
          type="mdi"
          :path="mdiWikipedia"
        />Wikipedia</a>
        <a
          class="me-1"
          href="https://github.com/zetaraku/leetcode/blob/master/28-implement-strstr.cpp"
          target="_blank"
        ><SvgIcon
          class="d-inline-block align-middle me-1"
          type="mdi"
          :path="mdiCodeTags"
        />Implementation</a>
      </div>
    </div>

    <!-- Pattern and Text Inputs -->
    <div>
      <label class="d-block mb-3">
        <span class="form-label">Pattern</span>
        <input
          v-model="patternInput"
          type="text"
          class="form-control form-control-lg"
        >
      </label>
      <label class="d-block mb-3">
        <span class="form-label">Text</span>
        <input
          v-model="textInput"
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
              currentProcess !== null && stage === 'preprocessing' ?
                'btn-primary' : 'btn-outline-primary'
            ]"
            @click="beginProcess(computeLPSTable);"
          >
            Compute LPS Table
          </button>
        </div>
        <div class="col">
          <button
            class="btn btn-lg"
            :class="[
              currentProcess !== null && stage === 'matching' ?
                'btn-danger' : 'btn-outline-danger'
            ]"
            :disabled="!lpsFinished"
            @click="beginProcess(matchText);"
          >
            Match Text
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

    <!-- Pattern String -->
    <div>
      <label class="fs-5 font-monospace">pattern</label>
      <ArrayView
        :data="pattern"
        style="padding-bottom: 60px;"
      >
        <!-- Matched Range -->
        <ArrayViewRangeMarker
          class="previous-matched border-end-0"
          :begin-index="0"
          :end-index="iIndex"
        />
        <!-- Current i Index -->
        <ArrayViewIndexMarker
          :class="currentIndexesMatched ? 'current-matched' : 'current-mismatched'"
          :index="iIndex"
        >
          <span class="marker-text">
            i = {{ iIndex }}
          </span>
        </ArrayViewIndexMarker>
      </ArrayView>
    </div>

    <!-- LPS Table -->
    <div>
      <label class="fs-5 font-monospace">lps</label>
      <ArrayView
        :data="lps"
        style="padding-bottom: 60px;"
      >
        <!-- Current k Index (lookup indicator) -->
        <ArrayViewIndexMarker
          v-if="kIndex !== null"
          class="previous-matched"
          :index="kIndex"
        >
          <span class="marker-text">
            i-1 = {{ iIndex - 1 }}
          </span>
        </ArrayViewIndexMarker>
      </ArrayView>
    </div>

    <!-- Pattern String -->
    <div v-if="stage === 'preprocessing'">
      <label class="fs-5 font-monospace">pattern</label>
      <ArrayView
        :data="pattern"
        style="padding-bottom: 60px;"
      >
        <!-- Matched Range -->
        <ArrayViewRangeMarker
          class="previous-matched border-end-0"
          :begin-index="jIndex - iIndex"
          :end-index="jIndex"
        />

        <!-- Current j Index -->
        <ArrayViewIndexMarker
          :class="currentIndexesMatched ? 'current-matched' : 'current-mismatched'"
          :index="jIndex"
        >
          <span class="marker-text">
            j = {{ jIndex }}
          </span>
        </ArrayViewIndexMarker>
      </ArrayView>
    </div>

    <!-- Text String -->
    <div v-if="stage === 'matching'">
      <label class="fs-5 font-monospace">text</label>
      <ArrayView
        :data="stage !== 'matching' ? pattern : text"
        style="padding-bottom: 60px;"
      >
        <!-- Matched Range -->
        <ArrayViewRangeMarker
          class="previous-matched border-end-0"
          :begin-index="jIndex - iIndex"
          :end-index="jIndex"
        />

        <!-- Current j-i Index -->
        <ArrayViewIndexMarker
          v-if="iIndex > 0"
          class="previous-matched no-marker"
          :index="jIndex - iIndex"
        >
          <span class="marker-text">
            j-i = {{ jIndex - iIndex }}
          </span>
        </ArrayViewIndexMarker>

        <!-- Current j Index -->
        <ArrayViewIndexMarker
          :class="currentIndexesMatched ? 'current-matched' : 'current-mismatched'"
          :index="jIndex"
        >
          <span class="marker-text">
            j = {{ jIndex }}
          </span>
        </ArrayViewIndexMarker>
      </ArrayView>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.previous-matched {
  color: rgba(163, 230, 53, 1.0);
  border-color: rgba(163, 230, 53, 1.0);
  background-color: rgba(163, 230, 53, 0.5);
}
.current-matched {
  color: rgba(59, 130, 246, 1.0);
  border-color: rgba(59, 130, 246, 1.0);
  background-color: rgba(59, 130, 246, 0.5);
}
.current-mismatched {
  color: rgba(239, 68, 68, 1.0);
  border-color: rgba(239, 68, 68, 1.0);
  background-color: rgba(239, 68, 68, 0.5);
}
.marker-text {
  position: relative;
  bottom: -60px;
  font-size: 20px;
  font-weight: bold;
}
.no-marker {
  border-color: transparent !important;
  background-color: transparent !important;
}
</style>
