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
    pub fn on(this: &Map, event: &str, callback: &js_sys::Function);
}
