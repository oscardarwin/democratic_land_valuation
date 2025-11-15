import { runLoader } from "./load_db.ts";


export async function createMap(containerId: string): Promise<any | undefined> {

  console.log("Initialising Map");
  runLoader();

  const container = document.getElementById(containerId);

  if (!container) {
    console.error(`Map container with ID '${containerId}' not found.`);
    return undefined;
  }

  // === Dynamic Import to bypass SSR failure ===
  // This ensures maplibre-gl is only evaluated in the browser environment.
  const maplibregl = await import('maplibre-gl');

  // Destructure the needed classes/types from the imported module
  const Map = maplibregl.Map;
  const NavigationControl = maplibregl.NavigationControl; // Imported for debugging controls
  // Define the type alias directly from the dynamically imported module
  type MapMouseEventType = maplibregl.MapMouseEvent;
  // ===========================================


  const map = new Map({
    container: container,
    style: "style.json",
    center: [-0.085, 51.49],
    zoom: 14,
    maxBounds: [
      [-0.130945, 51.474153],
      [-0.043786, 51.516047]
    ],
    // bearing: 24.00002486533299,
    //pitch: 4.5
  });

  // --- DEBUGGING ADDITIONS ---
  // 1. Add Navigation Controls to test if the map is interactive
  map.addControl(new NavigationControl({}), 'top-right');

  // 2. Log confirmation of map creation
  console.log("Map initialized successfully:", map);
  // ---------------------------

  let selectedId: string | number | null = null;

  // Add click handler (using the dynamically imported MapMouseEvent type)
  map.on("click", "parcels", (e: MapMouseEventType) => {
    const feature = e.features?.[0];
    if (!feature) return;

    // IMPORTANT: Your style.json uses "promoteId": "entity" for "title_boundaries" 
    const featureId = feature.id ?? null;
    if (featureId === null) return;

    // 1. Reset old selection
    if (selectedId !== null) {
      map.setFeatureState(
        { source: "title_boundaries", id: selectedId },
        { selected: false }
      );
    }

    // 2. Set new selection
    map.setFeatureState(
      { source: "title_boundaries", id: featureId },
      { selected: true }
    );

    selectedId = featureId;
  });

  return map;
}
