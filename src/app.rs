use crate::maplibre::Map;
use gloo_net::http::Request;
use leptos::ev;
use leptos::prelude::*;
use leptos::task::spawn_local;
use leptos::wasm_bindgen::prelude::*;
use leptos::web_sys;
use leptos::web_sys::Document;
use leptos_meta::{provide_meta_context, Meta, Title};
use serde::Serialize;
use serde_wasm_bindgen::to_value;

#[component]
pub fn App() -> impl IntoView {
    #[cfg(feature = "hydrate")]
    Effect::new(|_| {
        spawn_local(async move {
            web_sys::console::log_1(&"Mounting map...".into());
            if let Some(window) = leptos::web_sys::window() {
                if let Some(document) = window.document() {
                    spawn_local_setup_map(&document);
                }
            }
        });
    });

    view! {
        <>
            <script src="/pkg/maplibre-gl.js"></script>
            <link rel="stylesheet" href="/pkg/maplibre-gl.css"/>
            <main class="h-screen w-screen">
                <div id="map" style="height:100vh; width:100vw"></div>
            </main>
        </>
    }
}

#[cfg(feature = "hydrate")]
fn spawn_local_setup_map(_document: &Document) {
    use crate::map_style::MapStyle;

    spawn_local(async move {
        let style = MapStyle::default();

        let container = document()
            .get_element_by_id("map")
            .expect("map container not found")
            .into();

        let options = js_sys::Object::new();

        js_sys::Reflect::set(&options, &JsValue::from_str("container"), &container).unwrap();
        js_sys::Reflect::set(
            &options,
            &JsValue::from_str("center"),
            &to_value(&[-0.1278, 51.5074]).unwrap(),
        )
        .unwrap();
        js_sys::Reflect::set(
            &options,
            &JsValue::from_str("zoom"),
            &JsValue::from_f64(12.0),
        )
        .unwrap();
        js_sys::Reflect::set(
            &options,
            &JsValue::from_str("style"),
            &to_value(&style).unwrap(),
        )
        .unwrap();

        web_sys::console::log_1(&"Setting up map...".into());
        let map = Map::new(&options.into());
        web_sys::console::log_1(&to_value(&style).unwrap());

        // Fetch GeoJSON parcels for popups
        let geojson: serde_json::Value = Request::get("/parcels_wgs84.geojson")
            .send()
            .await
            .unwrap()
            .json()
            .await
            .unwrap();

        // Add as a source for interactive popups
        // map.addSource(
        //     "parcels-popup",
        //     &to_value(&serde_json::json!({
        //         "type": "geojson",
        //         "data": geojson
        //     }))
        //     .unwrap(),
        // );

        // map.addLayer(
        //     &to_value(&serde_json::json!({
        //         "id": "parcels-popup-layer",
        //         "type": "fill",
        //         "source": "parcels-popup",
        //         "paint": { "fill-opacity": 0 }
        //     }))
        //     .unwrap(),
        // );

        // Add click handler
        let closure = Closure::wrap(Box::new(move |e: JsValue| {
            let features = js_sys::Reflect::get(&e, &JsValue::from_str("features")).unwrap();
            let feature = js_sys::Array::from(&features).get(0);
            let props = js_sys::Reflect::get(&feature, &JsValue::from_str("properties")).unwrap();
            let id = js_sys::Reflect::get(&props, &JsValue::from_str("id"))
                .unwrap_or(JsValue::from_str("Unknown"));
            let popup = web_sys::window()
                .unwrap()
                .document()
                .unwrap()
                .create_element("div")
                .unwrap();
            popup.set_inner_html(&format!(
                "<b>Parcel ID:</b> {}",
                id.as_string().unwrap_or_default()
            ));
        }) as Box<dyn FnMut(JsValue)>);

        map.on("click", closure.as_ref().unchecked_ref());
        closure.forget(); // keep alive
    });
}

#[component]
pub fn Shell(leptos_options: LeptosOptions) -> impl IntoView {
    provide_meta_context();

    view! {
        <html lang="en">
            <head>
                <meta charset="utf-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <Title text="Somers Democratic LVT"/>
                <Meta name="description" content="MapLibre demo"/>
                <link rel="stylesheet" href="/pkg/maplibre-gl.css"/>
                <HydrationScripts options=leptos_options.clone() />
            </head>
            <body>
                <App />
            </body>
        </html>
    }
}
