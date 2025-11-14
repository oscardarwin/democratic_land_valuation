<script lang="ts">
  import { onMount } from 'svelte';
  import { createMap } from '$lib/map';
  
  const MAP_CONTAINER_ID = 'map-container';
  
  // onMount runs only in the browser
  onMount(async () => {
    // 1. Initialize the map and await the promise
    const mapInstance = await createMap(MAP_CONTAINER_ID);
    
    // Optional cleanup function: runs when the component is destroyed
    return () => {
      mapInstance?.remove();
    };
  });
</script>

<svelte:head>
  <!-- Still need the CSS, as it's separate from the JS code -->
  <link rel="stylesheet" href="https://unpkg.com/maplibre-gl@2.4.0/dist/maplibre-gl.css" />
</svelte:head>

<div id={MAP_CONTAINER_ID}></div>

<style>
  /* Ensure the map container fills the entire viewport */
  #map-container {
    height: 100vh;
    width: 100vw;
  }
</style>

