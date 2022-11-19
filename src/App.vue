<script setup lang="ts">
import { MapboxMap, MapboxMarker, MapboxPopup } from "vue-mapbox-ts";
import { useMarkets } from "@/composables/useMarkets";
import MarketFilter from "@/components/MarketFilter.vue";

const accessToken = import.meta.env.VITE_APP_MAPBOX_ACCESS_TOKEN;
const { getMarkets, markets, query } = useMarkets();
</script>

<template>
  <main class="h-screen">
    <MarketFilter v-model="query" />
    <MapboxMap
      :accessToken="accessToken"
      :center="{ lat: 52.5, lon: 13.5 }"
      :zoom="10.5"
      mapStyle="light-v10"
      @loaded="getMarkets()"
    >
      <MapboxMarker
        v-for="market of markets"
        :key="market.id"
        :lngLat="{
          lat: market.coordinates.latitude,
          lon: market.coordinates.longitude,
        }"
      >
        <MapboxPopup>
          <ul>
            <li>{{ market.name }}</li>
            <li>
              {{ market.address.street }}, {{ market.address.postalCode }},
              {{ market.address.district }}
            </li>
          </ul>
        </MapboxPopup>
      </MapboxMarker>
    </MapboxMap>
  </main>
</template>
