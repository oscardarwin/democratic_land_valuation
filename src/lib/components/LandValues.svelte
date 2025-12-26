<script lang="ts">
  import { onMount } from 'svelte';
  import { createLandValuesMap } from '$lib/land_values_map';

  export let height = '400px';

  const MAP_CONTAINER_ID = `map-container-${Math.random().toString(36).slice(2)}`;

  onMount(async () => {
    const mapInstance = await createLandValuesMap(MAP_CONTAINER_ID);

    return () => {
      mapInstance?.remove();
    };
  });
</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://unpkg.com/maplibre-gl@2.4.0/dist/maplibre-gl.css"
  />
</svelte:head>

<div
  id={MAP_CONTAINER_ID}
  class="map"
  style="height: {height}"
/>

<style>
  .map {
    width: 100%;
    border-radius: 8px;
    margin: 1.5rem 0;
  }
</style>
