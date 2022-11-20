<script setup lang="ts">
import { marketStore } from "@/stores/markets";
import { useSubject } from "@vueuse/rxjs";

const query = useSubject(marketStore.query$);
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
        v-model="query"
      />
    </form>
  </section>
</template>
