<script setup lang="ts">
export interface Emits {}

const props = defineProps<{
  modelValue: string;
}>();

const emit = defineEmits<{
  (event: "update:modelValue", value: string): void;
}>();

function onInput(event: Event) {
  const input = event.target as HTMLInputElement;
  emit("update:modelValue", input.value);
}
</script>

<template>
  <section
    class="fixed bottom-8 left-2/4 bg-white rounded-4xl shadow-xl z-10 px-8 py-6 w-11/12 max-w-[800px]"
    style="transform: translateX(-50%)"
  >
    <form class="w-full space-y-6" @submit.prevent="">
      <label for="query" class="font-medium text-xl text-center block">
        Find weekly markets and flea markets in Berlin
      </label>
      <input
        type="text"
        id="query"
        placeholder="Search by name, district, address etc..."
        class="bg-gray-100 px-5 py-3 w-full outline-[#4668F2] transition rounded-full"
        :value="props.modelValue"
        @input="onInput"
      />
    </form>
  </section>
</template>
