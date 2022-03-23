<script setup lang="ts">
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiWikipedia, mdiPlay, mdiPause } from '@mdi/js';

definePageMeta({
  title: 'Longest common subsequence',
});

const str1Input = ref<string>('');
const str1 = computed<string[]>(() => [...str1Input.value]);
const str2Input = ref<string>('');
const str2 = computed<string[]>(() => [...str2Input.value]);

const lcs = ref<({
  length: number,
  directions: ('↑' | '←' | '↖')[],
} | undefined)[][]>([]);
const lcsActive = ref<boolean[][]>([]);

const iIndex = ref<number>(0);
const jIndex = ref<number>(0);
const nIndex = ref<{ i: number, j: number } | null>(null);
const k1Index = ref<{ i: number, j: number } | null>(null);
const k2Index = ref<({ i: number, j: number } | null)[]>([null, null]);

const currentIndexesMatched = computed(
  () => str1.value[iIndex.value] === str2.value[jIndex.value],
);

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

function collectAllLCS(i: number, j: number): Set<string> {
  lcsActive.value[i][j] = true;

  if (i === 0 && j === 0) return new Set(['']);

  if (i === 0) return collectAllLCS(i, j - 1);
  if (j === 0) return collectAllLCS(i - 1, j);

  if (str1.value[i - 1] === str2.value[j - 1]) {
    const c = str1.value[i - 1] || str2.value[j - 1];
    return new Set([...collectAllLCS(i - 1, j - 1)].map((s) => s + c));
  }

  return new Set([
    ...(lcs.value[i][j - 1]!.length >= lcs.value[i - 1][j]!.length
      ? collectAllLCS(i, j - 1) : []),
    ...(lcs.value[i][j - 1]!.length <= lcs.value[i - 1][j]!.length
      ? collectAllLCS(i - 1, j) : []),
  ]);
}

function init() {
  lcs.value = [...Array(str1.value.length + 1)].map(
    () => [...Array(str2.value.length + 1)].map(
      () => undefined,
    ),
  );
  lcsActive.value = [...Array(str1.value.length + 1)].map(
    () => [...Array(str2.value.length + 1)].map(
      () => false,
    ),
  );

  iIndex.value = 0;
  jIndex.value = 0;
  nIndex.value = null;
  k1Index.value = null;
  k2Index.value = [null, null];
}

function* run() {
  init();

  yield 'Start Run (Click NEXT or AUTO PLAY to Continue)';

  yield 'define lcs[i][j] = set of longest common subsequences of str1[0..i) and str2[0..j)';
  yield 'define lcs[i][j].len = length of longest common subsequences of str1[0..i) and str2[0..j)';

  yield 'set lcs[0][0] = { "" };';
  lcs.value[0][0] = {
    length: 0,
    directions: [],
  };
  yield 'set lcs[i][0] = { "" } for each i > 0';
  for (let i = 0; i !== str1.value.length; i += 1) {
    lcs.value[i + 1][0] = {
      length: 0,
      directions: ['↑'],
    };
  }
  yield 'set lcs[0][j] = { "" } for each j > 0';
  for (let j = 0; j !== str2.value.length; j += 1) {
    lcs.value[0][j + 1] = {
      length: 0,
      directions: ['←'],
    };
  }

  yield 'Begin loop';
  for (iIndex.value = 0; iIndex.value !== str1.value.length; iIndex.value += 1) {
    for (jIndex.value = 0; jIndex.value !== str2.value.length; jIndex.value += 1) {
      nIndex.value = { i: iIndex.value + 1, j: jIndex.value + 1 };
      yield 'check (str1[i] == str2[j])';

      if (str1.value[iIndex.value] === str2.value[jIndex.value]) {
        yield 'check (str1[i] == str2[j]) => true';

        k1Index.value = { i: iIndex.value, j: jIndex.value };
        yield 'set lcs[i+1][j+1] = { s + c | s ∈ lcs[i][j] };';
        lcs.value[iIndex.value + 1][jIndex.value + 1] = {
          length: lcs.value[iIndex.value][jIndex.value]!.length + 1,
          directions: ['↖'],
        };
        k1Index.value = null;
      } else {
        yield 'check (str1[i] == str2[j]) => false';

        const lengthL = lcs.value[iIndex.value + 1][jIndex.value]!.length;
        const lengthU = lcs.value[iIndex.value][jIndex.value + 1]!.length;

        k2Index.value = [
          { i: iIndex.value + 1, j: jIndex.value },
          { i: iIndex.value, j: jIndex.value + 1 },
        ];
        yield 'check (lcs[i+1][j].len <=> lcs[i][j+1].len)';
        if (lengthL > lengthU) {
          yield 'check (lcs[i+1][j].len  >  lcs[i][j+1].len)';

          k2Index.value = [
            { i: iIndex.value + 1, j: jIndex.value },
            null,
          ];
          yield 'set lcs[i+1][j+1] = lcs[i+1][j];';
          lcs.value[iIndex.value + 1][jIndex.value + 1] = {
            length: lengthL,
            directions: ['←'],
          };
        } else if (lengthL < lengthU) {
          yield 'check (lcs[i+1][j].len  <  lcs[i][j+1].len)';

          k2Index.value = [
            null,
            { i: iIndex.value, j: jIndex.value + 1 },
          ];
          yield 'set lcs[i+1][j+1] = lcs[i][j+1];';
          lcs.value[iIndex.value + 1][jIndex.value + 1] = {
            length: lengthU,
            directions: ['↑'],
          };
        } else /* if (lengthL === lengthU) */ {
          yield 'check (lcs[i+1][j].len  =  lcs[i][j+1].len)';

          k2Index.value = [
            { i: iIndex.value + 1, j: jIndex.value },
            { i: iIndex.value, j: jIndex.value + 1 },
          ];
          yield 'set lcs[i+1][j+1] = lcs[i+1][j] ∪ lcs[i][j+1];';
          lcs.value[iIndex.value + 1][jIndex.value + 1] = {
            length: lengthL || lengthU,
            directions: ['←', '↑'],
          };
        }
        k2Index.value = [null, null];
      }

      yield 'next';
    }
  }
  const [m, n] = [str1.value.length, str2.value.length];
  nIndex.value = { i: m, j: n };

  const allLCS = collectAllLCS(m, n);
  return `Done, LCS = lcs[${m}][${n}] = { ${
    JSON.stringify([...allLCS]).slice(1, -1)
  } }, length of LCS = lcs[${m}][${n}].len = ${lcs.value[m][n]!.length}`;
}

