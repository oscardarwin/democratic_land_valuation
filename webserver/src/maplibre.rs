use leptos::wasm_bindgen::JsValue;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = maplibregl, js_name = Map)]
    pub type Map;

    #[wasm_bindgen(constructor, js_namespace = maplibregl)]
    pub fn new(options: &JsValue) -> Map;

    #[wasm_bindgen(method)]
    pub fn addSource(this: &Map, id: &str, source: &JsValue);

    #[wasm_bindgen(method)]
    pub fn addLayer(this: &Map, layer: &JsValue);

    #[wasm_bindgen(method)]
    pub fn on(this: &Map, event: &str, layer: &str, callback: &js_sys::Function);

    #[wasm_bindgen(method)]
    pub fn setFeatureState(this: &Map, params: &JsValue, state: &JsValue);

    #[wasm_bindgen(method, js_name = querySourceFeatures)]
    pub fn query_source_features(this: &Map, source: &str) -> js_sys::Array;
}
