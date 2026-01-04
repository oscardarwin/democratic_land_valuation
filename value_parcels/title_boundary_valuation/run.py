from __future__ import annotations
import math
import copy
import json
from typing import Callable, List, Tuple, cast

import numpy as np
from scipy.spatial import cKDTree
from shapely import MultiPolygon, Point
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
    representative_point: Point
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


def load_title_boundary_json(geojson_path: str) -> dict:
    with open(geojson_path, "r") as f:
         return json.load(f)

def get_title_boundary(feature: dict, metric_transformer: Transformer) -> TitleBoundary:
    geometry = copy.deepcopy(feature["geometry"])
    
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

    return TitleBoundary(entity_id=entity_id, geometry=multi_polygon)

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

        centroid = [cx[0], cy[0]]

        land_value_per_hectare = rbf_interpolator(np.array([centroid]))[0]
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

    representative_point = title_boundary.geometry.representative_point()
    return ValuedTitleBoundary(
        entity_id=title_boundary.entity_id,
        land_value=total_value,
        representative_point=representative_point,
        area=total_area,
    )

def write_title_boundary_centroids(
    title_boundaries_geojson: dict,
    metric_transformer: Transformer,
) -> None:
    boundary_representative_points_features = []

    for feature in title_boundaries_geojson["features"]:
        geometry = copy.deepcopy(feature["geometry"])

        multi_polygon = cast(MultiPolygon, shape(geometry))

        point = multi_polygon.representative_point()
        x, y = point.coords[0]

        entity_id = feature.get("properties", {}).get("entity")

        boundary_representative_points_features.append({
            "type": "Feature",
            "id": entity_id,
            "geometry": {
                "type": "Point",
                "coordinates": [x, y],
            },
            "properties": {
                "entity": entity_id,
            },
        })

    representative_points_geojson = {
        "type": "FeatureCollection",
        "features": boundary_representative_points_features,
    }

    with open("title_boundary_representative_points.geojson", "w") as f:
        json.dump(representative_points_geojson, f, indent=2)

def main() -> None:
    metric_transformer = Transformer.from_crs("EPSG:4326", "EPSG:3857", always_xy=True)
    rbf_interpolator = load_constituency_values("constituency_land_values.csv", metric_transformer=metric_transformer)

    title_boundaries_geojson = load_title_boundary_json(geojson_path="title_boundaries.geojson")
    
    log_land_values: list[float] = list()
    for feature in title_boundaries_geojson["features"]:
        title_boundary = get_title_boundary(feature=feature, metric_transformer=metric_transformer)

        valued_title_boundary = value_title_boundary(title_boundary=title_boundary, rbf_interpolator=rbf_interpolator)
        log_land_values.append(float(np.log(valued_title_boundary.land_value)))
        properties = feature.get("properties", {})
        properties["land_value"] = float(valued_title_boundary.land_value)
        properties["area"] = float(valued_title_boundary.area)

    max_log_land_value = max(log_land_values) 
    min_log_land_value = min(log_land_values)
    log_land_value_span = max_log_land_value - min_log_land_value

    for log_land_value, feature in zip(log_land_values, title_boundaries_geojson["features"]):
        properties = feature.get("properties", {})
        properties["land_value_normalized"] = (log_land_value - min_log_land_value) / log_land_value_span

    write_title_boundary_centroids(
        title_boundaries_geojson=title_boundaries_geojson,
        metric_transformer=metric_transformer,
    )

    with open("valued_title_boundaries.geojson", "w") as f:
        json.dump(title_boundaries_geojson, f, indent=2)

if __name__ == "__main__":
    main()
