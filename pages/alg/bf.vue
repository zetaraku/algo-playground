<script setup lang="ts">
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiWikipedia, mdiPlay, mdiPause } from '@mdi/js';

definePageMeta({
  title: 'Brainfuck interpreter',
});

const instructionSet = new Set<string>(['+', '-', '>', '<', '.', ',', '[', ']']);

const codeInput = ref<string>('');
const code = computed<string[]>(() => [...codeInput.value]);
const codePointer = ref<number>(0);
const stepCount = ref<number>(0);

const buffer = ref<number[]>([]);
const bufferPointer = ref<number>(0);

const stdinInput = ref<string>('');
const stdin = computed<number[]>(() => [...stdinInput.value].map((c) => c.codePointAt(0)!));
const stdinPointer = ref<number>(0);

const stdout = ref<number[]>([]);
const stdoutOutput = computed<string>(
  () => stdout.value.map((n) => String.fromCodePoint(n)).join(''),
);

const {
  currentProcess,
  infoMessage,
  autoPlaying,
  autoPlayDelay,
  beginProcess,
  endProcess,
  nextStep,
  toggleAutoplay,
  // skipAll,
} = useProcess();

function resetPointers() {
  codePointer.value = 0;
  bufferPointer.value = 0;
  stdinPointer.value = 0;
}

function initBuffer() {
  buffer.value = [...Array(300)].map(() => 0);
}

function initOutput() {
  stdout.value = [];
}

function init() {
  initBuffer();
  initOutput();
  resetPointers();
  stepCount.value = 0;
}

function reset() {
  endProcess();
  init();
}
function* runCode() {
  init();

  yield 'Begin Run Code (Click NEXT or AUTOPLAY to Continue)';

  while (codePointer.value !== code.value.length) {
    const instruction = code.value[codePointer.value];

    switch (instruction) {
      case '>':
        yield 'instruction: > (increment buffer pointer)';
        // yield 'ptr += 1;';
        bufferPointer.value += 1;
        if (bufferPointer.value === buffer.value.length) bufferPointer.value = 0;
        break;
      case '<':
        yield 'instruction < (decrement buffer pointer)';
        // yield 'ptr -= 1;';
        if (bufferPointer.value === 0) bufferPointer.value = buffer.value.length;
        bufferPointer.value -= 1;
        break;
      case '+':
        yield 'instruction: + (increment value at buffer pointer)';
        // yield '*ptr += 1;';
        buffer.value[bufferPointer.value] += 1;
        break;
      case '-':
        yield 'instruction: - (decrement value at buffer pointer)';
        // yield '*ptr -= 1;';
        buffer.value[bufferPointer.value] -= 1;
        break;
      case '.':
        yield 'instruction: . (output value at buffer pointer)';
        // yield 'write(*ptr);';
        stdout.value.push(buffer.value[bufferPointer.value]);
        break;
      case ',':
        yield 'instruction: , (input value at buffer pointer)';
        // yield '*ptr = read();';
        if (stdinPointer.value !== stdin.value.length) {
          buffer.value[bufferPointer.value] = stdin.value[stdinPointer.value];
          stdinPointer.value += 1;
        } else {
          buffer.value[bufferPointer.value] = 0;
        }
        break;
      case '[':
        yield 'instruction: [ (begin of loop)';
        yield 'check (*ptr == 0)';
        if (buffer.value[bufferPointer.value] === 0) {
          yield 'check (*ptr == 0) => true';

          let newCodePointer = codePointer.value;

          let depth = 1;
          while (depth !== 0) {
            newCodePointer += 1;

            if (newCodePointer === code.value.length) {
              return 'Error: Unmatched [';
            }

            if (code.value[newCodePointer] === '[') {
              depth += 1;
            } else if (code.value[newCodePointer] === ']') {
              depth -= 1;
            }
          }

          yield 'Jump to end of loop';
          codePointer.value = newCodePointer;
        } else {
          yield 'check (*ptr == 0) => false';
        }
        break;
      case ']': {
        yield 'instruction: ] (end of loop)';
        yield 'check (*ptr != 0)';
        if (buffer.value[bufferPointer.value] !== 0) {
          yield 'check (*ptr != 0) => true';

          let newCodePointer = codePointer.value;

          let depth = 1;
          while (depth !== 0) {
            if (newCodePointer === 0) {
              return 'Error: Unmatched ]';
            }

            newCodePointer -= 1;

            if (code.value[newCodePointer] === ']') {
              depth += 1;
            } else if (code.value[newCodePointer] === '[') {
              depth -= 1;
            }
          }

          yield 'Jump to begin of loop';
          codePointer.value = newCodePointer;
        } else {
          yield 'check (*ptr != 0) => false';
        }
        break;
      }
      default:
        yield `instruction: ${instruction} (no operation)`;
        break;
    }
    stepCount.value += 1;

    yield 'move to next instruction';
    codePointer.value += 1;
  }

  return 'Halted';
}

watch([codeInput, stdinInput], () => {
  reset();
});

onMounted(() => {
  initBuffer();

  codeInput.value = `+++++LET'S GO😀!+++++
🤔[>+++++++>++++++++++>+++>+<<<<-]
👋>++.>+.+++++++..+++.>++.🧐>>,[.,]<<+...>.`;
  stdinInput.value = 'world';
});
</script>

