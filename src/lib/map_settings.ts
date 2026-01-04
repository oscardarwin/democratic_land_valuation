export function getMapSettings(containerId: string): Any {
  const container = document.getElementById(containerId);

  if (!container) {
    console.error(`Map container with ID '${containerId}' not found.`);
    return undefined;
  }
  return {
    container: container,
    style: "style.json",
    center: [-0.085, 51.49],
    zoom: 14,
    maxBounds: [
      [-0.130945, 51.474153],
      [-0.043786, 51.516047]
    ],
  }
}
