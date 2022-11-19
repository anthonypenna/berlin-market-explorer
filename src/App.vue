<script setup lang="ts">
import { MapboxMap } from "vue-mapbox-ts";

const accessToken = import.meta.env.VITE_APP_MAPBOX_ACCESS_TOKEN;
</script>

<template>
  <main class="h-screen">
    <MapboxMap :accessToken="accessToken" />
  </main>
</template>
