<script setup lang="ts">
const constArr1d = ref(
  [...Array(10)].map(
    (_, i) => 1 + i,
  ),
);
const arr1d = ref(
  [...Array(10)].map(
    (_, i) => 1 + i,
  ),
);
const keyedArr1d = ref(
  [...Array(10)].map(
    (_, i) => ({ key: i, value: 1 + i }),
  ),
);

const constArr2d = ref(
  [...Array(10)].map(
    (_1, i) => [...Array(10)].map(
      (_2, j) => 1 + 10 * i + j,
    ),
  ),
);
const arr2d = ref(
  [...Array(10)].map(
    (_1, i) => [...Array(10)].map(
      (_2, j) => 1 + 10 * i + j,
    ),
  ),
);
const keyedArr2d = ref(
  [...Array(10)].map(
    (_1, i) => [...Array(10)].map(
      (_2, j) => ({ key: `${i}-${j}`, value: 1 + 10 * i + j }),
    ),
  ),
);

const iIndexMarker1d = ref(1);
const jIndexMarker1d = ref(8);
const kRangeMarker1d = ref({ begin: 3, end: 7 });

const iIndexMarker2d = ref({ i: 1, j: 1 });
const jIndexMarker2d = ref({ i: 8, j: 8 });
const kRangeMarker2d = ref({ begin: { i: 3, j: 3 }, end: { i: 7, j: 7 } });

function shuffle1d(arr: any[]) {
  const n = arr.length;

  for (let i = 0; i !== n; i += 1) {
    const t = i + Math.trunc(Math.random() * (n - i));
    // eslint-disable-next-line no-param-reassign
    [arr[i], arr[t]] = [arr[t], arr[i]];
  }
}

function shuffle2d(matrix: any[][]) {
  const m = matrix.length;
  const n = matrix[0].length;
  const mn = m * n;

  for (let i = 0; i !== m; i += 1) {
    for (let j = 0; j !== n; j += 1) {
      const flatIndex = i * n + j;
      const flatTargetIndex = flatIndex + Math.trunc(Math.random() * (mn - flatIndex));

      const ti = Math.trunc(flatTargetIndex / n);
      const tj = flatTargetIndex % n;

      // eslint-disable-next-line no-param-reassign
      [matrix[i][j], matrix[ti][tj]] = [matrix[ti][tj], matrix[i][j]];
    }
  }
}

function pickRandomRange(n: number) {
  let begin = Math.trunc(Math.random() * n);
  let end = Math.trunc(Math.random() * n);
  if (begin > end) [begin, end] = [end, begin];
  end += 1;
  return { begin, end };
}

function randomize1dIndexMarkers() {
  iIndexMarker1d.value = Math.trunc(Math.random() * constArr1d.value.length);
  jIndexMarker1d.value = Math.trunc(Math.random() * constArr1d.value.length);
}

function randomize1dRangeMarker() {
  kRangeMarker1d.value = pickRandomRange(constArr1d.value.length);
}

function randomize2dIndexMarkers() {
  iIndexMarker2d.value = {
    i: Math.trunc(Math.random() * constArr2d.value.length),
    j: Math.trunc(Math.random() * constArr2d.value[0].length),
  };
  jIndexMarker2d.value = {
    i: Math.trunc(Math.random() * constArr2d.value.length),
    j: Math.trunc(Math.random() * constArr2d.value[0].length),
  };
}

function randomize2dRangeMarker() {
  const iRange = pickRandomRange(constArr2d.value.length);
  const jRange = pickRandomRange(constArr2d.value[0].length);
  kRangeMarker2d.value = {
    begin: { i: iRange.begin, j: jRange.begin },
    end: { i: iRange.end, j: jRange.end },
  };
}
</script>

