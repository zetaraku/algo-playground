<script setup lang="ts">
const arr1d = ref(
  [...Array(10)].map(
    (_, i) => 1 + i,
  ),
);
const arr2d = ref(
  [...Array(10)].map(
    (_1, i) => [...Array(10)].map(
      (_2, j) => 1 + 10 * i + j,
    ),
  ),
);
const keyedArr1d = ref(
  [...Array(10)].map(
    (_, i) => ({ key: i, value: 1 + i }),
  ),
);
const keyedArr2d = ref(
  [...Array(10)].map(
    (_1, i) => [...Array(10)].map(
      (_2, j) => ({ key: `${i}-${j}`, value: 1 + 10 * i + j }),
    ),
  ),
);

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

        <ArrayViewRangeMarker
          class="marker-color-blue"
          :begin-index="3"
          :end-index="7"
        />
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

        <ArrayViewRangeMarker
          class="marker-color-blue"
          :begin-index="3"
          :end-index="7"
        />
      </KeyedArrayView>
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

        <MatrixViewRangeMarker
          class="marker-color-blue"
          :begin-index="{ i: 3, j: 3 }"
          :end-index="{ i: 7, j: 7 }"
        />
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

        <MatrixViewRangeMarker
          class="marker-color-blue"
          :begin-index="{ i: 3, j: 3 }"
          :end-index="{ i: 7, j: 7 }"
        />
      </KeyedMatrixView>
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
