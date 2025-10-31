use serde::Serialize;
use std::collections::HashMap;

#[derive(Serialize)]
pub struct MapStyle {
    pub version: u8,
    pub sources: Sources,
    pub layers: Vec<Layer>,
}

#[derive(Serialize)]
pub struct GeoJSONSource {
    #[serde(rename = "type")]
    pub source_type: String,
    pub data: String,
}

#[derive(Serialize)]
pub struct Sources {
    #[serde(rename = "os-tiles")]
    pub os_tiles: Source,
    pub parcels: GeoJSONSource,
}

#[derive(Serialize)]
pub struct Source {
    #[serde(rename = "type")]
    pub source_type: String,
    pub tiles: Vec<String>,
    pub minzoom: u8,
    pub maxzoom: u8,
}

#[derive(Serialize)]
pub struct PaintFill {
    #[serde(rename = "fill-color")]
    pub fill_color: String,
    #[serde(rename = "fill-opacity")]
    pub fill_opacity: f64,
}

#[derive(Serialize)]
pub struct PaintLine {
    #[serde(rename = "line-color")]
    pub line_color: String,
    #[serde(rename = "line-width")]
    pub line_width: f64,
    #[serde(rename = "line-opacity")]
    pub line_opacity: f64,
}

#[derive(Serialize)]
#[serde(untagged)]
pub enum Paint {
    PaintFill(PaintFill),
    PaintLine(PaintLine),
}

#[derive(Serialize)]
pub struct Layer {
    pub id: String,
    #[serde(rename = "type")]
    pub layer_type: String,
    pub source: String,
    #[serde(rename = "source-layer", skip_serializing_if = "Option::is_none")]
    pub source_layer: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub paint: Option<Paint>,
}

impl Default for MapStyle {
    fn default() -> Self {
        let os_tiles = Source {
            source_type: "vector".to_string(),
            tiles: vec!["http://localhost:8080/data/uk/{z}/{x}/{y}.pbf".to_string()],
            minzoom: 0,
            maxzoom: 14,
        };

        let parcels = GeoJSONSource {
            source_type: "geojson".to_string(),
            data: "/parcels_wgs84.geojson".to_string(),
        };

        let sources = Sources { os_tiles, parcels };

        let layers = vec![
            Layer {
                id: "parcels-fill".to_string(),
                layer_type: "fill".to_string(),
                source: "os-tiles".to_string(),
                source_layer: Some("roads".to_string()),
                paint: Some(Paint::PaintFill(PaintFill {
                    fill_color: "#ff7800".to_string(),
                    fill_opacity: 0.1,
                })),
            },
            Layer {
                id: "roads-line".to_string(),
                layer_type: "line".to_string(),
                source: "os-tiles".to_string(),
                source_layer: Some("roads".to_string()),
                paint: Some(Paint::PaintLine(PaintLine {
                    line_color: "#ff7800".to_string(),
                    line_width: 1.0,
                    line_opacity: 0.8,
                })),
            },
            Layer {
                id: "parcels-line".to_string(),
                layer_type: "line".to_string(),
                source: "parcels".to_string(),
                source_layer: None,
                paint: Some(Paint::PaintLine(PaintLine {
                    line_color: "#0078ff".to_string(),
                    line_width: 1.0,
                    line_opacity: 0.8,
                })),
            },
        ];

        MapStyle {
            version: 8,
            sources,
            layers,
        }
    }
}
