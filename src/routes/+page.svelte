<script lang="ts">
  import LandValues from '$lib/components/LandValues.svelte';
</script>

<article class="blog">
  <h1>Walking the Old Trade Routes</h1>

  <p class="lead">
    The coastal trade routes of the northern sea have shaped commerce for
    centuries. While many of these paths are now forgotten, their influence
    remains visible in the towns that survived them.
  </p>

  <p>
    Merchants once relied on shallow harbors and predictable winds. Ships
    rarely traveled far from shore, preferring familiar landmarks over open
    waters.
  </p>

  <h2>The Harbor at Dawn</h2>

  <p>
    At sunrise, the harbor reveals why it was such a strategic location.
    Protected from prevailing winds and close to inland roads, it became a
    natural exchange point for goods and ideas.
  </p>

  <!-- Interactive element placed where it is discussed -->
  <LandValues height="360px" />

  <p>
    The map above highlights the primary docking areas and the surrounding
    terrain. Notice how the settlement expands inland along the river rather
    than the coast itself.
  </p>

  <h2>Decline and Rediscovery</h2>

  <p>
    With the rise of deep-water vessels, these routes lost their importance.
    Today, they are mostly remembered by historians and the occasional
    traveler willing to look beyond modern infrastructure.
  </p>

  <p>
    Interactive elements like maps allow us to reconnect narrative history
    with geography, making abstract descriptions tangible.
  </p>
</article>

<style>
  .blog {
    max-width: 72ch;
    margin: 3rem auto;
    padding: 0 1rem;
    line-height: 1.6;
  }

  .lead {
    font-size: 1.125rem;
    color: #444;
  }

  h1, h2 {
    line-height: 1.25;
  }

  h2 {
    margin-top: 2.5rem;
  }
</style>
