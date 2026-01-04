import { getMapSettings } from "./map_settings.ts";
import type { IControl, Map as MapLibreMap } from "maplibre-gl";
import { selectedParcelId } from "$lib/stores/selectedParcel";
import type { Unsubscriber } from "svelte/store";

type BoundingBox = {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
};

type FeatureId = string | number;

export class RandomParcelsControl implements IControl {
  private map!: MapLibreMap;
  private container!: HTMLDivElement;
  private comparisonIds = new Set<string | number>();
  private currentSelectedId: string | number | null = null;
  private unsubscribe!: Unsubscriber;

  constructor(private count = 5) {}

  onAdd(map: MapLibreMap): HTMLElement {
    this.map = map;

    this.unsubscribe = selectedParcelId.subscribe(id => {
      this.currentSelectedId = id;
    });


    this.container = document.createElement("div");
    this.container.className = "maplibregl-ctrl maplibregl-ctrl-group";

    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "🔄";
    button.onclick = () => this.selectRandomParcels();

    this.container.appendChild(button);
    return this.container;
  }

  onRemove(): void {
    this.container.remove();
    this.unsubscribe();
  }

  private shuffle<T>(array: T[]): void {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  private selectRandomParcels(): void {
    for (const id of this.comparisonIds) {
      this.map.setFeatureState(
        { source: "title_boundaries", id },
        { compared: false }
      );
      this.map.setFeatureState(
        { source: "title_boundary_representative_points", id },
        { compared: false }
      );
    }
    this.comparisonIds.clear();
  
    const representative_points = this.map
      .querySourceFeatures("title_boundary_representative_points")
      .filter(f => f.id !== undefined);
  
    const selectedIds = this.selectNearbyParcelIds(
      representative_points,
      this.count,
      this.currentSelectedId
    );
  
    for (const id of selectedIds) {
      this.map.setFeatureState(
        { source: "title_boundaries", id },
        { compared: true }
      );
      this.map.setFeatureState(
        { source: "title_boundary_representative_points", id },
        { compared: true }
      );
      this.comparisonIds.add(id);
    }
  }

  private boundingBoxFromCenter(
    x: number,
    y: number,
    halfSizeMeters: number = 1000
  ): BoundingBox {
    return {
      minX: x - halfSizeMeters,
      maxX: x + halfSizeMeters,
      minY: y - halfSizeMeters,
      maxY: y + halfSizeMeters,
    };
  }

  private selectNearbyParcelIds(
    representative_points: maplibregl.MapGeoJSONFeature[],
    count: number,
    preferredId: FeatureId | null,
  ): FeatureId[] {
    if (representative_points.length === 0) return [];
  
    // Resolve anchor feature
    let anchor =
      preferredId !== null
        ? representative_points.find(f => f.id === preferredId)
        : null;
  
    if (!anchor) {
      anchor = representative_points[
        Math.floor(Math.random() * representative_points.length)
      ];
    };

    if (!anchor || anchor.geometry?.type !== "Point") return [];
  
    const [cx, cy] = (anchor.geometry as GeoJSON.Point).coordinates;
  
    const bbox = this.boundingBoxFromCenter(cx, cy);

    const candidates = representative_points.filter(f => {
      if (f.id === anchor!.id) return false;
      if (f.geometry?.type !== "Point") return false;

      const [x, y] = (f.geometry as GeoJSON.Point).coordinates;
      return (
        x >= bbox.minX &&
        x <= bbox.maxX &&
        y >= bbox.minY &&
        y <= bbox.maxY
      );
    });
  
    this.shuffle(candidates);
  
    return [
      anchor.id as FeatureId,
      ...candidates.slice(0, count - 1).map(f => f.id as FeatureId),
    ];
  }
}


export async function createParcelComparisonMap(
  containerId: string
): Promise<any | undefined> {
  const maplibregl = await import("maplibre-gl");

  const Map = maplibregl.Map;
  const NavigationControl = maplibregl.NavigationControl;

  const map_settings = getMapSettings(containerId);
  const map = new Map(map_settings);

  map.addControl(new NavigationControl(), "top-right");
  map.addControl(new RandomParcelsControl(5), "top-right");

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
      "fill-color": "#ff44ff",
      "fill-opacity": [
        "case",
        ["boolean", ["feature-state", "compared"], false],
        0.4,
        0.0
      ]
    }
  };

  const parcelCircles: CircleLayerSpecification = {
    id: "parcel-circles",
    type: "circle",
    source: "title_boundary_representative_points",
    minzoom: 1,
    maxzoom: 16,
    paint: {
      "circle-radius": [
        "interpolate",
        ["linear"],
        ["zoom"],
        5, 2,
        10, 6
      ],
      "circle-color": "#000000",
      "circle-opacity": [
        "case",
        ["boolean", ["feature-state", "compared"], false],
        1.0,
        0
      ]
    }
  };

  map.addLayer(parcelsFill);
  map.addLayer(parcelCircles);
}

