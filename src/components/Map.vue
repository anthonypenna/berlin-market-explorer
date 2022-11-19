<script setup lang="ts">
import { MapboxMap, MapboxMarker, MapboxPopup } from "vue-mapbox-ts";
import type { Market } from "@/core/domain/market/entity";

const props = defineProps<{
  accessToken: string;
  markets: Market[];
}>();

const emit = defineEmits<{
  (event: "load"): void;
}>();
</script>

<template>
  <MapboxMap
    :accessToken="props.accessToken"
    :center="{ lat: 52.5, lon: 13.5 }"
    :zoom="10.5"
    mapStyle="light-v10"
    @loaded="emit('load')"
  >
    <MapboxMarker
      v-for="market of props.markets"
      :key="market.id"
      :lngLat="{
        lat: market.coordinates.latitude,
        lon: market.coordinates.longitude,
      }"
    >
      <MapboxPopup :offset="[0, -50]">
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
</template>
