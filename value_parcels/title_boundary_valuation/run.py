from __future__ import annotations
import json
from typing import Callable, List, Tuple, cast

import numpy as np
from scipy.spatial import cKDTree
from shapely import MultiPolygon
import pandas as pd
from shapely.geometry import shape, Polygon
from shapely import Geometry
from shapely.ops import triangulate
from scipy.interpolate import RBFInterpolator
from pyproj import Transformer
from dataclasses import dataclass
import matplotlib.pyplot as plt
from matplotlib import cm
from matplotlib.patches import Polygon as MplPolygon
from matplotlib.collections import PatchCollection

@dataclass(frozen=True)
class TitleBoundary:
    entity_id: str
    geometry: MultiPolygon


@dataclass(frozen=True)
class ValuedTitleBoundary:
    entity_id: str
    land_value: float
    area: float

def debug_plot_rbf(rbf, xs, ys, values, title="RBF Surface Check"):
    gx, gy = np.meshgrid(
        np.linspace(xs.min(), xs.max(), 200),
        np.linspace(ys.min(), ys.max(), 200)
    )
    coords = np.column_stack([gx.ravel(), gy.ravel()])  # shape (N, 2)
    gvals = rbf(coords)                                 # returns shape (N,)
    gvals = gvals.reshape(gx.shape)    

    plt.figure(figsize=(8, 6))
    plt.imshow(
        gvals,
        origin="lower",
        extent=(xs.min(), xs.max(), ys.min(), ys.max()),
        alpha=0.7
    )
    plt.scatter(xs, ys, c=values, edgecolor="k")
    plt.title(title)
    plt.colorbar(label="Value")
    plt.savefig("debug_rbf_plot.png")

def plot_valued_title_boundaries(
    boundaries: List[TitleBoundary],
    valued_title_boundaries: dict[str, float],
    colormap: str = "viridis",
    figsize: tuple[int, int] = (20, 20),
) -> None:
    plt.clf()
    fig, ax = plt.subplots(figsize=figsize)

    # Extract land values for normalization
    land_values = np.array([valued_title_boundaries[b.entity_id] for b in boundaries])
    norm = plt.Normalize(vmin=land_values.min(), vmax=land_values.max())
    cmap = cm.get_cmap(colormap)

    patches = []
    patch_colors = []

    for b in boundaries:
        val = valued_title_boundaries[b.entity_id]
        color = cmap(norm(val))
        mp: MultiPolygon = b.geometry

        for poly in mp.geoms:
            coords = np.array(poly.exterior.coords)
            patch = MplPolygon(coords, closed=True)
            patches.append(patch)
            patch_colors.append(color)

    collection = PatchCollection(patches, facecolor=patch_colors, edgecolor='k', linewidths=0.5)
    ax.add_collection(collection)
    ax.set_aspect('equal')
    ax.autoscale_view()

    sm = cm.ScalarMappable(norm=norm, cmap=cmap)
    sm.set_array([])
    cbar = plt.colorbar(sm, ax=ax)
    cbar.set_label("Estimated Land Value (£/ha)")

    plt.title("Title Boundaries Colored by Estimated Land Value")
    plt.savefig("coloured_title_boundaries.png")

def load_constituency_values(csv_path: str, metric_transformer: Transformer) -> RBFInterpolator:
    df = pd.read_csv(csv_path)
    
    print(df)

    lon = df["Longitude"].to_numpy()
    lat = df["Latitude"].to_numpy()

    x, y = metric_transformer.transform(xx=lon, yy=lat)

    land_values = df["Residential"].replace("[£,]", "", regex=True).astype(float).to_numpy()

    coords = np.column_stack([x, y])
    tree = cKDTree(coords)
    neighbour_constituency_distances, _ = tree.query(coords, k=2)   # k=1 is self, k=2 gives nearest neighbor
    median_distance_between_constituency_centers = np.median(neighbour_constituency_distances[:,1])
    epsilon = 0.5 * median_distance_between_constituency_centers
    rbf = RBFInterpolator(
        coords,
        land_values,
        kernel="gaussian",
        smoothing=0.0,
        epsilon=epsilon,
    )

    deltas = land_values - rbf(coords)

    # debug_plot_rbf(rbf, x, y, land_values) 
    return rbf