watch([str1, str2], () => {
  endProcedure();
  init();
});

onMounted(() => {
  str1Input.value = 'SEQUEL';
  str2Input.value = 'SQUIRREL';
});
</script>

<template>
  <div class="font-sans text-nowrap">
    <!-- Headings -->
    <div class="mb-4">
      <h2 class="d-inline-block me-2">
        Longest common subsequence
      </h2>
      <div class="d-inline-block">
        <a
          class="me-1"
          href="https://en.wikipedia.org/wiki/Longest_common_subsequence_problem"
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
        <span class="form-label">String 1</span>
        <input
          v-model="str1Input"
          type="text"
          class="form-control form-control-lg"
        >
      </label>
      <label class="d-block mb-3">
        <span class="form-label">String 2</span>
        <input
          v-model="str2Input"
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
      <p
        class="fs-3 font-monospace"
        style="white-space: pre;"
      >
        {{ currentMessage ?? 'READY' }}
      </p>
    </blockquote>

    <!-- ArrayView / MatrixView -->
    <div>
      <label class="fs-5 font-monospace">
        str1[{{ str1.length }}]
      </label>
      <ArrayView :data="str1">
        <ArrayViewIndexMarker
          :index="iIndex"
          :class="currentIndexesMatched ? 'marker-color-blue' : 'marker-color-red'"
        >
          <span>
            i = {{ iIndex }}
          </span>
        </ArrayViewIndexMarker>
      </ArrayView>
    </div>
    <div>
      <label class="fs-5 font-monospace">
        str2[{{ str2.length }}]
      </label>
      <ArrayView :data="str2">
        <ArrayViewIndexMarker
          :index="jIndex"
          :class="currentIndexesMatched ? 'marker-color-blue' : 'marker-color-red'"
        >
          <span>
            j = {{ jIndex }}
          </span>
        </ArrayViewIndexMarker>
      </ArrayView>
    </div>
    <div>
      <label class="fs-5 font-monospace">
        lcs[{{ lcs.length }}][{{ lcs[0]?.length ?? 0 }}]
      </label>
      <MatrixView :data="lcs">
        <template #item="{ value, index }">
          <template v-if="value !== undefined">
            <div
              :style="{ 'opacity': lcsActive[0][0] && !lcsActive[index.i][index.j] ? 0.1 : 1 }"
            >
              <!-- Value -->
              <span>
                {{ value.length }}
              </span>

              <!-- Directions -->
              <template
                v-for="(direction, i) in value.directions"
                :key="i"
              >
                <!-- Arrow -->
                <span
                  v-if="direction === '↖'"
                  class="position-absolute top-0 start-0 translate-middle text-primary fs-5 fw-bold"
                >
                  {{ '↖' }}
                </span>
                <span
                  v-else-if="direction === '↑'"
                  class="position-absolute top-0 start-50 translate-middle text-danger fs-5 fw-bold"
                >
                  {{ '↑' }}
                </span>
                <span
                  v-else-if="direction === '←'"
                  class="position-absolute top-50 start-0 translate-middle text-danger fs-5"
                >
                  {{ '←' }}
                </span>

                <!-- Added char-->
                <span
                  v-if="direction === '↖'"
                  class="position-absolute top-0 start-0 text-primary fs-5 fw-bold ms-1"
                >
                  {{ str1[index.i - 1] || str2[index.j - 1] }}
                </span>
              </template>
            </div>
          </template>
          <template v-else>
            <span style="color: darkgray;">
              {{ '-' }}
            </span>
          </template>
        </template>

        <template v-if="nIndex !== null">
          <MatrixViewIndexMarker
            :index="nIndex"
            class="marker-color-lime"
          />
          <MatrixViewRowTextMarker
            class="marker-color-lime"
            :row-index="nIndex.i"
          >
            <span>
              i' = {{ nIndex.i }}
            </span>
          </MatrixViewRowTextMarker>
          <MatrixViewColTextMarker
            class="marker-color-lime"
            :col-index="nIndex.j"
          >
            <span>
              j' = {{ nIndex.j }}
            </span>
          </MatrixViewColTextMarker>
        </template>
        <template v-if="k1Index !== null">
          <MatrixViewIndexMarker
            :index="k1Index"
            class="marker-color-blue"
          />
        </template>
        <template
          v-for="(k, i) in k2Index"
          :key="i"
        >
          <MatrixViewIndexMarker
            v-if="k !== null"
            :index="k"
            class="marker-color-red"
          />
        </template>
      </MatrixView>
    </div>
  </div>
</template>
