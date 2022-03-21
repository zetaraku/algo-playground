<script setup lang="ts">
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiWikipedia, mdiCodeTags, mdiPlay, mdiPause } from '@mdi/js';

definePageMeta({
  title: 'Knuth–Morris–Pratt algorithm',
});

const patternInput = ref<string>('');
const textInput = ref<string>('');

const pattern = computed<string[]>(() => [...patternInput.value]);
const text = computed<string[]>(() => [...textInput.value]);

const stage = ref<'preprocessing' | 'matching'>('preprocessing');

const lps = ref<(number | undefined)[]>([]);
const lpsFinished = computed<boolean>(() => !lps.value.includes(undefined));

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

const {
  currentProcess,
  infoMessage,
  autoPlaying,
  autoPlayDelay,
  beginProcess,
  endProcess,
  nextStep,
  toggleAutoplay,
  skipAll,
} = useProcess();

function resetPointers() {
  iIndex.value = 0;
  jIndex.value = 0;
  kIndex.value = null;
}
function initLPSTable() {
  lps.value = [...Array(pattern.value.length)];
}

function* computeLPSTable() {
  stage.value = 'preprocessing';

  resetPointers();
  initLPSTable();

  yield 'Begin Compute LPS Table (Click NEXT or AUTOPLAY to Continue)';

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

  yield 'Begin Match Text (Click NEXT or AUTO PLAY to Continue)';

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

watch(pattern, () => {
  endProcess();
  resetPointers();
  initLPSTable();
});
watch(text, () => {
  if (stage.value === 'matching') {
    endProcess();
    resetPointers();
  }
});

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
            v-model.number="autoPlayDelay"
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
              autoPlaying ? 'btn-secondary' : 'btn-outline-secondary'
            ]"
            :disabled="currentProcess === null"
            @click="toggleAutoplay();"
          >
            AUTO PLAY
            <SvgIcon
              class="d-inline-block align-middle ml-1 mb-1"
              type="mdi"
              :path="autoPlaying ? mdiPlay : mdiPause"
            />
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
      >
        <!-- Matched Range -->
        <ArrayViewRangeMarker
          class="marker-color-lime border-end-0"
          :begin-index="0"
          :end-index="iIndex"
        />
        <!-- Current i Index -->
        <ArrayViewIndexMarker
          :class="currentIndexesMatched ? 'marker-color-blue' : 'marker-color-red'"
          :index="iIndex"
        >
          <span>
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
      >
        <!-- Current k Index (lookup indicator) -->
        <ArrayViewIndexMarker
          v-if="kIndex !== null"
          class="marker-color-lime"
          :index="kIndex"
        >
          <span>
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
      >
        <!-- Matched Range -->
        <ArrayViewRangeMarker
          class="marker-color-lime border-end-0"
          :begin-index="jIndex - iIndex"
          :end-index="jIndex"
        />

        <!-- Current j Index -->
        <ArrayViewIndexMarker
          :class="currentIndexesMatched ? 'marker-color-blue' : 'marker-color-red'"
          :index="jIndex"
        >
          <span>
            j = {{ jIndex }}
          </span>
        </ArrayViewIndexMarker>
      </ArrayView>
    </div>

    <!-- Text String -->
    <div v-if="stage === 'matching'">
      <label class="fs-5 font-monospace">text</label>
      <ArrayView
        :data="text"
      >
        <!-- Matched Range -->
        <ArrayViewRangeMarker
          class="marker-color-lime border-end-0"
          :begin-index="jIndex - iIndex"
          :end-index="jIndex"
        />

        <!-- Current j-i Index -->
        <ArrayViewTextMarker
          v-if="iIndex > 0"
          class="marker-color-lime"
          :index="jIndex - iIndex"
        >
          <span>
            j-i = {{ jIndex - iIndex }}
          </span>
        </ArrayViewTextMarker>

        <!-- Current j Index -->
        <ArrayViewIndexMarker
          :class="currentIndexesMatched ? 'marker-color-blue' : 'marker-color-red'"
          :index="jIndex"
        >
          <span>
            j = {{ jIndex }}
          </span>
        </ArrayViewIndexMarker>
      </ArrayView>
    </div>
  </div>
</template>
