<script setup lang="ts">
import { useMarkets } from "@/composables/useMarkets";
import MarketFilter from "@/components/MarketFilter.vue";
import Map from "@/components/Map.vue";

const accessToken = import.meta.env.VITE_APP_MAPBOX_ACCESS_TOKEN;
const { getMarkets, markets, query } = useMarkets();
</script>

<template>
  <main class="h-screen">
    <MarketFilter v-model="query" />
    <Map :access-token="accessToken" :markets="markets" @load="getMarkets()" />
  </main>
</template>