<template>
  <div>
    <!-- ArrayView -->
    <div>
      <div class="d-flex align-items-end py-2">
        <label class="fs-5 font-monospace">
          ArrayView
        </label>
        <button
          class="btn btn-sm btn-outline-secondary ms-2"
          @click="shuffle1d(arr1d);"
        >
          shuffle
        </button>
      </div>

      <ArrayView
        :data="arr1d"
      >
        <template #item="{ index, value }">
          <span class="position-absolute top-0 start-0 translate-middle-y text-muted fs-6">
            {{ index }}
          </span>
          <span>
            {{ value }}
          </span>
        </template>
        <template #end="{ index }">
          <span class="position-absolute top-0 start-0 translate-middle-y text-danger fs-6">
            {{ index }}
          </span>
          <span
            class="fs-5"
            style="transform: rotate(-45deg);"
          >
            END
          </span>
        </template>
      </ArrayView>
    </div>

    <!-- KeyedArrayView -->
    <div>
      <div class="d-flex align-items-end py-2">
        <label class="fs-5 font-monospace">
          KeyedArrayView
        </label>
        <button
          class="btn btn-sm btn-outline-secondary ms-2"
          @click="shuffle1d(keyedArr1d);"
        >
          shuffle
        </button>
      </div>

      <KeyedArrayView
        :data="keyedArr1d"
      >
        <template #item="{ index, value }">
          <span class="position-absolute top-0 start-0 translate-middle-y text-muted fs-6">
            {{ index }}
          </span>
          <span>
            {{ value }}
          </span>
        </template>
        <template #end="{ index }">
          <span class="position-absolute top-0 start-0 translate-middle-y text-danger fs-6">
            {{ index }}
          </span>
          <span
            class="fs-5"
            style="transform: rotate(-45deg);"
          >
            END
          </span>
        </template>
      </KeyedArrayView>
    </div>

    <!-- ArrayViewIndexMarker -->
    <div>
      <div class="d-flex align-items-end py-2">
        <label class="fs-5 font-monospace">
          ArrayViewIndexMarker
        </label>
        <button
          class="btn btn-sm btn-outline-secondary ms-2"
          @click="randomize1dIndexMarkers();"
        >
          randomize
        </button>
      </div>

      <ArrayView
        :data="constArr1d"
      >
        <!-- j index marker -->
        <ArrayViewIndexMarker
          class="marker-color-red"
          :index="jIndexMarker1d"
        >
          <span>
            i = {{ jIndexMarker1d }}
          </span>
        </ArrayViewIndexMarker>

        <!-- i index marker -->
        <ArrayViewIndexMarker
          class="marker-color-blue"
          :index="iIndexMarker1d"
        >
          <span>
            i = {{ iIndexMarker1d }}
          </span>
        </ArrayViewIndexMarker>
      </ArrayView>
    </div>

    <!-- ArrayViewRangeMarker -->
    <div>
      <div class="d-flex align-items-end py-2">
        <label class="fs-5 font-monospace">
          ArrayViewRangeMarker
        </label>
        <button
          class="btn btn-sm btn-outline-secondary ms-2"
          @click="randomize1dRangeMarker();"
        >
          randomize
        </button>
      </div>

      <ArrayView
        :data="constArr1d"
      >
        <!-- k range marker -->
        <ArrayViewRangeMarker
          class="marker-color-lime"
          :begin-index="kRangeMarker1d.begin"
          :end-index="kRangeMarker1d.end"
        />
        <ArrayViewTextMarker
          class="marker-color-lime"
          :index="kRangeMarker1d.begin"
        >
          <span>
            begin i
          </span>
        </ArrayViewTextMarker>
        <ArrayViewTextMarker
          class="marker-color-lime"
          :index="kRangeMarker1d.end"
        >
          <span>
            end i
          </span>
        </ArrayViewTextMarker>
      </ArrayView>
    </div>

    <!-- MatrixView -->
    <div>
      <div class="d-flex align-items-end py-2">
        <label class="fs-5 font-monospace">
          MatrixView
        </label>
        <button
          class="btn btn-sm btn-outline-secondary ms-2"
          @click="shuffle2d(arr2d);"
        >
          shuffle
        </button>
      </div>

      <MatrixView
        :data="arr2d"
      >
        <template #item="{ iIndex, jIndex, value }">
          <span class="position-absolute top-0 start-0 translate-middle-y text-muted fs-6">
            {{ iIndex }},{{ jIndex }}
          </span>
          <span>
            {{ value }}
          </span>
        </template>
        <template #end="{ iIndex, jIndex }">
          <span class="position-absolute top-0 start-0 translate-middle-y text-danger fs-6">
            {{ iIndex }},{{ jIndex }}
          </span>
          <span
            class="fs-5"
            style="transform: rotate(-45deg);"
          >
            END
          </span>
        </template>
      </MatrixView>
    </div>

    <!-- KeyedMatrixView -->
    <div>
      <div class="d-flex align-items-end py-2">
        <label class="fs-5 font-monospace">
          KeyedMatrixView
        </label>
        <button
          class="btn btn-sm btn-outline-secondary ms-2"
          @click="shuffle2d(keyedArr2d);"
        >
          shuffle
        </button>
      </div>

      <KeyedMatrixView
        :data="keyedArr2d"
      >
        <template #item="{ iIndex, jIndex, value }">
          <span class="position-absolute top-0 start-0 translate-middle-y text-muted fs-6">
            {{ iIndex }},{{ jIndex }}
          </span>
          <span>
            {{ value }}
          </span>
        </template>
        <template #end="{ iIndex, jIndex }">
          <span class="position-absolute top-0 start-0 translate-middle-y text-danger fs-6">
            {{ iIndex }},{{ jIndex }}
          </span>
          <span
            class="fs-5"
            style="transform: rotate(-45deg);"
          >
            END
          </span>
        </template>
      </KeyedMatrixView>
    </div>

    <!-- MatrixViewIndexMarker -->
    <div>
      <div class="d-flex align-items-end py-2">
        <label class="fs-5 font-monospace">
          MatrixViewIndexMarker
        </label>
        <button
          class="btn btn-sm btn-outline-secondary ms-2"
          @click="randomize2dIndexMarkers();"
        >
          randomize
        </button>
      </div>

      <MatrixView
        :data="constArr2d"
      >
        <!-- j index marker -->
        <MatrixViewIndexMarker
          class="marker-color-red"
          :index="jIndexMarker2d"
        />
        <MatrixViewRowTextMarker
          class="marker-color-red"
          :row-index="jIndexMarker2d.i"
        >
          <span>
            i = {{ jIndexMarker2d.i }}
          </span>
        </MatrixViewRowTextMarker>
        <MatrixViewColTextMarker
          class="marker-color-red"
          :col-index="jIndexMarker2d.j"
        >
          <span>
            j = {{ jIndexMarker2d.j }}
          </span>
        </MatrixViewColTextMarker>

        <!-- i index marker -->
        <MatrixViewIndexMarker
          class="marker-color-blue"
          :index="iIndexMarker2d"
        />
        <MatrixViewRowTextMarker
          class="marker-color-blue"
          :row-index="iIndexMarker2d.i"
        >
          <span>
            i = {{ iIndexMarker2d.i }}
          </span>
        </MatrixViewRowTextMarker>
        <MatrixViewColTextMarker
          class="marker-color-blue"
          :col-index="iIndexMarker2d.j"
        >
          <span>
            j = {{ iIndexMarker2d.j }}
          </span>
        </MatrixViewColTextMarker>
      </MatrixView>
    </div>

    <!-- MatrixViewRangeMarker -->
    <div>
      <div class="d-flex align-items-end py-2">
        <label class="fs-5 font-monospace">
          MatrixViewRangeMarker
        </label>
        <button
          class="btn btn-sm btn-outline-secondary ms-2"
          @click="randomize2dRangeMarker();"
        >
          randomize
        </button>
      </div>

      <MatrixView
        :data="constArr2d"
      >
        <!-- k range marker -->
        <MatrixViewRangeMarker
          class="marker-color-lime"
          :begin-index="kRangeMarker2d.begin"
          :end-index="kRangeMarker2d.end"
        />
        <MatrixViewRowTextMarker
          class="marker-color-lime"
          :row-index="kRangeMarker2d.begin.i"
        >
          <span>
            begin i
          </span>
        </MatrixViewRowTextMarker>
        <MatrixViewRowTextMarker
          class="marker-color-lime"
          :row-index="kRangeMarker2d.end.i"
        >
          <span>
            end i
          </span>
        </MatrixViewRowTextMarker>
        <MatrixViewColTextMarker
          class="marker-color-lime"
          :col-index="kRangeMarker2d.begin.j"
        >
          <span>
            begin j
          </span>
        </MatrixViewColTextMarker>
        <MatrixViewColTextMarker
          class="marker-color-lime"
          :col-index="kRangeMarker2d.end.j"
        >
          <span>
            end j
          </span>
        </MatrixViewColTextMarker>
      </MatrixView>
    </div>
  </div>
</template>
