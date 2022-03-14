<script setup lang="ts">
definePageMeta({
  title: 'Knuth–Morris–Pratt algorithm',
});

const patternInput = ref('');
const textInput = ref('');

const pattern = computed(() => [...patternInput.value]);
const text = computed(() => [...textInput.value]);

const stage = ref<'preprocessing' | 'matching'>('preprocessing');
const currentProcess = ref<Generator<string, string> | null>(null);
const infoMessage = ref<string | null>(null);

const lps = ref<(number | undefined)[]>([]);
const lpsFinished = computed(() => !lps.value.includes(undefined));

function initLPSTable() {
  lps.value = [...Array(pattern.value.length)];
}

const iIndex = ref<number>(0);
const jIndex = ref<number>(0);
const kIndex = ref<number | null>(null);

function resetPointers() {
  iIndex.value = 0;
  jIndex.value = 0;
  kIndex.value = null;
}

function nextStep() {
  if (currentProcess.value === null) return;
  infoMessage.value = currentProcess.value.next().value;
}
async function autoSkip(delay: number) {
  while (currentProcess.value && !currentProcess.value.next().done) {
    nextStep();
    // eslint-disable-next-line no-await-in-loop
    await new Promise((resolve) => {
      setTimeout(resolve, delay);
    });
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
    endCurrentProcess();
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

  endCurrentProcess();
  return 'Finished (You can Match Text now!)';
}

function* matchText() {
  stage.value = 'matching';

  resetPointers();

  yield 'Begin Match Text (Click NEXT to Continue)';

  if (pattern.value.length === 0) {
    endCurrentProcess();
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
        endCurrentProcess();
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

  endCurrentProcess();
  return 'Not found';
}

onMounted(() => {
  patternInput.value = '😀😀😀🎡😀😀😀😀';
  textInput.value = '😀😀😀😀😀🎡😀😀😀🎡😀😀😀😀🎡';
});
</script>

<template>
  <div class="font-sans whitespace-nowrap">
    <h1>
      Knuth–Morris–Pratt algorithm
      <a
        class="text-sm mx-1"
        href="https://en.wikipedia.org/wiki/Knuth%E2%80%93Morris%E2%80%93Pratt_algorithm"
        target="_blank"
      ><div class="inline-block align-middle i-mdi:wikipedia mr-0.5" />Wikipedia</a>
      <a
        class="text-sm mx-1"
        href="https://github.com/zetaraku/leetcode/blob/master/28-implement-strstr.cpp"
        target="_blank"
      ><div class="inline-block align-middle i-mdi:code-tags mr-0.5" />Implementation</a>
    </h1>

    <!-- Pattern and Text Inputs -->
    <div>
      <label class="block mb-2">
        <span class="block text-xl">Pattern</span>
        <input
          v-model="patternInput"
          type="text"
          class="w-200 rounded px-3 py-2 text-4xl font-sans"
        >
      </label>
      <label class="block mb-2">
        <span class="block text-xl">Text</span>
        <input
          v-model="textInput"
          type="text"
          class="w-200 rounded px-3 py-2 text-4xl font-sans"
        >
      </label>
    </div>

    <!-- Buttons -->
    <div class="my-5">
      <button
        class="px-3 py-2 m-1 rounded text-4xl"
        :class="{ 'text-red-500': currentProcess !== null && stage === 'preprocessing' }"
        @click="beginProcess(computeLPSTable);"
      >
        Compute LPS Table
      </button>
      <button
        class="px-3 py-2 m-1 rounded text-4xl"
        :class="{ 'text-red-500': currentProcess !== null && stage === 'matching' }"
        :disabled="!lpsFinished"
        @click="beginProcess(matchText);"
      >
        Match Text
      </button>
      <button
        class="px-3 py-2 m-1 rounded text-4xl"
        :disabled="currentProcess === null"
        @click="nextStep();"
      >
        NEXT &gt;
      </button>
      <button
        class="px-3 py-2 m-1 rounded text-4xl"
        :disabled="currentProcess === null"
        @click="autoSkip(500);"
      >
        AUTO &gt;&gt;
      </button>
      <button
        class="px-3 py-2 m-1 rounded text-4xl"
        :disabled="currentProcess === null"
        @click="autoSkip(0);"
      >
        SKIP &gt;&gt;|
      </button>
    </div>

    <!-- Explanatory Message -->
    <div>
      <p class="text-4xl font-mono">
        {{ infoMessage ?? 'READY' }}
      </p>
    </div>

    <!-- Pattern String -->
    <div>
      <label class="text-lg font-mono">pattern</label>
      <ArrayView
        class="pb-15"
        :data="pattern"
      >
        <!-- Matched Range -->
        <ArrayViewRangeMarker
          class="border-lime-400 bg-lime-400/50 border-r-0"
          :begin-index="0"
          :end-index="iIndex"
        />
        <!-- Current i Index -->
        <ArrayViewIndexMarker
          class="border-blue-500 bg-blue-500/50"
          :index="iIndex"
        >
          <span class="relative -bottom-15 text-xl fw-bold text-blue-500">
            i = {{ iIndex }}
          </span>
        </ArrayViewIndexMarker>
      </ArrayView>
    </div>

    <!-- LPS Table -->
    <div>
      <label class="text-lg font-mono">lps</label>
      <ArrayView
        class="pb-15"
        :data="lps"
      >
        <!-- Current k Index (lookup indicator) -->
        <ArrayViewIndexMarker
          v-if="kIndex !== null"
          class="border-amber-400 bg-amber-400/50"
          :index="kIndex"
        >
          <span class="relative -bottom-15 text-xl fw-bold text-amber-400">
            i-1 = {{ iIndex - 1 }}
          </span>
        </ArrayViewIndexMarker>
      </ArrayView>
    </div>

    <!-- Pattern String -->
    <div v-if="stage === 'preprocessing'">
      <label class="text-lg font-mono">pattern</label>
      <ArrayView
        class="pb-15"
        :data="pattern"
      >
        <!-- Matched Range -->
        <ArrayViewRangeMarker
          class="border-lime-400 bg-lime-400/50 border-r-0"
          :begin-index="jIndex - iIndex"
          :end-index="jIndex"
        />

        <!-- Current j Index -->
        <ArrayViewIndexMarker
          class="border-blue-500 bg-blue-500/50"
          :index="jIndex"
        >
          <span class="relative -bottom-15 text-xl fw-bold text-blue-500">
            j = {{ jIndex }}
          </span>
        </ArrayViewIndexMarker>
      </ArrayView>
    </div>

    <!-- Text String -->
    <div v-if="stage === 'matching'">
      <label class="text-lg font-mono">text</label>
      <ArrayView
        class="pb-15"
        :data="stage !== 'matching' ? pattern : text"
      >
        <!-- Matched Range -->
        <ArrayViewRangeMarker
          class="border-lime-400 bg-lime-400/50 border-r-0"
          :begin-index="jIndex - iIndex"
          :end-index="jIndex"
        />

        <!-- Current j-i Index -->
        <ArrayViewIndexMarker
          v-if="iIndex > 0"
          class="border-transparent"
          :index="jIndex - iIndex"
        >
          <span class="relative -bottom-15 text-xl fw-bold text-lime-400">
            j-i = {{ jIndex - iIndex }}
          </span>
        </ArrayViewIndexMarker>

        <!-- Current j Index -->
        <ArrayViewIndexMarker
          class="border-blue-500 bg-blue-500/50"
          :index="jIndex"
        >
          <span class="relative -bottom-15 text-xl fw-bold text-blue-500">
            j = {{ jIndex }}
          </span>
        </ArrayViewIndexMarker>
      </ArrayView>
    </div>
  </div>
</template>
