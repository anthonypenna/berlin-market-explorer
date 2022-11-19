<script setup lang="ts">
import { MapboxMap, MapboxMarker, MapboxPopup } from "vue-mapbox-ts";
import { useMarkets } from "@/composables/useMarkets";

const accessToken = import.meta.env.VITE_APP_MAPBOX_ACCESS_TOKEN;
const { getMarkets, markets, query } = useMarkets();
</script>

<template>
  <main class="h-screen">
    <section
      class="fixed bottom-8 left-2/4 bg-white rounded-4xl shadow-xl z-10 px-8 py-6 w-11/12 max-w-[800px]"
      style="transform: translateX(-50%)"
    >
      <form class="w-full space-y-6">
        <label for="query" class="font-medium text-xl text-center block">
          Find weekly markets and flea markets in Berlin
        </label>
        <input
          type="text"
          id="query"
          v-model="query"
          placeholder="Search by name, district, address etc..."
          class="bg-gray-100 px-5 py-3 w-full outline-[#4668F2] transition rounded-full"
        />
      </form>
    </section>
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