<template>
  <div class="font-sans text-nowrap">
    <!-- Headings -->
    <div class="mb-4">
      <h2 class="d-inline-block me-2">
        Brainfuck interpreter
      </h2>
      <div class="d-inline-block">
        <a
          class="me-1"
          href="https://en.wikipedia.org/wiki/Brainfuck"
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
        <span class="form-label">Code</span>
        <textarea
          v-model="codeInput"
          rows="3"
          class="form-control form-control-lg font-monospace fs-2"
        />
      </label>
    </div>
    <div>
      <label class="d-block mb-3">
        <span class="form-label">Input</span>
        <textarea
          v-model="stdinInput"
          rows="1"
          class="form-control form-control-lg font-monospace fs-2"
        />
      </label>
    </div>
    <div>
      <label class="d-block mb-3">
        <span class="form-label">Output</span>
        <textarea
          v-model="stdoutOutput"
          rows="1"
          class="form-control form-control-lg font-monospace fs-2"
          readonly
        />
      </label>
    </div>

    <!-- Buttons -->
    <div class="my-4">
      <div class="row row-cols-auto g-2 align-items-center my-1">
        <div class="col">
          <button
            class="btn btn-lg btn-outline-primary"
            @click="reset();"
          >
            Reset
          </button>
        </div>
        <div class="col">
          <button
            class="btn btn-lg"
            :class="[
              currentProcess !== null ? 'btn-danger' : 'btn-outline-danger'
            ]"
            @click="beginProcess(runCode);"
          >
            Run Code
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
            style="width: 10em;"
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
      </div>
    </div>

    <!-- Explanatory Message -->
    <blockquote class="blockquote">
      <p class="fs-3 font-monospace">
        {{ infoMessage ?? 'READY' }}
      </p>
    </blockquote>

    <!-- Code -->
    <div>
      <label class="fs-5 font-monospace">
        code[{{ code.length }}] ({{ stepCount }} steps)
      </label>
      <ArrayView
        :data="code"
        :style="{
          transform: `translateX(${-4 * (15 - 1) * (codePointer - 2)}px)`,
        }"
      >
        <template #item="{ value }">
          <span
            v-if="instructionSet.has(value)"
            class="fw-bold"
          >
            {{ value }}
          </span>
          <span
            v-else-if="value === '\n'"
            class="text-muted fs-3"
          >
            {{ '\\n' }}
          </span>
          <span
            v-else
            class="text-muted fs-3"
          >
            {{ value }}
          </span>
        </template>
        <template #end>
          <span
            class="fs-5"
            style="transform: rotate(-45deg);"
          >
            HALT
          </span>
        </template>

        <!-- Current i Index -->
        <ArrayViewIndexMarker
          class="marker-color-blue"
          :index="codePointer"
          style="transition: none;"
        >
          <span>
            IR = {{ codePointer }}
          </span>
        </ArrayViewIndexMarker>
      </ArrayView>
    </div>

    <!-- Buffer -->
    <div>
      <label class="fs-5 font-monospace">
        buffer[{{ buffer.length }}]
      </label>
      <ArrayView
        :data="buffer"
        :style="{
          transform: `translateX(${-4 * (15 - 1) * (bufferPointer - 2)}px)`,
        }"
      >
        <template #item="{ value }">
          <span class="fs-4">
            {{ value }}
          </span>
        </template>
        <template #end>
          <span
            class="fs-5"
            style="transform: rotate(-45deg);"
          >
            WRAP
          </span>
        </template>

        <!-- Current i Index -->
        <ArrayViewIndexMarker
          class="marker-color-lime"
          :index="bufferPointer"
          style="transition: none;"
        >
          <span>
            ptr = {{ bufferPointer }}
          </span>
        </ArrayViewIndexMarker>
      </ArrayView>
    </div>

    <!-- Input -->
    <div>
      <label class="fs-5 font-monospace">
        stdin[{{ stdin.length }}]
      </label>
      <ArrayView
        :data="stdin"
        :style="{
          transform: `translateX(${-4 * (15 - 1) * (stdinPointer - 2)}px)`,
        }"
      >
        <template #item="{ value }">
          <span
            v-if="value === '\n'.codePointAt(0)"
            class="text-muted fs-3"
          >
            {{ '\\n' }}
          </span>
          <span v-else>
            {{ String.fromCodePoint(value) }}
          </span>
          <span class="position-absolute top-100 translate-middle-y text-primary fs-6">
            {{ value }}
          </span>
        </template>
        <template #end>
          <span
            class="fs-5"
            style="transform: rotate(-45deg);"
          >
            EOF
          </span>
          <span class="position-absolute top-100 translate-middle-y text-danger fs-6">
            {{ 0 }}
          </span>
        </template>

        <!-- Current i Index -->
        <ArrayViewIndexMarker
          class="marker-color-lime"
          :index="stdinPointer"
          style="transition: none;"
        >
          <span>
            in = {{ stdinPointer }}
          </span>
        </ArrayViewIndexMarker>
      </ArrayView>
    </div>

    <!-- Output -->
    <div>
      <label class="fs-5 font-monospace">
        stdout[{{ stdout.length }}]
      </label>
      <ArrayView
        :data="stdout"
        :style="{
          transform: `translateX(${-4 * (15 - 1) * (0 - 2)}px)`,
        }"
      >
        <template #item="{ value }">
          <span
            v-if="value === '\n'.codePointAt(0)"
            class="text-muted fs-3"
          >
            {{ '\\n' }}
          </span>
          <span v-else>
            {{ String.fromCodePoint(value) }}
          </span>
          <span class="position-absolute top-100 translate-middle-y text-primary fs-6">
            {{ value }}
          </span>
        </template>
        <template #end>
          <span
            class="fs-5"
            style="transform: rotate(-45deg);"
          >
            NEXT
          </span>
        </template>
      </ArrayView>
    </div>
  </div>
</template>
