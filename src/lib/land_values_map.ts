import { runLoader } from "./load_db.ts";


export async function createLandValuesMap(containerId: string): Promise<any | undefined> {

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
  });

  map.addControl(new NavigationControl({}), 'top-right');

  const values_popup = new maplibregl.Popup({
    closeButton: true,
    closeOnClick: false
  });

  const formatMillionsGBP = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 3,
    maximumFractionDigits: 3
  });

  console.log("Map initialized successfully:", map);

  let selectedId: string | number | null = null;

  map.on("click", "parcels", (e: MapMouseEventType) => {
    const feature = e.features?.[0];
    if (!feature) return;

    const featureId = feature.id ?? null;
    if (featureId === null) return;

    const formatted_land_value = formatMillionsGBP.format(feature.properties.land_value / 1_000_000);
    values_popup
      .setLngLat(e.lngLat)
      .setHTML(`
        <strong>Parcel</strong><br>
        Land value: ${formatted_land_value}M
      `)
      .addTo(map);

    if (selectedId !== null) {
      map.setFeatureState(
        { source: "title_boundaries", id: selectedId },
        { selected: false }
      );
    }

    map.setFeatureState(
      { source: "title_boundaries", id: featureId },
      { selected: true }
    );

    selectedId = featureId;
  });
  
  map.on("load", () => {
    addParcelLayers(map);
  });

  return map;
}

function addParcelLayers(map: MapLibreMap): void {
  const parcelsFill: FillLayerSpecification = {
    id: "parcels",
    type: "fill",
    source: "title_boundaries",
    paint: {
      "fill-color": [
        "interpolate",
        ["linear"],
        ["get", "land_value_normalized"],
        0, "#2c7bb6",
        0.2, "#abd9e9",
        0.4, "#ffffbf",
        0.6, "#fdae61",
        0.8, "#d7191c"
      ],
      "fill-opacity": [
        "case",
        ["boolean", ["feature-state", "selected"], false],
        0.5,
        0.3
      ]
    }
  };

  const parcelsOutline: LineLayerSpecification = {
    id: "parcels-outline",
    type: "line",
    source: "title_boundaries",
    paint: {
      "line-color": "rgba(0.5, 0.5, 0.5, 0.5)",
      "line-width": 1
    }
  };

  const parcelsOutlineSelected: LineLayerSpecification = {
    id: "parcels-outline-selected",
    type: "line",
    source: "title_boundaries",
    paint: {
      "line-color": [
        "case",
        ["boolean", ["feature-state", "selected"], false],
        "#000000",
        "rgba(0,0,0,0)"
      ],
      "line-width": 3
    }
  };

  map.addLayer(parcelsFill);
  map.addLayer(parcelsOutline);
  map.addLayer(parcelsOutlineSelected);
}
