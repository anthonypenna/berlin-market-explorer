<script setup lang="ts">
import { marketStore } from "@/stores/markets";
import { MapboxMap, MapboxMarker, MapboxPopup } from "vue-mapbox-ts";
import { useSubject, useSubscription } from "@vueuse/rxjs";
import { debounce } from "@/utils/debounce";

const accessToken = import.meta.env.VITE_APP_MAPBOX_ACCESS_TOKEN;
const markets = useSubject(marketStore.markets$);

const debouncedGetMarkets = debounce(
  (query: string) => marketStore.getMarkets(query),
  500
);

useSubscription(
  marketStore.query$.subscribe((query) => {
    debouncedGetMarkets(query);
  })
);
</script>

<template>
  <MapboxMap
    :accessToken="accessToken"
    :center="{ lat: 52.5, lon: 13.5 }"
    :zoom="10.5"
    mapStyle="light-v11"
    @loaded="marketStore.getMarkets()"
  >
    <MapboxMarker
      v-for="market of markets"
      :key="market.id"
      :lngLat="{
        lat: market.coordinates.latitude,
        lon: market.coordinates.longitude,
      }"
    >
      <MapboxPopup :offset="[0, -50]">
        <ul>
          <li class="font-bold text-sm">{{ market.name }}</li>
          <li>
            {{ market.address.street }}, {{ market.address.postalCode }},
            {{ market.address.district }}
          </li>
        </ul>
      </MapboxPopup>
    </MapboxMarker>
  </MapboxMap>
</template>

<style>
.mapboxgl-popup-content {
  width: fit-content;
  white-space: nowrap;
  padding: 16px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}
</style>