def load_title_boundaries(geojson_path: str, metric_transformer: Transformer) -> List[TitleBoundary]:
    with open(geojson_path, "r") as f:
        data = json.load(f)

    title_boundaries: list[TitleBoundary] = []
    for feature in data["features"]:
        geometry = feature["geometry"]
        
        coordinates = geometry["coordinates"]
        polygons = [
            [[list(metric_transformer.transform(xx=coord[0], yy=coord[1]))
            for coord in inner_outer]
            for inner_outer in polygon]
            for polygon in coordinates
        ]
        geometry["coordinates"] = polygons
        
        multi_polygon = cast(MultiPolygon, shape(geometry))

        props = feature["properties"]
        entity_id = props.get("entity")

        title_boundary = TitleBoundary(entity_id=entity_id, geometry=multi_polygon)
        title_boundaries.append(title_boundary)
    return title_boundaries

def value_polygon(
    polygon: Polygon,
    rbf_interpolator: RBFInterpolator,
) -> tuple[float, float]:
    x, y = polygon.exterior.xy
    projected = Polygon(np.column_stack([x, y]))

    triangles = triangulate(projected)

    total_value = 0.0
    total_area = 0.0
    for tri in triangles:
        cx, cy = tri.centroid.xy

        centroid = np.array([[cx[0], cy[0]]])

        # distances_to_datapoints = np.linalg.norm(rbf_interpolator.y - centroid, axis=1, ord=2)
        # closest_index = np.argmin(distances_to_datapoints)

        land_value_per_hectare = rbf_interpolator(centroid)[0]
        area_meters = tri.area
        area_ha = area_meters / 10_000.0
        total_area += area_meters

        total_value += land_value_per_hectare * area_ha
    

    return total_value, total_area


def value_title_boundary(
    title_boundary: TitleBoundary,
    rbf_interpolator: RBFInterpolator,
) -> ValuedTitleBoundary:
    total_value = 0.0
    total_area = 0.0
    
    for poly in title_boundary.geometry.geoms:
        value, area = value_polygon(polygon=poly, rbf_interpolator=rbf_interpolator)
        total_value += value
        total_area += area

    return ValuedTitleBoundary(
        entity_id=title_boundary.entity_id,
        land_value=total_value,
        area=total_area,
    )


def main() -> None:
    metric_transformer = Transformer.from_crs("EPSG:4326", "EPSG:3857", always_xy=True)
    rbf_interpolator = load_constituency_values("constituency_land_values.csv", metric_transformer=metric_transformer)
    title_boundaries = load_title_boundaries("title_boundaries.geojson", metric_transformer=metric_transformer)

    results = {}
    areas = []
    boundaries = title_boundaries
    for title_boundary in boundaries:
        valued_title_boundary = value_title_boundary(title_boundary=title_boundary, rbf_interpolator=rbf_interpolator)
        results[valued_title_boundary.entity_id] = valued_title_boundary.land_value
        areas.append(valued_title_boundary.area)
    

    values = np.array(list(results.values()))
    areas_np = np.array(areas)
    print(f"average land value {values.mean()}, median: {np.median(values)}")
    print(f"average land area {areas_np.mean()}, median: {np.median(areas_np)}")
    plt.clf()
    plt.hist(np.log(values), bins=100)
    plt.savefig("histogram_of_land_values.png")

    # plot_valued_title_boundaries(valued_title_boundaries=results, boundaries=boundaries)
    with open("valued_title_boundaries.json", "w") as f:
         json.dump(results, f)
    
if __name__ == "__main__":
    main()
